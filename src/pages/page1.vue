<template>
  <q-page>
    <div class="q-mx-xl row q-col-gutter-x-sm">
      <!-- <div class="row q-col-gutter-x-sm"> -->
      <div class="col-9 q-col-gutter-x-sm no-wrap" align="left">
        <q-toolbar class="bg-blue-grey text-white">
          <q-toolbar-title>Publications</q-toolbar-title>
          <q-btn flat round dense class="q-mr-xs active">iCite</q-btn>
          <q-btn flat round dense icon="sim_card" class="q-mr-xs" />
        </q-toolbar>
        <div class="no-wrap">
          <q-tabs grow v-model="active_tab" v-if="show_tabArea">
            <q-tab
              class="col-3 no-wrap"
              :disabled="isDisabled"
              v-for="tab of tabs"
              :key="tab.index"
              v-on:change="tabSelected(tab.index)"
              >{{ tab.name }}</q-tab
            >
          </q-tabs>
        </div>
        <div class="row">
          <div class="q-pa-md col-12">
            <q-btn
              v-if="showRowDetailsButton"
              color="blue-grey"
              class="full-width"
              @click="showDetails"
              >Show details</q-btn
            >
          </div>
          <div class="row q-pa-md col-12">
            <q-card v-if="showTop" style=" width: 100%;">
              <div class="ex1">
                <q-card-title class="px-5"
                  >Record information for PMID: {{ pmidCurrent }}</q-card-title
                >
                <q-card-text class="px-5">
                  <div v-html="currentPMIDdata"></div>
                  <!-- <q-layout row wrap> -->
                  <q-flex xs2 md2>
                    <q-switch
                      v-model="activeMine"
                      label="Accepted"
                      @change="actionChange('Mine')"
                      color="green"
                    ></q-switch>
                  </q-flex>
                  <q-flex xs2 md2>
                    <q-switch
                      v-model="activeNotMine"
                      label="Not Mine"
                      @change="actionChange('NotMine')"
                      color="red"
                    ></q-switch>
                  </q-flex>
                  <q-flex xs2 md2>
                    <q-switch
                      v-model="activeCancer"
                      label="Cancer Relevant"
                      @change="actionChange('Cancer')"
                      color="success"
                    ></q-switch>
                  </q-flex>
                  <q-flex xs2 md2>
                    <q-switch
                      v-model="activeMultiInstitution"
                      label="Multi Institutional"
                      @change="actionChange('MultiInstitution')"
                      color="success"
                    ></q-switch>
                  </q-flex>
                  <q-flex xs2 md2>
                    <q-switch
                      v-model="activeMultiProgram"
                      label="Multi Program"
                      @change="actionChange('MultiProgram')"
                      color="success"
                    ></q-switch>
                  </q-flex>
                  <!-- </q-layout> -->
                  <q-layout row wrap v-if="show_publications_details">
                    <q-flex xs2 md2></q-flex>
                    <q-flex xs8 md8>
                      <q-combobox
                        v-model="sharedChips"
                        :items="sharedresourceitems"
                        chips
                        clearable
                        label="Please list any Shared Resources that were used"
                        multiple
                        prepend-icon="filter_list"
                        solo
                        @change="actionChange('Shared')"
                      ></q-combobox>
                    </q-flex>
                    <q-flex xs2 md2></q-flex>
                  </q-layout>
                  <!-- <b>Previous Comments:</b> -->
                  <!-- <div q-html="comments"></div> -->
                  <!-- <p>Previous Comments: {{comments}}</p> -->

                  <!-- <v-textarea
                      v-if="show_publications_details"
                      v-model="inputPubComment"
                      name="inputPubComment"
                      label="Comments:"
                      value
                      hint="Add any comment about this publication"
                  ></v-textarea>-->

                  <q-btn text round flat color="primary" @click="showComment()"
                    >Add Comment</q-btn
                  >

                  <div class="text-xs-center">
                    <q-btn
                      class="ml-100"
                      text
                      round
                      color="primary"
                      @click="navChange('first')"
                      >First</q-btn
                    >

                    <q-btn
                      text
                      round
                      color="primary"
                      @click="navChange('previous')"
                      >Previous</q-btn
                    >
                    <q-btn round text>{{ recordNav }}</q-btn>

                    <!-- <v-text-field width="10px" v-model="recordNav" class="centered-input"></v-text-field> -->

                    <q-btn text round color="primary" @click="navChange('next')"
                      >Next</q-btn
                    >

                    <q-btn text round color="primary" @click="navChange('last')"
                      >Last</q-btn
                    >
                  </div>
                  <q-btn
                    color="blue-grey"
                    block
                    round
                    dark
                    @click="closeDetails"
                    >Close details</q-btn
                  >
                </q-card-text>
                <q-card-action class="justify-center"></q-card-action>
              </div>
            </q-card>
          </div>
          <div class="q-pa-md col-12">
            <q-btn
              v-if="showRowDetailsButton"
              color="blue-grey"
              class="full-width"
              @click="closeDetails"
              >Close details</q-btn
            >
          </div>
        </div>
        <div></div>
      </div>
      <div class="col-12 col-md-3" align="left">
        <q-toolbar class="bg-blue-grey text-white">
          <q-btn flat round dense icon="map"></q-btn>
          <q-toolbar-title>Options</q-toolbar-title>
        </q-toolbar>
      </div>
    </div>

    <div class="row q-col-gutter-x-sm">
      <div class="col-12 col-md-9" align="left">col-12 col-md</div>
      <div class="col-12 col-md-3" align="left">col-12 col-md</div>
      -
    </div>
    <!-- </div> -->
  </q-page>
</template>
<script>
export default {
  data: function() {
    return {
      tabs: [
        // { index: 0, name: "Instructions" },
        { index: 0, name: "Publication List" },
        { index: 1, name: "Co Authors" },
        { index: 2, name: "Abstract" }
      ],

      show_tabArea: true,
      active_tab: 0,
      showRowDetailsButton: true,
      showTop: true,
      currentPMIDdata: "<b> my Test</b>",
      pmidCurrent: "12345"
    };
  }
};
</script>

<style scoped>
.active {
  color: orange !important;
}
.my-card {
  width: 100%;
}
.box.flex {
  display: flex;
  justify-content: center;
  width: 100%;
}

div.ex1 {
  background-color: lightblue;
  height: 200px;
  width: 100%;
  overflow-y: scroll;
}
</style>
