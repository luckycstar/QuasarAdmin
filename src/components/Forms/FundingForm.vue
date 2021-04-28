<template>
  <q-card class="my-card mainShadow">
    <!-- headding toolbar -->
    <q-toolbar class="bg-primary text-white">
      <div class="q-ml-lg text-h5 text-weight-bold">Grant For :</div>
      <q-space />
      <q-tabs v-model="tab" class="q-mr-sm" shrink stretch>
        <q-btn-group push flat>
          <q-btn flat size="md" class="q-mr-sm">icite</q-btn>
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
    <!-- Text Intro Fund  -->
    <q-card-section>
      <div class="text-h5 specTxtColor">
        24 Mar 2014 - 23 Mar 2015
      </div>
    </q-card-section>
    <q-separator inset />
    <div class="q-py-xs"></div>
    <!-- Fund Form -->
    <q-card-section>
      <div class="q-ml-lg fundingForm">
        <q-input
          filled
          v-model="date.startdate"
          label="Start Date"
          mask="##/##/####"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                ref="qDateProxy"
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date
                  title="Start Date"
                  mask="MM/DD/YYYY"
                  label="date"
                  v-model="date.startdate"
                />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-input
          filled
          v-model="date.enddate"
          label="End Date"
          mask="##/##/####"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                ref="qDateProxy"
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date
                  title="End Date"
                  mask="MM/DD/YYYY"
                  v-model="date.enddate"
                />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-input filled label="Sponsor Number" v-model="inputs.sponsorNumber" />

        <q-input
          filled
          label="Period Directs"
          type="number"
          v-model="inputs.periodDirects"
        >
          <template v-slot:prepend>
            <q-icon name="attach_money" />
          </template>
        </q-input>
        <q-input
          filled
          label="Period Total"
          type="number"
          v-model="inputs.periodTotal"
        >
          <template v-slot:prepend>
            <q-icon name="attach_money" />
          </template>
        </q-input>
        <q-input
          v-model.number="inputs.cancerPercentage"
          type="number"
          label="Cancer Percentage"
          filled
          :rules="[
            val => val >= 0 || 'Please use between 0 - 100',
            val => val <= 100 || 'Please number should be not bigger than 100'
          ]"
        >
          <template v-slot:append>
            %
          </template>
        </q-input>
        <q-input
          standout
          v-model="inputs.retainedCancerDirects"
          label="Retained Cancer Relevant Period Directs"
          readonly
        />
        <q-input
          standout
          v-model="inputs.retainedCancerTotal"
          label="Retained Cancer Relevant Period Total"
          readonly
        />
        <q-input
          filled
          v-model="inputs.instiuationNumber"
          label="Instiuation Award Number"
          mask="AA-######"
          hint="AA-######"
        />
        <q-input
          filled
          v-model="inputs.chargeMechanism"
          label="Charge Mechanism"
        />
        <q-toggle
          v-model="toggle.noCostExtension"
          label="No-Cost Extension"
          left-label
        />
        <q-input
          v-model="textarea.notes"
          filled
          type="textarea"
          label="Notes"
        />
        <!-- Program Area Table  -->
        <!-- Display Data Row To Know How TO Deal With {{ tables.programArea.row }} -->
        <q-table
          title="Program Area Allocations"
          class="q-my-lg"
          separator="vertical"
          :data="tables.programArea.row"
          :columns="tables.programArea.columns"
          row-key="name"
          :loading="tables.programArea.loading"
          hide-bottom
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="programArea" :props="props">
                <q-select
                  :options="selectbox.programArea.value"
                  v-model="props.row.programArea"
                  filled
                  label="Program Area Select"
              /></q-td>
              <q-td key="percentage" :props="props">
                <q-input
                  v-model.number="props.row.percentage"
                  type="number"
                  label="Cancer Percentage"
                  filled
                  :rules="[
                    val => val >= 0 || 'Please use between 0 - 100',
                    val => val <= 100 || 'Not bigger than 100'
                  ]"
                >
                  <template v-slot:append>
                    %
                  </template>
                </q-input>
              </q-td>
              <q-td key="programAreaDirects" :props="props">
                <q-input
                  prefix="$"
                  v-model="props.row.programAreaDirects"
                  filled
                  readonly
                >
                </q-input>
              </q-td>
              <q-td key="programAreaTotal" :props="props">
                <q-input
                  prefix="$"
                  v-model="props.row.programAreaTotal"
                  filled
                  readonly
                >
                </q-input>
              </q-td>
              <q-td key="programAreaTotal" :props="props">
                <q-btn
                  flat
                  icon="clear"
                  @click="removeProgramArea(props.row.id)"
                  >Delete
                </q-btn>
              </q-td>
            </q-tr>
          </template>
          <!-- footer table  -->
          <template v-slot:bottom-row>
            <q-space />
            <q-btn
              dense
              class="q-my-md q-px-lg float-right"
              color="primary"
              label="New Program Area Allocation"
              @click="addProgramArea()"
            />
          </template>
        </q-table>
        <q-toggle
          class="q-mt-md"
          v-model="toggle.portionSubcontracted"
          label="Portion Subcontracted To Another Institution"
          left-label
        />
      </div>
    </q-card-section>
    <!-- actions buttons  -->
    <div class="container"></div>
    <q-card-actions class="q-pb-lg centerBtns">
      <q-btn
        label="Save"
        class="q-mt-md q-px-md"
        size="lg"
        color="green"
        icon="save"
      />
      <q-btn label="Cancel" class="q-mt-md q-px-md " size="lg" />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  data() {
    return {
      inputs: {
        sponsorNumber: "",
        periodDirects: "",
        periodTotal: "",
        cancerPercentage: 0,
        retainedCancerDirects: "",
        retainedCancerTotal: "",
        instiuationNumber: "",
        chargeMechanism: ""
      },
      date: {
        startdate: "Start Date",
        enddate: "End Date"
      },
      selectbox: {
        programArea: {
          model: "",
          value: ["Call Response for Research"]
        }
      },
      toggle: {
        subContractedForm: false
      },
      textarea: {
        notes: ""
      },
      tables: {
        programArea: {
          loading: false,
          columns: [
            {
              name: "programArea",
              label: "Program Area",
              align: "left",
              field: "percentage"
            },
            {
              name: "percentage",
              align: "left",
              label: "Percentage",
              field: "percentage"
            },
            {
              name: "programAreaDirects",
              align: "left",
              label: "Percentage Area Directs",
              field: "programAreaDirects"
            },
            {
              name: "programAreaTotal",
              align: "left",
              label: "Percentage",
              field: "programAreaTotal"
            },
            {
              name: "delete",
              align: "left",
              label: "",
              field: "delete"
            }
          ],
          row: [
            {
              id: 1212,
              programArea: "Call Response",
              percentage: 0,
              programAreaDirects: 600000,
              programAreaTotal: 7500000,
              delete: false
            }
          ]
        }
      }
    };
  },
  methods: {
    // Add New Row To Table (Program Area)
    addProgramArea() {
      this.tables.programArea.loading = true;
      setTimeout(() => {
        const newRow = {
          id: Math.round(Math.random() * 100000),
          programArea: "",
          percentage: 0,
          programAreaDirects: 0,
          programAreaTotal: 0,
          delete: false
        };
        this.tables.programArea.row.push(newRow); //adding table
        this.tables.programArea.loading = false;
      }, 1000);
    },
    // Remove Selected Row To Table (Program Area)
    removeProgramArea(selectedID) {
      this.tables.programArea.loading = true;
      setTimeout(() => {
        this.tables.programArea.row.forEach(function(objRow, index, array) {
          if (objRow.id === selectedID) {
            array.splice(index, 1);
          }
        });
        this.tables.programArea.loading = false;
      }, 500);
    }
  }
};
</script>

<style lang="scss" scoped>
.specTxtColor {
  color: #9c8fd0;
}
.fundingForm {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  > label {
    width: 90%;
    @media (max-width: 900px) {
      width: 90%;
    }
    margin-bottom: 1%;
  }
}
.centerBtns {
  justify-content: center;
}
</style>
