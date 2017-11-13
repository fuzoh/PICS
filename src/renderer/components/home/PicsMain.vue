<!-- PicsMain.vue -->
<!-- Displays the aside on the home wiew (contains the three wiewß) -->

<template>
  <div id="pics-main">

    <!-- Display a separator for every locations -->
    <div v-for="place in myPhotos" :key="place.id">
      <el-row>
        <el-col :span="24">
          <photo-event :title="place.title"></photo-event>
        </el-col>
      </el-row>

      <!-- Display the photos of the event -->
      <el-row class="photos">
        <el-col v-for="photo in place.images" :key="photo.id" :xs="12" :sm="8" :md="6" :lg="4" :xl="4">
          <photo-card :url="photo.url" :name="photo.name"></photo-card>
        </el-col>
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
              url: "file:///Users/bastien/Sites/node.dev/PhotosDeTest/hehe/wallpaper.jpg",
              name: "483749-sjdsfj"
            },
            2: {
              url: "file:///Users/bastien/Sites/node.dev/PhotosDeTest/hehe/RCF TT+.jpg",
              name: "4837sfsfsfsfj"
            },
            3: {
              url: "file:///Users/bastien/Sites/node.dev/PhotosDeTest/hehe/039d4f67c0ef336a7c1889544a531901.jpg",
              name: "483749-sjdsfj"
            },
            4: {
              url: "file:///Users/bastien/Sites/node.dev/PhotosDeTest/hehe/Blur-2.png",
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
        },
        5 : {
          title: "St-gall",
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
  height: 100%;
  background-color: $cloud;
  overflow: scroll;
}

.photos {
  //box-sizing: border-box;
  background-color: $lighter;
}

</style>
