const { gql } = require("apollo-server-express");

const schema = gql`
  type User {
    userId: String
    email: String
    username: String
    type: Int
    link: String
  }

  type Deal {
    dealId: String!
    userId: String!
    name: String!
    description: String!
    link: String
    expiryDate: String!
  }

  type Menu {
    menuId: String!
    userId: String!
    link: String
  }

  type SavedDeals {
    userId: String!
    dealId: String!
  }

  input UserInput {
    userId: String!
    email: String
    userName: String
  }

  input MenuInput {
    userId: String!
    menuId: String
    link: String
  }

  input DealInput {
    dealId: String
    userId: String
    name: String
    description: String
    link: String
    expiryDate: String
  }

  input AddDealInput {
    dealId: String
    userId: String!
    name: String!
    description: String!
    link: String
    expiryDate: String!
  }

  input addSavedDealInput {
    dealId: String!
    userId: String!
  }

  type Query {
    """
    userId needed to query for a user
    """
    user(input: UserInput): User!
    """
    Returns all available deals
    """
    deals: [Deal]
    dealSearch(input: DealInput): [Deal]
    deal(input: DealInput): Deal!
    menu: [Menu]
    savedDeals(input: UserInput): [Deal]
  }

  type Mutation {
    deleteUser(input: UserInput): User!
    addDeal(input: AddDealInput): Deal!
    addSavedDeal(input: addSavedDealInput): Deal!
    addMenu(input: MenuInput): Menu!
  }
`;

module.exports = schema;
