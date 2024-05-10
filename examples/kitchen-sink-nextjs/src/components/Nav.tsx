import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

interface Props {
  title: string;
}

export default function Nav(props: Props) {
  const { title } = props;
  return (
    <header>
      <Head>
        <title>Netlify Connect - {title}</title>
      </Head>
      <div class="navbar bg-neutral text-neutral-100  ">
        <div class="flex-1">
          <Link href="/" class="btn btn-ghost text-lg">
            Netlify Connect - Kitchen Sink Demo
          </Link>
        </div>
        <div class="flex-none">
          <ul class="menu menu-horizontal px-1">
            <li>
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
