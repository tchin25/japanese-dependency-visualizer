import { ref, computed } from "vue";

const sentenceFlow = ref([]);

const sentenceFlowString = computed(() => JSON.stringify(sentenceFlow.value));

const levelsFlow = computed(() => {
    let readable = JSON.parse(JSON.stringify(sentenceFlow.value));
    //TODO
});

export { sentenceFlow, sentenceFlowString, levelsFlow };
