<template>
  <q-page id="controlContainer" padding>
    <!-- Page Content -->
    <!-- it will be perfect for responsive if you make the grid -->
    <!-- first col = col-9 col-xs-12 col-md-9 -->
    <!-- second col = col-3 col-xs-12 col-md-3 -->
    <div class="row q-col-gutter-sm">
         <!-- Options Section -->
      <section class="col-3">
        <!-- options header -->
        <q-toolbar class="bg-blue-grey text-white">
          <div class="q-ml-lg text-h5 text-weight-bold">Options</div>
          <q-space />
          <q-tabs v-model="tab" class="q-mr-sm" shrink stretch>
           
          </q-tabs>
        </q-toolbar>
        <!-- Select Name  -->
        <q-select
          class="q-mt-sm"
          color="info"
          option-value="memberID"
          option-label="name"
          label="Select Name"
          :options="memberNames"
          v-model="nameSelected"
          @input="selectionChange"
        >
          <template v-slot:prepend>
            <q-icon name="people" />
          </template>
        </q-select>
        <!-- Actions Buttons -->
        <q-list class="bg-white">
          <q-item
            clickable
            v-ripple
            v-for="(button, index) in options.actionBtns"
            :key="index"
            @click="bnClick(button)"
          >
            <q-item-section avatar>
              <q-avatar
                :color="button.icon.bgcolor"
                :text-color="button.icon.textcolor"
                :icon="button.icon.name"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ button.title }}</q-item-label>
              <q-item-label caption>{{ button.body }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </section>
      <!-- Publication Section -->
      <section class="col-9">
        <!-- <q-card class="my-card mainShadow"> -->
          <!-- heading toolbar -->

          <q-toolbar class="bg-blue-grey text-white" style="width: 100%">
            <div class="q-ml-lg text-h5 text-weight-bold">Publications for: {{ membersName }}</div>
            <q-space />
            <q-tabs v-model="tab" class="q-mr-sm" shrink stretch>
              <q-btn-group push flat>
                <q-btn flat size="md" class="q-mr-sm" label="icite" />
                <q-btn round flat icon="more_vert" size="md">
                  <q-menu cover auto-close>
                    <q-list bordered padding class="rounded-borders">
                      <q-item clickable>
                        <q-item-section stretch>
                          <div class="text-body text-h6">Export</div>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </q-btn-group>
            </q-tabs>
          </q-toolbar>

          <!-- Tabs Control -->

          <q-separator />
        <!-- </q-card> -->
        <div class="q-pa-sm">
          <q-btn
            v-if="showRowDetailsButton"
            color="blue-grey"
            class="full-width"
            @click="toggleDetails('show')"
            label="Show details"
          />
        </div>
        <!-- Top-->
        <q-card v-if="showDetails">
          <q-card-title class="px-5">Record information for PMID: {{ pmidCurrent }}</q-card-title>
          <q-card-text class="px-5">
            <div style="height: 100px;" class="scroll-y" v-html="currentPMIDdata"></div>
          </q-card-text>
          <q-card-actions align="center">
            <div class="row">
              <q-toggle
                v-model="activeMine"
                label="Accepted"
                @change="actionChange('Mine')"
                color="green"
              />
              <q-toggle
                v-model="activeNotMine"
                label="Not Mine"
                @change="actionChange('NotMine')"
                color="red"
              />

              <q-toggle
                v-model="activeCancer"
                label="Cancer Relevant"
                @change="actionChange('Cancer')"
                color="green"
              />

              <q-toggle
                v-model="activeMultiInstitution"
                label="Multi Institutional"
                @change="actionChange('MultiInstitution')"
                color="green"
              />

              <q-toggle
                v-model="activeMultiProgram"
                label="Multi Program"
                @change="actionChange('MultiProgram')"
                color="green"
              />
            </div>
          </q-card-actions>

          <q-select
            filled
            v-model="sharedChips"
            use-chips
            multiple
            :options="sharedresourceitems"
            label="Please list any Shared Resources that were used."
            style="width: 100%"
            @change="actionChange('Shared')"
          />

      
          <div align="center">
            <q-btn
              class="q-mx-sm"
              text
              rounded
              color="primary"
              @click="navChange('first')"
              label="First"
            />

            <q-btn
              class="q-mx-sm"
              text
              rounded
              color="primary"
              @click="navChange('previous')"
              label="Previous"
            />
            <q-btn class="q-mx-sm" text>{{ recordNav }}</q-btn>
            <q-btn
              class="q-mx-sm"
              text
              rounded
              color="primary"
              @click="navChange('next')"
              label="Next"
            />
            <q-btn
              class="q-mx-sm"
              text
              rounded
              color="primary"
              @click="navChange('last')"
              label="Last"
            />
          </div>

          <div class="q-pa-sm">
            <q-btn
              color="blue-grey"
              class="full-width"
              @click="toggleDetails('close')"
              label="Close details"
            />
          </div>
        </q-card>

        <!--tabs-->
        <q-tabs
          v-model="tab"
          class="text-grey"
          active-color="dark"
          indicator-color="info"
          align="justify"
          inline-label
          @click="tabSelected()"
        >
          <q-tab name="publist" label="Publication List" />
          <q-tab name="authors" label="CO Authors" />
          <q-tab name="abstract" label="Abstract" />
          <q-tab name="comments" label="Comments">
            <q-badge
              v-if="commentCount"
              color="primary"
              text-color="white"
              floating
            >{{ commentCount }}</q-badge>
          </q-tab>
        </q-tabs>
        <!-- Tab Panels -->
        <q-tab-panels v-model="tab" animated class="bg-white mainShadow">
          <!-- Publication List panel -->
          <q-tab-panel name="publist" id="specialHeadTable" class="q-pb-lg">
            <div class="q-pa-md">
              <!-- of course you need to edit it later get data from .json file -->
              <!-- noteice q-table have loading in prop so you can use it when starting load data -->
              <!-- <q-card
                class="scroll-y"
                v-bind:style="[
                  showDetails ? { height: '500px' } : { height: '790px' }
                ]"
              > -->
              <q-card>
                <q-card-text class="px-5">
                  <ejs-grid
                     height=690
                    :selectedRowIndex="currentRowIndex"
                    :selectionSettings="selectionOptions"
                    id="reportGrid"
                    ref="reportGrid"
                    :editSettings="editSettings"
                    :allowSelection="true"
                    :rowSelected="rowSelectedPubs"
                    :dataSource="articles"
                    :toolbar="toolbarOptions"
                    :allowTextWrap="true"
                    :allowExcelExport="true"
                    :toolbarClick="toolbarClick"
                    :disableHtmlEncode="false"
                  >
                    <e-columns>
                      <e-column headerText="#" width="50" textAlign="Center"></e-column>

                      <e-column
                        field="Mine"
                        displayAsCheckBox="true"
                        width="100"
                        textAlign="Center"
                        headerTemplate="<span>Accepted</span>"
                      ></e-column>

                      <e-column
                        field="NotMine"
                        displayAsCheckBox="true"
                        width="100"
                        textAlign="Center"
                        headerTemplate="<span>Not Mine</span>"
                      ></e-column>
                      <e-column
                        field="CancerRelated"
                        headerTemplate="<span>Cancer<br/>Relevant</span>"
                        width="100"
                        displayAsCheckBox="true"
                        textAlign="Center"
                      ></e-column>
                      <e-column field="PMID" headerText="PMID" width="110" :isPrimaryKey="true"></e-column>
                      <e-column field="pubdate" headerText="Year" width="75"></e-column>
                      <e-column
                        field="data"
                        headerText="Publication"
                        :valueAccessor="pubInformation"
                        :disableHtmlEncode="false"
                      ></e-column>
                      <e-column field="searchData" :visible="false"></e-column>
                    </e-columns>
                  </ejs-grid>
                </q-card-text>
                <q-card-actions class="justify-center"></q-card-actions>
              </q-card>
            </div>
          </q-tab-panel>
          <!-- CO Authors panel -->
          <q-tab-panel name="authors" id="authorTable" class="q-pb-md shadow-20">
            <q-table
              title="Record information for PMID: 31792646"
              :data="authorsTable.data"
              :columns="authorsTable.columns"
              row-key="PmPubsAuthorID"
              selection="multiple"
              :filter="authorsTable.filter"
              :pagination="{ rowsPerPage: 20 }"
              grid
              hide-header
            >
              <template v-slot:item="props">
                <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-4">
                  <q-card class="q-mb-sm mainShadow minHe">
                    <q-checkbox
                      class="specialOne"
                      v-model="props.row.checked"
                      left-label
                      color="positive"
                      padding
                      @input="authorCBClicked(props)"
                    />

                    <q-list class="q-pb-lg">
                      <template v-for="col in props.cols">
                        <q-item :key="col.author" v-if="itemListCondation(col)">
                          <template>
                            <!-- if item Author  -->
                            <q-item-section v-if="col.label == 'Author'">
                              <q-item-label>
                                <span
                                  :style="{
                                    'font-weight': 'bold'
                                  }"
                                >{{ col.label }}</span>:
                                <span style="line-height: 1.5;">
                                  {{ col.value }}
                                  {{ InitialsAuthor(props) }}
                                </span>
                              </q-item-label>
                            </q-item-section>
                            <!-- if item program  -->
                            <q-item-section v-else-if="col.label == 'Program'">
                              <q-item-label>
                                <span
                                  :style="{
                                    'font-weight': 'bold'
                                  }"
                                >{{ col.label }}</span>
                                :
                                <span
                                  :style="{
                                    color: colorProgram(props),
                                    'font-weight': 'bold'
                                  }"
                                >{{ col.value }}</span>
                              </q-item-label>
                            </q-item-section>
                            <!-- else but not Affiliations -->
                            <q-item-section v-else>
                              <q-item-label>
                                <span
                                  :style="{
                                    'font-weight': 'bold'
                                  }"
                                >{{ col.label }}</span>
                                :
                                <span>{{ col.value }}</span>
                              </q-item-label>
                            </q-item-section>
                          </template>
                        </q-item>
                        <!-- if item Affiliations  -->
                        <template v-if="col.label == 'Affiliation'">
                          <q-item v-for="(affil, index) in col.value" :key="affil + index">
                            <q-item-section>
                              <q-item-label>
                                <span
                                  :style="{
                                    'font-weight': 'bold'
                                  }"
                                >{{ col.label }}</span>
                                :
                                <span
                                  style="font-weight:normal"
                                >{{ affil }}</span>
                              </q-item-label>
                            </q-item-section>
                          </q-item>
                        </template>
                      </template>
                    </q-list>
                  </q-card>
                </div>
              </template>
            </q-table>
          </q-tab-panel>

          <!-- Abstract Panel -->
          <q-tab-panel name="abstract" class="q-px-xl">
            <div class="contentAbstract">
              <div class="text-body q-pa-md q-pl-xl">Record information for PMID: 31792646</div>

              <q-list>
                <q-item v-for="(item, index) in listAbstract" :key="item + index" class="q-py-md">
                  <q-item-section>
                    <q-item-label style="line-height: 1.7em !important;">
                      <span class="text-bold">{{ item.title }} :</span>
                      {{ item.body }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </q-tab-panel>
          <!--Comments Panel-->
          <q-tab-panel name="comments" class="q-px-xl">
            <div v-html="comments"></div>

            <q-btn text flat color="primary" @click="showComments()" label="Add Comment" />
          </q-tab-panel>
        </q-tab-panels>
        <q-separator />
      </section>
   
    </div>
  
    <!-- {{ options.model }} -->
    <!-- <profile v-model="showProfileForm" /> -->

    <q-dialog persistent v-model="showProfileForm" class="profileDialog" @hide="profileHide()">
      <profile-dialog></profile-dialog>
    </q-dialog>

    <q-dialog persistent v-model="showFAQForm" class="FAQDialog">
      <FAQDialog></FAQDialog>
    </q-dialog>

    <q-dialog persistent v-model="showInstructionsForm" class="InstructionsDialog">
      <InstructionsDialog></InstructionsDialog>
    </q-dialog>

       <q-dialog persistent v-model="showProblemForm" class="ProblemDialog">
      <ProblemDialog></ProblemDialog>
    </q-dialog>
 
  </q-page>
</template>

<script>
//import { mapGetters,  mapActions} from 'vuex'
import {  mapActions} from 'vuex'
import ProblemDialog from  "../dialogs/problem"
import ProfileDialog from "../dialogs/profile"
import FAQDialog from "../dialogs/faq"
import InstructionsDialog from "../dialogs/instructions"
//import axios from "axios";
import { QSpinnerCube } from "quasar"
import Vue from "vue";
import { CheckBoxPlugin } from "@syncfusion/ej2-vue-buttons"
import {
  Selection,
  GridPlugin,
  Page,
  Group,
  Sort,
  // FilterType,
  Filter,
  // CommandColumn,
  Edit,
  Toolbar,
  ExcelExport,
  PdfExport,
  DetailRow
} from "@syncfusion/ej2-vue-grids";

Vue.use(GridPlugin);
Vue.use(CheckBoxPlugin);
export default {
  components: {    
    ProfileDialog,
    FAQDialog,
    InstructionsDialog,
    ProblemDialog

  },
  provide: {
    grid: [
      Selection,
      DetailRow,
      Toolbar,
      ExcelExport,
      PdfExport,
      Page,
      Sort,
      Filter,
      Group,
      Edit
    ]
  },
 
 

  name: "PageIndex",
  data() {
    return {
      drawerRight: false,
      sharedresourceitems:[ {
          label: 'ACS IRG',
          value: '1'
        },
        {
          label: 'Biostatistics',
          value: '2'
        },
        {
          label: 'Cell & Molecular Imaging',
          value: '3'
        },
        {
          label: 'Cellular Therapy Facility',
          value: '4'
        },
        {
          label: 'Clinical Trials',
          value: '5'
        },
        {
          label: 'Genomics',
          value: '6'
        }],
       // ,' Biostatistics','Cell & Molecular Imaging','Cellular Therapy Facility','Clinical Trials'],
       sharedChips: null,
      showProblemForm: false,
      showInstructionsForm: false,
      showFAQForm: false,
      showProfileForm: false,
      Affiliations: [],
      commentCount: 0,
      recordNav: "1 of 15",
      showDetails: false,
      activeMine: false,
      activeNotMine: false,
      activeCancer: false,
      activeMultiProgram: false,
      activeMultiInstitution: false,
      memberNames: [],
      nameSelected: null,
      membersName: "",
      currentMemberID: "",
      currentPMID: "",
      currentPMIDdata: "<b>test</b>",
      tab: "publist",
      tabDetails: "details",
      newPMID: [],
      pmidstring: "",
      overlay_name: false,
      pmidsData: [],
      currentRowIndex: 0,
      name_PMID_items: "",
      articles: [],
      articlesShort: [],
      alert_error: false,
      currentRowCount: 0,
      isDisabled: false,
      toolbarOptions: ["Search", "ExcelExport"],
      showRowDetailsButton: true,
      

      selectionOptions: {
        type: "Single"
      },
      editSettings: {
        allowAdding: true
      },
      publicationTable: {
        data: []
      },
      authorsTable: {
        filter: "",
        selected: [],
        columns: [
          {
            name: "memberID",
            required: true,
            label: "notshow",
            field: "memberID"
          },
          {
            name: "pmid",
            required: true,
            label: "notshow",
            field: "pmid"
          },
          {
            name: "PmPubsAuthorID",
            required: true,
            label: "notshow",
            field: "memberID"
          },

          {
            name: "Last_Name",
            required: true,
            label: "Author",
            align: "left",
            field: "Last_Name"
          },
          {
            name: "ProgramCode",
            label: "Program",
            field: "ProgramCode"
          },
          {
            name: "checked",
            required: true,
            label: "notshow",
            field: "checked"
          },
          {
            name: "Affiliations",
            label: "Affiliation",
            field: "Affiliations"
          }
        ],
        data: []
      },
      
      listAbstract: [],
      options: {
        actionBtns: [
          {
            icon: {
              name: "assignment",
              textcolor: "white",
              bgcolor: "blue"
            },
            title: "Profile",
            body: "Personal Data",
            action: "Profile"
          },
        //   {
        //     icon: {
        //       name: "assignment",
        //       textcolor: "white",
        //       bgcolor: "amber"
        //     },
        //     title: "Search using PubMed",
        //     body: "standard",
        //     action: "standard"
        //   },
        //   {
        //     icon: {
        //       name: "call_to_action",
        //       textcolor: "white",
        //       bgcolor: "amber"
        //     },
        //     title: "Disambiguation Search",
        //     body: "Harvards search engine",
        //     action: null
        //   },
        //   {
        //     icon: {
        //       name: "add_circle",
        //       textcolor: "white",
        //       bgcolor: "amber"
        //     },
        //     title: "Add PMID",
        //     body: "manually",
        //     action: null
        //   },
        //   {
        //     icon: {
        //       name: "assignment",
        //       textcolor: "white",
        //       bgcolor: "red"
        //     },
        //     title: "Filter",
        //     body: "Validate Pubs",
        //     action: null
        //   },
        //   {
        //     icon: {
        //       name: "assignment",
        //       textcolor: "white",
        //       bgcolor: "red"
        //     },
        //     title: "Refresh",
        //     body: "Remove filters and refresh",
        //     action: null
        //   },
          {
            icon: {
              name: "assignment",
              textcolor: "white",
              bgcolor: "green"
            },
            title: "Instructions",
            body: "Application Instructions",
            action: "Instructions"
          },
          {
            icon: {
              name: "assignment",
              textcolor: "white",
              bgcolor: "green"
            },
            title: "FAQ",
            body: "Frequently asked questions",
            action: "FAQ"
          },
          {
            icon: {
              name: "assignment",
              textcolor: "white",
              bgcolor: "green"
            },
            title: "Problems/Suggestions",
            body: "Report a Problem/Suggestion",
            action: "problem"
          }
        //   ,
        //   {
        //     icon: {
        //       name: "assignment",
        //       textcolor: "white",
        //       bgcolor: "green"
        //     },
        //     title: "Send Email",
        //     body: "Send email message to author",
        //     action: null
        //   },
        //   {
        //     icon: {
        //       name: "assignment",
        //       textcolor: "white",
        //       bgcolor: "green"
        //     },
        //     title: "Send Batch Email",
        //     body: "Send email message to authors",
        //     action: null
        //   },
        //   {
        //     icon: {
        //       name: "assignment",
        //       textcolor: "white",
        //       bgcolor: "green"
        //     },
        //     title: "Resources",
        //     body: "Publication Resources",
        //     action: null
        //   }
        ]
      }
    };
  },
  methods: {
    ...mapActions({ memberInfo: "memberInfo/loadMemberInfo" }),

   
    authorCBClicked(item) {
      let c = item.row["memberID"];
      if (c !== "to do") {
        alert(c);
      }
      //  let b = item.row["checked"];
      //   let x = item.row["pmid"];
      // alert(c + " " + b + " " + x);
    },
    profileHide(){
     this.$store.dispatch("memberInfo/saveMemberInfo");
  //    alert("hide");
    },
    bnClick(item) {
      switch (item.action) {
        case "Profile":
          // this.$store.dispatch("memberInfo/loadMemberInfo", {
          //   memberID: this.currentMemberID
          // });
          this.showProfileForm = true;
          break;
        case "FAQ":
        this.showFAQForm= true;
          break;

          case "Instructions":
          this.showInstructionsForm = true;
          break;

          case "problem":
            this.showProblemForm = true;
            break;
      }
    },
    tabSelected() {
      switch (this.tab) {
        case "authors":
          if (this.authorData.length == 0 && this.pmidCurrent !== "") {
            this.pubMedXML(this.pmidCurrent);
          }
          break;
        case "abstract":
          if (this.authorData.length == 0 && this.pmidCurrent !== "") {
            this.pubMedXML(this.pmidCurrent);
          }
          break;
      }
    },
    colorProgram(prop) {
      return prop["row"]["Color"];
    },
    InitialsAuthor(prop) {
      return prop["row"]["Initials"];
    },
    itemListCondation(col) {
      if (col.value && col.label != "notshow" && col.label != "Affiliation") {
        return true;
      } else {
        return false;
      }
    },

    pubMedXML(pmid) {
      let authorDataTMP = [];
      this.authorData = [];
      this.listAbstract = [];
      var self = this;
      let AuthorName = "";
      let parser = "";
      let xmlDoc = "";
      //  this.overlay_name = true;
      var start = Date.now();
      this.$axios
        .get(
          "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&retmode=xml&id=" +
            pmid +
            "&api_key=d0784f454c4ca9a3cb738d33f97b4ae34808&tool=biosketch_program&email=morgenww@musc.edu"
        )
        .then(response => {
          this.overlay_name = false;

          parser = new DOMParser();
          xmlDoc = parser.parseFromString(response.data, "text/xml");
          const abstracts = xmlDoc.querySelectorAll("AbstractText");
          // let abstract_text = "";
          abstracts.forEach(a => {
            let tmpItem = [];
            if (a.getAttribute("Label") !== null) {
              //  abstract_text +=
              //   "<b>" + a.getAttribute("Label") + "</b>: " + a.textContent;
              tmpItem.title = a.getAttribute("Label");
              tmpItem.body = a.textContent;
            } else {
              tmpItem.body = a.textContent;
              tmpItem.title = "Abstract";
              //   abstract_text += a.textContent;
            }
            self.listAbstract.push(tmpItem);
            //   abstract_text += "<br /><br />";
          });

          //  this.abstract = abstract_text;

          const AuthorsInfo = xmlDoc.querySelectorAll("Author");
          let count = 1;
          AuthorsInfo.forEach(a => {
            let itemsAdd = {};
            // let affiliation = "";

            itemsAdd["memberID"] = 0;
            itemsAdd["PmPubsAuthorID"] = 0;
            itemsAdd["pmid"] = pmid;
            itemsAdd["Program_Code"] = "";
            itemsAdd["checked"] = false;
            itemsAdd["ProgramCode"] = "";
            itemsAdd["emphasis"] = "";
            itemsAdd["Color"] = "";
            itemsAdd["Affiliations"] = [];

            for (var i = 0; i < a.children.length; i++) {
              let tt = a.children[i].nodeName;
              let t = a.children[i].textContent;

              if (tt === "AffiliationInfo") {
                //  affiliation +=
                // "<b>Affiliation:</b>" + a.children[i].textContent;
                //  affiliations += "<br /><br />";
                //    itemsAdd["Affiliation"] = a.children[i].textContent;
                // itemsAdd["Affiliations"] = a.children[i].textContent;

                itemsAdd["Affiliations"].push(a.children[i].textContent);
              } else if (tt === "LastName") {
                itemsAdd["Last_Name"] = a.children[i].textContent;
                AuthorName = a.children[i].textContent;

                //people.filter(p => p.dinner == "sushi")

                let result = self.memberNames.filter(p => p.LastName == t);

                // if (this.nameData["Last_Name"] === a.children[i].textContent) {
                if (result.length > 0) {
                  itemsAdd["checked"] = true;
                  itemsAdd["memberID"] = result[0]["memberID"];
                  itemsAdd["ProgramCode"] = result[0]["Program_Code"];
                  itemsAdd["Program_Code"] = result[0]["Program_Code"];
                  //result["Program_Code"];
                  itemsAdd["Color"] = result[0]["Color"];
                  itemsAdd["memberID"] = result[0]["memberID"];

                  //   itemsAdd["checked"] = true;
                  //   itemsAdd["ProgramCode"] = this.nameData["Program_Code"];
                  //   itemsAdd["Program_Code"] = this.nameData["Program_Code"];
                  //   itemsAdd["Color"] = this.nameData["Color"];
                }
              } else if (tt === "Initials") {
                itemsAdd["Initials"] = a.children[i].textContent;
                AuthorName += " " + a.children[i].textContent;
              } else if (tt === "ForeName") {
                itemsAdd["ForeName"] = a.children[i].textContent;
                AuthorName += " " + a.children[i].textContent;
              }
            }
            if (AuthorName == "test") {
              alert(AuthorName);
            }
            count += 1;

            itemsAdd["PmPubsAuthorID"] = count;

            authorDataTMP.push(itemsAdd);

            //  alert(AuthorName + " " + affiliations);
          });
          // alert("done");

          this.authorData = authorDataTMP;
          this.authorsTable.data = authorDataTMP;
          // alert(this.authorsTable.data.length);
          var end = Date.now();
          var diff = end - start;

          this.networkSpeed = (diff / 600).toFixed(2);
        })
        .catch(err => {
          this.networkSpeed = " May have problems";
          this.overlay_name = false;

          let message = err.message;
          //   this.abstract = "Connection to PubMed is having a problem.";
          //   this.authorData.push(
          //     "It appears that the PubMed service is not available at this time. "
          //   );
          if (message === "Network Error") {
            // alert(
            //   "It appears that the PubMed service is not available at this time. "
            // );
            this.alert_error = true;
            setTimeout(this.removeErrorAlert, 3000);
          } else {
            // alert(message);
            this.alert_error = true;
            setTimeout(this.removeErrorAlert, 3000);
          }
        });
    },
    navChange(arg) {
      this.abstract = "";
      this.authorData = [];
      let index = this.currentRowIndex;
      // let rows = this.$refs.reportGrid.ej2Instances.getSelectedRowIndexes();
      //  let index = rows[0];

      if (typeof index === "undefined") {
        index = 0;
      }
      //  let arr = this.$refs.reportGrid.ej2Instances.getCurrentViewRecords();
      //   let c = arr.length;
      let c = this.currentRowCount;

      if (typeof c === "undefined") {
        return;
      }

      //   this.$refs.reportGrid.ej2Instances.clearRowSelection();

      switch (arg) {
        case "first":
          //   this.$refs.reportGrid.ej2Instances.selectRow(0, true);
          this.recordNav = "Record: [ 1 of " + c + " ]";
          index = 0;
          break;

        case "next":
          if (index + 2 <= c) {
            //  this.$refs.reportGrid.ej2Instances.selectRow(index + 1, true);
            this.recordNav = "Record: [ " + (index + 2) + " of " + c + " ]";
            index = index + 1;
          }

          break;

        case "previous":
          if (index > 0) {
            //  this.$refs.reportGrid.ej2Instances.selectRow(index - 1, true);
            this.recordNav = "Record: [ " + index + " of " + c + " ]";
            index = index - 1;
          }

          break;

        case "last":
          //   this.$refs.reportGrid.ej2Instances.selectRow(c - 1, true);
          this.recordNav = "Record: [ " + c + " of " + c + " ]";
          index = c - 1;
          break;

        default:
          //  newIndex = index;
          this.recordNav = "Record: [ " + (index + 1) + " of " + c + " ]";
          break;
      }
      // rows = this.$refs.reportGrid.ej2Instances.getSelectedRowIndexes();
      //  index = rows[0];
      this.currentRowIndex = index;
      if (this.tab == "publist") {
        //  this.$refs.reportGrid.ej2Instances.clearRowSelection;
        // this.$refs.reportGrid.ej2Instances.selectRow(index, true);
      } else {
        this.createDetails(index);
        //  let pmid = this.articles[index]["PMID"];
        if (this.authorData.length == 0) {
          this.pubMedXML(this.pmidCurrent);
        }
      }
    },
    showLoading() {
      this.$q.loading.show({
        spinner: QSpinnerCube,
        spinnerColor: "orange",
        spinnerSize: 140
      });

      // hiding in 3s
      this.timer = setTimeout(() => {
        this.$q.loading.hide();
        this.timer = void 0;
      }, 3000);
    },
    showComments() {
      alert("show dialog");
      //    this.showDetails = false;
    },
    toggleDetails(arg) {
      switch (arg) {
        case "show":
          if (this.tab == "publist") {
            this.showRowDetailsButton = false;
            this.showDetails = true;
            this.activeCancer = this.articles[this.currentRowIndex][
              "CancerRelated"
            ];
          }
          if (this.tab == "authors") {
            this.showDetails = true;
            this.showRowDetailsButton = false;
          }
          if (this.tab == "abstract") {
            this.showDetails = true;
            this.showRowDetailsButton = false;
          }
          if (this.tab == "comments") {
            this.showDetails = true;
            this.showRowDetailsButton = false;
          }
          break;
        case "close":
          this.showDetails = false;

          this.showRowDetailsButton = true;
          break;
      }
    },

    click(e) {
      if (
        e.target.classList.contains("e-rowcell") &&
        e.target.querySelector(".e-checkbox-wrapper")
      ) {
        if (this.$refs.reportGrid.ej2Instances.isEdit)
          this.$refs.reportGrid.ej2Instances.endEdit();
        var index = parseInt(e.target.getAttribute("Index"), 10);
        var rowData = this.$refs.reportGrid.ej2Instances.currentViewData[index];
        var column = this.$refs.reportGrid.ej2Instances.columns[
          parseInt(e.target.getAttribute("aria-colindex"), 10)
        ].field;
        var checkValue = !rowData[column];
        rowData[column] = checkValue;

        this.$refs.reportGrid.ej2Instances.updateRow(index, rowData);
        switch (column) {
          case "Mine":
            this.activeMine = rowData.Mine;
            this.articles[index]["Mine"] = rowData.Mine;

            if (rowData.Mine === true) {
              this.articles[index]["Mine"] = true;
              rowData.NotMine = false;
              this.articles[index]["NotMine"] = false;
            } else {
              rowData.CancerRelated = false;
            }

            this.saveSwitchValue("Mine", this.activeMine);
            break;

          case "NotMine":
            this.activeNotMine = rowData.NotMine;
            this.articles[index]["NotMine"] = rowData.NotMine;

            if (rowData.NotMine === true) {
              this.articles[index]["Mine"] = false;
              rowData.Mine = false;
              rowData.CancerRelated = false;
              this.activeCancer = false;
              this.activeMine = false;
            }

            this.saveSwitchValue("NotMine", this.activeNotMine);
            break;
          case "CancerRelated":
            //  this.activeCancer = rowData.CancerRelated;
            if (rowData.CancerRelated === true) {
              this.activeCancer = true;
              rowData.Mine = true;
              rowData.NotMine = false;
              this.activeMine = true;
              this.activeNotMine = false;
              this.articles[index]["Mine"] = true;
              this.articles[index]["NotMine"] = false;
              this.articles[index]["CancerRelated"] = true;
            } else {
              this.activeCancer = false;

              this.articles[index]["CancerRelated"] = false;
            }
            this.saveSwitchValue("Cancer", this.activeCancer);
            break;
        }
      }
    },
    saveSwitchValue(item, value) {
      if (value == true) {
        value = 1;
      } else {
        value = 0;
      }

      let updatedData = {
        dbid: 100,
        memberID: this.currentMemberID,
        pmid: this.currentPMID,
        item: item,
        value: value
      };

      this.$axios({
        method: "post",
        url:
          "https://restapi20190104050748.azurewebsites.net/api/PostSwitchValue",
        params: {
          value: JSON.stringify(updatedData)
        }
      }).catch(err => {
        alert("err" + err);
        //   console.log(err);
      });
    },
    addEventListner: function() {
      this.$refs.reportGrid.ej2Instances.element.addEventListener(
        "click",
        this.click
      );
    },
    rowSelectedPubs(arg) {
      this.abstract = "";
      this.authorData = [];
      if (this.tab == "publist") {
        this.addEventListner();

        this.currentRowIndex = arg.rowIndex;
        this.currentPMID = arg["data"]["PMID"];
        this.isDisabled = false;
        this.createDetails(this.currentRowIndex);
        //    this.navChange("row");
      }
    },
    createDetails(index) {
      this.activeCancer = this.articles[index]["CancerRelated"];
      this.activeMine = this.articles[index]["Mine"];
      this.activeNotMine = this.articles[index]["NotMine"];
      this.comments = this.articles[index]["Comments"];
      //   this.activeCancer = this.articles[index]["MultiInstitutional"];
      this.currentPMIDdata = "";
      this.pmidCurrent = this.articles[index]["PMID"];
      //  this.pubMedXML(this.pmidCurrent);
      this.pmid_list_index = index;

      let pmid = this.articles[index]["PMID"];

      //let pmc = arg.data.data.pmc || "";
      let pmc = this.articles[index]["data"]["pmc"] || "";
      //  let authors = arg.data.data.authors;
      let authors = this.articles[index]["data"]["authors"];
      //   '' as impactFactor, '' as citationCount, '' as cancerWordsCount

      let impactFactor = " Impact Factor: NA";
      let citationCount = " Citation Count: NA";
      let cancerWordsCount = " Cancer Words Count: NA";

      let notice = "";
      if (this.newPMID.includes(pmid) != false) {
        notice =
          "<font color='Red'><b>Publication needs to be validated</b></font> ";
      }
      this.currentPMIDdata =
        authors +
        ". <b><a href='https://www.ncbi.nlm.nih.gov/pubmed/" +
        pmid +
        "' target='_blank'>" +
        this.articles[index]["data"]["title"] +
        "</a></b> <i> " +
        this.articles[index]["data"]["source"] +
        "</i><b> " +
        pmc +
        "</b> <br />" +
        impactFactor +
        citationCount +
        cancerWordsCount +
        "<br /> <b>" +
        notice +
        "</b> ";
    },
    pubInformation: function(field, data, column) {
      if (column == -1) {
        return;
      }
      let pmid = data["PMID"];
      let pmc = data["data"]["pmc"] || "";
      let authors = data["data"]["authors"];
      //   '' as impactFactor, '' as citationCount, '' as cancerWordsCount

      // let impactFactor = " Impact Factor: NA";
      //  let citationCount = " Citation Count: NA";
      //   let cancerWordsCount = " Cancer Words Count: NA";
      let currentAuthor = this.membersName;
      let res = "";
      let notice = "";
      if (this.newPMID.includes(pmid) != false) {
        notice =
          "<font color='Red'><b>Publication needs to be validated</b></font> ";
      }

      res += authors.replace(
        currentAuthor,
        "<font color='Red'>" + currentAuthor + "</font>"
      );
      return (
        res +
        ". <b><a href='https://www.ncbi.nlm.nih.gov/pubmed/" +
        pmid +
        "' target='_blank'>" +
        data["data"]["title"] +
        "</a></b> <i> " +
        data["data"]["source"] +
        "</i><b> " +
        pmc +
        "</b> <br />" +
        // impactFactor +
        // citationCount +
        // cancerWordsCount +
        "<br /> <b>" +
        notice +
        "</b> "
      );
    },
    toolbarClick: function(args) {
      if (args.item.id === "reportGrid_excelexport") {
        // 'Grid_excelexport' -> Grid component id + _ + toolbar item name
        this.$refs.reportGrid.excelExport();
      } else if (args.item.id === "reportGrid_pdfexport") {
        // 'Grid_pdfexport' -> Grid component id + _ + toolbar item name
        this.$refs.reportGrid.pdfExport();
      }
    },
    selectionChange(item) {
      this.showLoading();
      this.membersName = "";
       this.currentMemberID = item.memberID;
        this.$store.dispatch("memberInfo/loadMemberInfo", {
            memberID: this.currentMemberID
          });
      this.loadPMIDData(item.memberID);
      this.$store.commit("memberInfo/setMemberID", item.memberID);

     
      this.membersName = item.name;
    },
    getMembers() {
      let dbid = "100"; //this.$store.getters.dbid;
      //var self = this;
      this.$axios
        .get(
          "https://restapi20190104050748.azurewebsites.net/api/GetMembers/" +
            dbid
        )
        .then(res => {
          let results = res.data.split("]");
          for (let i = 0; i < results.length; i++) {
            if (results[i].endsWith("]") == false) {
              results[i] = results[i] + "]";
            }
          }
       //  if(this.$route.query.id === '0000'){
          this.memberNames = JSON.parse(results[0]);
       //   }
        })
        .catch(err => {
          alert(err);
          // console.log(err);
        });
    },
    memberRowSelectedeShort: function(pmid_list) {
      var self = this;

      this.currentRowIndex = 0;
      this.overlay_name = true;
      var start = Date.now();

      if (!pmid_list.length > 0) {
        this.articles = [];
        this.articlesShort = [];
        return;
      }
      let objPMIDInfo = this.name_PMID_items;

      let affiliation = "MUSC";
      if (affiliation.length > 5) {
        affiliation = "<br><br>" + "<b>Affiliation: </b>" + affiliation;
      }
      this.$axios
        .get(
          "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?tool=biosketch&email=morgenww@musc.edu&db=pubmed&api_key=d0784f454c4ca9a3cb738d33f97b4ae34808&retmode=json&rettype=abstract&id=" +
            pmid_list,
          {}
        )
        .then(res => {
          let jsonObj = res.data.result;
          delete jsonObj.uids;
          //    const result = _.merge(jsonObj, objPMIDInfo);
          const articles = [];
          const articlesShort = [];
          for (const prop in jsonObj) {
            if (!jsonObj.hasOwnProperty(prop)) continue;
            let article = {};
            let articleShort = {};
            article["PMID"] = prop;
            // article["Mine"] = true;
            // article["NotMine"] = false;
            // article["CancerRelated"] = false;

            articleShort["p"] = prop;
            const pubdate = jsonObj[prop].pubdate;
            const splitedPubDate = pubdate.split(" ");
            article["pubdate"] = splitedPubDate[0];
            let data = {};
            data["memberID"] = this.member_ID;

            articleShort["i"] = this.member_ID;

            data["pmid"] = prop;
            data["title"] = jsonObj[prop]["title"];
            data["source"] = jsonObj[prop]["source"];
            data["authors"] = jsonObj[prop]["authors"]
              .map(author => {
                return author["name"];
              })
              .join(", ");

            data["volume"] = jsonObj[prop]["volume"];
            data["issue"] = jsonObj[prop]["issue"];
            data["pages"] = jsonObj[prop]["pages"];
            data["elocationid"] = jsonObj[prop]["elocationid"];
            data["sortpubdate"] = jsonObj[prop]["sortpubdate"];
            articleShort["s"] = jsonObj[prop]["sortpubdate"];

            for (const articleid of jsonObj[prop]["articleids"]) {
              if (articleid["idtype"] === "pmc") {
                data["pmc"] = articleid["value"];
                break;
              }
            }

            article["searchData"] =
              data["authors"] +
              " " +
              data["source"] +
              " " +
              data["title"] +
              " " +
              data["pmc"];

            article["data"] = data;
            articlesShort.push(articleShort);
            articles.push(article);
          }
          articles.sort(function(a, b) {
            return b.PMID - a.PMID;
          });

          //   var merged = _.map(articles, function(item) {
          //     return _.assign(item, _.find(objPMIDInfo, ["PMID", item.PMID]));
          //   });

          var articleswithData = articles.map(msg => {
            var haveEqualId = user => user.PMID === msg.PMID;
            var pubsWithEqualId = objPMIDInfo.find(haveEqualId);
            return Object.assign({}, msg, pubsWithEqualId);
          });

          self.articles = articleswithData;
          self.articlesShort = articlesShort;
          // self.createDetails(0);

          self.currentRowCount = articles.length;
          self.recordNav = "Record: [ 1 of " + articles.length + " ]";
          self.addEventListner();
          self.overlay_name = false;
          var end = Date.now();
          var diff = end - start;

          self.networkSpeed = (diff / 600).toFixed(2);
        })
        .catch(error => {
          error = "";
          self.networkSpeed = " Has problems" + error;
          self.overlay_name = false;

          // var today = new Date();
          //   var date =
          //     today.getFullYear() +
          //     "-" +
          //     (today.getMonth() + 1) +
          //     "-" +
          //     today.getDate();
          //   var time =
          //     today.getHours() +
          //     ":" +
          //     today.getMinutes() +
          //     ":" +
          //     today.getSeconds();
          //       var dateTime = date + " " + time;

          self.alert_error = true;
          setTimeout(this.removeErrorAlert, 3000);

          //   alert(error.stack + " " + pmid_list + " " + dateTime);
          //  console.log(error);
        });
    },

    loadPMIDData(memberID) {
      if(memberID !== '0000'){ 
      // let dbid = this.$store.getters.dbid;
      var self = this;
      this.$axios
        .get(
          "https://restapi20190104050748.azurewebsites.net/api/GetMemberPMIDS/" +
            memberID
        )
        .then(res => {
          var name_items = JSON.parse(res.data);
          self.pmidsData = name_items;

          var arr = [];
          for (var i = 0; i < name_items.length; i++) {
            if (name_items[i]["Pending"] === true) {
              self.newPMID.push(name_items[i]["PMID"]);
            }
            arr.push(name_items[i]["PMID"]);
          }
          self.pmidstring = arr.join(",");

          self.name_PMID_items = name_items;
          self.overlay_name = true;
          if (self.pmidstring !== "") {
            self.memberRowSelectedeShort(self.pmidstring);
          } else {
            self.overlay_name = false;
          }



      

      let member_name = name_items[0].First_Name+ " " + name_items[0].Last_Name;
    
      this.membersName = member_name;


          //  this.editedItem =name_items[0];
          //  self.overlay_name = false;
        })
        .catch(err => {
          alert("err" + err);
          //   console.log(err);
        });
    }
    }
  },

  created: function() {

  //  this.$store.commit("setDBID", 100);
 //   this.getMembers();
 //   if(this.$route.query.id !== undefined || this.$route.query.id == '0000'){


   //    this.showLoading();
 //     this.membersName = "";
   //    this.currentMemberID = this.$route.query.id;
      //  this.$store.dispatch("memberInfo/loadMemberInfo", {
      //      memberID: this.currentMemberID
       //   });
  //    this.loadPMIDData(this.currentMemberID);
  //    this.$store.commit("memberInfo/setMemberID", this.currentMemberID);

    


 //   }

  }
    
};
</script>
<style>
@import "https://cdn.syncfusion.com/ej2/material.css";
.e-checkbox-wrapper.e-checkbox-disabled .e-frame.e-check,
.e-css.e-checkbox-wrapper.e-checkbox-disabled .e-frame.e-check {
  background-color: #e3165b;
  border-color: transparent;
  color: #fff;
}

.q-tab-panels {
  min-height: 790px;
}
#specialHeadTable {
  .q-table__top {
    background-color: $accent;
  }
}
#authorTable {
  .q-table__top {
    padding-bottom: 20px;
  }
  .q-table__middle {
    margin-bottom: 10px;
  }

  .q-checkbox__label {
    font-size: 20px;
    margin-right: 20px;
  }
  .q-item__label {
    font-weight: bold;
    text-transform: capitalize;
    font-size: 16px;
  }
  .text-caption {
    font-weight: normal;
    padding-top: 1px;
  }

  .q-table__top,
  .q-table__bottom {
    background-color: transparent !important;
    border: none !important;
  }
  .q-table__container {
    > .row {
      padding: 20px;
      background-color: #fbfbf6;
      border-top: 2px dotted $dark;
    }
  }
}

.my-table-details {
  font-size: 0.95em;
  font-style: italic;
  max-width: 600px;
  white-space: normal;
  color: #555;
  margin-top: 4px;
}

.specialOne {
  position: absolute;
  right: 1px;
  z-index: 999999;
}

.minHe {
  min-height: 100px;
}
</style>
