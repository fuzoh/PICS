<!-- PicsMain.vue -->
<!-- Displays the aside on the home wiew (contains the three wiewß) -->

<template>
  <div id="pics-main">

    <!-- Display a separator for every locations -->
    <div v-for="place in myPhotos" :key="place.id">
      <el-row>
        <el-col :span="24">
          <photo-event :title="place.title"></photo-event>
        </el-col>
      </el-row>

      <!-- Display the photos of the event -->
      <el-row class="photos">
        <el-col v-for="photo in place.children" :key="photo.id" :xs="12" :sm="8" :md="6" :lg="4" :xl="4">
          <photo-card :pics="photo"></photo-card>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
import { ipcRenderer } from 'electron'

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

      ipcRenderer.send('getLibraryTree')

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
