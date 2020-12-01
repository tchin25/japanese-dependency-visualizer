<template>
  <tr>
    <td>{{ token }}</td>
    <td>
      <div class="select is-fullwidth">
        <select v-model="value" @change="onChange">
          <option :value="-1">None</option>
          <!-- Filter array to only show possible parents -->
          <template
            v-for="token in sentenceFlow.filter(
              (token, parentIndex) => index < parentIndex
            )"
            :key="token[0].id"
          >
            <option :value="token[0].id">
              {{ token[0].label }}
            </option>
          </template>
        </select>
      </div>
    </td>
  </tr>
</template>

<script>
import { mapGetters } from "vuex";
import { useState } from "@/api/sentenceFlow";

export default {
  setup() {
    const { sentenceFlow } = useState();
    return { sentenceFlow };
  },
  props: {
    token: {
      required: true,
      type: String,
    },
    id: {
      required: true,
      type: Number,
    },
    index: {
      required: true,
      type: Number,
    },
  },
  data() {
    return {
      value: -1,
    };
  },
  mounted() {},
  computed: {
    ...mapGetters(["tokenizedSentence"]),
  },
  methods: {
    onChange() {
      // Find parent index
      // We can't get the index from the select tag because index could change at any time
      let parentIndex = this.sentenceFlow.findIndex((el) => {
        el[0].id === this.value;
      });

      this.$emit("row-change", {
        id: this.id,
        index: this.index,
        parentId: this.value,
        parentIndex,
      });
    },
  },
};
</script>

<style></style>
