<!-- PicsAside.vue -->
<!-- Displays the aside on the home wiew (contains the three wiewß) -->

<template>

  <div id="pics-aside">

    <div class="tree">
      <h2>Evénements</h2>
      <el-tree
        :data="events"
        :props="TreeProps"
        @node-click="handleNodeClick"/>
    </div>

    <div class="button">
      <el-button
        size="mini"
        @click="updateLibrary()">
        <i class="el-icon-upload"/> Mettre a jour la librairie
      </el-button>
    </div>

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

    },

    // send a request to the main process to update the library
    updateLibrary () {

      // sent request to the main
      this.$electron.ipcRenderer.send('updatePicsLibrary')

      // display a succes message when the main respond
      this.$electron.ipcRenderer.on('picsLibraryUpdated', (event, data) => {
        this.successMessage(data)
      })
      
    },

    // toggle a success notification message
    successMessage(msg) {
      this.$message(msg);
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
}

.tree {
  height: 93%;
  overflow: scroll;
}

.button {
  height: 7%;
}

.el-button {
  position: fixed;
  bottom: 20px;
}

.el-tree {
  background: transparent;
}

h2 {
  margin: 0px;
}

</style>
