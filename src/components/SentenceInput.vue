<template>
  <div class="field">
    <div class="control">
      <input class="input" type="text" placeholder="Input" v-model="sentence" />
    </div>
  </div>
</template>

<script>
export default {
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
};
</script>

<style></style>
