<template>
  <div>
    <InputModal :purpose="'login'"></InputModal>
  </div>
</template>
<script>
import InputModal from "./InputModal.vue";
export default {
  components: { InputModal },
  name: "login",
};
</script>
<style scoped>
</style>