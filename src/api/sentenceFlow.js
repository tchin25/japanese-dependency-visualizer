import { ref, computed } from "vue";

const sentenceFlow = ref([]);

const sentenceFlowString = computed(() => JSON.stringify(sentenceFlow.value));

const levelsFlow = computed(() => {
    // Deep clone array so our modifications don't recursively retrigger computation
    let readable = JSON.parse(JSON.stringify(sentenceFlow.value));
    // for (let i = readable.length - 1; i >= 0; i--){
        
    // }
});

export { sentenceFlow, sentenceFlowString, levelsFlow };
