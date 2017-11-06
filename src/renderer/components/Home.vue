<!-- Home.vue -->
<!-- Displays the home page of the app -->

<template>
  <div id="home">
    <el-container>
      <el-header>
        <pics-nav></pics-nav>
      </el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import PicsNav from './nav/PicsNav.vue'

export default {
  name: "Home",
  components: { PicsNav }
}

</script>

<style lang="scss" scoped>

.el-header {
  padding: 0px;
}

</style>
