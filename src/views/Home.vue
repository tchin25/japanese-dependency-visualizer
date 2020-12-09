<template>
  <div class="section">
    <div class="container">
      <SentenceInput />
    </div>
  </div>
  <div class="section pt-0">
    <div class="container">
      <div style="display: flex;">
        <TokenTable style="width: 20%" class="m-2" />
        <DependencyVisualizer style="width: 80%" class="m-2" />
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
