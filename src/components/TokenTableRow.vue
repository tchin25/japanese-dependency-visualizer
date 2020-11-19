<template>
  <tr>
    <td>{{ token }}</td>
    <td>
      <div class="select">
        <select v-model="value" @change="onChange">
          <option :value="-1">None</option>
          <option
            v-for="(token, _index) in tokenizedSentence"
            :key="_index"
            :disabled="index == _index"
            :value="_index"
          >
            {{ token }}
          </option>
        </select>
      </div>
    </td>
  </tr>
</template>

<script>
import { mapGetters } from "vuex";

export default {
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
      console.log("row changed");
      // Invert index for id because we want to work backwards
      this.$emit("row-change", {
        index: this.index,
        id: this.tokenizedSentence.length - this.index - 1,
        label: this.token,
        parentIndex: this.value,
        parentId: this.tokenizedSentence.length - this.value - 1,
      });
    },
  },
};
</script>

<style></style>
