<!-- - - - - - - - - - - - - - - - - - - - -->
<!-- FirstStart.vue                        -->
<!-- First Start page (hello message)      -->
<!-- - - - - - - - - - - - - - - - - - - - -->

<template>
  <div id="firstStart">
    <el-row class="row-logo" type="flex" justify="space-around">
      <el-col :xs="12" :sm="8" :md="6" :lg="5" :xl="4">
        <img class="app-logo" src="../assets/img/logo.svg">
      </el-col>
    </el-row>
    <div class="text">
      <h1>Bienvenue</h1>
      <p>Simple et efficace, PICS est une application<br>
      de gestion / tri de photos.</p>
      <el-button @click="configure()" type="primary" round>Configurer PICS</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "FirstStart",
  methods: {
    configure () {
      this.$router.push('/configure')
    }
  }
}
</script>

<style lang="scss" scoped>

#firstStart {
  height: 100%;
  width: 100%;
  background-color: $lighter;

  .row-logo {
    padding-top: 120px;

    .app-logo {
      width: 100%;
    }
  }

  .text {
    padding-top: 40px;
    text-align: center;

    h1 {
      margin: 0px;
    }
  }
}

</style>
