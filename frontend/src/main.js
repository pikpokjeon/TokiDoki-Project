import Vue from 'vue'
import Vuex from 'vuex'
import VueApollo from 'vue-apollo'
import App from './App.vue'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { split } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import store from './store'


Vue.config.productionTip = true

const httpLink = new HttpLink({
  uri: 'http://localhost:8282/'
})

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:8282/',
  options: {
    reconnect: true
  }
})

const link = split(
  ({ query }) =>
  {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink
)

const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  connectToDevTools: true
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

Vue.use(VueApollo)
Vue.use(Vuex)

new Vue({
  apolloProvider,
  store,
  render: h => h(App)
}).$mount('#app')