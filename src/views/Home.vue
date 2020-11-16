<template>
  <SentenceInput />
  <TokenTable />
</template>

<script>
// @ is an alias to /src
import SentenceInput from "@/components/SentenceInput.vue";
import TokenTable from "@/components/TokenTable.vue";

export default {
  name: "Home",
  components: { SentenceInput, TokenTable },
};
</script>
