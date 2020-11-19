<template>
  <SentenceInput />
  {{ sentenceFlowString }}
  <div style="display: flex;">
    <TokenTable />
    <DependencyVisualizer />
  </div>
</template>

<script>
// @ is an alias to /src
import SentenceInput from "@/components/SentenceInput.vue";
import TokenTable from "@/components/TokenTable.vue";
import DependencyVisualizer from "@/components/DependencyVisualizer.vue";
import { sentenceFlow } from "../api/sentenceFlow";
import { toRaw, computed, provide } from "vue";

export default {
  setup() {
    const sentenceFlowString = computed(() =>
      JSON.stringify(sentenceFlow.value)
    );
    provide("sentenceFlow", sentenceFlow);
    return { sentenceFlow, sentenceFlowString };
  },
  name: "Home",
  components: { SentenceInput, TokenTable, DependencyVisualizer },
};
</script>
