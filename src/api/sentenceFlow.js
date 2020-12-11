import { ref, computed, reactive, provide, inject } from "vue";
import exampleSentences from "@/example-sentences";

export const generateSentenceFlow = async (sentence) => {
  if (!sentence) {
    return [];
  }

  // Reset sentence if flow was previously generated
  sentence = sentence.split("|").join("");

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
      token.parentId = parseInt(el.getAttribute("link"));
      token.children = [];
      flow.push([token]);
    }

    // Link parent to child using parentIndex, which right now is parentId
    flow.forEach((level) => {
      const { id, parentId } = level[0];
      // Add child to parent
      if (parentId >= 0) {
        flow[parentId][0].children.push(id);
      }
    });

    flow.forEach((level) => {
      let token = level[0];
      // Sort children descending order
      token.children.sort((a, b) => b - a);
    });
    // console.log(flow);
    return flow;
  } catch (e) {
    // console.error(e);
    return [
      [
        {
          id: 0,
          label: sentence,
          children: [],
          parentId: -1,
        },
      ],
    ];
  }
};

export const createState = () => {
  const sentenceFlow = ref(exampleSentences.readable);

  const sentenceFlowString = computed(() => JSON.stringify(sentenceFlow.value));

  // Organized flow into levels from root
  const levelsFlow = computed(() => {
    if (sentenceFlow.value.length === 0) {
      return [];
    }

    // Deep clone array so our modifications don't recursively retrigger computation
    let readable = JSON.parse(JSON.stringify(sentenceFlow.value));
    // console.log(sentenceFlow.value);
    let flow = [];

    flow.unshift([]);
    // Root and unlinked nodes will be at the first level
    for (let i = 0; i < readable.length; i++) {
      if (readable[i][0].parentId === -1) {
        flow[0].unshift(readable[i][0]);
      }
    }

    // console.log(flow);

    for (let i = 0; i < flow.length; i++) {
      // Children of current level
      let children = [];

      // Iterate through every token in each level
      for (let j = flow[0].length - 1; j >= 0; j--) {
        // Iterate through every child in each token and push it to children
        for (let k = 0; k < flow[0][j].children.length; k++) {
          // let childIndex = flow[0][j].children[k];

          let child = readable.find(
            (el) => el[0].id === flow[0][j].children[k]
          );
          children.unshift(child[0]);
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
    if (sentenceFlow.value.length === 0) {
      return [];
    }

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

  // Sorts children of token in descending flow order
  const sortTokenChildren = (tokenObject) => {
    tokenObject.children.sort((a, b) => {
      const flattened = sentenceFlow.value.flat();
      const aIndex = flattened.findIndex((el) => el.id === a);
      const bIndex = flattened.findIndex((el) => el.id === b);
      return bIndex - aIndex;
    });
  };

  return {
    sentenceFlow,
    sentenceFlowString,
    levelsFlow,
    compactedSentenceFlow,
    sortTokenChildren,
  };
};

const stateSymbol = Symbol("state");
export const useState = () => inject(stateSymbol, createState());
export const provideState = () => provide(stateSymbol, createState());
