<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">Instructions</div>
    </q-card-section>

    <q-card-section>
      <div v-html="systemInstructions"></div>
    </q-card-section>

    <q-card-section></q-card-section>

    <q-separator />

    <q-card-actions vertical align="right">
      <q-btn color="primary" v-close-popup>Close</q-btn>
    </q-card-actions>
  </q-card>
</template>
<script>
export default {
  data() {
    return {
      systemInstructions: ""
    };
  },
  methods: {},
  //   computed: {
  //     ...mapGetters("nameData", ["memberInfo"])
  //   },
  mounted() {
    this.systemInstructions =
      "1. Please validate each publication that is marked <font color='Red'><b>  Publication needs to be validated</b></font> .</br> ";
    this.systemInstructions +=
      "2. Simply click on the row and mark the Publication as yours or not yours. </br>";
    this.systemInstructions +=
      "3. Click on the right hand selection <b>Filter</b> and only publications that need validation will be displayed. </br>";
    this.systemInstructions +=
      "4. This system is still in development so if you have a suggestion or a problem please let us know.";
  }
};
</script>
<style lang="scss"></style>
