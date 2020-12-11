<template>
  <div class="select">
    <select @change="$emit('flow-change', $event.target.value)">
      <option :value="1">
        Compacted Sentence Flow
      </option>
      <option :value="0">
        Sentence Flow
      </option>
      <option :value="2">
        Levels Flow
      </option>
    </select>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
