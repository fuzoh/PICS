<!-- PicsNav.vue -->
<!-- Displays the home page of the app -->

<template>

  <div id="pics-nav">
    <el-row>
    
      <el-col :span="5">
        <img
          class="app-logo"
          src="../../assets/img/logo.svg">
      </el-col>

      <el-col :span="7">
        <el-input
          placeholder="Search"
          v-model="searchField"
          @keyup.enter.native="search"
          clearable>
          <i
            slot="prefix"
            class="el-input__icon el-icon-search"/>
        </el-input>
      </el-col>

      <el-col :span="3">
        <el-button-group>
          <el-button
            type="info"
            icon="el-icon-search"
            @click="search"
            plain/>
          <el-button
            type="info"
            icon="el-icon-circle-close"
            @click="reset"
            plain/>
        </el-button-group>
      </el-col>

      <el-col :span="9">
        <el-button-group>

          <el-button
            type="info"
            icon="el-icon-edit"
            @click="selectFilter('name')"
            :plain="!filters.name"/>
          <el-button
            type="info"
            icon="el-icon-location"
            @click="selectFilter('places')"
            :plain="!filters.places"/>
          <el-button
            type="info"
            icon="el-icon-tickets"
            @click="selectFilter('description')"
            :plain="!filters.description"/>
          <el-button
            type="info"
            icon="el-icon-star-on"
            @click="selectFilter('starred')"
            :plain="!filters.starred"/>
          <el-button
            type="info"
            icon="el-icon-picture"
            @click="selectFilter('panoramic')"
            :plain="!filters.panoramic"/>
          <el-button
            type="info"
            icon="el-icon-view"
            @click="selectFilter('peoples')"
            :plain="!filters.peoples"/>
          <el-button
            type="info"
            icon="el-icon-share"
            @click="selectFilter('tags')"
            :plain="!filters.tags"/>

        </el-button-group>
      </el-col>

    </el-row>
  </div>

</template>



<script>
export default {
  // component name
  name: "PicsNav",
  // component datas
  data() {
    return {
      searchField: "",
      filters: {
        name: false,
        places: false,
        description: false,
        starred: false,
        peoples: false,
        tags: false,
        panoramic: false
      }
    }
  },
  // component methods
  methods: {

    // change the value of the filter data when you click on a filter
    selectFilter (filter) {
      if (this.filters[filter] == true) {
        this.filters[filter] = false
      } else {
        this.filters[filter] = true
      }
    },

    // send a search query to the main process
    search () {

      this.$electron.ipcRenderer.send('searchPics', {needle: this.searchField, filters: this.filters})

    },

    // get all the pics if we reset the search
    reset () {

      this.$electron.ipcRenderer.send('getLibraryTree')

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
