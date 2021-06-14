<template>
  <article class="chat-float send-box">
    <textarea
      id="send-input"
      type="text"
      class="form-control"
      placeholder="메세지를 입력하세요."
      v-model="message"
    ></textarea>
    <div class="round send-button" @click="sendMessage">보내기</div>
  </article>
</template>
<script>
import { mapState } from "vuex";
import { SEND_MSG_MUTATION } from "../../graphql/queries";
export default {
  components: {},
  props: [],
  data() {
    return {
      message: "",
    };
  },
  computed: {
    ...mapState(["fromName", "toName", "myName"]),
  },
  methods: {
    async sendMessage() {
      if (this.toName) {
        const message = this.message;
        this.message = "";
        await this.$apollo.mutate({
          mutation: SEND_MSG_MUTATION,
          variables: {
            to: `${this.toName}`,
            from: `${this.myName}`,
            message: `${message}`,
          },
        });
      } else {
        alert("대화방을 선택 해주세요");
      }
    },
  },
};
</script>
<style scoped>
.send-box {
  background: white;
  height: 22vh;
  width: 42vw;
  position: fixed;
  bottom: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
textarea {
  width: 80%;
}
.send-input {
  width: 80%;
}
.send-button {
  width: 10rem;
  height: 5vh;
  display: flex;
  align-items: center;
  margin: 2vh 0 0 25vw;
}
</style>