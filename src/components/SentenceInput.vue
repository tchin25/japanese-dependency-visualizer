<template>
  <div class="field has-addons">
    <div class="control is-expanded">
      <input class="input" type="text" placeholder="Input" v-model="sentence" />
    </div>
    <div class="control">
      <button
        class="button is-primary"
        type="submit"
        value="Submit"
        @click="setSentenceFlow"
      >
        Generate Flow
      </button>
    </div>
  </div>
</template>

<script>
import { useState, generateSentenceFlow } from "@/api/sentenceFlow";

export default {
  setup() {
    const { sentenceFlow } = useState();
    return { sentenceFlow, generateSentenceFlow };
  },
  computed: {
    sentence: {
      get() {
        return this.sentenceFlow.reduce((acc, curr) => {
          acc += "|" + curr[0].label;
        }, "");
      },
      set(value) {
        let tokenized = value.split("|");

        if (tokenized.length > this.sentenceFlow.length) {
          // Insert new token between old ones
          for (let i = 0; i < tokenized.length; i++) {
            if (this.sentenceFlow[i][0].label !== tokenized[i]) {
              
            }
          }
        } else if (tokenized.length < this.sentenceFlow.length) {
          // Merge two tokens together
          for (let i = 0; i < this.sentenceFlow.length; i++) {
            if (this.sentenceFlow[i][0].label !== tokenized[i]) {

            }
          }
        } else {
          for (let i = 0; i < tokenized.length; i++) {
            this.sentenceFlow[i][0].label = tokenized[i];
          }
        }
      },
    },
  },
  methods: {
    async setSentenceFlow() {
      this.sentenceFlow = await this.generateSentenceFlow(this.sentence);

      // Craete tokenized sentence
      // Flatten array of array of objects into array of objects
      let flattened = this.sentenceFlow.flat();
      let tokenized = "";
      flattened.forEach((token, i) => {
        if (i != 0) {
          tokenized += "|";
        }
        tokenized += token.label;
      });
      this.sentence = tokenized;
    },
  },
};
</script>

<style></style>
