<!-- PicsDetails.vue -->
<!-- Displays the aside on the home wiew (contains the three wiewß) -->

<template>
  <div id="picsDetails">
    <el-container class="full">
      <el-header class="title">
        <el-row>
          <el-col :span="2">
            <el-button type="info" icon="el-icon-arrow-left" plain style="margin-top: 10px;" @click="home"></el-button>
          </el-col>
          <el-col :span="22">
            <h1>{{ pics.name }}</h1>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-main class="center main max-height">
          <img :src="'file://' + pics.path" class="picture">
        </el-main>
        <el-aside class="bg">
          <pics-metas :pics="pics"></pics-metas>
        </el-aside>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import PicsMetas from './PicsMetas.vue'

export default {
  name: "picsDetails",
  components: {PicsMetas},
  data () {
    return {
      pics: {}
    }
  },
  mounted () {
    this.pics = this.$store.getters.editedpics
  },
  methods: {
    home () {
      this.$store.commit('PICS_UNSET_EDITED')
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>

#picsDetails {
  height: 100%;
  width: 100%;
}

.center
{
  text-align: center;
  margin: auto;
}

.main
{
  padding: 50px !important;
  background-color: $lighter;
}

.title
{
    background-color: $extralight;
}

.picture {
  box-sizing: border-box;
  max-height: 100%;
  max-width: 100%;
  text-align: center;
}

.max-height {
  height: 100%;
}

.bg{
  background-color: $light;
}

.full{
  height: 100%;
}

</style>
