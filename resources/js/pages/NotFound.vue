<template>
  <div class="container mx-auto max-w-7xl">Not Found</div>
</template>

<script>
export default {
  mounted() {
    this.$emit("setLayout", "Guest");
  }
};
</script>
