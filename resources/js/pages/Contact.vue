<template>
  <div class="container mx-auto max-w-lg px-4 py-32 text-left md:max-w-none md:text-center">
    <h1 class="text-left text-5xl font-extrabold leading-10 tracking-tight text-gray-900 sm:leading-none md:text-center md:text-6xl lg:text-7xl">
      <span class="inline md:block">Contact</span>
    </h1>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$emit("setLayout", "Guest");
  }
};
</script>
