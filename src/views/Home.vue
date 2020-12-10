<template>
  <div class="section">
    <div class="container">
      <SentenceInput />
    </div>
  </div>
  <div class="section pt-0">
    <div class="container">
      <div style="width: 100%" class="columns ml-0">
        <div class="column is-one-fifth">
          <TokenTable style="height: 100%" />
        </div>
        <div class="column">
          <DependencyVisualizer style="height: 100%" />
        </div>
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
