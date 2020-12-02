<template>
  <div class="section">
    <div class="container">
      <SentenceInput />
    </div>
  </div>
  <div class="section">
    <div class="container">
      <div style="display: flex;">
        <TokenTable />
        <DependencyVisualizer />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SentenceInput from "@/components/SentenceInput.vue";
import TokenTable from "@/components/TokenTable.vue";
import DependencyVisualizer from "@/components/DependencyVisualizer.vue";
import { provideState } from "../api/sentenceFlow";

export default {
  setup() {
    provideState();
  },
  name: "Home",
  components: { SentenceInput, TokenTable, DependencyVisualizer },
};
</script>
