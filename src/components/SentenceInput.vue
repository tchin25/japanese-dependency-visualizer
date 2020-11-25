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
      console.log(this.sentenceFlow.sentenceFlow.value);
    },
  },
};
</script>

<style></style>
