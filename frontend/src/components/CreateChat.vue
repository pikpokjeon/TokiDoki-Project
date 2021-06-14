<template>
  <div id="create" class="row">
    <InputModal
      :purpose="'createNewMsg'"
      v-bind:register-receiver="enterChat"
    ></InputModal>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
// import store from "../store";
import InputModal from "./InputModal.vue";

export default {
  name: "createChat",
  props: ["fromName"],
  components: { InputModal },
  methods: {
    ...mapMutations(["SET_CHAT"]),
  },
};
</script>
<style scoped>
#create {
  z-index: 9999;
  position: fixed;
  left: 42%;
  z-index: 999;
  width: 42vw;
  top: 10vh;
  /* background: blueviolet; */
  height: 65vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>