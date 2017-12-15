<!-- PicsNav.vue -->
<!-- Displays the home page of the app -->

<template>
  <div id="pics-nav">
    <el-row>
    
      <el-col :span="6">
        <img class="app-logo" src="../../assets/img/logo.svg">
      </el-col>

      <el-col :span="7">
        <el-input placeholder="Search" v-model="searchField"></el-input>
      </el-col>

      <el-col :span="2">
        <el-button type="info" icon="el-icon-search" @click="search" plain></el-button>
      </el-col>

      <el-col :span="9">
        <el-button-group>
          <el-button type="info" icon="el-icon-edit" plain></el-button>
          <el-button type="info" icon="el-icon-tickets" plain></el-button>
          <el-button type="info" icon="el-icon-star-on" plain></el-button>
          <el-button type="info" icon="el-icon-location" plain></el-button>
        </el-button-group>
      </el-col>

    </el-row>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'

export default {
  name: "PicsNav",
  data() {
    return {
      searchField: ""
    }
  },
  methods: {
    // send a search query to the main process
    search () {

      ipcRenderer.send('searchPics', this.searchField)

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
