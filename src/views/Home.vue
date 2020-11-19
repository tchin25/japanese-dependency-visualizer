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
import { sentenceFlow, sentenceFlowString } from "../api/sentenceFlow";
import { provide } from "vue";

export default {
  setup() {
    provide("sentenceFlow", sentenceFlow);
    return { sentenceFlow, sentenceFlowString };
  },
  name: "Home",
  components: { SentenceInput, TokenTable, DependencyVisualizer },
};
</script>
