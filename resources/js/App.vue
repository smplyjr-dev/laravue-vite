<template>
  <component :is="layout" @setLayout="layout = layouts[$event]" />
</template>

<script>
// load layout components dymagically
const context = require.context("/resources/js/layouts", false, /.*\.vue$/);
const layouts = context
  .keys()
  .map((file) => [file.replace(/(^.\/)|(\.vue$)/g, ""), context(file)])
  .reduce((components, [name, component]) => {
    components[name] = component.default || component;
    return components;
  }, {});

export default {
  provide: {
    $_: window._,
    $APP: window.$APP
  },
  data: () => ({
    layouts,
    layout: layouts.Empty
  })
};
</script>
