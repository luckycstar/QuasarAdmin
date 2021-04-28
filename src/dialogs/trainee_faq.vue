<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">FAQ</div>
      <div class="text-subtitle2">
        To Add a item contact us via the
        <b>Problem/Suggestion Area</b>
      </div>
    </q-card-section>

    <q-card-section>
      <div v-html="systemFAQ"></div>
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
      systemFAQ: ""
    };
  },
  methods: {},
  //   computed: {
  //     ...mapGetters("nameData", ["memberInfo"])
  //   },
  mounted() {
    this.systemFAQ = ""
      "1.</br> ";
    this.systemFAQ +=
      "2. </br> ";
    this.systemFAQ +=
      "3.</br> ";
    this.systemFAQ +=
      "4. </br> ";
    this.systemFAQ +=
      "5. </br> ";
  }
};
</script>
<style lang="scss"></style>
