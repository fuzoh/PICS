<!-- PicsMain.vue -->
<!-- Displays the aside on the home wiew (contains the three wiewß) -->

<template>

  <div id="pics-main">

    <!-- iterates on all the events (folder of pics) -->
    <div
      v-for="place in myPhotos"
      :key="place.id">

      <!-- Display a separator for every locations -->
      <el-row>
        <el-col :span="24">
          <photo-event :title="place.title"/>
        </el-col>
      </el-row>

      <!-- Display all the photos of the event -->
      <el-row class="photos">
        <el-col
          v-for="photo in place.children"
          :key="photo.id"
          :xs="12"
          :sm="8"
          :md="6"
          :lg="4"
          :xl="4">

          <photo-card :pics="photo"/>

        </el-col>
      </el-row>

    </div>

  </div>

</template>



<script>

import PhotoCard from '../photo/PhotoCard.vue'
import PhotoEvent from '../photo/PhotoEvent.vue'

export default {
  name: "PicsMain",
  components: { PhotoCard, PhotoEvent },
  data() {
    return {
      myPhotos: {}
    }
  },
  beforeRouteUpdate (to, from, next) {
    // just use `this`
    this.getLibraryTree()
    next()
  },
  methods: {

    // get the complete tree of the library
    getLibraryTree () {

      this.$electron.ipcRenderer.send('getLibraryTree')

    }

  },
  mounted () {
    this.$electron.ipcRenderer.on('libraryTree', (event, data) => {
      this.myPhotos = data
      console.warn(data)
    })
  }
}

</script>

<style lang="scss" scoped>

#pics-main {
  height: 100%;
  background-color: $cloud;
  overflow: scroll;
  background-color: $lighter;
}

.photos {
  //box-sizing: border-box;
  background-color: $lighter;
}

</style>
