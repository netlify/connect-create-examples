import { gql } from '@apollo/client';

export const QUERY_ALL_MENUS = gql`
  query AllMenus {
    allWpMenu {
      edges {
        node {
          id
          menuItems {
            nodes {
              cssClasses
              id
              parentId
              label
              title
              target
              path
            }
          }
          name
          slug
          locations
        }
      }
    }
  }
`;
