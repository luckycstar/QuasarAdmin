<template>
  <div>
    <div class="q-pa-xs">
      <q-layout
        view="hHh Lpr lff"
        container
        style="height: 300px"
        class="shadow-2 rounded-borders"
      >
        <q-header elevated class="bg-black">
          <q-toolbar>
            <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
            <q-toolbar-title>Header {{ left }}</q-toolbar-title>
          </q-toolbar>
        </q-header>

        <q-drawer
          v-model="drawer"
          show-if-above
          :mini="!drawer || miniState"
          @click.capture="drawerClick"
          :width="200"
          :breakpoint="500"
          bordered
          content-class="bg-grey-3"
        >
          <template v-slot:mini>
            <q-scroll-area class="fit mini-slot cursor-pointer">
              <div class="q-py-lg">
                <div class="column items-center">
                  <q-icon name="inbox" color="blue" class="mini-icon" />
                  <q-icon name="star" color="orange" class="mini-icon" />
                  <q-icon name="send" color="purple" class="mini-icon" />
                  <q-icon name="drafts" color="teal" class="mini-icon" />
                </div>
              </div>
            </q-scroll-area>
          </template>

          <q-scroll-area class="fit">
            <q-list padding>
              <q-item
                clickable
                v-ripple
                :active="$route.name == 'Child1' ? true : false"
                @click="$router.replace('/Child1')"
              >
                <q-item-section> Child1 </q-item-section>
              </q-item>

              <q-item
                :active="$route.name == 'Child2' ? true : false"
                clickable
                v-ripple
                @click="$router.replace('/Child2')"
              >
                <q-item-section> Child2 </q-item-section>
              </q-item>

              <q-item
                clickable
                v-ripple
                :active="$route.name == 'Child3' ? true : false"
                @click="$router.replace('/Child3')"
              >
                <q-item-section> Child3 </q-item-section>
              </q-item>

              <q-item
                clickable
                v-ripple
                :active="$route.name == 'Child4' ? true : false"
                @click="$router.replace('/Child4')"
              >
                <q-item-section> Child4 </q-item-section>
              </q-item>
            </q-list>
          </q-scroll-area>

          <!--
          in this case, we use a button (can be anything)
          so that user can switch back
          to mini-mode
        -->
          <div
            class="q-mini-drawer-hide absolute"
            style="top: 15px; right: -17px"
          >
            <q-btn
              dense
              round
              unelevated
              color="accent"
              icon="chevron_left"
              @click="miniState = true"
            />
          </div>
        </q-drawer>

        <q-page-container>
          <q-page class="q-px-lg q-py-md">
            <!-- <p v-for="n in 15" :key="n">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
              nihil praesentium molestias a adipisci, dolore vitae odit, quidem
              consequatur optio voluptates asperiores pariatur eos numquam rerum
              delectus commodi perferendis voluptate?
            </p> -->
            <router-view></router-view>
          </q-page>
        </q-page-container>
      </q-layout>
    </div>
    <!-- <v-flex xs9 md9 lg9 xl9 v-resize="onResize">Home</v-flex>
   <div class="q-video">
  <iframe
    width="853"
    height="680"
    src="https://www.youtube.com/embed/k3_tw44QsZQ?rel=0"
    frameborder="0"
    allowfullscreen
  ></iframe>
</div> -->
    <!-- <div >
  <iframe
    src="https://www.researchgate.net/profile/Patrick_Mcconnell6"
    frameborder="0"
    allowfullscreen
  ></iframe>
</div> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      drawer: false,
      miniState: true,
    };
  },

  created() {
    this.$router.push("/child1").catch(() => {});
  },

  watch: {
    left: function (newValue) {
      this.drawer = newValue;
    },
  },

  computed: {
    ...mapGetters({
      left: "appInfo/left",
    }),
  },

  methods: {
    drawerClick(e) {
      // if in "mini" state and user
      // click on drawer, we switch it to "normal" mode
      if (this.miniState) {
        this.miniState = false;

        // notice we have registered an event with capture flag;
        // we need to stop further propagation as this click is
        // intended for switching drawer to "normal" mode only
        e.stopPropagation();
      }
    },
  },
};
</script>
<style lang="sass" scoped>
.mini-slot
  transition: background-color .28s
  &:hover
    background-color: rgba(0, 0, 0, .04)

.mini-icon
  font-size: 1.718em

  & + &
    margin-top: 18px
.q-header
  display: none
</style>
