import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

export default function Nav() {
  return (
    <header>
      <Head>
        <title>Netlify Connect Examples</title>
      </Head>
      <div className="navbar bg-neutral text-neutral-100  ">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost sm:text-lg">
            Netlify Connect - Kitchen Sink Demo
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li className="">
              <a href="https://docs.netlify.com/connect/get-started/">Docs</a>
            </li>
            <li>
              <a href="https://github.com/netlify/connect-create-examples/tree/main/examples/kitchen-sink-nextjs">
                Github Repo
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
