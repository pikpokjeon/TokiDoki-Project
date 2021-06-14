<template>
  <div>
    <article class="top">
      <div><p>안읽은 대화(<span>2</span>)</p></div>
      <div class="round">
        <p>+</p>
        <p @click="openNewMsg">새로운 메세지</p>
      </div>
    </article>
    <CreateChat
      v-if="modalStatus['input']"
      v-on:registerreceiver="hasRegisteredReceiver"
      id="create-box"
    >
    </CreateChat>
  </div>
</template>
<script>
import { mapActions, mapState, mapMutations } from "vuex";
import store from "../../store";
import CreateChat from "../CreateChat.vue";

export default {
  components: { CreateChat },
  methods: {
    ...mapActions({}),
    ...mapMutations(["SET_MODAL_STATUS"]),

    openNewMsg() {
      store.commit("SET_MODAL_STATUS", { target: "input", status: true });
    },
  },
  computed: {
    ...mapState(["modalStatus"]),
  },
};
</script>
<style scoped>
#create-box {
  position: fixed;
  left: 42vw;
  z-index: 999;
  width: 42vw;
  top: 10vh;
  height: 65vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>