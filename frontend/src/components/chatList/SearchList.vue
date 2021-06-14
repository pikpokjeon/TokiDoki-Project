<template>
  <section>
    <div class="round search-box">
      <p>O</p>
      <input type="text" placeholder="대화를 검색하세요." />
    </div>
    <div class="scrollable chat-user-list">
      <ChatItem :chats="chats" :from="myName"></ChatItem>
    </div>
    <div class="append-list">
      <p>이전 대화 불러오기</p>
    </div>
  </section>
</template>
<script>
import { mapState } from "vuex";
import ChatItem from "./ChatItem.vue";
export default {
  components: { ChatItem },
  props: ["chats", "from"],
  computed: {
    ...mapState(["myName"]),
  },
};
</script>
<style scoped>
.append-list {
  height: 10vh;
  width: 25vw;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;
  background: aliceblue;
}
article {
  width: 100%;
}
.search-box {
  position: fixed;
  width: 21vw;
  top: 10vh;
  background: white;
  margin: 2rem;
  border: 2px solid #d8d8d8;
}
.chat-user-list {
  height: 69vh;
  top: 21vh;
  position: fixed;
  overflow-x: hidden;
  padding: 0 2vw;
  width: 21vw;
}
.chatuser-list::-webkit-scrollbar-thumb {
  background: #d8d8d8;
}
</style>