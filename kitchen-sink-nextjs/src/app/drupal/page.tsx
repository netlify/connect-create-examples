import { Card } from "@/components/ui/card";
import {
  NETLIFY_CONNECT_API_TOKEN,
  NETLIFY_CONNECT_API_URL,
} from "@/constants";

const query = `
query drupalPages {
    allDrupalNodePage {
      nodes {
        id
        title
      }
    }
  }
`;

async function getPages() {
  const res = await fetch(NETLIFY_CONNECT_API_URL, {
    method: `POST`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${NETLIFY_CONNECT_API_TOKEN}`,
    },
    body: JSON.stringify({ query }),
  });

  const result = await res.json();

  return result?.data?.allDrupalNodePage?.nodes || [];
}

export default async function DrupalPages() {
  const pages = await getPages();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {pages?.map((page) => {
        return (
          <Card key={page.id}>
            <h1>{page?.title}</h1>
          </Card>
        );
      })}
    </main>
  );
}
