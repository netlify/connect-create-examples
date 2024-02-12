import { Image } from "@unpic/react";

export default function Home() {
  return (
    <main className="flex  flex-col items-center justify-between p-24">
      <div className="py-10">
        <h1 className="font-bold text-3xl text-center">
          <img
            src="/logo.svg"
            alt="Netlify - Kitchensink Demo"
            className="inline-block w-80"
          />
        </h1>
      </div>

      <div className="pt-0 py-20 px-10 text-center">
        <p className="text-xl">
          The examples below are built with{"  "}
          <a
            href="https://www.netlify.com/products/connect/"
            className="text-teal-500 underline"
          >
            Netlify Connect
          </a>
        </p>
      </div>

      <h2 className="text-2xl mb-12 inline-block">
        Content Management Systems
      </h2>
      <div className="grid mb-32 text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left bg-slate-100 p-12 rounded-xl">
        <a
          href="/contentful"
          className="group rounded-lg bold px-5 py-4 border-zinc-600 transition-colors align hover:shadow-md hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 bg-white rounded-xl m-2"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            <img
              src="/contentful.svg"
              alt="Contentful"
              className="h-10 inline-block align-middle pr-2"
            />
            Contentful{" "}
          </h2>
        </a>
        <a
          href="/contentstack"
          className="group rounded-lg px-5 py-4 transition-colors hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 bg-white rounded-xl m-2 bg-white rounded-xl"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            <img
              src="/contentstack.png"
              alt="Contentful"
              className="h-10 inline-block align-middle pr-2"
            />
            Contentstack{" "}
          </h2>
        </a>
        <a
          href="/drupal"
          className="group rounded-lg px-5 py-4 transition-colors hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 bg-white rounded-xl m-2"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            <img
              src="/drupal.png"
              alt="Contentful"
              className="h-10 inline-block align-middle pr-2"
            />
            Drupal{" "}
          </h2>
        </a>
        <a
          href="/storyblok"
          className="group rounded-lg px-5 py-4 transition-colors hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 bg-white rounded-xl m-2"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            <img
              src="/storyblock.svg"
              alt="Contentful"
              className="h-10 inline-block align-middle pr-2"
            />
            Storyblok{" "}
          </h2>
        </a>
        <a
          href="/wordpress"
          className="group rounded-lg px-5 py-4 transition-colors hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 bg-white rounded-xl m-2"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            <img
              src="/wordpress.png"
              alt="Contentful"
              className="h-10 inline-block align-middle pr-2"
            />
            Wordpress{" "}
          </h2>
        </a>
      </div>

      <h2 className="text-2xl mb-12 inline-block pt-10">
        <a
          href="https://github.com/abhiaiyer91/connectors"
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-500 underline"
        >
          Custom Connectors
        </a>
      </h2>

      <div className="grid mb-32 text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left bg-slate-100 p-12 rounded-xl">
        <a
          href="/custom"
          className="group rounded-lg px-5 py-4 transition-colors hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 bg-white rounded-xl m-2"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>Custom connector </h2>
        </a>
        <a
          href="/dynamic"
          className="group px-5 py-4 transition-colors hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 bg-white rounded-xl m-2"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>Dynamic connector </h2>
        </a>
        <a
          href="/starwars"
          className="group px-5 py-4 transition-colors hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 bg-white rounded-xl m-2"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>Star Wars </h2>
        </a>
        <a
          href="/multi-data-source-single-connector"
          className="group px-5 py-4 transition-colors hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 bg-white rounded-xl m-2"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Multiple Data sources
          </h2>
        </a>
      </div>

      <h2 className="text-2xl mb-12 inline-block pt-10">How Connect works</h2>
      <div>
        <Image
          src="https://docs.netlify.com/images/connect-get-started-data-layer-diagram.png"
          layout="constrained"
          className="aspect-square drop-shadow rounded-lg hover:scale-105 transition-transform duration-300"
          width={800}
          height={400}
        />
      </div>
    </main>
  );
}
