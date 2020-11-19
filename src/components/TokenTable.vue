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
import { unref } from "vue";

export default {
  inject: ["sentenceFlow"],
  components: {
    TokenTableRow,
  },
  computed: {
    ...mapGetters(["tokenizedSentence"]),
  },
  methods: {
    updateSentence({
      index: childIndex,
      id: childId,
      label,
      parentIndex,
      parentId,
    }) {
      console.log("sentence updated");

      // Flatten array of array of objects into array of objects
      let flattened = this.sentenceFlow.value.flat();

      // Add child to parent
      flattened[parentIndex].children.push(childId);

      // Remove child from former parent
      let formerParentIndex = flattened[childIndex].parent;
      if (formerParentIndex >= 0) {
        flattened[formerParentIndex].children = flattened[
          formerParentIndex
        ].children.filter((i) => i != childIndex);
      }

      // Replace child's parent parameter
      flattened[childIndex].parent = parentIndex;
    },
  },
  watch: {
    tokenizedSentence: {
      handler: function(newTokenizedSentence) {
        console.log("handler called");
        console.log(this.sentenceFlow.value);
        this.sentenceFlow.value = newTokenizedSentence.map((token, index) => {
          return [
            {
              id: newTokenizedSentence.length - index - 1,
              label: token,
              children: [],
              parent: -1,
            },
          ];
        });
      },
      immediate: true,
    },
  },
};
</script>

<style></style>
