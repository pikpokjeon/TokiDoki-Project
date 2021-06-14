<template>
  <div>
    <article
      v-for="(chat, id) in filtered(chats)"
      :class="[chat.from === myName ? 'sent' : 'received']"
      :key="id"
    >
      <div>{{ chat.message }}</div>
    </article>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  components: {},
  props: ["chats"],
  computed: {
    ...mapState(["toName", "myName"]),
    filtered() {
      return (chats) => {
        return chats.filter(
          (c) =>
            (c.from === this.myName || c.to === this.myName) &&
            (c.from === this.toName || c.to === this.toName)
        );
      };
    },
  },
};
</script>
<style scoped>
div {
  background: white;
  border: none;
  padding: 1vw;
  white-space: pre-wrap;
  color: #808080;
}
.sent {
  display: block;
  white-space: pre-wrap;
  text-align: right;
}
</style>