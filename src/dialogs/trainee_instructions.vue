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
      "1. This system is still in development so if you have a suggestion or a problem please let us know. </br>";
    this.systemInstructions +=
      "2.  </br>";
    this.systemInstructions +=
      "3. </br>";
    this.systemInstructions +=
      "4. ";
  }
};
</script>
<style lang="scss"></style>
