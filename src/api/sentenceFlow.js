import { ref, computed } from "vue";

const sentenceFlow = ref([]);

const generateSentenceFlow = async (sentence) => {
  if (!sentence) {
    return [];
  }

  const endpoint = "https://cabocha-nke3uh5gza-uc.a.run.app/";
  try {
    let res = await fetch(endpoint + sentence).then((res) => res.text());
    let domParser = new DOMParser();
    let xml = domParser.parseFromString(res, "text/xml");

    let flow = [];

    let tokens = xml.getElementsByTagName("chunk");
    for (let i = 0; i < tokens.length; i++) {
      let token = {};
      let el = tokens[i];

      let text = el.textContent.split("\n");
      token.label = "";
      text.forEach((s) => {
        token.label += s.trim();
      });

      token.id = parseInt(el.getAttribute("id"));
      token.parentIndex = parseInt(el.getAttribute("link"));
      token.children = [];
      flow.push([token]);
    }

    // Link parent to child using parentIndex
    flow.forEach((level) => {
      const { id, parentIndex } = level[0];
      // Add child to parent
      if (parentIndex >= 0) {
        flow[parentIndex][0].children.push(id);
      }
    });

    flow.forEach((level) => {
      let token = level[0];
      // Sort children descending order
      token.children.sort((a, b) => b - a);
    });

    return flow;
  } catch (e) {
    // console.error(e);
    return [
      {
        id: 0,
        label: sentence,
        children: [],
        parentIndex: -1,
      },
    ];
  }
};

const sentenceFlowString = computed(() => JSON.stringify(sentenceFlow.value));

// Organized flow into levels from root
const levelsFlow = computed(() => {
  // Deep clone array so our modifications don't recursively retrigger computation
  let readable = JSON.parse(JSON.stringify(sentenceFlow.value));
  let flow = [];
  flow.unshift(readable[readable.length - 1]);

  for (let i = 0; i < flow.length; i++) {
    let children = [];
    // Iterate through every token in each level
    for (let j = flow[0].length - 1; j >= 0; j--) {
      // Iterate through every child in each token
      for (let k = 0; k < flow[0][j].children.length; k++) {
        let childIndex = flow[0][j].children[k];
        children.unshift(readable[childIndex][0]);
      }
    }

    if (children.length > 0) {
      flow.unshift(children);
    }
  }
  //   console.log(flow);
  return flow;
});

// Compacts all nodes without inter-dependencies onto the same level
const compactedSentenceFlow = computed(() => {
  // Deep clone array so our modifications don't recursively retrigger computation
  let readable = JSON.parse(JSON.stringify(sentenceFlow.value));
  let flow = [];
  flow.push([]);

  const levelDependency = new Set();
  for (let i = 0; i < readable.length; i++) {
    // Adds token to current level
    let currentToken = readable[i][0];
    flow[flow.length - 1].push(currentToken);
    levelDependency.add(currentToken.id);

    if (i === readable.length - 1) {
      break;
    }

    // Check if next token is dependent on something on current level
    for (const child of readable[i + 1][0].children) {
      if (levelDependency.has(child)) {
        // Create new level
        flow.push([]);
        levelDependency.clear();
        break;
      }
    }
  }
  //   console.log(flow);
  return flow;
});

export {
  sentenceFlow,
  sentenceFlowString,
  levelsFlow,
  compactedSentenceFlow,
  generateSentenceFlow,
};
