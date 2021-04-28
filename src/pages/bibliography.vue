<template>
  <q-layout>
    <q-toolbar class="bg-light-blue-10 text-white" style="height: 70px">
      <div class="container flex items-center">
        <img src="../assets/bi-logo.svg" width="60px" />

        <q-toolbar-title>
          <div class="text-h6">
            National Library of medicine
          </div>
          <div class="text-body2 text-weight-thin">
            National Center for Biotechnology Information
          </div>
        </q-toolbar-title>

        <q-btn outline label="Login" no-caps class="q-px-md " />
      </div>
    </q-toolbar>
    <q-toolbar class="bg-grey-4 text-black" style="height: 70px">
      <div class="container flex items-center">
        <q-toolbar-title>
          <div class="flex items-center">
            <div class="text-h4 text-weight-bold">
              My Bibliography
            </div>
            <div class="text-body2 q-ma-md q-pt-md">
              William Morgenweck's Bibliography
            </div>
          </div>
        </q-toolbar-title>
      </div>
    </q-toolbar>

    <q-page-container class="container ">
      <q-table
        flat
        ref="table"
        :data="data"
        :columns="columns"
        row-key="name"
        :selected-rows-label="getSelectedString"
        selection="multiple"
        :selected.sync="selected"
        :pagination="initialPagination"
      />
    </q-page-container>
    <q-footer class="bg-grey-5" style="height: 200px"></q-footer>
  </q-layout>
