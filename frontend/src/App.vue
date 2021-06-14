<template>
  <div id="app">
    <login v-if="modalStatus['login']" v-bind:myName="getMyName"></login>
    <chat-list
      :from="myName"
      :chats="chats"
      @change-receiver="setReceiver"
    ></chat-list>
    <chat-room :from="username" :to="toname" :chats="chats"></chat-room>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters, mapMutations } from "vuex";
import ChatList from "./components/ChatList.vue";
import ChatRoom from "./components/ChatRoom.vue";
import Login from "./components/Login.vue";
import store from "./store";

import {
  USERS_QUERY,
  CHATS_QUERY,
  MSG_SENT_SUBSCRIPTION,
} from "./graphql/queries";
export default {
  components: {
    Login,
    ChatList,
    ChatRoom,
  },
  props: [],
  data() {
    return {
      username: undefined,
      toname: "",
      entered: false,
    };
  },
  created() {
    if (!this.myName)
      store.commit("SET_MODAL_STATUS", { target: "login", status: true });
  },
  apollo: {
    users: {
      query: JSON.parse(JSON.stringify(USERS_QUERY)),
    },
    chats: {
      query: JSON.parse(JSON.stringify(CHATS_QUERY)),
      subscribeToMore: {
        document: MSG_SENT_SUBSCRIPTION,
        updateQuery: (prevData, { subscriptionData }) => {
          return {
            chats: [...prevData.chats, subscriptionData.data.messageSent],
          };
        },
      },
    },
  },
  methods: {
    ...mapActions({}),
    ...mapMutations(["SET_MODAL_STATUS"]),

    getMyName(name) {
      this.username = name;
      return name;
    },

    setReceiver(payload) {
      alert(payload.receiver);
    },
  },
  computed: {
    ...mapState(["myName", "modalStatus"]),
    ...mapGetters({}),
  },
};
</script>


<style>
html {
  background: black;
}
body {
  overflow-y: hidden;
  overflow-x: hidden;
  margin: auto;
  min-height: 100vh;
}
#app {
  height: 100%;
  min-height: 110vh;
  width: 100%;
  margin: 0;
  display: flex;
  flex-wrap: nowrap;
}
div {
  /* border: 1px solid; */
}
p {
  white-space: break-spaces;
}
#hidden {
  display: none;
}
#input-modal {
  z-index: 20;
  display: flex;
  position: fixed;
  width: 600px;
  flex-wrap: wrap;
  justify-content: center;
  left: 35%;
  top: 20%;
  background: white;
  height: 40vh;
  border-radius: 10px;
  border: 1px solid #b0b0b0;
  align-items: center;
  box-shadow: 1px 19px 394px 565px rgb(0 0 0 / 44%);
}
#box {
  z-index: 20;
}
.left {
  position: absolute;
  width: 24.3vw;
  right: 58vw;
}
.right {
  position: absolute;
  width: 42vw;
  left: 42vw;
}
.top {
  display: flex;
  flex-wrap: nowrap;
  position: fixed;
  width: 24vw;
  background: white;
  border-right: 2px solid #e6eaff;
  margin: 0.8vh 0;
  height: 10vh;
  border-bottom: 1px solid #e0e0e0;
}

.top div {
  width: 50vw;
  margin: 1.5rem;
}
section {
  background: white;
  height: 90vh;
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  border-right: 1px solid #e0e0e0;
}
input[type="text"] {
  border: none;
}
input[type="text"]::active {
  border: none;
}
section div {
}
.round {
  border-radius: 5rem;
  display: flex;
  text-align: center;
  flex-wrap: nowrap;
  justify-content: center;
  background: #5b7aff;
  color: white;
  font-size: 0.8vw;
  letter-spacing: 0.1vw;
}
.flex {
  display: flex;
}
.center {
}
.chat-float {
  position: fixed;
  width: 42vw;
  height: 11vh;
  border-bottom: 2px solid #e0e0e0;
  z-index: 10;
  box-shadow: 2px 7px 19px -15px #0000006b;
  display: flex;
  justify-content: space-between;
}
.scrollable {
  /* background: tomato; */
  height: 68vh;
  overflow-y: scroll;
  width: 25vw;
  top: 11vh;
  position: fixed;
  overflow-x: hidden;
}

.scrollable::-webkit-scrollbar {
  width: 0.5vw;
}
.scrollable::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: #a6a7a7;
  border: 1px solid white;
}
.scrollable::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 10px;
  box-shadow: inset 0px 0px 5px white;
}
.button {
  cursor: pointer;
}
</style>
