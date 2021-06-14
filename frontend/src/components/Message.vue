<template>
  <div>
    <article v-for="{ from, to, message, id } in chats" :key="id">
      <p>from:{{ from === myName }}</p>
      <p>to:{{ to }}</p>
      <div>{{ message }}</div>
    </article>
    <section>
      <input
        type="text"
        class="form-control"
        placeholder="Type your message..."
        v-model="message"
        @keyup.enter="sendMessage"
      />
    </section>
  </div>
</template>

<script>
import {
  CHATS_QUERY,
  SEND_MSG_MUTATION,
  MSG_SENT_SUBSCRIPTION,
} from "../graphql/queries";
export default {
  props: ["from", "to"],
  data() {
    return {
      message: "aaa",
      msgs: [],
    };
  },
  apollo: {
    chats: {
      query: JSON.parse(JSON.stringify(CHATS_QUERY)),
      subscribeToMore: {
        document: MSG_SENT_SUBSCRIPTION,
        updateQuery: (previousData, { subscriptionData }) => {
          return {
            chats: [...previousData.chats, subscriptionData.data.messageSent],
          };
        },
      },
    },
  },
  methods: {
    async sendMessage() {
      const message = this.message;
      this.message = "";
      await this.$apollo.mutate({
        mutation: SEND_MSG_MUTATION,
        variables: {
          to: `${this.to}`,
          from: `${this.from}`,
          message: `${message}`,
        },
        // update: (_, { data: { from, message } }) => {
        //   const data = _.readQuery({ query: CHATS_QUERY });
        //   data.msgs.push({ from, message });
        //   _.writeQuery({ query: CHATS_QUERY, data });
        // },
      });
    },
  },
};
</script>

<style>
</style>