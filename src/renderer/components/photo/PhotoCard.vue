<!-- PhotoCard.vue -->
<!-- Displays the aside on the home wiew (contains the three wiewß) -->

<template>
  <div id="photo-card">
    <div class="photo-box">
      <img :src="url">
      <div class="overlay" @click="displayDetails">
          <div class="text">{{name}}</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "PhotoCard",
  props: {
    url: "",
    name: ""
  },
  methods: {
    displayDetails () {
      this.$router.push('/picsDetails')
    }
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
    position: relative;
    cursor: pointer;

    img {
    box-sizing: border-box;
    width: 100%;
    display:table-cell;
    position: absolute;
    margin: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    }
  }
}

.image {
    display: block;
    width: 100%;
    height: auto;
}

.overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0,0,0,0.5);
    overflow: hidden;
    width: 100%;
    height: 0;
    transition: .5s ease;
}

.photo-box:hover .overlay {
    height: 100%;
}

.text {
    white-space: nowrap;
    color: white;
    font-size: 20px;
    position: absolute;
    overflow: hidden;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
}

</style>
