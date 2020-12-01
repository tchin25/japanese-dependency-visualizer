<template>
  <tr>
    <td>{{ token }}</td>
    <td>
      <div class="select is-fullwidth">
        <select v-model="value" @change="onChange">
          <option :value="-1">None</option>
          <template v-for="(token, _index) in sentenceFlow" :key="_index">
            <!-- Can't filter array since we need to keep indexes intact so replaced with v-if -->
            <option v-if="index < _index" :value="_index">
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
    const {sentenceFlow} = useState();
    return { sentenceFlow };
  },
  props: {
    token: {
      required: true,
      type: String,
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
      this.$emit("row-change", {
        index: this.index,
        parentIndex: this.value,
      });
    },
  },
};
</script>

<style></style>
