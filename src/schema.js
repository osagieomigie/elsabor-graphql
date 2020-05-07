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

    input UserInput{
        userId: String
        email: String
        userName: String
    }

    input DealInput{
        dealId: String!
    }

    type Query{
        user(input: UserInput): User!
        """Can be used for returning all available deals, and when searching for specific deals"""
        deals(input: DealInput): [Deal]
        deal(input: DealInput): Deal!
        menu: [Menu]
        savedDeals(input: UserInput): [Deal]
    }
`

module.exports = schema;