<!-- PhotoCard.vue -->
<!-- Displays the aside on the home wiew (contains the three wiewß) -->

<template>
  <div id="photo-card">
    <p>{{ name }}</p>
    <img :src="url">
  </div>
</template>

<script>

export default {
  name: "PhotoCard",
  props: {
    url: "",
    name: ""
  }
}

</script>

<style lang="scss" scoped>

#photo-card {
  box-sizing: border-box;
  padding: 10px;
}

</style>
