import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Image } from "@unpic/react";
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
      content
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
    <main className="min-h-screen items-center justify-between p-24">
      <section>
        <h1>Storyblok</h1>
        <p>This page is rendered with data from Storyblok</p>
        <br />
        {articles?.map((article: any) => {
          const parsedContent = JSON.parse(article?.content);
          const articleContent = parsedContent?.text?.content;

          return (
            <Card key={article.id} className="mb-10">
              <CardHeader>{parsedContent?.headline}</CardHeader>
              <CardContent>
                <Image
                  layout="fullWidth"
                  src={parsedContent?.image?.filename}
                  alt={parsedContent?.headline}
                />
                <br />
                {articleContent?.map(({ content }: any, index1: number) => {
                  return content?.map(({ text, type }: any, index: number) => {
                    if (type === `heading`) {
                      return <h1 key={text}>{text}</h1>;
                    }
                    if (type === `hard_break`) {
                      return <br key={index1 + index} />;
                    }
                    return <p key={text}>{text}</p>;
                  });
                })}
              </CardContent>
            </Card>
          );
        })}
      </section>
    </main>
  );
}
