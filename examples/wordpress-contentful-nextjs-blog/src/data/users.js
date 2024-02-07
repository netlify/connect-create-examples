import { gql } from '@apollo/client';

export const QUERY_ALL_USERS = gql`
  query AllUsers {
    allWpUser {
      edges {
        node {
          avatar {
            height
            width
            url
          }
          description
          id
          name
          roles {
            nodes {
              name
            }
          }
          slug
        }
      }
    }
    allContentfulComponentAuthor {
      nodes {
        avatar {
          height
          width
          url
        }
        id
        name
        slug
      }
    }
  }
`;

export const QUERY_ALL_USERS_SEO = gql`
  query AllUsersSeo {
    allWpUser {
      edges {
        node {
          id
          seo {
            metaDesc
            metaRobotsNofollow
            metaRobotsNoindex
            title
            social {
              youTube
              wikipedia
              twitter
              soundCloud
              pinterest
              mySpace
              linkedIn
              instagram
              facebook
            }
          }
        }
      }
    }
  }
`;
