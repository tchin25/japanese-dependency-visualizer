<template>
  <the-header />
  <router-view />
</template>
<script>
import TheHeader from "@/components/TheHeader";

export default {
  components: { TheHeader },
};
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
