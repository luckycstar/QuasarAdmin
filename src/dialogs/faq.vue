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
    this.systemFAQ =
      "1. When will Impact Factors be added?  We are currently working on this item</br> ";
    this.systemFAQ +=
      "2. When will Citation Counts be added?  We are currently working on this item; however you can see the citation count if you click on the iCite link.</br> ";
    this.systemFAQ +=
      "3.Will you add Cancer Word Counts?  The NCI has a dictionary with over 8,000 words.  We are current developing a process to count the Cancer related words both in the title and the abstract.</br> ";
    this.systemFAQ +=
      "4. How can we get in contact?  Click on the Problem/Suggestion link and what you send will be recorded and also texted to the appropriate personnel.</br> ";
    this.systemFAQ +=
      "5. Why is loading co-author information sometimes slow.  Both co-author affiliation and abstract information is pulled fresh every time from PubMed.  Sometimes there is a wait that is imposed by PubMed.</br> ";
  }
};
</script>
<style lang="scss"></style>
