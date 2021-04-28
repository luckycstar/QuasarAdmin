<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-grey-1 text-white">
      <div class="q-pa-md">
        <q-toolbar class="bg-blue-grey text-white shadow-2 rounded-borders">
          <q-btn flat round icon="menu" @click="clickMenuBar" />
          <q-toolbar-title>{{ ToolbarTitle }}</q-toolbar-title>

          <q-space />

          <!--
        notice shrink property since we are placing it
        as child of QToolbar
          -->
          <!-- <q-tabs v-model="tab" shrink>
            <q-tab name="tab1" label="Tab 1" />
            <q-tab name="tab2" label="Tab 2" />
            <q-tab name="tab3" label="Tab 3" />
          </q-tabs>-->

          <q-tabs
            align="left"
            shrink
            v-model="selectedTab"
            @select="tabChanged('')"
          >
            <q-route-tab to="/" name="home" label="Sample One" />
            <q-route-tab to="/sampleMulti2" name="home2" label="Sample Two" />

            <!-- <q-route-tab to="/page1" label="Page One" /> -->
            <q-btn
              color="bg-blue-grey"
              label="Membership"
              @mouseover.native="memberMenu = true"
              flat
            >
              <q-menu v-model="memberMenu" @mouseleave="memberMenu = false">
                <div class="row no-wrap q-pa-md">
                  <div class="column">
                    <div class="text-h6 q-mb-md">Membership</div>
                    <q-item clickable v-ripple v-close-popup>
                      <q-item-section>
                        <q-item-label><b>Add New Member</b></q-item-label>
                        <q-item-label caption lines="2"
                          >Add a new member to the database.</q-item-label
                        >
                      </q-item-section>
                    </q-item>
                    <q-item clickable v-ripple :active="active" v-close-popup>
                      <q-item-section>
                        <q-item-label
                          ><b>Manage Membership list</b></q-item-label
                        >
                        <q-item-label caption lines="2"
                          >Manage and Export to Excel.</q-item-label
                        >
                      </q-item-section>
                    </q-item>
                    <q-item
                      clickable
                      v-ripple
                      :active="active"
                      v-close-popup
                      :to="{ name: 'trainees' }"
                    >
                      <q-item-section>
                        <q-item-label><b>Trainees</b></q-item-label>
                        <q-item-label caption lines="2"
                          >Manage and Export to Excel.</q-item-label
                        >
                      </q-item-section>
                    </q-item>
                    <q-item clickable v-ripple :active="active" v-close-popup>
                      <q-item-section>
                        <q-item-label
                          ><b>Export Membership list</b></q-item-label
                        >
                        <q-item-label caption lines="2"
                          >Export to Excel.</q-item-label
                        >
                      </q-item-section>
                    </q-item>
                  </div>
                  <q-separator vertical inset class="q-mx-lg"></q-separator>
                  <div class="column">
                    <q-avatar size="72px">
                      <img src="https://cdn.quasar.dev/img/mountains.jpg" />
                    </q-avatar>
                  </div>
                </div> </q-menu
            ></q-btn>

            <!-- <q-route-tab
              to="/membership"
              name="membership"
              label="Membership"
              @select="tabChanged('')"
            /> -->

            <q-route-tab
              to="/Publications"
              name="publications"
              label="Publications"
              @select="tabChanged('')"
            />
            <!-- <q-route-tab
              to="/trainees"
              name="trainees"
              label="trainees"
              @select="tabChanged('')"
            /> -->
            <q-route-tab
              to="/instructions"
              name="instructions"
              label="instructions"
              @select="tabChanged('')"
            />
            <q-tab label="menu" />
            <!-- <q-route-tab to="/page3" name="grants" label="Shared" />
            <q-route-tab to="/grant" name="grant2" label="Grants" />
            <q-route-tab to="/report" name="report" label="Reports" /> -->
          </q-tabs>

          <q-btn
            color="bg-blue-grey"
            label="Reports"
            flat
            @mouseover.native="reportMenu = true"
          >
            <q-menu v-model="reportMenu" @mouseleave="reportMenu = false">
              <div class="row no-wrap q-pa-md">
                <div class="column">
                  <div class="text-h6 q-mb-md">Membership Reports</div>
                  <q-item clickable v-ripple v-close-popup>
                    <q-item-section>
                      <q-item-label><b>Total Members Report</b></q-item-label>
                      <q-item-label caption lines="2"
                        >Add a new member to the database.</q-item-label
                      >
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-ripple :active="active" v-close-popup>
                    <q-item-section>
                      <q-item-label><b>Program Report</b></q-item-label>
                      <q-item-label caption lines="2"
                        >Export to Excel.</q-item-label
                      >
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-ripple :active="active" v-close-popup>
                    <q-item-section>
                      <q-item-label><b>Trainee Report</b></q-item-label>
                      <q-item-label caption lines="2"
                        >Export to Excel.</q-item-label
                      >
                    </q-item-section>
                  </q-item>
                </div>
                <q-separator vertical inset class="q-mx-lg"></q-separator>
                <div class="column">
                  <q-avatar size="72px">
                    <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
                  </q-avatar>
                </div>

                <q-separator vertical inset class="q-mx-lg"></q-separator>

                <div class="column items-center">
                  <div class="column">
                    <div class="text-h6 q-mb-md">Publication Reports</div>
                    <q-item clickable v-ripple :active="active" v-close-popup>
                      <q-item-section>
                        <q-item-label><b>Publication Report</b></q-item-label>
                        <q-item-label caption lines="2"
                          >Inter Intra Multi Report.</q-item-label
                        >
                      </q-item-section>
                    </q-item>
                    <q-item clickable v-ripple :active="active" v-close-popup>
                      <q-item-section>
                        <q-item-label
                          ><b>Publication Data Report</b></q-item-label
                        >
                        <q-item-label caption lines="2"
                          >Export to Excel.</q-item-label
                        >
                      </q-item-section>
                    </q-item>
                    <q-separator />
                  </div>
                </div>
                <q-separator vertical inset class="q-mx-lg"></q-separator>
                <div class="column">
                  <q-item-section top thumbnail class="q-ml-none">
                    <img src="https://cdn.quasar.dev/img/mountains.jpg" />
                  </q-item-section>
                </div>

                <q-separator vertical inset class="q-mx-lg"></q-separator>
                <div class="column">
                  <div class="text-h6 q-mb-md">Grant Reports</div>
                  <q-item clickable v-ripple :active="active" v-close-popup>
                    <q-item-section>
                      <q-item-label><b>Add New Grant</b></q-item-label>
                      <q-item-label caption lines="2"
                        >Add a new grant to the database.</q-item-label
                      >
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-ripple :active="active" v-close-popup>
                    <q-item-section>
                      <q-item-label><b>Export Grant list</b></q-item-label>
                      <q-item-label caption lines="2"
                        >Export to Excel.</q-item-label
                      >
                    </q-item-section>
                  </q-item>
                </div>
                <q-separator vertical inset class="q-mx-lg"></q-separator>
                <div class="column">
                  <q-avatar size="72px">
                    <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
                  </q-avatar>
                </div>
              </div> </q-menu
          ></q-btn>

          <!-- <q-btn dense flat round icon="menu" @click="right = !right" /> -->
        </q-toolbar>
      </div>

      <!-- <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" />
          </q-avatar>Publications Worksheet
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="right = !right" />
      </q-toolbar>

      <q-tabs align="left" shrink>
        <q-route-tab to="/" label="Home" />
        <q-route-tab to="/page1" label="Page One" />
        <q-route-tab to="/page2" label="Page Two" />
        <q-route-tab to="/page3" label="Page Three" />
      </q-tabs>-->
    </q-header>

    <q-drawer v-model="drawerState" side="left" bordered>
      <!-- drawer content -->
      <!-- left  -->
      <div>left side</div>
    </q-drawer>

    <q-drawer v-model="right" side="right" bordered>
      <!-- drawer content -->
      <!-- right -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer dense class="bg-blue-grey text-white .q-body-1">
      <div class="q-caption">
        @HCC 2021
        <i>Admin Database</i>
      </div>
    </q-footer>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      selectedTab: "publications",
      ToolbarTitle: "Administrative System",
      right: false,
      reportMenu: false,
      memberMenu: false,
    };
  },
  methods: {
    tabChanged() {
      alert("L");
    },
    clickMenuBar() {
      this.$store.dispatch("appInfo/setLeft");
    },
  },
  computed: {
    drawerState: {
      get() {
        return this.$store.state.appInfo.drawerState;
      },
      set(val) {
        this.$store.commit("appInfo/updateDrawerState", val);
      },
    },
  },
  created: {
    // this.ToolbarTitle = this.selectedTab
  },
  watch: {
    $route: function () {
      this.ToolbarTitle = "Administrative System";

      if (this.$router.currentRoute.name == "publications") {
        this.ToolbarTitle = "Publications Worksheet";
      }
      if (this.$router.currentRoute.name == "grants") {
        this.ToolbarTitle = "Grants Worksheet";
      }
      if (this.$router.currentRoute.name == "trainees") {
        this.ToolbarTitle = "Trainee Worksheet";
      }
    },
  },
};
</script>
