<template>
  <div class="left">
    <NewChat></NewChat>
    <SearchList :chats="chats"></SearchList>
  </div>
</template>
<script>
import NewChat from "./chatList/NewChat.vue";
import SearchList from "./chatList/SearchList.vue";

export default {
  components: { NewChat, SearchList },
  props: ["chats", "from"],
};
</script>
<style scoped>
</style>