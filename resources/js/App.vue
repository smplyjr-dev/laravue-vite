<template>
  <router-view></router-view>
</template>

<script>
export default {
  provide: {
    $_: window._,
    $APP: window.$APP
  }
};
</script>
