<!-- PicsAside.vue -->
<!-- Displays the aside on the home wiew (contains the three wiewß) -->

<template>
  <div id="pics-aside">
    <h2>Locations</h2>
    <el-tree :data="events" :props="TreeProps"></el-tree>
  </div>
</template>

<script>

export default {
  name: "PicsAside",
  data() {
    return {
      events: [{
        label: 'Toutes',
        children: [{
          label: '2017.08.10'
        }]
      }, {
        label: 'Rome'
      }, {
        label: 'Dublin'
      }, {
        label: 'Paris'
      }, {
        label: 'Céüse'
      }, {
        label: 'St-gall'
      }],
      TreeProps: {
        children: 'children',
        label: 'label'
      }
    };
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

.el-tree {
  background: transparent;
}

h2 {
  margin: 0px;
}

</style>
