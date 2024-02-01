import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
        body {
          value
        }
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
    <main className="min-h-screen items-center justify-between p-24">
      <section>
        <h1>Drupal</h1>
        <p>This page is rendered with data from Drupal</p>
        <br />
        {pages?.map((page) => {
          return (
            <Card key={page.id}>
              <CardHeader>
                <CardTitle>{page?.title}</CardTitle>
                <CardContent>
                  <p dangerouslySetInnerHTML={{ __html: page?.body?.value }} />
                </CardContent>
              </CardHeader>
            </Card>
          );
        })}
      </section>
    </main>
  );
}
