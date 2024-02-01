import { Card } from "@/components/ui/card";
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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {posts?.map((post) => {
        return (
          <Card key={post.id}>
            <h1>{post?.title}</h1>
          </Card>
        );
      })}
    </main>
  );
}
