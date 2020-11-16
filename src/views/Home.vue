<template>
  <SentenceInput />
  <TokenTable />
  <DependencyVisualizer />
</template>

<script>
// @ is an alias to /src
import SentenceInput from "@/components/SentenceInput.vue";
import TokenTable from "@/components/TokenTable.vue";
import DependencyVisualizer from "@/components/DependencyVisualizer.vue";

export default {
  name: "Home",
  components: { SentenceInput, TokenTable, DependencyVisualizer },
};
</script>
