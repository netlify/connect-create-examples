import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Image } from "@unpic/react";
import {
  NETLIFY_CONNECT_API_TOKEN,
  NETLIFY_CONNECT_API_URL,
} from "@/constants";
import { CodeExample } from "@/components/Code";

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
        <CodeExample code={query} />
        {articles?.map((article: any) => {
          const parsedContent = JSON.parse(article?.content);
          const articleContent = parsedContent?.text?.content;
          console.log(articleContent);
          return (
            <Card key={article.id} className=" mt-5 bg-black font-mono">
              <CardHeader className="font-meidum text-2xl text-slate-100">
                {parsedContent?.headline}
              </CardHeader>
              <CardContent className="text-slate-400 ">
                <Image
                  layout="fullWidth"
                  src={parsedContent?.image?.filename}
                  alt={parsedContent?.headline}
                  className="rounded-3xl shadow-sm overflow-clip"
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
                    return <span key={text}>{text}</span>;
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
