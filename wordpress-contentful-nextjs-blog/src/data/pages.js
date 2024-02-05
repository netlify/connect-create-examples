import { gql } from '@apollo/client';

export const PAGE_FIELDS = gql`
  fragment PageFields on WpPage {
    wpChildren {
      nodes {
        id
        slug
        uri
        ... on WpPage {
          id
          title
        }
      }
    }
    id
    menuOrder
    wpParent {
      node {
        id
        slug
        uri
        ... on WpPage {
          title
        }
      }
    }
    slug
    title
    uri
  }
`;

export const QUERY_ALL_PAGES_INDEX = gql`
  ${PAGE_FIELDS}
  query AllPagesIndex {
    allWpPage {
      edges {
        node {
          ...PageFields
        }
      }
    }
  }
`;

export const QUERY_ALL_PAGES_ARCHIVE = gql`
  ${PAGE_FIELDS}
  query AllPagesIndex {
    allWpPage {
      edges {
        node {
          ...PageFields
        }
      }
    }
  }
`;

export const QUERY_ALL_PAGES = gql`
  ${PAGE_FIELDS}
  query AllPagesIndex {
    allWpPage {
      edges {
        node {
          ...PageFields
          content
          featuredImage {
            node {
              altText
              caption
              id
              sizes
              sourceUrl
            }
          }
        }
      }
    }
  }
`;

export const QUERY_PAGE_BY_URI = gql`
  query PageByUri($uri: String!) {
    wpPage(uri: { eq: $uri }) {
      featuredImageId
      wpChildren {
        nodes {
          id
          slug
          uri
          ... on WpPage {
            id
            title
          }
        }
      }
      featuredImage {
        node {
          altText
          caption
          id
          sizes
          sourceUrl
        }
      }
      id
      menuOrder
      wpParent {
        node {
          id
          slug
          uri
          ... on WpPage {
            title
          }
        }
      }
      slug
      title
      uri
    }
  }
`;

export const QUERY_PAGE_SEO_BY_URI = gql`
  query PageSEOByUri($uri: String!) {
    wpPage(uri: { eq: $uri }) {
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
        readingTime
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
