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
import { mapGetters } from "vuex";
import TokenTableRow from "./TokenTableRow";
import { useState } from "@/api/sentenceFlow";

export default {
  setup() {
    const { sentenceFlow } = useState();
    return { sentenceFlow };
  },
  components: {
    TokenTableRow,
  },
  computed: {
    ...mapGetters(["tokenizedSentence"]),
  },
  methods: {
    updateSentence({ id, index, parentId, parentIndex }) {
      console.log("sentence updated");

      // Flatten array of array of objects into array of objects
      let flattened = this.sentenceFlow.value.flat();

      // Add child to parent
      if (parentIndex >= 0) {
        flattened[parentIndex].children.push(id);
        // Sort children descending order
        flattened[parentIndex].children.sort((a, b) => b - a);
      }

      // Remove child from former parent
      let formerParentIndex = flattened.findIndex((el) => {
        flattened[index].parentId === el.id;
      });
      if (formerParentIndex >= 0) {
        flattened[formerParentIndex].children = flattened[
          formerParentIndex
        ].children.filter((i) => i != id);
      }

      // Replace child's parent parameter
      flattened[index].parentId = parentId;
    },
  },
  watch: {
    // tokenizedSentence: {
    //   handler: function(newTokenizedSentence) {
    //     console.log("handler called");
    //     //TODO: merge flows
    //     console.log(this.sentenceFlow.value);
    //     this.sentenceFlow.value = newTokenizedSentence.map((token, index) => {
    //       return [
    //         {
    //           id: index,
    //           label: token,
    //           children: [],
    //           parentIndex: -1,
    //         },
    //       ];
    //     });
    //   },
    //   immediate: true,
    // },
  },
};
</script>

<style></style>
