<!-- PicsDetails.vue -->
<!-- Displays the aside on the home wiew (contains the three wiewß) -->

<template>
  <div id="picsDetails">
    <el-container class="full">
      <el-header class="title">
        <el-row>
          <el-col :span="2">
            <a href="javascript:history.go(-1)"><el-button type="info" icon="el-icon-arrow-left" plain style="margin-top: 10px;"></el-button></a>
          </el-col>
          <el-col :span="20">
            <h1>pascal - Vacances en Israël 1896</h1>
          </el-col>
          <el-col :span="2">
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-main class="center main">
            <div>
                <img src="file:///Users/jyle/Pictures/MyPhotos/Arolla/IMG_2053.jpg" class="picture" alt="">
            </div>
        </el-main>
        <el-aside class="bg">
          <pics-metas></pics-metas>
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
  methods: {
    lightbox()
    {

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
}

.title
{
    background-color: $extralight;
}

.picture {
  max-width: 80%;
  text-align:center;
  transition: 1s;
}

.picture:hover
{
  transition: 1s;
  cursor: pointer;
  box-shadow: 0px 15px 45px -5px rgba(0,0,0,0.75);
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
