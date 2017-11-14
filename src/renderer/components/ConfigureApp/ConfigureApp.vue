<!-- - - - - - - - - - - - - - - - - - - - -->
<!-- ConfigureApp.vue                      -->
<!-- Configuration on the app              -->
<!-- - - - - - - - - - - - - - - - - - - - -->

<template>
  <div id="configureApp" v-loading="loading">
    <div class="text">
      <h1>Configuration de PICS</h1>
      <p>Pour utiliser PICS, il vous faut configurer le dossier dans lequel votre bibliothèque est sauvegardée.</p>
      <el-button @click="openDialog()" type="primary" round>Selectionner un doosier</el-button>
      <p>Dossier choisi : {{ path }}</p>
      <p><strong>Informations :</strong></p>
      <p>PICS sauvegarderas toutes les métadonnées des photos dans votre bibliothèque, il est donc<br>
      si vous copiez le doosier contanant votre bibiothèque sur une autre machine, il sera possible<br>
      de récuperer toutes les infos en configurant PICS dans le bon doosier.</p>
      <el-button @click="configure()" type="primary" round>Valider mon choix</el-button>
      <p>Cette opération peut durer plusieurs minutes.</p>
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'

export default {
  name: "ConfigureApp",
  data () {
    return {
      loading: false,
      path: "aucun"
    }
  },
  methods: {

    // called to select a folder for the PICS library
    openDialog () {
      // send to main a message to open dialog
      ipcRenderer.send('openFolderDialog')

      // when the main respnds
      ipcRenderer.on('dialogFilePath', (event, data) => {
        // store the selected path
        this.path = data[0]
      })

    },

    // called to run the app configuration
    configure () {

      // display loader during the prosessing
      this.loading = true

      // send a message ton main -> to start the importation process
      ipcRenderer.send('startImportingPhotos')

      // wait a response from the main when the importation proscess is finish
      ipcRenderer.on('inportingPhotosFinish', (event, data) => {

        // Close the loading layer
        this.loading = false

        // redirect to the main page of pics app
        this.$router.push('/')

      })

    }
  }
}
</script>

<style lang="scss" scoped>

#configureApp {
  height: 100%;
  width: 100%;
  background-color: $lighter;

  .text {
    padding-top: 80px;
    text-align: center;

    h1 {
      margin: 0px;
    }
  }
}

</style>
