<!-- - - - - - - - - - - - - - - - - - - - -->
<!-- ConfigureApp.vue                      -->
<!-- Configuration on the app              -->
<!-- - - - - - - - - - - - - - - - - - - - -->

<template>
  <div
    id="configureApp"
    v-loading="loading">

    <div class="text">

      <h1>Configuration de PICS</h1>
      <p>
        Pour utiliser PICS, il vous faut configurer le dossier dans lequel votre bibliothèque est sauvegardée.
      </p>

      <el-button
        @click="openDialog()"
        type="primary"
        round>
        Selectionner un doosier
      </el-button>

      <p>Dossier choisi : {{ path }}</p>
      <p><strong>Informations :</strong></p>

      <p>PICS sauvegarderas toutes les métadonnées des photos dans votre bibliothèque, il est donc<br>
        si vous copiez le doosier contanant votre bibiothèque sur une autre machine, il sera possible<br>
        de récuperer toutes les infos en configurant PICS dans le bon doosier.
      </p>

      <el-button
        @click="configure()"
        type="primary"
        round>
        Valider mon choix
      </el-button>

      <p>Cette opération peut durer plusieurs minutes.</p>

    </div>
  </div>

</template>



<script>

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
      this.$electron.ipcRenderer.send('openFolderDialog')

      // when the main respnds
      this.$electron.ipcRenderer.on('dialogFilePath', (event, data) => {
        // store the selected path
        data ? this.path = data[0] : this.path = 'non spécifié'
      })

    },

    // called to run the app configuration
    configure () {

      // check the specified path
      if (this.path == 'aucun' || this.path == 'non spécifié') {

        // if the path is not spécified, show a warning message
        this.message({
          message: 'Chemin spécifié non valide.',
          type: 'warning'
        })

      } else {

        // display loader during the prosessing
        this.loading = true
  
        // send a message ton main -> to start the importation process
        this.$electron.ipcRenderer.send('startImportingPhotos')
  
        // wait a response from the main when the importation proscess is finish
        this.$electron.ipcRenderer.on('inportingPhotosFinish', (event, data) => {
  
          // Close the loading layer
          this.loading = false
          console.log(data)
  
          // redirect to the main page of pics app
          this.$router.push('/')

        })

      }
    },

        // toggle a success notification message
    message(msg) {
      this.$message(msg);
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
