import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import {
  NETLIFY_CONNECT_API_TOKEN,
  NETLIFY_CONNECT_API_URL,
} from "@/constants";

async function getCachedBreweries() {
  const query = `
query cachedBreweries {
	allBevBrewery {
        nodes {
        id
        contentId
        name
        address1
        state
        city
        country
        postalCode
        street
        }
    }
}
`;
  const res = await fetch(NETLIFY_CONNECT_API_URL, {
    method: `POST`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${NETLIFY_CONNECT_API_TOKEN}`,
    },
    body: JSON.stringify({ query }),
  });

  const result = await res.json();

  return result?.data?.allBevBrewery?.nodes || [];
}

async function getBreweriesFromOrigin() {
  const query = `
  query originBreweries {
      breweriesFromOrigin {
          id
          name
          address_1
          state
          city
          country
          postal_code
          street
      }
  }
  `;
  const res = await fetch(NETLIFY_CONNECT_API_URL, {
    method: `POST`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${NETLIFY_CONNECT_API_TOKEN}`,
    },
    body: JSON.stringify({ query }),
  });

  const result = await res.json();

  return result?.data?.breweriesFromOrigin || [];
}

export default async function Home() {
  const cachedBreweries = await getCachedBreweries();
  const originBreweries = await getBreweriesFromOrigin();

  return (
    <main className="min-h-screen items-center justify-between p-24">
      <section>
        <h1>
          Dynamic Connector{" "}
          <a href="https://openbrewerydb.org/" target="_blank">
            https://openbrewerydb.org/
          </a>
        </h1>
        <p>
          This page shows data rendered both from the Connect cache and the API
          origin.
        </p>
        <br />
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              Data from Connect cache ({cachedBreweries?.length})
            </AccordionTrigger>
            <AccordionContent>
              <section className="flex flex-wrap">
                {cachedBreweries?.map((brewery: any) => {
                  return (
                    <Card
                      key={brewery.id}
                      className="mb-4 mr-2"
                      style={{ flexBasis: `24%` }}
                    >
                      <CardContent>
                        <section className="flex pt-5">
                          <div className="ml-4">
                            <h1>{brewery?.name}</h1>
                            <p>{brewery?.address1}</p>
                            <p>
                              {brewery?.city}, {brewery?.state}{" "}
                              {brewery?.postalCode}
                            </p>
                            <p>{brewery?.country}</p>
                          </div>
                        </section>
                      </CardContent>
                    </Card>
                  );
                })}
              </section>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              Data from Brewery API origin ({originBreweries?.length})
            </AccordionTrigger>
            <AccordionContent>
              <section className="flex flex-wrap">
                {originBreweries?.map((brewery: any) => {
                  return (
                    <Card
                      key={brewery.id}
                      className="mb-4 mr-2"
                      style={{ flexBasis: `24%` }}
                    >
                      <CardContent>
                        <section className="flex pt-5">
                          <div className="ml-4">
                            <h1>{brewery?.name}</h1>
                            <p>{brewery?.address1}</p>
                            <p>
                              {brewery?.city}, {brewery?.state}{" "}
                              {brewery?.postalCode}
                            </p>
                            <p>{brewery?.country}</p>
                          </div>
                        </section>
                      </CardContent>
                    </Card>
                  );
                })}
              </section>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </main>
  );
}
