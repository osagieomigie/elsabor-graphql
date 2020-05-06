const {gql} = require("apollo-server-express")

const schema = gql `
    type User{
        userId: String!
        email: String!
        username: String!
        type: Int!
        link: String
    }

    type Deal{
        dealId: String!
        userId: String!
        name: String! 
        description: String!
        link: String 
        expiryDate: String!
    }

    type Menu{
        menuId: String!
        userId: String!
        link: String
    }

    type SavedDeals{
        userId: String!
        dealId: String!
    }
`

module.exports = schema;