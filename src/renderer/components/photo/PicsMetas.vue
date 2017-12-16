<!-- PicsMetas.vue -->
<!-- Displays the aside on the home wiew (contains the three wiewß) -->

<template>
  <div id="picsMetas">
    <h4>Nom :</h4>
    <el-input placeholder="Nom de la photo" v-model="pics.name" clearable>
    </el-input>
    <h4>Date :</h4>
    <el-input placeholder="Date de prise de vue" v-model="pics.date" clearable>
    </el-input>
    <h4>Lieux :</h4>
    <el-input placeholder="Lieux" v-model="pics.places" clearable>
    </el-input>
    <h4>Description :</h4>
    <el-input type="textarea" :rows="2" placeholder="Description" v-model="pics.description"></el-input>
    <h4>Favoris :</h4>
    <el-button type="info" @click="starr()" :icon="starIcon" plain></el-button>
    <div id="tags">
      <h4>Tags :</h4>
      <el-tag :key="tag" v-for="tag in pics.tags" closable :disable-transitions="false" @close="handleClose(tag)">{{tag}}</el-tag>
      <el-input class="input-new-tag" v-if="inputTagVisible" v-model="inputTagValue" ref="saveTagInput" size="mini" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm"></el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
    </div>
    <el-button type="warning" @click="savePics()">Enregistrer les informations</el-button>
  </div>
</template>


<script>
export default {
  name: "picsMetas",
  data (){
    return{
      inputTagVisible: false,
      inputTagValue:''
    };
  },
  props: {
    pics: {}
  },
  computed: {
    // This function return the right icon name if the pics is starred
    starIcon () {
      if (this.pics.starred == 0) {
        return 'el-icon-star-off'
      } else {
        return 'el-icon-star-on'
      }
    },
  },
  methods: {
    // delete the tag if we click on the close icon
    handleClose(tag) {
      this.pics.tags.splice(this.pics.tags.indexOf(tag), 1);
    },

    // display the input if we click on the new tag button
    showInput() {
      this.inputTagVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    // create the tag wen we press the enter key
    handleInputConfirm() {
      let inputTagValue = this.inputTagValue;
      if (inputTagValue) {
        this.pics.tags.push(inputTagValue);
      }
      this.inputTagVisible = false;
      this.inputTagValue = '';
    },

    // modify the strred value of the pics wen we click on the star button
    starr () {
      if (this.pics.starred == 1) {
        this.pics.starred = 0
      } else {
        this.pics.starred = 1
      }
    },

    // make a request to the main process to save the submited pics datas
    savePics () {
      this.$electron.ipcRenderer.send('editPicsDatas', this.pics)
    }
  }
}

</script>


<style lang="scss" scoped>

#picsMetas {
  box-sizing: border-box;
  height: 100%;
  padding: 20px;
  background-color: $light;
  overflow: scroll;
}

h4 {
  margin-top: 10px;
  margin-bottom: 10px;
}

.el-tag{
  margin-right: 10px;
  margin-top:10px;
}
.button-new-tag {
  height: 32px;
  margin-top:10px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-top:10px;
}

#tags
{
  margin-top: 15px;
  margin-left: 0;
  margin-bottom: 15px;
}

</style>
