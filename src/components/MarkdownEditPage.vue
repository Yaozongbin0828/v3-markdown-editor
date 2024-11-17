<script setup>
import { ref } from "vue";

defineProps({
  msg: String,
});

const count = ref(0);
</script>

<template>
  <v-md-editor v-model="text" height="600px"></v-md-editor>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
