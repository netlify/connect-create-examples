import { CodeExample } from "@/components/Code";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  NETLIFY_CONNECT_API_TOKEN,
  NETLIFY_CONNECT_API_URL,
} from "@/constants";

const query = `
query posts {
        allWpPost {
          nodes {
            id
            title
            content
          }
        }
      
  }
`;

async function getPosts() {
  const res = await fetch(NETLIFY_CONNECT_API_URL, {
    method: `POST`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${NETLIFY_CONNECT_API_TOKEN}`,
    },
    body: JSON.stringify({ query }),
  });

  const result = await res.json();

  return result?.data?.allWpPost?.nodes || [];
}

export default async function Posts() {
  const posts = await getPosts();

  return (
    <main className="min-h-screen items-center justify-between p-24">
      <section>
        <h1>Wordpress</h1>
        <p>This page is rendered with data from Wordpress</p>
        <CodeExample code={query} />
        {posts?.map((post: any) => {
          return (
            <Card key={post.id}>
              <CardHeader>
                <CardTitle>{post?.title}</CardTitle>
                <CardContent>
                  <div dangerouslySetInnerHTML={{ __html: post?.content }} />
                </CardContent>
              </CardHeader>
            </Card>
          );
        })}
      </section>
    </main>
  );
}
