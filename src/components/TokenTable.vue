<template>
  <table class="table">
    <thead>
      <th>Tokenized</th>
      <th>Parent</th>
    </thead>
    <tbody>
      <TokenTableRow
        @row-change="updateSentence"
        v-for="(token, index) in sentenceFlow.slice(0, -1)"
        :token="token[0].label"
        :id="token[0].id"
        :index="index"
        :key="index"
      >
      </TokenTableRow>
      <tr v-if="sentenceFlow.length > 0">
        <td>
          {{ sentenceFlow[sentenceFlow.length - 1][0].label }}
        </td>
        <td>
          Root Node
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import TokenTableRow from "./TokenTableRow";
import { useState } from "@/api/sentenceFlow";

export default {
  setup() {
    const { sentenceFlow, sortTokenChildren } = useState();
    return { sentenceFlow, sortTokenChildren };
  },
  components: {
    TokenTableRow,
  },
  methods: {
    updateSentence({ id, index, parentId, parentIndex }) {
      console.log("sentence updated");

      // Flatten array of array of objects into array of objects
      let flattened = this.sentenceFlow.flat();

      // Add child to parent
      if (parentIndex >= 0) {
        flattened[parentIndex].children.push(id);

        // Sort children descending flow order
        this.sortTokenChildren(flattened[parentIndex]);
      }

      // Remove child from former parent
      let formerParent = flattened.find(
        (el) => flattened[index].parentId === el.id
      );

      if (formerParent) {
        formerParent.children = formerParent.children.filter((i) => i != id);
      }

      // Replace child's parent parameter
      flattened[index].parentId = parentId;
    },
  },
};
</script>

<style></style>
