<!-- PicsMain.vue -->
<!-- Displays the aside on the home wiew (contains the three wiewß) -->

<template>
  <div id="pics-main">

    <div v-for="place in myPhotos" :key="place.id">
      <el-row>
        <el-col :span="24">
          <photo-event :title="place.title"></photo-event>
        </el-col>
      </el-row>

      <el-row>
        <el-col v-for="photo in place.images" :key="photo.id" :span="6"><photo-card :url="photo.url" :name="photo.name"></photo-card></el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
import PhotoCard from '../photo/PhotoCard.vue'
import PhotoEvent from '../photo/PhotoEvent.vue'

export default {
  name: "PicsMain",
  components: { PhotoCard, PhotoEvent },
  data() {
    return {
      myPhotos: {
        1 : {
          title: "Rome",
          images: {
            1: {
              url: "tututu.jpg",
              name: "483749-sjdsfj"
            },
            2: {
              url: "tututu.jpg",
              name: "4837sfsfsfsfj"
            },
            3: {
              url: "tututu.jpg",
              name: "483749-sjdsfj"
            },
            4: {
              url: "tututu.jpg",
              name: "483749-sjdsfj"
            }
          }
        },
        2 : {
          title: "Dublin",
          images: {
            1: {
              url: "tututu.jpg",
              name: "483749-sjdsfj"
            },
            2: {
              url: "tututu.jpg",
              name: "4837sfsfsfsfj"
            },
            3: {
              url: "tututu.jpg",
              name: "483749-sjdsfj"
            },
            4: {
              url: "tututu.jpg",
              name: "483749-sjdsfj"
            },
            5: {
              url: "tututu.jpg",
              name: "483749-sjdsfj"
            },
            6: {
              url: "tututu.jpg",
              name: "483749-sjdsfj"
            },
            7: {
              url: "tututu.jpg",
              name: "483749-sjdsfj"
            },
            8: {
              url: "tututu.jpg",
              name: "483749-sjdsfj"
            }
          }
        },
        3 : {
          title: "Paris",
          images: {
            1: {
              url: "tututu.jpg",
              name: "483749-sjdsfj"
            },
            2: {
              url: "tututu.jpg",
              name: "4837sfsfsfsfj"
            },
            3: {
              url: "tututu.jpg",
              name: "483749-sjdsfj"
            },
            4: {
              url: "tututu.jpg",
              name: "483749-sjdsfj"
            },
            5: {
              url: "tututu.jpg",
              name: "483749-sjdsfj"
            },
            6: {
              url: "tututu.jpg",
              name: "483749-sjdsfj"
            },
            7: {
              url: "tututu.jpg",
              name: "483749-sjdsfj"
            },
            8: {
              url: "tututu.jpg",
              name: "483749-sjdsfj"
            }
          }
        },
        4 : {
          title: "Céüse",
          images: {
            1: {
              url: "tututu.jpg",
              name: "483749-sjdsfj"
            },
            2: {
              url: "tututu.jpg",
              name: "4837sfsfsfsfj"
            },
            3: {
              url: "tututu.jpg",
              name: "483749-sjdsfj"
            },
            4: {
              url: "tututu.jpg",
              name: "483749-sjdsfj"
            },
            5: {
              url: "tututu.jpg",
              name: "483749-sjdsfj"
            },
            6: {
              url: "tututu.jpg",
              name: "483749-sjdsfj"
            },
            7: {
              url: "tututu.jpg",
              name: "483749-sjdsfj"
            },
            8: {
              url: "tututu.jpg",
              name: "483749-sjdsfj"
            }
          }
        }
      }
    }
  }
}

</script>

<style lang="scss" scoped>

#pics-main {
  background-color: $lighter;
  overflow: scroll;
}

</style>
