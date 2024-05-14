import { Image } from "@unpic/react";
import { CardContent } from "@/components/ui/card";
import {
  NETLIFY_CONNECT_API_TOKEN,
  NETLIFY_CONNECT_API_URL,
} from "@/constants";
import { CodeExample } from "@/components/Code";

const query = `
query books {
  allHolidayStory(limit: 20) {
    nodes {
      body
      id
      image
      title
    }
  }
}
`;

async function getStories() {
  const res = await fetch(NETLIFY_CONNECT_API_URL, {
    method: `POST`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${NETLIFY_CONNECT_API_TOKEN}`,
    },
    body: JSON.stringify({ query }),
  });

  const result = await res.json();

  return result?.data?.allHolidayStory?.nodes || [];
}

export default async function Stories() {
  const stories = await getStories();

  return (
    <main className="min-h-screen items-center justify-between p-24">
      <section>
        <h1>Custom connector</h1>
        <p>This page is rendered with data from a CSV file in Google Drive.</p>
        <CodeExample code={query} />
        <section className="grid sm:grid-cols-2 md:grid-cols-4  justify-between pt-10">
          {stories?.map((book: any) => {
            return (
              <div key={book.id} className="mb-4" style={{ flexBasis: `24%` }}>
                <CardContent>
                  <Image
                    src={`/.netlify/images/?url=${encodeURIComponent(book.image)}`}
                    layout="constrained"
                    width={400}
                    height={300}
                    alt={book.title}
                    className="rounded-lg"
                  />
                  <p className="text-center text-base pt-2"> {book?.title}</p>
                </CardContent>
              </div>
            );
          })}
        </section>
      </section>
      <p className="text-slate-40500 p-2 mt-10 text-center border-2 w-2/3 mx-auto rounded-full">
        View this example on on{" "}
        <a
          href="https://github.com/abhiaiyer91/connectors/blob/master/connectors/stories/src/index.ts"
          className="underline font-medium after:content-['_↗']"
        >
          Github
        </a>
      </p>
    </main>
  );
}
