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
  return (
    <main className="min-h-screen items-center justify-between p-24">
      <section>
        <h1>Contentstack</h1>
        <p>This page is rendered with data from Contentstack</p>
        <br />
        <section className="flex flex-wrap justify-between">
          {products?.map((product) => {
            return (
              <Card
                key={product.id}
                className="mb-4"
                style={{ flexBasis: `24%` }}
              >
                <h1>{product?.title}</h1>

                <div style={{ maxWidth: `300px` }}>
                  <img
                    className="aspect-square drop-shadow rounded-lg hover:scale-105 transition-transform duration-300"
                    src={product.image?.url}
                  />
                </div>

                <h3 className="text-xl font-bold text-white">
                  {product?.name}
                </h3>
                <p className="text-xl text-green-500">${product.price}</p>
              </Card>
            );
          })}
        </section>
      </section>
    </main>
  );
}
