/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateBook = /* GraphQL */ `
  subscription OnCreateBook {
    onCreateBook {
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
export const onUpdateBook = /* GraphQL */ `
  subscription OnUpdateBook {
    onUpdateBook {
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
export const onDeleteBook = /* GraphQL */ `
  subscription OnDeleteBook {
    onDeleteBook {
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
export const onCreateBookComment = /* GraphQL */ `
  subscription OnCreateBookComment {
    onCreateBookComment {
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
export const onUpdateBookComment = /* GraphQL */ `
  subscription OnUpdateBookComment {
    onUpdateBookComment {
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
export const onDeleteBookComment = /* GraphQL */ `
  subscription OnDeleteBookComment {
    onDeleteBookComment {
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
