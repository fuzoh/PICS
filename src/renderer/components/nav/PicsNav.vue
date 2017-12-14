<!-- PicsNav.vue -->
<!-- Displays the home page of the app -->

<template>
  <div id="pics-nav">
    <el-row>
    
      <el-col :span="6">
        <img class="app-logo" src="../../assets/img/logo.svg">
      </el-col>

      <el-col :span="7">
        <el-input placeholder="Search" v-model="searchField" @click="search"></el-input>
      </el-col>

      <el-col :span="2">
        <el-button type="info" icon="el-icon-search" plain></el-button>
      </el-col>

      <el-col :span="9">
        <el-button-group>
          <el-button type="info" icon="el-icon-edit" plain></el-button>
          <el-button type="info" icon="el-icon-share" plain></el-button>
          <el-button type="info" icon="el-icon-delete" plain></el-button>
          <el-button type="info" icon="el-icon-date" plain></el-button>
        </el-button-group>
      </el-col>

    </el-row>
  </div>
</template>

<script>

export default {
  name: "PicsNav",
  data() {
    return {
      searchField: ""
    }
  },
  methods: {
    search () {
      // serching in the pics datas
    }
  }
}

</script>

<style lang="scss" scoped>

#pics-nav {
  height: 60px;
}

.el-row {
  box-sizing: border-box;
  height: 60px;

  background-color: $extralight;
}

.el-col {
  box-sizing: border-box;
  height: 60px;
  padding: 10px;
}

.app-logo {
  height: 40px;
}

</style>
