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

async function getTeams(sportType: string) {
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
    })
  );

  return (
    <main className="min-h-screen items-center justify-between p-24">
      <section>
        <h1>Multi Data Source Connector </h1>
        <p>
          This page shows data rendered from a Connector that sourced data from
          multiple data sources and reflected them in a single model "Team"
        </p>
        <br />
        <Accordion type="single" collapsible>
          {sportsData?.map(({ sportType, teamData }) => {
            return (
              <AccordionItem value={sportType} key={sportType}>
                <AccordionTrigger>
                  {sportTypeToReadableName[sportType]} Teams ({teamData?.length}
                  )
                </AccordionTrigger>
                <AccordionContent>
                  <section className="flex flex-wrap">
                    {teamData?.map((team: any) => {
                      return (
                        <Card
                          key={team.id}
                          className="mb-4 mr-2"
                          style={{ flexBasis: `24%` }}
                        >
                          <CardContent>
                            <section className="flex pt-5">
                              <div className="ml-4">
                                <h1>{team?.fullName}</h1>
                                <h1>{team?.name}</h1>
                                <p>{team?.location}</p>
                                <p>{team?.abbreviation}</p>
                                <p>{team?.city}</p>
                                <p>{team?.conference}</p>
                              </div>
                            </section>
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
    </main>
  );
}
