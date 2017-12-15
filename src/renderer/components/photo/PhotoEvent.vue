<!-- PhotoEvent.vue -->
<!-- Displays the aside on the home wiew (contains the three wiewß) -->

<template>
  <div id="photo-event">
    <h2 :id="title">{{ title }}</h2>
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
