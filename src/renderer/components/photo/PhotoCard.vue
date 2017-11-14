<!-- PhotoCard.vue -->
<!-- Displays the aside on the home wiew (contains the three wiewß) -->

<template>
  <div id="photo-card">
    <div class="photo-box">
      <img :src="url">
    </div>
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
  padding: 20px;

  width: 100%;
  max-height: 160px;

  .photo-box {
    box-sizing: border-box;
    width: 100%;
    height: 120px;

    overflow: hidden;

    img {
      box-sizing: border-box;
      width: 100%;
    }
  }
}

</style>