</template>
<script>
export default {
  name: "bibliography",
  data() {
    return {
      selected: [],
      lastIndex: null,
      initialPagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 15
      },
      columns: [
        {
          name: "desc",
          required: true,
          align: "left",
          field: row => row.name,
          format: val => `${val}`
        }
      ],

      data: [
        {
          name:
            "Kraft AS, Anderson WB, Cooper HL, Sando JJ. Decrease in cytosoliccalcium/phospholipid-dependent protein kinase activity following phorbol estertreatment of EL4 thymoma cells. J Biol Chem. 1982 Nov 25;257(22):13193-6. PubMedPMID: 7142138."
        },
        {
          name:
            "Kraft AS, Anderson WB, Cooper HL, Sando JJ. Decrease in cytosoliccalcium/phospholipid-dependent protein kinase activity following phorbol estertreatment of EL4 thymoma cells. J Biol Chem. 1982 Nov 25;257(22):13193-6. PubMedPMID: 7142138."
        },
        {
          name:
            "Kraft AS, Anderson WB, Cooper HL, Sando JJ. Decrease in cytosoliccalcium/phospholipid-dependent protein kinase activity following phorbol estertreatment of EL4 thymoma cells. J Biol Chem. 1982 Nov 25;257(22):13193-6. PubMedPMID: 7142138."
        },
        {
          name:
            "Kraft AS, Anderson WB, Cooper HL, Sando JJ. Decrease in cytosoliccalcium/phospholipid-dependent protein kinase activity following phorbol estertreatment of EL4 thymoma cells. J Biol Chem. 1982 Nov 25;257(22):13193-6. PubMedPMID: 7142138."
        },
        {
          name:
            "Kraft AS, Anderson WB, Cooper HL, Sando JJ. Decrease in cytosoliccalcium/phospholipid-dependent protein kinase activity following phorbol estertreatment of EL4 thymoma cells. J Biol Chem. 1982 Nov 25;257(22):13193-6. PubMedPMID: 7142138."
        },
        {
          name:
            "Kraft AS, Anderson WB, Cooper HL, Sando JJ. Decrease in cytosoliccalcium/phospholipid-dependent protein kinase activity following phorbol estertreatment of EL4 thymoma cells. J Biol Chem. 1982 Nov 25;257(22):13193-6. PubMedPMID: 7142138."
        },
        {
          name:
            "Kraft AS, Anderson WB, Cooper HL, Sando JJ. Decrease in cytosoliccalcium/phospholipid-dependent protein kinase activity following phorbol estertreatment of EL4 thymoma cells. J Biol Chem. 1982 Nov 25;257(22):13193-6. PubMedPMID: 7142138."
        },
        {
          name:
            "Kraft AS, Anderson WB, Cooper HL, Sando JJ. Decrease in cytosoliccalcium/phospholipid-dependent protein kinase activity following phorbol estertreatment of EL4 thymoma cells. J Biol Chem. 1982 Nov 25;257(22):13193-6. PubMedPMID: 7142138."
        },
        {
          name:
            "Kraft AS, Anderson WB, Cooper HL, Sando JJ. Decrease in cytosoliccalcium/phospholipid-dependent protein kinase activity following phorbol estertreatment of EL4 thymoma cells. J Biol Chem. 1982 Nov 25;257(22):13193-6. PubMedPMID: 7142138."
        },
        {
          name:
            "Kraft AS, Anderson WB, Cooper HL, Sando JJ. Decrease in cytosoliccalcium/phospholipid-dependent protein kinase activity following phorbol estertreatment of EL4 thymoma cells. J Biol Chem. 1982 Nov 25;257(22):13193-6. PubMedPMID: 7142138."
        },
        {
          name:
            "Kraft AS, Anderson WB, Cooper HL, Sando JJ. Decrease in cytosoliccalcium/phospholipid-dependent protein kinase activity following phorbol estertreatment of EL4 thymoma cells. J Biol Chem. 1982 Nov 25;257(22):13193-6. PubMedPMID: 7142138."
        },
        {
          name:
            "Kraft AS, Anderson WB, Cooper HL, Sando JJ. Decrease in cytosoliccalcium/phospholipid-dependent protein kinase activity following phorbol estertreatment of EL4 thymoma cells. J Biol Chem. 1982 Nov 25;257(22):13193-6. PubMedPMID: 7142138."
        },
        {
          name:
            "Kraft AS, Anderson WB, Cooper HL, Sando JJ. Decrease in cytosoliccalcium/phospholipid-dependent protein kinase activity following phorbol estertreatment of EL4 thymoma cells. J Biol Chem. 1982 Nov 25;257(22):13193-6. PubMedPMID: 7142138."
        },
        {
          name:
            "Kraft AS, Anderson WB, Cooper HL, Sando JJ. Decrease in cytosoliccalcium/phospholipid-dependent protein kinase activity following phorbol estertreatment of EL4 thymoma cells. J Biol Chem. 1982 Nov 25;257(22):13193-6. PubMedPMID: 7142138."
        },
        {
          name:
            "Kraft AS, Anderson WB, Cooper HL, Sando JJ. Decrease in cytosoliccalcium/phospholipid-dependent protein kinase activity following phorbol estertreatment of EL4 thymoma cells. J Biol Chem. 1982 Nov 25;257(22):13193-6. PubMedPMID: 7142138."
        },
        {
          name:
            "Kraft AS, Anderson WB, Cooper HL, Sando JJ. Decrease in cytosoliccalcium/phospholipid-dependent protein kinase activity following phorbol estertreatment of EL4 thymoma cells. J Biol Chem. 1982 Nov 25;257(22):13193-6. PubMedPMID: 7142138."
        },
        {
          name:
            "Kraft AS, Anderson WB, Cooper HL, Sando JJ. Decrease in cytosoliccalcium/phospholipid-dependent protein kinase activity following phorbol estertreatment of EL4 thymoma cells. J Biol Chem. 1982 Nov 25;257(22):13193-6. PubMedPMID: 7142138."
        },
        {
          name:
            "Kraft AS, Anderson WB, Cooper HL, Sando JJ. Decrease in cytosoliccalcium/phospholipid-dependent protein kinase activity following phorbol estertreatment of EL4 thymoma cells. J Biol Chem. 1982 Nov 25;257(22):13193-6. PubMedPMID: 7142138."
        },
        {
          name:
            "Kraft AS, Anderson WB, Cooper HL, Sando JJ. Decrease in cytosoliccalcium/phospholipid-dependent protein kinase activity following phorbol estertreatment of EL4 thymoma cells. J Biol Chem. 1982 Nov 25;257(22):13193-6. PubMedPMID: 7142138."
        },
        {
          name:
            "Kraft AS, Anderson WB, Cooper HL, Sando JJ. Decrease in cytosoliccalcium/phospholipid-dependent protein kinase activity following phorbol estertreatment of EL4 thymoma cells. J Biol Chem. 1982 Nov 25;257(22):13193-6. PubMedPMID: 7142138."
        },
        {
          name:
            "Kraft AS, Anderson WB, Cooper HL, Sando JJ. Decrease in cytosoliccalcium/phospholipid-dependent protein kinase activity following phorbol estertreatment of EL4 thymoma cells. J Biol Chem. 1982 Nov 25;257(22):13193-6. PubMedPMID: 7142138."
        },
        {
          name:
            "Kraft AS, Anderson WB, Cooper HL, Sando JJ. Decrease in cytosoliccalcium/phospholipid-dependent protein kinase activity following phorbol estertreatment of EL4 thymoma cells. J Biol Chem. 1982 Nov 25;257(22):13193-6. PubMedPMID: 7142138."
        },
        {
          name:
            "Kraft AS, Anderson WB, Cooper HL, Sando JJ. Decrease in cytosoliccalcium/phospholipid-dependent protein kinase activity following phorbol estertreatment of EL4 thymoma cells. J Biol Chem. 1982 Nov 25;257(22):13193-6. PubMedPMID: 7142138."
        },
        {
          name:
            "Kraft AS, Anderson WB, Cooper HL, Sando JJ. Decrease in cytosoliccalcium/phospholipid-dependent protein kinase activity following phorbol estertreatment of EL4 thymoma cells. J Biol Chem. 1982 Nov 25;257(22):13193-6. PubMedPMID: 7142138."
        }
      ]
    };
  },
  methods: {
    getSelectedString() {
      return this.selected.length === 0
        ? ""
        : `${this.selected.length} record${
            this.selected.length > 1 ? "s" : ""
          } selected of ${this.data.length}`;
    }
  }
};
</script>
