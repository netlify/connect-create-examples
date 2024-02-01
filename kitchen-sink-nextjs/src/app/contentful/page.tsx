import { Card } from "@/components/ui/card";
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
  console.log(employees);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {employees?.map((employee) => {
        return (
          <Card key={employee.id}>
            <h1>{employee?.name}</h1>
          </Card>
        );
      })}
    </main>
  );
}
