<template>
  <!-- Select Name - (selectbox)  -->
  <q-select
    class="q-mt-sm"
    color="info"
    v-model="selectbox.selected"
    :options="selectbox.options"
    label="Select Name"
  >
    <template v-slot:prepend>
      <q-icon name="people" />
    </template>
  </q-select>
</template>

<script>
export default {
  data() {
    return {
      selectbox: {
        options: ["Mr William", "Dwyer CJ", "Smith", "Wyatt"],
        selected: null
      }
    };
  }
};
</script>

<style></style>
