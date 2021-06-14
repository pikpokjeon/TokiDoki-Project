<template>
  <section>
    <div class="msg-list scrollable">
      <Message :chats="chats" :sender="from"></Message>
    </div>
    <SendInput :chats="chats"></SendInput>
  </section>
</template>
<script>
import Message from "./Message";
import SendInput from "./SendInput";

export default {
  components: { Message, SendInput },
  props: ["chats", "from"],
};
</script>
<style scoped>
.msg-list {
  width: 42vw;
  display: flex;
  flex-direction: column-reverse;
}
</style>