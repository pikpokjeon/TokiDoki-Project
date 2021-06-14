<template>
  <article>
    <div
      v-for="(chat, id) in Object.values(myAllMessage)"
      :key="`allchat-${id}`"
    >
      <!-- 대화 검색시 후에 사용할 부분 -->
      {{ chat.message }}
    </div>
    <div
      class="chat-item"
      v-for="(chat, id) in Object.entries(myLastChatList)"
      @click="selectChat(chat[0])"
      :key="`chat-${id}`"
    >
      <ProfileLogo></ProfileLogo>
      <div>
        <p class="username">
          {{ chat[0] }}
          <span>
            {{ chat[1][chat[1].length - 1].dateSent }}
          </span>
        </p>
        <p>
          {{ chat[1][chat[1].length - 1].message }}
        </p>
      </div>
    </div>
  </article>
</template>
<script>
import { mapActions, mapState, mapMutations } from "vuex";
import store from "../../store";
import ProfileLogo from "../ProfileLogo.vue";
export default {
  components: { ProfileLogo },
  props: ["chats", "from"],
  data() {
    return {
      friendChatLists: {},
    };
  },
  methods: {
    ...mapActions({}),
    ...mapMutations(["SET_TARGET"]),
    selectChat(chat) {
      store.commit("SET_TARGET", { toName: chat, fromName: this.myName });
    },
  },
  computed: {
    ...mapState(["fromName", "toName", "myName"]),
    myAllMessage() {
      const { myName } = this;
      if (this.chats) {
        return this.chats.reduce((acc, cur) => {
          if (cur.to === myName || cur.from === myName) {
            const receiver = cur.to === myName ? cur.from : cur.to;
            if (!this.friendChatLists[receiver]) {
              this.$set(this.friendChatLists, receiver, []);
            }
            if (!acc[myName]) acc[myName] = [];
            this.friendChatLists[receiver].push(cur);
            this.friendChatLists[receiver] =
              this.friendChatLists[receiver].flat();
            acc[myName].push(cur);
          }
          return acc;
        }, {});
      }
      return false;
    },
    myLastChatList() {
      return this.friendChatLists;
    },
  },
};
</script>
<style scoped>
.chat-item {
  width: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
}
.username {
  font-weight: 600;
}
</style>