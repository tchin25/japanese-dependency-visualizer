<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <h1 class="navbar-item title mb-0 is-hidden-touch">
        Japanese Dependency Visualizer
      </h1>
      <h1 class="navbar-item mb-0 is-hidden-desktop">
        Japanese Dependency Visualizer
      </h1>

      <a
        role="button"
        class="navbar-burger burger"
        :class="isActive ? 'is-active' : ''"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarItems"
        @click="isActive = !isActive"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div
      id="navbarItems"
      class="navbar-menu"
      :class="isActive ? 'is-active' : ''"
    >
      <div class="navbar-end">
        <router-link to="/" class="navbar-item">Home</router-link>
        <router-link to="/about" class="navbar-item">About</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isActive: false,
    };
  },
};
</script>

<style scoped lang="scss">
.navbar {
  border-bottom: 1px solid lightgray;
}
</style>
