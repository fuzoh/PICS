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
          <el-col :span="5">
            <pics-aside></pics-aside>
          </el-col>
          <el-col :span="19">
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
}

.el-header {
  padding: 0px;
}

.el-row {
  width: 100%;
}

</style>
