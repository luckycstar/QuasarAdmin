<template>
  <q-page id="controlContainer" class="q-my-xl" padding>
    <!-- Page Content -->
    <!-- it will be perfect for responsive if you make the grid -->
    <!-- first col = col-9 col-xs-12 col-md-9 -->
    <!-- second col = col-3 col-xs-12 col-md-3 -->
    <div class="row q-col-gutter-sm">
      <!-- Publication Section -->
      <section class="col-12">
        <q-card class="my-card mainShadow">
          <!-- headding Grant -->
          <q-card-section>
            <div
              class="text-h5 specTxtColor"
            >Grant * The Impact of tobacco exposure on the lungs lunnate def...</div>
          </q-card-section>
          <q-separator inset />
          <div class="q-py-xs"></div>
          <!-- Grant Details -->
          <q-card-section>
            <div class="q-ml-lg text-h6 specTxtColor">Details</div>
            <q-separator inset />
          </q-card-section>
          <!-- Grant Form -->
          <q-card-section>
            <div class="q-ml-lg grantForm">
              <q-input filled label="Title" />
              <q-select
                :options="selectbox.departement.value"
                v-model="selectbox.departement.model"
                filled
                label="Department"
              />
              <q-select
                :options="selectbox.sponsor.value"
                v-model="selectbox.sponsor.model"
                multiple
                filled
                label="Sponsor or Funding Source"
              />
              <q-input filled label="Grant or Sponsor Award Number" />
              <q-select
                :options="selectbox.awardtype.value"
                v-model="selectbox.awardtype.model"
                filled
                label="Award Type"
              />
              <q-select
                :options="selectbox.granttype.value"
                v-model="selectbox.granttype.model"
                filled
                label="Grant Type"
              />
              <q-input filled v-model="date.startdate" label="Start Date" mask="##/##/####">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
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
              <q-input filled v-model="date.enddate" label="End Date" mask="##/##/####">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                      <q-date title="End Date" mask="MM/DD/YYYY" v-model="date.enddate" />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <q-input filled label="Award Directs">
                <template v-slot:prepend>
                  <q-icon name="attach_money" />
                </template>
              </q-input>
              <q-input filled label="Award Total">
                <template v-slot:prepend>
                  <q-icon name="attach_money" />
                </template>
              </q-input>
              <q-select
                :options="selectbox.therapyarea.value"
                v-model="selectbox.therapyarea.model"
                multiple
                filled
                label="Disease or Therapy Area"
              ></q-select>
              <q-select
                :options="selectbox.stageofresearch.value"
                v-model="selectbox.stageofresearch.model"
                multiple
                filled
                label="Stage Of Research"
              ></q-select>
              <q-toggle
                v-model="toggle.subContractedForm"
                label="Subcontracted From Another Instition"
                left-label
              />
            </div>
          </q-card-section>
          <!-- actions buttons  -->
          <div class="container"></div>
          <q-card-actions class="q-pb-lg centerBtns">
            <q-btn label="Save" class="q-mt-md q-px-md" size="lg" color="green" icon="save" />
            <q-btn label="Cancel" class="q-mt-md q-px-md" size="lg" />
          </q-card-actions>
        </q-card>
        <q-separator />
      </section>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "PageIndex",
  data() {
    return {
      date: {
        startdate: "Start Date",
        enddate: "End Date"
      },
      selectbox: {
        departement: { model: "", value: ["School", "Medicine"] },
        sponsor: {
          model: [], // multiple select
          value: ["Heart Lung", "Insitiute Division of Blood"]
        },
        awardtype: {
          model: "",
          value: ["P50"]
        },
        granttype: {
          model: "",
          value: ["Standard", "Prime", "Project"]
        },
        therapyarea: {
          model: [],
          value: ["3300 - PHYSIOLOGY"]
        },
        stageofresearch: {
          model: [],
          value: ["T1", "T2"]
        }
      },
      toggle: {
        subContractedForm: false
      }
    };
  }
};
</script>
<style lang="scss" scoped>
//controlContainer
#controlContainer {
  @media only screen and (min-width: 1250px) {
    margin-left: 128.5px;
    margin-right: 128.5px;
  }
}
.specTxtColor {
  color: #9c8fd0;
}
.grantForm {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  > label {
    width: 50%;
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
