/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getBook = /* GraphQL */ `
  query GetBook($id: ID!) {
    getBook(id: $id) {
      id
      title
      authors
      description
      published
      image
      link
      etag
      bookComments {
        items {
          id
          comment
          userId
          userName
          createdAt
          updatedAt
        }
        nextToken
      }
      user {
        items {
          id
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
        title
        authors
        description
        published
        image
        link
        etag
        bookComments {
          nextToken
        }
        user {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUserBooks = /* GraphQL */ `
  query GetUserBooks($id: ID!) {
    getUserBooks(id: $id) {
      id
      user {
        id
        book {
          nextToken
        }
        createdAt
        updatedAt
      }
      book {
        id
        title
        authors
        description
        published
        image
        link
        etag
        bookComments {
          nextToken
        }
        user {
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
export const listUserBooks = /* GraphQL */ `
  query ListUserBooks(
    $filter: ModelUserBooksFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserBooks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        user {
          id
          createdAt
          updatedAt
        }
        book {
          id
          title
          authors
          description
          published
          image
          link
          etag
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
export const getBookComment = /* GraphQL */ `
  query GetBookComment($id: ID!) {
    getBookComment(id: $id) {
      id
      comment
      userId
      userName
      commentBook {
        id
        title
        authors
        description
        published
        image
        link
        etag
        bookComments {
          nextToken
        }
        user {
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
        userId
        userName
        commentBook {
          id
          title
          authors
          description
          published
          image
          link
          etag
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
export const getUser = /* GraphQL */ `
  query GetUser(
    $id: ID!
    $limit: Int
    $nextToken: String
  ) {
    getUser(id: $id) {
      id
      book(limit: $limit, nextToken: $nextToken) {

        nextToken
        items {
          id
          createdAt
          updatedAt
          book {
          title
          id
          authors
          createdAt
          description
          etag
          image
          link
          published
          updatedAt
          bookComments {
            items {
              comment
              userName
              userId
              updatedAt
              id
              createdAt
            }
          }
        }
        }
        
      }
      createdAt
      updatedAt
    } 
  }
`;

export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        book {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPicture = /* GraphQL */ `
  query GetPicture($id: ID!) {
    getPicture(id: $id) {
      id
      file {
        bucket
        region
        key
      }
      createdAt
      updatedAt
    }
  }
`;
export const listPictures = /* GraphQL */ `
  query ListPictures(
    $filter: ModelPictureFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPictures(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        file {
          bucket
          region
          key
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
