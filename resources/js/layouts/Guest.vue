<template>
  <ul class="mb-2">
    <router-link :to="n.href" v-for="n in navs" :key="n.name">{{ n.name }}</router-link>
  </ul>

  <slot />
</template>

<script>
export default {
  inject: ["$_", "$APP"],
  data: () => ({
    navs: [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" }
    ]
  })
};
</script>
