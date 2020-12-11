<template>
  <tr>
    <td class="hide-overflow">
      {{ label }}
    </td>
    <td>
      <div class="select is-small is-fullwidth">
        <select v-model="innerValue" @change="onChange">
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
import { useState } from "@/api/sentenceFlow";

export default {
  setup() {
    const { sentenceFlow } = useState();
    return { sentenceFlow };
  },
  props: {
    label: {
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
    value: {
      default: -1,
      type: Number,
    },
  },
  data() {
    return {
      innerValue: this.value,
    };
  },
  watch: {
    value() {
      this.innerValue = this.value;
    },
  },
  methods: {
    onChange() {
      // Find parent index
      // We can't get the index from the select tag because index could change at any time
      let parentIndex = this.sentenceFlow.findIndex(
        (el) => el[0].id === this.innerValue
      );

      this.$emit("row-change", {
        id: this.id,
        index: this.index,
        parentId: this.innerValue,
        parentIndex,
      });
    },
  },
};
</script>

<style></style>
