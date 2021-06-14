
//  const resolver
const chats = []
const chatrooms = {}
const users = []
const CHAT_CHANNEL = 'CHAT_CHANNEL'
const CHATROOM_CHANNEL = 'CHATROOM_CHANNEL'
const USER_CHANNEL = 'USER_CHANNEL'

const resolver = {
  Query: {
    users(root, args, context)
    {
      return users
    },
    chats(root, args, context)
    {
      return chats
    },
    chatrooms(root, { from }, context)
    {
      return chatrooms[from]
    }
  },

  Mutation: {
    sendMessage: (root, { to, from, message }, { pubsub }) =>
    {
      const d = new Date().getTime()
      const h = new Date(d).toLocaleDateString()
      const chat = ({ id: chats.length + 1, to, from, message, dateSent: h })
      chats.push(chat)
      pubsub.publish('CHAT_CHANNEL', { messageSent: chat })
      return (chat)
    },
    selectRoom: (root, { from }, { pubsub }) =>
    {
      return (chatrooms[from])
    },
    registerUser: (root, { name }, { pubsub }) =>
    {
      const user = ({ id: users.length + 1, name })

      if (!users.some((u) => u.name === name)) users.push(user)
      if (!chatrooms[name]) chatrooms[name] = []
      pubsub.publish('USER_CHANNEL', { registeredUser: user })
      return (user)
    }
  },
  Subscription: {
    messageSent: {
      subscribe: (root, args, { pubsub }) =>
      {
        return pubsub.asyncIterator(CHAT_CHANNEL)
      }
    },
  },
}
export { resolver }