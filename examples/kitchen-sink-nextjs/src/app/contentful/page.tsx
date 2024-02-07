import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  NETLIFY_CONNECT_API_TOKEN,
  NETLIFY_CONNECT_API_URL,
} from "@/constants";

const query = `
query employees {
  allContentfulEmployee(sort: { name: ASC }) {
    nodes {
      id
      contentful_id
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

let API_URL = process.env.LOCAL_NETLIFY_CONNECT_API_URL;

if (!API_URL) {
  API_URL = NETLIFY_CONNECT_API_URL;
}

async function getEmployees() {
  const res = await fetch(API_URL!, {
    method: `POST`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${NETLIFY_CONNECT_API_TOKEN}`,
    },
    body: JSON.stringify({ query }),
    cache: "no-store",
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
                data-sb-object-id={employee?.contentful_id}
                key={employee.id}
                className="mb-4"
                style={{ flexBasis: `24%` }}
              >
                <CardContent>
                  <section className="flex pt-5">
                    <Avatar>
                      <AvatarImage
                        data-sb-field-path="avatar"
                        src={employee?.avatar?.url}
                      />
                      <AvatarFallback>{employee?.name?.[0]}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4">
                      <h1 data-sb-field-path="name">{employee?.name}</h1>
                      <p data-sb-field-path="bio">{employee?.bio?.bio}</p>
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
