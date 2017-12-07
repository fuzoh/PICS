<!-- PicsMetas.vue -->
<!-- Displays the aside on the home wiew (contains the three wiewß) -->

<template>
  <div id="picsMetas">
    <h4>Nom :</h4><label>Vacances_Israel</label>
    <h4>Date :</h4><label>32 Jancembre 1896</label>
    <h4>Description :</h4>
    <el-input type="textarea" :rows="2" placeholder="Description" v-model="textarea"></el-input>
    <h4>Evaluation :</h4>
    <el-rate
        v-model="value3"
        :texts="['oops', 'disappointed', 'normal', 'good', 'great']"
        show-text>
    </el-rate>

    <!--<el-tag
      :key="tag"
      v-for="tag in dynamicTags"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)">
      {{tag}}
    </el-tag>
    <el-input
      class="inut-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="mini"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    >
    </el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showinput">+ New Tag </el-button>-->
  </div>
</template>

<script>
export default {
  name: "picsMetas",

  /*data (){
    return{
      value3:null
      dynamicTags['Tag 1', 'Tag 2', 'Tag 3'],
      inputVisible:false,
      inputValue:''
    };
  },
  methods:{
    handleClose(tag){
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput(){
      this.inputValue = true;
      this.$nextTick(_=> {
          this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm(){
      let inputValue = this.inputValue;
      if(inputValue){
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    }
  }*/
}
</script>

<style lang="scss" scoped>

#picsMetas {
  box-sizing: border-box;
  height: 500px;
  padding: 20px;
  background-color: $light;
}

.el-tag + .el-tag{
  margin-left:10px;
}

.button-new-tag{
  margin-left:10px;
  height:32px;
  line-height:30;
  padding-top:0;
  padding-bottom:0;
}

.input-new-tag
{
  width:90px;
  margin-left: 10px;
  vertical-align: bottom;
}

</style>
