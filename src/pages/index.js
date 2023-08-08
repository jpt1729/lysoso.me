import Head from "next/head";

import { useState } from "react";

import { Inter } from "next/font/google";

import Image from "next/image";

import CreateURLForm from "@/components/Home/CreateURLForm";
import URLCompletion from "@/components/Home/URLCompletion";

import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [createdURL, setCreatedURL] = useState("null");

  return (
    <>
      <Head>
        <meta
          name="description"
          content="Shorten and manage URLs with Lysoso.me, a user-friendly URL shortener service."
        />
        <title>Lysoso.me - URL Shortener</title>
        {/* Open Graph Tags for social sharing */}
        <meta property="og:title" content="Lysoso.me - URL Shortener" />
        <meta
          property="og:description"
          content="Shorten and manage URLs with Lysoso.me, a user-friendly URL shortener service."
        />
        <meta property="og:image" content="/path/to/og-image.jpg" />
        <meta property="og:url" content="https://lysoso.me" />
        {/* Twitter Card for Twitter sharing */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Lysoso.me - URL Shortener" />
        <meta
          name="twitter:description"
          content="Shorten and manage URLs with Lysoso.me, a user-friendly URL shortener service."
        />
        <meta name="twitter:image" content="/path/to/twitter-image.jpg" />
        <meta name="author" content="John Tan-Aristy" />
        {/* Logo */}
        <link rel="icon" href="/lysosomeLogo.svg" type="image/svg+xml" />
      </Head>
      <main
        className={`${inter.className} w-full max-w-screen-xl m-auto h-screen`}
      >
        <Image
          src="/lysosomeLogo.svg"
          alt="Lysosome Logo"
          width={50}
          height={50}
          className="fixed"
        />
        <div className="h-full p-4 flex md:justify-start justify-end items-center md:flex-row flex-col md:gap-3">
          <div className="flex flex-col gap-5 flex-1">
            <h1 className="text-6xl font-bold md:mt-0 mt-[20%]">Lysoso.me</h1>
            <p>{"[lai·suh·zowm] · noun"}</p>
            <p className="max-w-screen-sm">
              an organelle in the cytoplasm of eukaryotic cells containing
              degradative enzymes enclosed in a membrane.
            </p>
            <p className="max-w-screen-sm italic">
              See also: The {`biologist's`} url shortener.
            </p>
          </div>
          <div className="w-full flex justify-center mb-5 flex-1">
            {createdURL === null ? (
              <CreateURLForm setCreatedURL={setCreatedURL} />
            ) : (
              <URLCompletion
                createdURL={createdURL}
                setCreatedURL={setCreatedURL}
              />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
