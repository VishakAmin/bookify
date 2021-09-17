/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createBook = /* GraphQL */ `
  mutation CreateBook(
    $input: CreateBookInput!
    $condition: ModelBookConditionInput
  ) {
    createBook(input: $input, condition: $condition) {
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
export const updateBook = /* GraphQL */ `
  mutation UpdateBook(
    $input: UpdateBookInput!
    $condition: ModelBookConditionInput
  ) {
    updateBook(input: $input, condition: $condition) {
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
export const deleteBook = /* GraphQL */ `
  mutation DeleteBook(
    $input: DeleteBookInput!
    $condition: ModelBookConditionInput
  ) {
    deleteBook(input: $input, condition: $condition) {
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
export const createBookComment = /* GraphQL */ `
  mutation CreateBookComment(
    $input: CreateBookCommentInput!
    $condition: ModelBookCommentConditionInput
  ) {
    createBookComment(input: $input, condition: $condition) {
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
export const updateBookComment = /* GraphQL */ `
  mutation UpdateBookComment(
    $input: UpdateBookCommentInput!
    $condition: ModelBookCommentConditionInput
  ) {
    updateBookComment(input: $input, condition: $condition) {
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
export const deleteBookComment = /* GraphQL */ `
  mutation DeleteBookComment(
    $input: DeleteBookCommentInput!
    $condition: ModelBookCommentConditionInput
  ) {
    deleteBookComment(input: $input, condition: $condition) {
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
