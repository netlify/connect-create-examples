import { Card } from "@/components/ui/card";
import {
  NETLIFY_CONNECT_API_TOKEN,
  NETLIFY_CONNECT_API_URL,
} from "@/constants";

const query = `
query products {
    allContentstackProduct {
      nodes {
        description
        id
        image {
          url
        }
        price
        rating
        stripe_price_id
        title
        location {
          latitude: lat
          longitude: long
        }
      }
    }
  }
`;

async function getProducts() {
  const res = await fetch(NETLIFY_CONNECT_API_URL, {
    method: `POST`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${NETLIFY_CONNECT_API_TOKEN}`,
    },
    body: JSON.stringify({ query }),
  });

  const result = await res.json();

  return result?.data?.allContentstackProduct?.nodes || [];
}

export default async function Products() {
  const products = await getProducts();
  console.log(products);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {products?.map((product) => {
        return (
          <Card key={product.id}>
            <h1>{product?.title}</h1>
          </Card>
        );
      })}
    </main>
  );
}
