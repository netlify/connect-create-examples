import { Card } from "@/components/ui/card";
import {
  NETLIFY_CONNECT_API_TOKEN,
  NETLIFY_CONNECT_API_URL,
} from "@/constants";

const query = `
query storyblokEntries {
  allStoryblokEntry(filter: {field_component: {eq: "article-page"}}) {
    nodes {
      id
      field_component
      name
    }
  }
}
`;

async function getArticles() {
  const res = await fetch(NETLIFY_CONNECT_API_URL, {
    method: `POST`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${NETLIFY_CONNECT_API_TOKEN}`,
    },
    body: JSON.stringify({ query }),
  });

  const result = await res.json();

  return result?.data?.allStoryblokEntry?.nodes || [];
}

export default async function Articles() {
  const articles = await getArticles();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {articles?.map((article) => {
        return (
          <Card key={article.id}>
            <h1>{article?.name}</h1>
          </Card>
        );
      })}
    </main>
  );
}
