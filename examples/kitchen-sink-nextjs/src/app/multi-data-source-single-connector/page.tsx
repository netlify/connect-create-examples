import { CodeExample } from "@/components/Code";
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

const query = `
    query teams($sportType: String!) {
            allSportsTeam(filter: { sportType: { eq: $sportType } }) {
              nodes {
                id
                abbreviation
                fullName
                name
                city
                division
                conference
                sport
                sportType
              }
            }
    }
    `;

async function getTeams(sportType: string) {
  const res = await fetch(NETLIFY_CONNECT_API_URL, {
    method: `POST`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${NETLIFY_CONNECT_API_TOKEN}`,
    },
    body: JSON.stringify({ query, variables: { sportType } }),
  });

  const result = await res.json();

  return result?.data?.allSportsTeam?.nodes || [];
}

const sportTypeToReadableName: Record<string, string> = {
  BASKETBALL: `NBA`,
  BASEBALL: `Baseball`,
  AMERICAN_FOOTBALL: `NFL`,
  HOCKEY: `NHL`,
};

export default async function Home() {
  const sports = [`BASKETBALL`, `BASEBALL`, `AMERICAN_FOOTBALL`, `HOCKEY`];

  const sportsData = await Promise.all(
    sports.map(async (sportType) => {
      return {
        sportType,
        teamData: await getTeams(sportType),
      };
    }),
  );

  return (
    <main className="min-h-screen items-center justify-between p-24">
      <section>
        <h1>Multi Data Source Connector </h1>
        <p>
          This page shows data rendered from a Connector that sourced data from
          multiple data sources and reflected them in a single model{" "}
          <strong>Team</strong>
        </p>
        <CodeExample code={query} />
        <Accordion type="single" collapsible>
          {sportsData?.map(({ sportType, teamData }) => {
            return (
              <AccordionItem value={sportType} key={sportType}>
                <AccordionTrigger>
                  {sportTypeToReadableName[sportType]} Teams ({teamData?.length}
                  )
                </AccordionTrigger>
                <AccordionContent>
                  <section className="grid sm:grid-cols-3">
                    {teamData?.map((team: any) => {
                      return (
                        <Card key={team.id} className="m-3">
                          <CardContent className="p-4">
                            <div className=" m-2">
                              <div className="">
                                <h2 className="text-lg font-semibold text-slate-800">
                                  {team?.fullName}
                                </h2>
                                <h3 className="font-bold text-red-500">
                                  {team?.name}
                                </h3>
                                <p>{team?.abbreviation}</p>
                                <p>
                                  {team?.city}
                                  {team?.location}
                                  {team?.conference}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </section>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </section>
      <p className="text-slate-40500 p-2 mt-10 text-center border-2 w-2/3 mx-auto rounded-full">
        View this example on on{" "}
        <a
          href="https://github.com/abhiaiyer91/connectors/blob/master/connectors/multi-data-source/src/index.ts"
          className="underline font-medium after:content-['_↗']"
        >
          Github
        </a>
      </p>
    </main>
  );
}
