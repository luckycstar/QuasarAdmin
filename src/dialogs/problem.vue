<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="my-card">
      <q-banner v-if="alert" dense inline-actions class="text-white bg-blue">
        Message is being sent.
        <template v-slot:action></template>
      </q-banner>

      <q-card-section>
        <div class="text-h6">Problem or Suggestion</div>
        <div class="text-subtitle2">
          Your information will be sent directly to our cell phone via a text
          message.
        </div>
      </q-card-section>

      <q-card-section>
        <div>
          <q-input clearable clear-icon="close" v-model="problemInput" filled type="textarea" />

          <!-- <v-textarea v-model="problemInput" clearable auto-grow name="problem-input" outlined value></v-textarea> -->
        </div>
      </q-card-section>

      <q-card-section></q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn color="primary" v-close-popup>Close</q-btn>
        <q-btn color="primary" @click="sendProblem()">Submit</q-btn>
      </q-card-actions>
      <q-banner v-if="alertDone" dense inline-actions class="text-white bg-blue">
        Message jhas been sent you can close this form or send another message.
        <template
          v-slot:action
        ></template>
      </q-banner>
    </q-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      problemInput: "",
      alert: false,
      alertDone: false
    };
  },
  methods: {
    sendProblem() {
      this.sendMessage(this.problemInput);
      this.alert = true;
      setTimeout(this.removeErrors, 3000);
      //  this.show_problem = false;
    },
    removeErrors() {
      this.alert = false;
      this.problemInput = " ";
      this.alertDone = true;
      setTimeout(this.removeErrorDone, 3000);

      // this.show_problem = false;
    },

    removeErrorDone() {
      this.alertDone = false;
    },

    sendMessage(message) {
      let group = "+18438225929";
      // let message = JSON.stringify(this.messageInput);
      this.$axios({
        method: "post",
        url: "https://restapi20190104050748.azurewebsites.net/api/SMS",
        params: {
          group: group,
          message: this.postID + " " + message
        }
      });
      //   .then(function(response) {
      //    self.messageInput = "message has been sent";
      //    self.selectModel = "";
      //  console.log(response);
      //   })
      //   .catch(function(error) {
      // self.messageInput =
      //   "message has not been sent.  There has been an error with the SMS service.";
      // console.log(error);
      //    });
    }
  },
  //   computed: {
  //     ...mapGetters("nameData", ["memberInfo"])
  //   },
  mounted() {}
};
</script>
<style lang="scss">
.my-card {
  width: 100%;
  max-width: 750px;
}
</style>
