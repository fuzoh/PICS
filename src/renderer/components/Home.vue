<!-- Home.vue -->
<!-- Displays the home page of the app -->

<template>
  <div id="home">
    <el-container>
      <el-header>
        <pics-nav></pics-nav>
      </el-header>
      <el-container>
        <el-row>
          <el-col class="max-height" :span="6">
            <pics-aside></pics-aside>
          </el-col>
          <el-col class="max-height" :span="18">
            <pics-main></pics-main>
          </el-col>
        </el-row>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import PicsNav from './nav/PicsNav.vue'
import PicsAside from './home/PicsAside.vue'
import PicsMain from './home/PicsMain.vue'

export default {
  name: "Home",
  components: { PicsNav, PicsAside, PicsMain }
}

</script>

<style lang="scss" scoped>

#home {
  height: 100%;
  width: 100%;
}

.el-container {
  height: 100%;
}

.el-header {
  padding: 0px;
}

.el-row {
  width: 100%;
}

.max-height {
  height: 100%;
}

</style>
