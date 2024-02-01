import { gql } from '@apollo/client';

export const QUERY_ALL_CATEGORIES = gql`
  query AllCategories {
    allWpCategory {
      edges {
        node {
          databaseId
          description
          id
          name
          slug
        }
      }
    }
  }
`;

export const QUERY_CATEGORY_BY_SLUG = gql`
  query CategoryBySlug($slug: String!) {
    wpCategory(slug: { eq: $slug }) {
      databaseId
      description
      id
      name
      slug
    }
  }
`;

export const QUERY_CATEGORY_SEO_BY_SLUG = gql`
  query CategorySEOBySlug($slug: String!) {
    wpCategory(slug: { eq: $slug }) {
      id
      seo {
        canonical
        metaDesc
        metaRobotsNofollow
        metaRobotsNoindex
        opengraphAuthor
        opengraphDescription
        opengraphModifiedTime
        opengraphPublishedTime
        opengraphPublisher
        opengraphTitle
        opengraphType
        title
        twitterDescription
        twitterTitle
        twitterImage {
          altText
          sourceUrl
          mediaDetails {
            width
            height
          }
        }
        opengraphImage {
          altText
          sourceUrl
          mediaDetails {
            height
            width
          }
        }
      }
    }
  }
`;
