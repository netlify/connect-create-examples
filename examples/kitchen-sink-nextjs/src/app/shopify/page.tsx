import { CodeExample } from "@/components/Code";
import {
  NETLIFY_CONNECT_API_TOKEN,
  NETLIFY_CONNECT_API_URL,
} from "@/constants";
import { Image } from "@unpic/react";

const query = `
  {
    allShopifyProduct(sort: {title: ASC}) {
      nodes {
        id
        title
        shopifyId
        featuredImage {
          src
          altText
        }
        priceRange {
          maxVariantPrice {
            amount
          }
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
  console.log(result);
  return result?.data?.allShopifyProduct?.nodes || [];
}

export default async function Products() {
  const products = await getProducts();
  return (
    <main className="min-h-screen items-center justify-between p-24">
      <section>
        <h1>Shopify</h1>
        <p>This page is rendered with data from Shopify</p>
        <CodeExample code={query} />
        <section className="grid sm:grid-cols-4  pt-10">
          {products?.map((product: any) => {
            return (
              <div key={product.id} className="m-4">
                <Image
                  src={product.featuredImage?.src}
                  layout="constrained"
                  className="aspect-square overflow-hidden drop-shadow rounded-lg hover:opacity-75"
                  width={400}
                  height={300}
                />
                <h2 className="mt-4 text-sm text-gray-700">{product?.title}</h2>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  ${product.priceRange.maxVariantPrice.amount}
                </p>
              </div>
            );
          })}
        </section>
      </section>
    </main>
  );
}
