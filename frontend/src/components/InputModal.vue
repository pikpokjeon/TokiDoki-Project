<template>
  <div>
    <div id="input-modal">
      <div method="post" @submit.prevent="enterChat">
        <div id="register-box" class="form-group">
          <div class="input-group">
            <input
              id="username-input"
              type="text"
              class="form-control"
              placeholder="이름"
              autocomplete="off"
              v-model="username"
              @focus="showUserList"
              @keyup="renderNameQuick"
              @enter="renderNameQuick"
            />
          </div>
          <article
            v-show="isShowUserList"
            class="userlist-dropdown"
            @click="showUserList"
          >
            <div class="inform" v-show="!checkIfExist(users, username)">
              <p>
                <span id="typed-name">{{ username }}</span
                ><span v-if="modalStatus['login']"
                  >로 새로운 아이디를 생성</span
                >
                <span v-else>님과 새로운 대화를 시작합니다</span>
              </p>
            </div>
            <div
              v-for="(user, i) in filteredList(users)"
              :class="['userlist-item', i % 2 !== 0 ? 'even' : 'odd']"
              :key="i"
              @click="selectFromList(user.name)"
            >
              <p>{{ user.name }}</p>
            </div>
          </article>
          <textarea
            v-if="purpose === 'createNewMsg' && myName"
            id="send-input"
            type="text"
            class="form-control"
            placeholder="메세지를 입력하세요."
            v-model="message"
          ></textarea>
        </div>

        <div v-if="modalStatus['login']" class="button-group">
          <button class="register" @click="entryAction('register')">
            등록하기
          </button>
          <button class="login" @click="entryAction('login')">로그인</button>
        </div>

        <div v-else class="button-group">
          <button class="login" @click="entryAction('sendNewMsg')">
            메세지 보내기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import {
  REGISTER_USER_MUTATION,
  USERS_QUERY,
  SEND_MSG_MUTATION,
} from "../graphql/queries";
import store from "../store";

export default {
  components: {},
  name: "login",
  props: ["purpose", "hasModal"],
  data() {
    return {
      username: "",
      message: "",
      isShowUserList: false,
      entered: false,
    };
  },
  apollo: {
    users: {
      query: JSON.parse(JSON.stringify(USERS_QUERY)),
    },
  },
  methods: {
    ...mapMutations(["SET_LOGIN", "SET_MODAL_STATUS"]),
    renderNameQuick() {
      this.$nextTick(() => {
        document.getElementById("typed-name").innerText = this.username;
      });
    },
    showUserList() {
      this.isShowUserList = !this.isShowUserList;
    },
    selectFromList(name) {
      this.username = name;
    },

    async entryAction(action) {
      this.isClose = action === "register" ? false : true;
      if (action === "login") {
        store.commit("SET_LOGIN", { myName: this.username });
        store.commit("SET_MODAL_STATUS", { target: "login", status: false });
        await this.$emit("myName", this.username);
      } else if (action === "register") {
        await this.$apollo.mutate({
          mutation: REGISTER_USER_MUTATION,
          variables: {
            name: this.username,
          },
        });
      } else if (action === "sendNewMsg") {
        await this.sendMessage();
      }
      store.commit("SET_MODAL_STATUS", { target: "input", status: false });
    },
    async sendMessage() {
      if (this.username) {
        store.commit("SET_CHAT", {
          toName: this.username,
          fromName: this.myName,
        });
        const message = this.message;
        this.message = "";
        await this.$apollo.mutate({
          mutation: SEND_MSG_MUTATION,
          variables: {
            to: `${this.username}`,
            from: `${this.myName}`,
            message: `${message}`,
          },
        });
      } else {
        alert("대화방을 선택 해주세요 모달");
      }
    },
  },
  computed: {
    ...mapState(["fromName", "myName", "modalStatus"]),
    filteredList() {
      return (initList) => {
        return initList.filter(
          (user) => user.name.indexOf(this.username[0]) > -1
        );
      };
    },
    checkIfExist() {
      return (users, name) => {
        if (users.some((v) => v.name === name)) return true;
        else return false;
      };
    },
  },
};
</script>
<style scoped>
#register-box {
  width: 550px;
  background: white;
}
#username-input {
  width: 29vw;
  height: 5vh;
  font-size: 1vw;
  text-align: center;
  border: none;
  background: #e7f4ff;
}
button {
  width: 30vw;
  height: 6vh;
  font-size: 0.85vw;
  align-items: center;
  letter-spacing: 0.1vw;
  border: 0;
  cursor: pointer;
}
.register {
}
.login {
  background: #5b7aff;
  color: white;
}
.button-group {
  width: 29vw;
  display: flex;
  flex-wrap: wrap-reverse;
  padding-top: 1vw;
}
.userlist-dropdown {
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  width: 28vw;
  max-height: 50vh;
  margin: 0.5vh 0 0 0.5vw;
  overflow: auto;
  position: fixed;
  background: white;
  box-shadow: 0 8px 6px -6px rgba(0, 0, 0, 0.452);
  text-align: center;
  border: 1px solid #e3e3e3;
}
.userlist-dropdown::-webkit-scrollbar {
  width: 0.5vw;
}
.userlist-dropdown::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: #a6a7a7;
  border: 1px solid white;
}
.userlist-dropdown::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 10px;
  box-shadow: inset 0px 0px 5px white;
}
.userlist-item {
  cursor: pointer;

  border-bottom: 1px solid #e3e3e3;
  height: 5vh;
  width: 100%;

  display: flex;
  justify-content: center;
}
.userlist-item:hover {
  background: #5b7aff;
  color: white;
}
.even {
  background: #e7f4ff;
}
.inform {
  background: #5b7aff;
  color: white;
  width: 100%;
}
#send-input {
  width: 28.7vw;
  border: 2px solid #e2e2e2;
  height: 15vh;
  font-size: 1vw;
}
</style>