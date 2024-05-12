import { CodeExample } from "@/components/Code";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  NETLIFY_CONNECT_API_TOKEN,
  NETLIFY_CONNECT_API_URL,
} from "@/constants";

const query = `
query starships {
    allStarships {
      starships {
        id
        name
        model
        starshipClass
      }
    }
  }
`;

async function getStarships() {
  const res = await fetch(NETLIFY_CONNECT_API_URL, {
    method: `POST`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${NETLIFY_CONNECT_API_TOKEN}`,
    },
    body: JSON.stringify({ query }),
  });

  const result = await res.json();

  return result?.data?.allStarships?.starships || [];
}

export default async function Home() {
  const starships = await getStarships();

  return (
    <main className="min-h-screen items-center justify-between p-24">
      <section>
        <h1>Star Wars API</h1>
        <p>
          This page is rendered with data from an existing GraphQL API: SWAPI
          federated through Connect
        </p>

        <CodeExample code={query} />

        <section className="grid sm:grid-cols-2">
          {starships?.map((ship: any) => {
            return (
              <Card key={ship.id} className="m-2">
                <CardContent>
                  <section className="flex pt-5">
                    <Avatar>
                      <AvatarImage src={ship?.avatar?.url} />
                      <AvatarFallback>{ship?.name?.[0]}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4">
                      <h2 className="text-lg">{ship?.name}</h2>
                      <p className="text-sm uppercase text-slate-400">
                        {ship?.model}
                      </p>
                      <p className="text-sm uppercase">{ship?.starshipClass}</p>
                    </div>
                  </section>
                </CardContent>
              </Card>
            );
          })}
        </section>
      </section>
      {/* <p className="text-slate-40500 p-2 mt-10 text-center border-2 w-2/3 mx-auto rounded-full">
        View this example on on{" "}
        <a
          href="https://github.com/abhiaiyer91/connectors/blob/master/connectors/multi-data-source/src/index.ts"
          className="underline font-medium after:content-['_↗']"
        >
          Github
        </a>
      </p> */}
    </main>
  );
}
