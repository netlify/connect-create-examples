import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  NETLIFY_CONNECT_API_TOKEN,
  NETLIFY_CONNECT_API_URL,
} from "@/constants";

const query = `
query employees {
  allContentfulEmployee {
    nodes {
      id
      name
      bio {
        bio
      }
      avatar {
        url
      }
    }
  }
}
`;

async function getEmployees() {
  const res = await fetch(NETLIFY_CONNECT_API_URL, {
    method: `POST`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${NETLIFY_CONNECT_API_TOKEN}`,
    },
    body: JSON.stringify({ query }),
  });

  const result = await res.json();

  return result?.data?.allContentfulEmployee?.nodes || [];
}

export default async function Home() {
  const employees = await getEmployees();

  return (
    <main className="min-h-screen items-center justify-between p-24">
      <section>
        <h1>Contentful</h1>
        <p>This page is rendered with data from Contentful</p>
        <br />
        <section className="flex flex-wrap justify-between">
          {employees?.map((employee: any) => {
            return (
              <Card
                key={employee.id}
                className="mb-4"
                style={{ flexBasis: `24%` }}
              >
                <CardContent>
                  <section className="flex pt-5">
                    <Avatar>
                      <AvatarImage src={employee?.avatar?.url} />
                      <AvatarFallback>{employee?.name?.[0]}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4">
                      <h1>{employee?.name}</h1>
                      <p>{employee?.bio?.bio}</p>
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
