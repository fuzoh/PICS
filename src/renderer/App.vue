<!-- App.vue -->
<!-- Global componennet, all the components are injected here by the router -->

<template>
  <div id="app">
    <!-- Inject the correspondig wiew -->
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'pics'
}

</script>

<style lang="scss">

// Global rules for the app
* {
  font-family: "Helvetica Neue", Helvetica, Arial;
}

html {
  min-height: 100%;
  width: 100%;
}

body {
  height: 100%;
  width: 100%;

  margin: 0px;
  padding: 0px;
}

#app {
  height: 100%;
  width: 100%;
}

</style>
