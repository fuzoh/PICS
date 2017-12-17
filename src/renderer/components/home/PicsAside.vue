<!-- PicsAside.vue -->
<!-- Displays the aside on the home wiew (contains the three wiewß) -->

<template>

  <div id="pics-aside">

    <h2>Locations</h2>
    <el-tree
      :data="events"
      :props="TreeProps"
      @node-click="handleNodeClick"/>

  </div>

</template>

<script>

export default {
  // component name
  name: "PicsAside",

  // component datas used by the element ui tree view
  data() {
    return {
      events: [],
      TreeProps: {
        children: 'children',
        label: 'name'
      }
    }
  },

  // executed when the component is mounted
  mounted: function () {

    this.getLibraryTree()

  },

  // methods for the component
  methods: {

    // get the complete tree of the library from the main process
    getLibraryTree () {

      this.$electron.ipcRenderer.send('getLibraryTree')

      // when the main responds
      this.$electron.ipcRenderer.on('libraryTree', (event, data) => {

        this.events = data
        
      })

    },

    // when we click on an element in the tree view
    handleNodeClick(data) {

      // if its a pics
      if (data.type == 'pics') {

        // store the pics in the actual edited pics
        this.$store.commit('PICS_SET_EDITED', data)
        // and open the editing page
        this.$router.push('/picsDetails')
      
      } else {

        // if its not a pics, scroll to the event tag
        let el = document.getElementById(data.title)
        el.scrollIntoView()

      }

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
