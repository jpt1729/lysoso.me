import Head from "next/head";

import { useState } from "react";

import { Inter } from "next/font/google";

import { motion } from "framer-motion";

import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [formStatus, setFormStatus] = useState({
    url: null,
    id: null,
  });
  const [createdURL, setCreatedUrl] = useState(null);
  const [copied, setCopied] = useState(false);
  const onUrlSubmit = async (e) => {
    e.preventDefault();

    const url = e.target.url.value;
    const id = e.target.id.value;

    setFormStatus({
      url: /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/.test(
        url
      )
        ? null
        : "URL Invalid",
      id: /^(?=.{1,2048}$)[a-zA-Z0-9\-_~%]+$/.test(id)
        ? "Please use only letters (A-Z, a-z), numbers (0-9), hyphens, underscores, tilde (~), and percent (%) signs. Length should be 1 to 2048 characters. Special characters and spaces are not allowed."
        : null,
    });
    if (formStatus.url !== null || formStatus.id !== null) {
      console.log("url doesnt exist");
      return;
    } else {
      await fetch("/api/add-page", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ page: url, id }),
      }).then(async (res) => {
        const data = await res.json();
        if (res.status === 200) {
          setCreatedUrl(data.page);
          e.target.reset();
        }
        if (res.status === 400) {
          console.log(data);
          setFormStatus({
            url: formStatus.url,
            id: "ID in use",
          });
          return;
        }
      });
    }
  };
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
        <meta name='author' content="John Tan-Aristy"/>
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
        <div className="h-full p-4 flex md:justify-start justify-center items-center md:flex-row flex-col md:gap-3">
          <div className="flex flex-col gap-5 flex-1">
            <h1 className="text-6xl font-bold">Lysoso.me</h1>
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
              <form
                className="flex flex-col gap-5 max-w-screen-sm w-full relative"
                onSubmit={onUrlSubmit}
                role="form" // Adding role for accessibility
              >
                <div>
                  <label htmlFor="url" className="font-bold text-lg">
                    URL
                  </label>
                  <br />
                  <input
                    className={`w-full px-3 py-2 outline-none rounded-lg border-2 transition-colors hover:border-[#279AF1] focus:border-[#279AF1] active:border-[#279AF1] ${
                      formStatus.url !== null && "border-red-500"
                    }`}
                    type="text"
                    name="url"
                    id="url" // Adding unique ID for accessibility
                    autoComplete="off"
                    placeholder="Enter the URL to shorten"
                    aria-invalid={formStatus.url !== null ? "true" : "false"} // Indicating error status
                  />
                  <br />
                  {formStatus.url && (
                    <span className="absolute text-red-500" role="alert">
                      {formStatus.url}
                    </span>
                  )}
                </div>

                <div>
                  <label htmlFor="id" className="font-bold text-lg">
                    ID
                  </label>
                  <br />
                  <input
                    className={`w-full px-3 py-2 outline-none rounded-lg border-2 transition-colors hover:border-[#279AF1] focus:border-[#279AF1] active:border-[#279AF1] ${
                      formStatus.id !== null && "border-red-500"
                    }`}
                    type="text"
                    name="id"
                    id="id" // Adding unique ID for accessibility
                    autoComplete="off"
                    placeholder="Page ID"
                    aria-invalid={formStatus.id !== null ? "true" : "false"} // Indicating error status
                  />
                  <br />
                  {formStatus.id && (
                    <span className="absolute text-red-500" role="alert">
                      {formStatus.id}
                    </span>
                  )}
                </div>

                <input
                  className="px-3 py-2 rounded-lg font-semibold border-2 bg-[#279AF1] text-white w-fit mt-2 hover:bg-white hover:text-black border-[#279AF1] transition-all"
                  value="Shorten URL"
                  type="submit"
                  role="button" // Adding role for accessibility
                  aria-label="Submit Form" // Adding an accessible label
                />
              </form>
            ) : (
              <div className="flex flex-col gap-3 w-full">
                <span className="text-4xl font-bold">
                  Here is your shortened URL!
                </span>
                <div className="flex items-center w-fit">
                  <span className="text-2xl">{createdURL}</span>
                  <motion.div
                    className="flex flex-col h-8 overflow-y-hidden pl-3"
                    initial="notCopied"
                    animate={copied ? "copied" : "notCopied"}
                  >
                    <motion.button
                      onClick={() => {
                        navigator.clipboard.writeText("createdURL");
                        setCopied(true);
                        setTimeout(() => {
                          setCopied(false);
                        }, 500);
                      }}
                      className="flex items-center py-[5px]"
                      variants={{
                        copied: {
                          y: -32,
                        },
                        notCopied: {
                          y: 0,
                        },
                      }}
                      role="button" // Adding a role for accessibility
                      aria-label="Copy URL to Clipboard" // Adding an accessible label
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        viewBox="0 -960 960 960"
                        width="24"
                        className="hover:fill-[#279AF1]"
                      >
                        <title>Copy to Clipboard</title>
                        <path d="M180-81q-24 0-42-18t-18-42v-603h60v603h474v60H180Zm120-120q-24 0-42-18t-18-42v-560q0-24 18-42t42-18h440q24 0 42 18t18 42v560q0 24-18 42t-42 18H300Zm0-60h440v-560H300v560Zm0 0v-560 560Z" />
                      </svg>
                    </motion.button>
                    <motion.p
                      className="text-2xl"
                      variants={{
                        copied: {
                          y: -32,
                        },
                        notCopied: {
                          y: 0,
                        },
                      }}
                    >
                      Copied to clipboard!
                    </motion.p>
                  </motion.div>
                </div>
                <button
                  onClick={() => {
                    setCreatedUrl(null);
                  }}
                  className="px-3 py-2 rounded-lg font-semibold border-2 bg-[#279AF1] text-white w-fit mt-2 hover:bg-white hover:text-black border-[#279AF1] transition-all"
                  value=""
                >
                  Create a New URL
                </button>
              </div>
            )}
          </div>
        </div>
        <span className="fixed bottom-0">Made with {'<3'} by John Tan-Aristy</span>
      </main>
    </>
  );
}
