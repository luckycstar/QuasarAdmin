<template>
  <q-stepper
    v-model="step"
    ref="stepper"
    header-nav
    color="info"
    active-color="info"
    done-color="info"
    animated
  >
    <q-step :name="1" title="Name" prefix="1" :done="step > 1">
      <div class="devBg q-pa-lg">
        <div class="row q-col-gutter-sm">
          <div class="col-3">
            <q-input
              filled
              label="First Name"
              color="info"
              bg-color="white"
              v-model.lazy="nameData['First_Name']"
              @change="pageChanged(0)"
            />
          </div>
          <div class="col-3">
            <q-input
              filled
              label="Middle Initial"
              color="info"
              bg-color="white"
              v-model.lazy="nameData['Middle_Initial']"
              @change="pageChanged(0)"
            />
          </div>
          <div class="col-3">
            <q-input
              filled
              label="Last Name"
              color="info"
              bg-color="white"
              v-model.lazy="nameData['Last_Name']"
              @change="pageChanged(0)"
            />
          </div>
          <div class="col-3">
            <q-input
              filled
              label="Email"
              color="info"
              bg-color="white"
              v-model.lazy="nameData['Email']"
              @change="pageChanged(0)"
            />
          </div>
          <div class="col-12 q-mt-md q-mb-sm">
            <span class="power">Also know as:</span> (other names that may help
            publication searching, such as maiden name or unique forename used
            at PubMed.)
          </div>
          <div class="col-3">
            <q-input
              filled
              label="Other Last Name"
              bg-color="white"
              color="info"
              v-model.lazy="nameData['AKALast_Name']"
              @change="pageChanged(0)"
            />
          </div>
          <div class="col-6">
            <q-input
              filled
              label="Forenames"
              color="info"
              bg-color="white"
              v-model.lazy="nameData['ForeName']"
              @change="pageChanged(0)"
            />
          </div>
          <div class="col-3">
            <q-input
              filled
              label="Initials"
              color="info"
              bg-color="white"
              v-model.lazy="nameData['Initials']"
              @change="pageChanged(0)"
            />
          </div>
          <div class="col-12 q-mt-md q-mb-sm">
            <span class="power">External ID's:</span>
          </div>
          <div class="col-3">
            <q-input
              filled
              label="ORCID"
              color="info"
              bg-color="white"
              v-model.lazy="nameData['ORCID']"
              @change="pageChanged(0)"
            />
          </div>
          <div class="col-3">
            <q-input
              filled
              label="eRACommons"
              color="info"
              bg-color="white"
              v-model.lazy="nameData['eRACommons']"
              @change="pageChanged(0)"
            />
          </div>
          <div class="col-3">
            <q-input
              filled
              label="NH Reporter ID"
              color="info"
              bg-color="white"
              v-model.lazy="nameData['reporterID']"
              @change="pageChanged(0)"
            />
          </div>
          <div class="col-3">
            <q-input
              filled
              label="Institution ID"
              color="info"
              bg-color="white"
              v-model.lazy="nameData['institutionID']"
              @change="pageChanged(0)"
            />
          </div>
        </div>
      </div>
    </q-step>

    <q-step :name="2" title="Affiliation" prefix="2" :done="step > 2">
      <div class="devBg q-pa-lg">
        <div class="row q-col-gutter-lg">
          <div class="col-3">
            <q-input
              filled
              label="Year Start"
              color="info"
              bg-color="white"
              v-model.lazy="nameData['Year_Start']"
            />
          </div>
          <div class="col-3">
            <div class="bg-white">
              <q-toggle v-model="toPresent" color="green" bg-color="white" label="To Present" />
            </div>
          </div>
          <div class="col-3">
            <q-input
              filled
              label="Year End"
              color="info"
              bg-color="white"
              v-model.lazy="nameData['Year_End']"
            />
          </div>
          <div class="col-12">
            <q-input
              filled
              label="Affiliations"
              color="info"
              bg-color="white"
              v-model.lazy="nameData['Affiliations']"
            />
          </div>
        </div>
      </div>
    </q-step>

    <q-step :name="3" title="Additional Information" prefix="3" :done="step > 3">
      <div class="devBg q-pa-lg">
        <div class="row q-col-gutter-lg">
          <div class="col-6">
            <q-select
              filled
              v-model.lazy="single"
              :options="programCode"
              label="Program Code"
              bg-color="white"
            />
          </div>
          <div class="col-6">
            <q-input
              filled
              label="myNCBI Link"
              bg-color="white"
              color="info"
              v-model.lazy="nameData['myNCBI_Link']"
            />
          </div>
        </div>
        <div class="col-12 q-my-md">
          <q-input
            type="textarea"
            filled
            label="Custom Search String"
            bg-color="white"
            color="info"
            v-model.lazy="nameData['Search_String']"
          />
        </div>
        <q-btn color="blue darken-1" flat @click="testNameSearch" label="Test PubMed Search" />
      </div>
    </q-step>

    <!-- footer actions buttons in dialog -->
    <template v-slot:navigation>
      <q-stepper-navigation>
        <q-btn @click="$refs.stepper.next()" color="info" label="Next" />
        <q-btn
          flat
          @click="$refs.stepper.previous()"
          color="info"
          label="Back"
          v-if="step > 1"
          class="q-ml-sm"
        />

        <q-btn color="positive" label="Save" class="q-ml-sm" style="float:right" />
        <q-btn
          flat
          color="primary"
          label="Close"
          v-close-popup
          class="q-ml-sm"
          style="float:right"
        />
      </q-stepper-navigation>
    </template>
  </q-stepper>
</template>

<script>
//import { mapGetters } from "vuex";
export default {
  data() {
    return {
      step: 1,
      toPresent: false,
      programCode: ["CB", "CC", "CI", "DCT", "NPA"],
      single: null,
      nameData: [],
      e1_isDirty: false,
      e2_isDirty: false,
      e3_isDirty: false
    };
  },
  methods: {
    testNameSearch() {
      let Search_String = this.nameData["Search_String"];
      if (Search_String.length > 0) {
        window.open(
          "https://www.ncbi.nlm.nih.gov/pubmed/?term=" + Search_String,
          "_blank"
        );
      }
    }
  },
  //   computed: {
  //     ...mapGetters("nameData", ["memberInfo"])
  //   },
  mounted() {
    this.nameData = this.$store.getters["memberInfo/memberInfo"];
    //let na = this.memberData["Last_Name"];
    // alert(na);
  }
};
</script>
<style lang="scss">
.q-menu {
  z-index: 9999999991;
}
.q-dialog {
  z-index: 999999999;
}
.q-dialog__inner--minimized > div {
  @media (min-width: 600px) {
    min-width: 1000px;
    min-height: 500px;
  }
}
.devBg {
  background-color: #eeeeee;
  min-height: 400px;
}
</style>
