import { Image } from '@unpic/react';
import { CardContent } from "@/components/ui/card";
import {
  NETLIFY_CONNECT_API_TOKEN,
  NETLIFY_CONNECT_API_URL,
} from "@/constants";

const query = `
query books {
  allHolidayStory {
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
        <br />
        <section className="flex flex-wrap justify-between">
          {stories?.map((book) => {
            return (
              <div key={book.id} className="mb-4" style={{ flexBasis: `24%` }}>
                <CardContent>
                  <Image
                    src={book.image}
                    layout="constrained"
                    width={400}
                    height={300}
                    alt="A lovely bath"
                  />
                  <p className="text-center"> {book?.title}</p>
                </CardContent>
              </div>
            );
          })}
        </section>
      </section>
    </main>
  );
}
