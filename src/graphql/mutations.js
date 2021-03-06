/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const userBooksHandler = /* GraphQL */ `
  mutation UserBooksHandler($input: userBooksInput!) {
    userBooksHandler(input: $input)
  }
`;
export const createBook = /* GraphQL */ `
  mutation CreateBook(
    $input: CreateBookInput!
    $condition: ModelBookConditionInput
  ) {
    createBook(input: $input, condition: $condition) {
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
export const updateBook = /* GraphQL */ `
  mutation UpdateBook(
    $input: UpdateBookInput!
    $condition: ModelBookConditionInput
  ) {
    updateBook(input: $input, condition: $condition) {
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
export const deleteBook = /* GraphQL */ `
  mutation DeleteBook(
    $input: DeleteBookInput!
    $condition: ModelBookConditionInput
  ) {
    deleteBook(input: $input, condition: $condition) {
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
export const createUserBooks = /* GraphQL */ `
  mutation CreateUserBooks(
    $input: CreateUserBooksInput!
    $condition: ModelUserBooksConditionInput
  ) {
    createUserBooks(input: $input, condition: $condition) {
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
export const updateUserBooks = /* GraphQL */ `
  mutation UpdateUserBooks(
    $input: UpdateUserBooksInput!
    $condition: ModelUserBooksConditionInput
  ) {
    updateUserBooks(input: $input, condition: $condition) {
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
export const deleteUserBooks = /* GraphQL */ `
  mutation DeleteUserBooks(
    $input: DeleteUserBooksInput!
    $condition: ModelUserBooksConditionInput
  ) {
    deleteUserBooks(input: $input, condition: $condition) {
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
export const createBookComment = /* GraphQL */ `
  mutation CreateBookComment(
    $input: CreateBookCommentInput!
    $condition: ModelBookCommentConditionInput
  ) {
    createBookComment(input: $input, condition: $condition) {
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
export const updateBookComment = /* GraphQL */ `
  mutation UpdateBookComment(
    $input: UpdateBookCommentInput!
    $condition: ModelBookCommentConditionInput
  ) {
    updateBookComment(input: $input, condition: $condition) {
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
export const deleteBookComment = /* GraphQL */ `
  mutation DeleteBookComment(
    $input: DeleteBookCommentInput!
    $condition: ModelBookCommentConditionInput
  ) {
    deleteBookComment(input: $input, condition: $condition) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      book {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      book {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      book {
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
export const createPicture = /* GraphQL */ `
  mutation CreatePicture(
    $input: CreatePictureInput!
    $condition: ModelPictureConditionInput
  ) {
    createPicture(input: $input, condition: $condition) {
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
export const updatePicture = /* GraphQL */ `
  mutation UpdatePicture(
    $input: UpdatePictureInput!
    $condition: ModelPictureConditionInput
  ) {
    updatePicture(input: $input, condition: $condition) {
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
export const deletePicture = /* GraphQL */ `
  mutation DeletePicture(
    $input: DeletePictureInput!
    $condition: ModelPictureConditionInput
  ) {
    deletePicture(input: $input, condition: $condition) {
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
