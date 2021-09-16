/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getBook = /* GraphQL */ `
  query GetBook($id: ID!) {
    getBook(id: $id) {
      id
      userId
      title
      authors
      description
      published
      image
      link
      bookComments {
        items {
          id
          comment
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listBooks = /* GraphQL */ `
  query ListBooks(
    $filter: ModelBookFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBooks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        title
        authors
        description
        published
        image
        link
        bookComments {
          items {
            id
            comment
            createdAt
            updatedAt
          }
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getBookComment = /* GraphQL */ `
  query GetBookComment($id: ID!) {
    getBookComment(id: $id) {
      id
      comment
      commentBook {
        id
        userId
        title
        authors
        description
        published
        image
        link
        bookComments {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listBookComments = /* GraphQL */ `
  query ListBookComments(
    $filter: ModelBookCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBookComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        comment
        commentBook {
          id
          userId
          title
          authors
          description
          published
          image
          link
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
