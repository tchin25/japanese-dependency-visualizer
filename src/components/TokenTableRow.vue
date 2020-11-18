<template>
  <tr>
    <td>{{ token }}</td>
    <td>
      <div class="select">
        <select>
          <option disabled value="">Select Parent</option>
          <option
            v-for="(token, _index) in tokenizedSentence"
            :key="_index"
            :disabled="index == _index"
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
  mounted() {},
  computed: {
    ...mapGetters(["tokenizedSentence"]),
  },
};
</script>

<style></style>
