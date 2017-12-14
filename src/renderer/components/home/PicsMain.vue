<!-- PicsMain.vue -->
<!-- Displays the aside on the home wiew (contains the three wiewß) -->

<template>
  <div id="pics-main">

    <!-- Display a separator for every locations -->
    <div v-for="place in myPhotos" :key="place.id">
      <el-row>
        <el-col :span="24">
          <photo-event :title="place.name"></photo-event>
        </el-col>
      </el-row>

      <!-- Display the photos of the event -->
      <el-row class="photos">
        <el-col v-for="photo in place.children" :key="photo.id" :xs="12" :sm="8" :md="6" :lg="4" :xl="4">
          <photo-card :url="'file://' + photo.path" :name="photo.name"></photo-card>
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
  mounted: function () {

    this.getLibraryTree()

  },
  methods: {

    // get the complete tree of the library
    getLibraryTree () {

      ipcRenderer.send('getLibraryTree')

      // when the main respnds
      ipcRenderer.on('libraryTree', (event, data) => {
        // store the selected path
        this.myPhotos = data
      })

    }

  }
}

</script>

<style lang="scss" scoped>

#pics-main {
  height: 100%;
  background-color: $cloud;
  overflow: scroll;
}

.photos {
  //box-sizing: border-box;
  background-color: $lighter;
}

</style>
