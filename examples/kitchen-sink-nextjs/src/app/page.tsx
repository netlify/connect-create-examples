import { AspectRatioIcon } from "@radix-ui/react-icons";
import { Image } from "@unpic/react";

import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="container mx-auto w-full lg:w-2/3  xs  text-center">
        <div>
          <img
            src="/logo.svg"
            alt="Netlify - Kitchensink Demo"
            className="mx-auto p-10 w-96"
          />
        </div>
        <h3 className="text-lg pt-5 text-center  text-slate-400">
          Content Management Systems Examples
        </h3>
        <div className="bg-slate-200 p-5 m-5 rounded-lg grid sm:grid-cols-3 grid-cols-1 	">
          <Button name="Contentful" href="/contentful" src="contentful.svg" />
          <Button
            name="Contentstack"
            href="/contentstack"
            src="contentstack.png"
          />
          <Button name="Drupal" href="/drupal" src="drupal.png" />
        </div>
        <h3 className=" text-lg pt-5 text-center  text-slate-400">
          Custom Connectors Examples
        </h3>
        <div className="bg-slate-200 p-5 m-5 rounded-lg grid sm:grid-cols-2 grid-cols-1 	">
          <Button name="Custom Connector" href="/custom" />
          <Button name="Dynamic Connector" href="/dynamic" />
          <Button
            name="Multiple Data Sources"
            href="/multi-data-source-single-connector"
          />
          <Button name="StarWars API" href="/starwars" />
        </div>
        <p className="text-slate-40500 p-2 mt-10  border-2 w-2/3 mx-auto rounded-full">
          View the custom connector examples on{" "}
          <a
            href="https://github.com/abhiaiyer91/connectors"
            className="underline font-medium after:content-['_↗']"
          >
            Github
          </a>
        </p>
        {/* <h1 className=" text-xl pt-5 text-center  text-slate-400">
          How Netlify Connect Works
        </h1>
        <Image src="https://docs.netlify.com/images/connect-get-started-data-layer-diagram.png" /> */}
      </main>
    </>
  );
}

//   <Button name="Drupal1" href="/drupal" src="drupal.png" />
function Button(props: any) {
  return (
    <Link
      href={props.href || "/"}
      className="btn  text-sm md:text-base m-2 bg-white  text-neutral-600 font-medium hover:bg-white hover:border-2 hover:border-slate-400"
    >
      {props.src && <img src={props.src} alt="drupal" className="w-5" />}
      {props.name}
    </Link>
  );
}
