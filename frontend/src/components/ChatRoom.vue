<template>
  <div class="right">
    <ChatInfo :chats="chats"></ChatInfo>
    <ChatArea :chats="chats"></ChatArea>
  </div>
</template>
<script>
import ChatInfo from "./chatRoom/ChatInfo.vue";
import ChatArea from "./chatRoom/ChatArea.vue";

export default {
  components: {
    ChatInfo,
    ChatArea,
  },
  props: ["chats"],
};
</script>
<style scoped>
</style>