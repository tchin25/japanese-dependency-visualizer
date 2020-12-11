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
  <div class="footer-wrapper">
    <footer class="footer">
      <div class="level">
        <div class="level-left">
          <figure class="image is-64x64">
            <img class="is-rounded" src="@/assets/santathomas.png" />
          </figure>
          <h1 class="title is-4 ml-2">
            A side project by
            <a href="https://thomasch.in/">
              Thomas Chin
            </a>
          </h1>
        </div>
      </div>
    </footer>
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
