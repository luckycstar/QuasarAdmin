<template>
<div>
  <div class="q-pa-xs">
    <q-layout view="hHh Lpr lff" container style="height: 300px" class="shadow-2 rounded-borders">
      <!-- <q-header elevated class="bg-black">
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-toolbar-title>Header</q-toolbar-title>
        </q-toolbar>
      </q-header> -->

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
              </div>
            </div>
          </q-scroll-area>
        </template>

        <q-scroll-area class="fit">
                    <q-tabs
                v-model="panel"
                vertical
                class="text-teal"
              >
                <q-tab name="page-1" icon="mail" label="page-1"></q-tab>
                <q-tab name="page-2" icon="alarm" label="page-2"></q-tab>
                <q-tab name="page-3" icon="movie" label="page-3"></q-tab>
              </q-tabs>
        </q-scroll-area>

        <!--
          in this case, we use a button (can be anything)
          so that user can switch back
          to mini-mode
        -->
        <div class="q-mini-drawer-hide absolute" style="top: 15px; right: -17px">
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
            <q-tab-panels
                v-model="panel"
                animated
                transition-prev="slide-down"
                transition-next="slide-up"
              >
                <q-tab-panel name="page-1">
                  <div class="text-h4 q-mb-md">Page 1</div>
                  <p>Page 1 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                </q-tab-panel>

                <q-tab-panel name="page-2">
                  <div class="text-h4 q-mb-md">Page 2</div>
                  <p>Page 2 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                </q-tab-panel>

                <q-tab-panel name="page-3">
                  <div class="text-h4 q-mb-md">Page 3</div>
                  <p>Page 3 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                </q-tab-panel>
              </q-tab-panels>
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
      panel: 'page-1'
    };
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
</style>
