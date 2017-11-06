<!-- PhotoEvent.vue -->
<!-- Displays the aside on the home wiew (contains the three wiewß) -->

<template>
  <div id="photo-event">
    <h2>{{ title }}</h2>
    <p>Du 24.06.17 au 27.06.18</p>
  </div>
</template>

<script>

export default {
  name: "PhotoEvent",
  props: {
    title: ""
  }
}

</script>

<style lang="scss" scoped>

#photo-event {
  padding: 20px;
  background-color: $light;
}

h2 {
  margin: 0px;
}

p {
  margin: 0px;
}

</style>
