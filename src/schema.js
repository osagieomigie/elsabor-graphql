const { gql } = require("apollo-server-express");

const schema = gql`
  type User {
    id: String
    userId: String
    email: String
    username: String
    type: Int
    link: String
  }

  type Deal {
    id: String
    dealId: String!
    userId: String!
    name: String!
    description: String!
    link: String
    expiryDate: String!
  }

  type Menu {
    id: String
    menuId: String!
    userId: String!
    link: String
  }

  type SavedDeals {
    id: String
    userId: String!
    dealId: String!
  }

  input UserInput {
    userId: String
    email: String
    username: String
  }

  input AddUserInput {
    email: String!
    username: String
    type: Int!
    link: String
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
    """ userId needed to query for a user. Returns a User if input was valid """
    user(input: UserInput): User!

    """ used when a user's ID is unknown (e.g. at login). Returns a User if input was valid """
    loginQuery(input: UserInput!): User!

    """ Returns all available deals """
    deals: [Deal]

    """ Used for retrieving all deals associated with a specific user """
    dealSearch(input: DealInput): [Deal]

    """ Used for querying a specific deal"""
    deal(input: DealInput): Deal!

    menu: [Menu]

    savedDeals(input: UserInput): [Deal]
  }

  type Mutation {
    """Used for creating a new User. Must return the newly created User, to signify that the User was created"""
    addUser(input: AddUserInput): User!

    """Used for Deleting a User. Must return the deleted User, to signify that the User was deleted"""
    deleteUser(input: UserInput): User!

    """Used for creating a Deal. Must return the newly created Deal, to signify that the Deal was created"""
    addDeal(input: AddDealInput): Deal!

    """Used for Deleting a User's saved deal. Must return the deleted Deal, to signify that the Deal was deleted"""
    addSavedDeal(input: addSavedDealInput): Deal!

    """Used for creating a new Menu. Must return the newly created Menu, to signify that the Menu was created"""
    addMenu(input: MenuInput): Menu!
  }
`;

//TODO: Update user, deal
module.exports = schema;
