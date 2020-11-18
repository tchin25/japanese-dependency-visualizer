<template>
  <table class="table">
    <thead>
      <th>Tokenized</th>
      <th>Parent</th>
    </thead>
    <tbody>
      <TokenTableRow
        v-for="(token, index) in tokenizedSentence"
        :token="token"
        :index="index"
        :key="index"
      >
      </TokenTableRow>
    </tbody>
  </table>
</template>

<script>
import { mapGetters } from "vuex";
import TokenTableRow from "./TokenTableRow";

export default {
  components: {
    TokenTableRow,
  },
  computed: {
    ...mapGetters(["tokenizedSentence"]),
  },
};
</script>

<style></style>
