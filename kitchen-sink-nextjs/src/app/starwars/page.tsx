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
        <br />
        <section className="flex flex-wrap justify-between">
          {starships?.map((ship: any) => {
            return (
              <Card
                key={ship.id}
                className="mb-4"
                style={{ flexBasis: `24%` }}
              >
                <CardContent>
                  <section className="flex pt-5">
                    <Avatar>
                      <AvatarImage src={ship?.avatar?.url} />
                      <AvatarFallback>{ship?.name?.[0]}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4">
                      <h1>{ship?.name}</h1>
                      <p>{ship?.model}</p>
                      <p>{ship?.starshipClass}</p>
                    </div>
                  </section>
                </CardContent>
              </Card>
            );
          })}
        </section>
      </section>
    </main>
  );
}
