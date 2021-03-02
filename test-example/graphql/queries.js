/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      shipname
      latitude
      longitude
      imonumber
      nauticalmile
      bearing
      degree
      image
      owner
      createdAt
      updatedAt
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        shipname
        latitude
        longitude
        imonumber
        nauticalmile
        bearing
        degree
        image
        owner
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const postByOwner = /* GraphQL */ `
  query PostByOwner(
    $owner: String
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    postByOwner(
      owner: $owner
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        shipname
        latitude
        longitude
        imonumber
        nauticalmile
        bearing
        degree
        image
        owner
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
