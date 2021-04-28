<template>
  <q-page id="controlContainer" class="q-my-xl" padding>
    <!-- Page Content -->
    <div class="row q-col-gutter-sm">
      <!-- Grant Section -->
      <section class="col-9">
        <keep-alive>
          <component :is="currentComponent"></component>
        </keep-alive>
        <q-separator />
      </section>
      <!-- Options Section -->
      <section class="col-3">
        <!-- options header -->
        <q-toolbar class="bg-primary text-white">
          <div class="q-ml-lg text-h5 text-weight-bold">Options</div>
          <q-space />
          <q-tabs v-model="tab" class="q-mr-sm" shrink stretch>
            <q-btn flat size="md" class="q-mr-sm">Add New</q-btn>
          </q-tabs>
        </q-toolbar>
        <!-- Select Name  -->
        <q-select
          class="q-mt-sm"
          color="info"
          v-model="options.selectbox.selected"
          :options="options.selectbox.options"
          label="Select Name"
        >
          <template v-slot:prepend>
            <q-icon name="people" />
          </template>
        </q-select>
        <!-- Actions Buttons -->
        <q-list class="bg-white">
          <template v-for="(button, index) in options.actionBtns">
            <q-item clickable v-ripple :key="index" @click="switchPage(button.action)">
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
          </template>
        </q-list>
        <!-- Start Dialogs -->
        <!-- Profile-->
        <q-dialog v-model="options.dialog.profile" class="profileDialog">
          <profile-dialog></profile-dialog>
        </q-dialog>
        <!-- End Dialogs -->
      </section>
    </div>
  </q-page>
</template>

<script>
import GrantForm from "src/components/Forms/GrantForm";
import FundingForm from "src/components/Forms/FundingForm";
import SelectName from "src/components/Select/SelectName";

export default {
  name: "PageIndex",
  data() {
    return {
      currentComponent: GrantForm,
      options: {
        selectbox: {
          options: ["Mr William", "Dwyer CJ", "Smith", "Wyatt"],
          selected: null
        },
        actionBtns: [
          {
            icon: {
              name: "assignment",
              textcolor: "white",
              bgcolor: "amber"
            },
            title: "Page 1",
            body: "",
            action: "GrantForm"
          },
          {
            icon: {
              name: "assignment",
              textcolor: "white",
              bgcolor: "amber"
            },
            title: "Page 2",
            body: "",
            action: "FundingForm"
          },
          {
            icon: {
              name: "assignment",
              textcolor: "white",
              bgcolor: "amber"
            },
            title: "Page 3",
            body: "",
            action: null
          }
        ],
        dialog: {
          profile: false
        }
      }
    };
  },
  methods: {
    switchPage(switchToThis) {
      this.currentComponent = switchToThis;
    }
  },
  components: {
    GrantForm,
    FundingForm,
    SelectName
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
</style>
