<!-- PicsAside.vue -->
<!-- Displays the aside on the home wiew (contains the three wiewß) -->

<template>
  <div id="pics-aside">
    <h2>Locations</h2>
    <el-tree :data="events" :props="TreeProps" @node-click="handleNodeClick"></el-tree>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'

export default {
  name: "PicsAside",
  data() {
    return {
      events: [],
      TreeProps: {
        children: 'children',
        label: 'title'
      }
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

        this.events = data
        
      })

    },

    // go to the element when we click on the tree view
    handleNodeClick(data) {
      let el = document.getElementById(data.title)
      el.scrollIntoView()
    }

  }
}

</script>

<style lang="scss" scoped>

#pics-aside {
  box-sizing: border-box;
  height: 100%;
  padding: 20px;
  background-color: $light;
  overflow: scroll;
}

.el-tree {
  background: transparent;
}

h2 {
  margin: 0px;
}

</style>
