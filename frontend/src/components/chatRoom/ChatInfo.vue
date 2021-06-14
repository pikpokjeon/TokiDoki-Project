<template>
  <section class="chat-float">
    <div v-if="toName">
      <p class="receiver-name">{{ toName }}</p>
      <div class="small-badge round">친구</div>
    </div>
    <div v-else><p>대화상대를 선택해 주세요</p></div>
    <div>
      <p>{{ myName }}<span>님</span></p>
      <!-- 사용자 변경 추가할 부분 -->
    </div>
  </section>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import store from "../../store";

export default {
  components: {},
  props: ["from"],
  data() {
    return {
      username: "",
      pwd: "",
      registered: false,
    };
  },
  methods: {
    ...mapMutations(["SET_MODAL_STATUS", "SET_LOGIN", "SET_TARGET"]),
    changeUser() {
      store.commit("SET_LOGIN", { myName: "" });
      store.commit("SET_TARGET", { fromName: "", toName: "" });
      store.commit("SET_MODAL_STATUS", { target: "login", status: true });
    },
  },
  computed: {
    ...mapState(["toName", "myName", "fromName"]),
  },
};
</script>
<style scoped>
section div {
  display: flex;
  align-items: center;
  height: 100%;
}
section div p {
  color: #7e7e7e;
  padding: 0 2vw;
}
.small-badge {
  align-items: center;
  height: 3vh;
  width: 3vw;
  margin: 0 1vw;
  background: #0fe0d1;
  font-weight: 600;
}
.button {
  background: white;
  border: 1px solid #5b7aff;
  color: #5b7aff;
  margin-right: 2vw;
}
.receiver-name {
  font-size: 1.3vw;
}
</style>