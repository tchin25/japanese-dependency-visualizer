<template>
  <table class="table">
    <thead>
      <th>Tokenized</th>
      <th>Parent</th>
    </thead>
    <tbody>
      <TokenTableRow
        @row-change="updateSentence"
        v-for="(token, index) in tokenizedSentence.slice(0, -1)"
        :token="token"
        :index="index"
        :key="index"
      >
      </TokenTableRow>
      <tr v-if="tokenizedSentence.length > 0">
        <td>
          {{ tokenizedSentence[tokenizedSentence.length - 1] }}
        </td>
        <td>
          Root Node
        </td>
      </tr>
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
  data() {
    return {
      sentenceFlow: [],
    };
  },
  computed: {
    ...mapGetters(["tokenizedSentence"]),
  },
  methods: {
    updateSentence({ index, id, label, parentIndex, parentId }) {
      console.log("sentence updated");
      // TODO: remove children
      this.sentenceFlow[parentIndex].children.push(id);
    },
  },
  watch: {
    tokenizedSentence: {
      handler: function(newTokenizedSentence) {
        this.sentenceFlow = newTokenizedSentence.map((token, index) => {
          return {
            id: newTokenizedSentence.length - index - 1,
            label: token,
            children: [],
          };
        });
      },
      immediate: true,
    },
  },
};
</script>

<style></style>
