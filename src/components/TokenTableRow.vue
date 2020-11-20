<template>
  <tr>
    <td>{{ token }}</td>
    <td>
      <div class="select">
        <select v-model="value" @change="onChange">
          <option :value="-1">None</option>
          <template v-for="(token, _index) in tokenizedSentence" :key="_index">
            <!-- Can't filter array since we need to keep indexes intact so replaced with v-if -->
            <option v-if="index < _index" :value="_index">
              {{ token }}
            </option>
          </template>
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
      this.$emit("row-change", {
        index: this.index,
        parentIndex: this.value,
      });
    },
  },
};
</script>

<style></style>
