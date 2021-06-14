
export const schema = `
type test{
    t(name:String) : String!
}

type Chat{
    id:Int!
    to:String!
    from:String!
    message:String!
    dateSent:String
    dateRead:String
}

type User{
    id:Int!
    name:String!
}

type Chatroom{
    chats: [Chat]
}

type Query{
    chats:[Chat]
    chatrooms(from: String): [Chat]
    users: [User]
}

type Mutation{
    sendMessage(to:String!,from:String!,message:String!):Chat
    selectRoom(from:String!):Chat
    registerUser(name:String!):User
}

type Subscription{
    messageSent:Chat
}
 `
