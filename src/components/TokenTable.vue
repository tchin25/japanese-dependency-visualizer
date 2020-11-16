<template>
  <table class="table">
    <thead>
      <th>Tokenized</th>
      <th>Dependencies</th>
    </thead>
    <tbody>
      <tr v-for="(token, index) in tokenizedSentence" :key="index">
        <td>{{ token }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["tokenizedSentence"]),
  },
};
</script>

<style></style>
