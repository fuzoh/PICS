<template>
  <div id="wrapper">
    <h1>Hey you !</h1>
    <button @click="openfile">Import files</button>
    <system-information></system-information>
  </div>
</template>

<script>
  import SystemInformation from './LandingPage/SystemInformation'

  import { ipcRenderer } from 'electron'

  export default {
    name: 'landing-page',
    components: { SystemInformation },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      openfile () {
        console.log('tutu')
        ipcRenderer.send('open-dialog', 'tutu')
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;
  }
</style>
