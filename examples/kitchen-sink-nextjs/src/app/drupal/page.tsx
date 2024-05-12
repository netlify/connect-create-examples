import { CodeExample } from "@/components/Code";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  NETLIFY_CONNECT_API_TOKEN,
  NETLIFY_CONNECT_API_URL,
} from "@/constants";
import Link from "next/link";

const query = `
  query drupalPages {
    allDrupalNodePage(limit: 5) {
      nodes {
        title
        body {
          value
        }
        created
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
        <CodeExample code={query} />

        {pages?.map((page: any) => {
          return (
            <article
              className="mt-5 p-5 rounded-xl border text-card-foreground shadow mb-4 "
              key={page.id}
            >
              <h2 className="text-xl  mb-2 font-semibold bo">{page?.title}</h2>
              <section className=" line-clamp-5 text-slate-500">
                {page?.body?.value}
              </section>
              <Link
                href="#"
                className="block p-2 mx-auto text-blue-500 text-right font-semibold after:content-['_↗']"
              >
                Read More
              </Link>
            </article>
          );
        })}
      </section>
    </main>
  );
}
