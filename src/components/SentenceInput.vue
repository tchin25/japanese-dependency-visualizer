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
export default {
  inject: ["sentenceFlow"],
  computed: {
    sentence: {
      get() {
        return this.$store.state.sentence;
      },
      set(value) {
        this.$store.commit("updateSentence", value);
      },
    },
  },
  methods: {
    async setSentenceFlow() {
      this.sentenceFlow.sentenceFlow.value = await this.sentenceFlow.generateSentenceFlow(
        this.sentence
      );

      // Craete tokenized sentence
      // Flatten array of array of objects into array of objects
      let flattened = this.sentenceFlow.sentenceFlow.value.flat();
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
