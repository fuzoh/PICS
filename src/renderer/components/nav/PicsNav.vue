<!-- PicsNav.vue -->
<!-- Displays the home page of the app -->

<template>
  <div id="pics-nav">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1"><img class="app-logo" src="../../assets/img/text.svg"></el-menu-item>
      <el-menu-item index="2">Processing Center</el-menu-item>
      <el-menu-item index="3">Hehe</el-menu-item>
    </el-menu>
  </div>
</template>

<script>

export default {
  name: "PicsNav",
  data() {
    return {
      activeIndex: '1'
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}

</script>

<style lang="scss" scoped>

.app-logo {
  height: 50px;
}

</style>
