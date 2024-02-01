import { gql } from '@apollo/client';

export const POST_FIELDS = gql`
  fragment PostFields on WpPost {
    id
    categories {
      nodes {
        databaseId
        id
        name
        slug
      }
    }
    databaseId
    date
    isSticky
    slug
    title
  }
`;

export const QUERY_ALL_POSTS_INDEX = gql`
  ${POST_FIELDS}
  query AllPostsIndex {
    allWpPost {
      edges {
        node {
          ...PostFields
        }
      }
    }
    allContentfulPageBlogPost {
      nodes {
        slug
        title
        publishedDate
      }
    }
  }
`;

export const QUERY_ALL_POSTS_ARCHIVE = gql`
  ${POST_FIELDS}
  query AllPostsArchive {
    allWpPost {
      edges {
        node {
          ...PostFields
          author {
            node {
              avatar {
                height
                url
                width
              }
              id
              name
              slug
            }
          }
          excerpt
        }
      }
    }
    allContentfulPageBlogPost {
      nodes {
        author {
          avatar {
            height
            url
            width
          }
          id
          name
        }
        slug
        title
        publishedDate
        shortDescription {
          shortDescription
        }
      }
    }
  }
`;

export const QUERY_ALL_POSTS = gql`
  ${POST_FIELDS}
  query AllPosts {
    allWpPost {
      edges {
        node {
          ...PostFields
          author {
            node {
              avatar {
                height
                url
                width
              }
              id
              name
              slug
            }
          }
          content
          excerpt
          featuredImage {
            node {
              altText
              caption
              sourceUrl
              sizes
              id
            }
          }
          modified
        }
      }
    }
    allContentfulPageBlogPost {
      nodes {
        author {
          avatar {
            height
            url
            width
          }
          id
          name
        }
        slug
        title
        publishedDate
        updatedAt
        shortDescription {
          shortDescription
        }
        featuredImage {
          size
          id
          description
          title
          url
        }
      }
    }
  }
`;

export const QUERY_POST_BY_SLUG = gql`
  query PostBySlug($slug: String!) {
    wpPost(slug: { eq: $slug }) {
      author {
        node {
          avatar {
            height
            url
            width
          }
          id
          name
          slug
        }
      }
      id
      categories {
        nodes {
          databaseId
          id
          name
          slug
        }
      }
      content
      date
      excerpt
      featuredImage {
        node {
          altText
          caption
          sourceUrl
          sizes
          id
        }
      }
      modified
      databaseId
      title
      slug
      isSticky
    }
    contentfulPageBlogPost(slug: { eq: $slug }) {
      author {
        avatar {
          height
          url
          width
        }
        id
        name
      }
      slug
      title
      publishedDate
      updatedAt
      content {
        raw
      }
      shortDescription {
        shortDescription
      }
      featuredImage {
        size
        id
        description
        title
        url
      }
    }
  }
`;

export const QUERY_POSTS_BY_CATEGORY_ID_INDEX = gql`
  ${POST_FIELDS}
  query PostsByCategoryId($categoryId: Int!) {
    allWpPost(filter: { categories: { nodes: { databaseId: { eq: $categoryId } } } }) {
      edges {
        node {
          ...PostFields
        }
      }
    }
  }
`;

export const QUERY_POSTS_BY_CATEGORY_ID_ARCHIVE = gql`
  ${POST_FIELDS}
  query PostsByCategoryId($categoryId: Int!) {
    allWpPost(filter: { categories: { nodes: { databaseId: { eq: $categoryId } } } }) {
      edges {
        node {
          ...PostFields
          author {
            node {
              avatar {
                height
                url
                width
              }
              id
              name
              slug
            }
          }
          excerpt
        }
      }
    }
  }
`;

export const QUERY_POSTS_BY_CATEGORY_ID = gql`
  ${POST_FIELDS}
  query PostsByCategoryId($categoryId: Int!) {
    allWpPost(filter: { categories: { nodes: { databaseId: { eq: $categoryId } } } }) {
      edges {
        node {
          ...PostFields
          author {
            node {
              avatar {
                height
                url
                width
              }
              id
              name
              slug
            }
          }
          content
          excerpt
          featuredImage {
            node {
              altText
              caption
              id
              sizes
              sourceUrl
            }
          }
          modified
        }
      }
    }
  }
`;

export const QUERY_POSTS_BY_AUTHOR_SLUG_INDEX = gql`
  ${POST_FIELDS}
  query PostByAuthorSlugIndex($slug: String!) {
    allWpPost(filter: { author: { node: { slug: { eq: $slug } } } }) {
      edges {
        node {
          ...PostFields
        }
      }
    }
  }
`;

export const QUERY_POSTS_BY_AUTHOR_SLUG_ARCHIVE = gql`
  ${POST_FIELDS}
  query PostByAuthorSlugArchive($slug: String!) {
    allWpPost(filter: { author: { node: { slug: { eq: $slug } } } }) {
      edges {
        node {
          ...PostFields
          excerpt
        }
      }
    }
    allContentfulPageBlogPost(filter: { author: { slug: { eq: $slug } } }) {
      nodes {
        slug
        title
        publishedDate
        shortDescription {
          shortDescription
        }
      }
    }
  }
`;

export const QUERY_POSTS_BY_AUTHOR_SLUG = gql`
  ${POST_FIELDS}
  query PostByAuthorSlug($slug: String!) {
    allWpPost(filter: { author: { node: { slug: { eq: $slug } } } }) {
      edges {
        node {
          ...PostFields
          excerpt
          featuredImage {
            node {
              altText
              caption
              id
              sizes
              sourceUrl
            }
          }
          modified
        }
      }
    }
    allContentfulPageBlogPost(filter: { author: { slug: { eq: $slug } } }) {
      nodes {
        slug
        title
        publishedDate
        shortDescription {
          shortDescription
        }
        featuredImage {
          size
          id
          description
          title
          url
        }
      }
    }
  }
`;

export const QUERY_POST_SEO_BY_SLUG = gql`
  query PostSEOBySlug($slug: string) {
    wpPost(slug: { eq: $slug }) {
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

export const QUERY_POST_PER_PAGE = gql`
  query PostPerPage {
    wp {
      allSettings {
        readingSettingsPostsPerPage
      }
    }
  }
`;
