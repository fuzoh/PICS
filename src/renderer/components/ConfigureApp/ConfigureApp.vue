<!-- - - - - - - - - - - - - - - - - - - - -->
<!-- ConfigureApp.vue                      -->
<!-- Configuration on the app              -->
<!-- - - - - - - - - - - - - - - - - - - - -->

<template>
  <div id="configureApp">
    <div class="text">
      <h1>Configuration de PICS</h1>
      <p>Pour utiliser PICS, il vous faut configurer le dossier dans lequel votre bibliothèque est sauvegardée.</p>
      <el-button @click="openDialog()" type="primary" round>Selectionner un doosier</el-button>
      <p><strong>Informations :</strong></p>
      <p>PICS sauvegarderas toutes les métadonnées des photos dans votre bibliothèque, il est donc<br>
      si vous copiez le doosier contanant votre bibiothèque sur une autre machine, il sera possible<br>
      de récuperer toutes les infos en configurant PICS dans le bon doosier</p>
      <el-button @click="configure()" type="primary" round>Valider mon choix</el-button>
    </div>
  </div>
</template>

<script>
import { dialog } from 'electron'
console.log(dialog)
export default {
  name: "ConfigureApp",
  methods: {
    openDialog () {
      console.log('tut')
      dialog.showOpenDialog({
        properties: ['openDirectory'],
      }, (path) => {
        console.log(path)
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
    padding-top: 40px;
    text-align: center;

    h1 {
      margin: 0px;
    }
  }
}

</style>
