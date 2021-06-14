import gql from 'graphql-tag'

const USERS_QUERY = gql`query UserQuery
  {
    users {
      id
      name
    }
  }
`
const CHATS_QUERY = gql`query  ChatQuery
    {
        chats {
            id
            to
            from
            message
            dateSent
        }
    }
  `
const SEND_MSG_MUTATION = gql`
      mutation SendMessageMutation($to: String!, $from: String!, $message: String!) {
        sendMessage(
            to: $to,
          from: $from,
          message: $message
        ) {
          id
          to
          from
          message
          dateSent
        }
      }`
const REGISTER_USER_MUTATION = gql`
      mutation RegisterUserMutation($name: String!) {
        registerUser(
            name: $name
        ) {
          id
          name
        }
      }`
const MSG_SENT_SUBSCRIPTION = gql`
      subscription MessageSentSubscription {
        messageSent {
          id
          to
          from
          message
          dateSent

        }
      }
    `
export { USERS_QUERY, CHATS_QUERY, SEND_MSG_MUTATION, REGISTER_USER_MUTATION, MSG_SENT_SUBSCRIPTION }