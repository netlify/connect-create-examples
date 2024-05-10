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
        <h1 className="text-xl font-bold ">Drupal</h1>
        <p>This page is rendered with data from Drupal</p>
        <CodeExample code={query} />

        {pages?.map((page: any) => {
          return (
            <article className="p-5 m-5 border-2 " key={page.id}>
              <h2 className="text-lg border-b-2 mb-2 font-semibold bo">
                {page?.title}
              </h2>
              <section className="line-clamp-5">{page?.body?.value}</section>
              <Link
                href="3"
                className=" mx-auto text-blue-500 font-semibold after:content-['_↗']"
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
