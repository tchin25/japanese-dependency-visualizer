import { ref, computed } from "vue";

const sentenceFlow = ref([]);

const sentenceFlowString = computed(() => JSON.stringify(sentenceFlow.value));

const levelsFlow = computed(() => {
  // Deep clone array so our modifications don't recursively retrigger computation
  let readable = JSON.parse(JSON.stringify(sentenceFlow.value));
  let flow = [];
  flow.unshift(readable[readable.length - 1]);
    // console.log(sentenceFlow.value)
//   for (let i = readable.length - 2; i >= 0; i--) {
//     // Iterate through every token in each level
//     for (let j = flow[0].length - 1; j >= 0; j--) {
//       // Iterate through every child in each token
//       for (let k = 0; k < flow[0][j].children.length; k++) {
//         let childIndex = flow[0][j].children[k];
//       }
//     }
//   }
  return flow;
});

export { sentenceFlow, sentenceFlowString, levelsFlow };
