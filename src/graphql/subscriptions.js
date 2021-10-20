/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateBook = /* GraphQL */ `
  subscription OnCreateBook {
    onCreateBook {
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
export const onUpdateBook = /* GraphQL */ `
  subscription OnUpdateBook {
    onUpdateBook {
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
export const onDeleteBook = /* GraphQL */ `
  subscription OnDeleteBook {
    onDeleteBook {
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
export const onCreateUserBooks = /* GraphQL */ `
  subscription OnCreateUserBooks {
    onCreateUserBooks {
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
export const onUpdateUserBooks = /* GraphQL */ `
  subscription OnUpdateUserBooks {
    onUpdateUserBooks {
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
export const onDeleteUserBooks = /* GraphQL */ `
  subscription OnDeleteUserBooks {
    onDeleteUserBooks {
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
export const onCreateBookComment = /* GraphQL */ `
  subscription OnCreateBookComment {
    onCreateBookComment {
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
export const onUpdateBookComment = /* GraphQL */ `
  subscription OnUpdateBookComment {
    onUpdateBookComment {
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
export const onDeleteBookComment = /* GraphQL */ `
  subscription OnDeleteBookComment {
    onDeleteBookComment {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreatePicture = /* GraphQL */ `
  subscription OnCreatePicture {
    onCreatePicture {
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
export const onUpdatePicture = /* GraphQL */ `
  subscription OnUpdatePicture {
    onUpdatePicture {
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
export const onDeletePicture = /* GraphQL */ `
  subscription OnDeletePicture {
    onDeletePicture {
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
