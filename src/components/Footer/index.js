import Link from "next/link";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Footer({}) {
  return (
    <footer
      className={`${inter.className} fixed bottom-0 md:max-w-screen-xl md:justify-start left-1/2 -translate-x-1/2 flex gap-5 justify-center text-gray-300 w-full`}
    >
      <Link href = '/'>
        <span>Home</span>
      </Link>
      <Link href = '/about'>
        <span>About</span>
      </Link>
      {/*<Link href = '/report'>
        <span>Report</span>
      </Link>*/}
    </footer>
  );
}
