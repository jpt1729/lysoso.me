import Head from "next/head";

import { useState, useRef } from "react";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [formStatus, setFormStatus] = useState({
    url: null,
    id: null,
  });
  const [createdURL, setCreatedUrl] = useState("https://lysosome.me/aa");

  const copyRef = useRef(null);

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
      id: /^(.*\s+.*)+$/.test(id) ? "ID Invalid" : null,
    });
    if (formStatus.url === null || formStatus.id === null) {
      const pageExists = await fetch(
        "/api/page-exists?" + new URLSearchParams({ id }),
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then(async (res) => {
          const data = await res.json();
          return data;
        })
        .catch((err) => {
          console.error(err);
        });
      if (pageExists === null) {
        await fetch("/api/add-page", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ page: url, id }),
        });
        setCreatedUrl(`https://lysoso.me/${id}`);
        e.target.reset();
      } else {
        setFormStatus({
          url: formStatus.url,
          id: 'ID in use'
        })
        return;
      }
    }
  };
  return (
    <>
      <Head>
        <title>Lysoso.me</title>
        <meta
          name="description"
          content="URL Shortener made by John Tan-Aristy"
        />
      </Head>
      <main
        className={`${inter.className} w-full max-w-screen-xl m-auto h-screen`}
      >
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
              >
                <div>
                  <span className="font-bold">URL</span>
                  <br />
                  <input
                    className={`w-full px-3 py-2 rounded-lg border ${
                      formStatus.url !== null && "border-red-500"
                    }`}
                    type="text"
                    name="url"
                    placeholder="url"
                  />
                  <br />
                  <span className="absolute text-red-500">
                    {formStatus.url}
                  </span>
                </div>

                <div>
                  <span className="font-bold">ID</span>
                  <br />
                  <input
                    className={`w-full px-3 py-2 rounded-lg border ${
                      formStatus.id !== null && "border-red-500"
                    }`}
                    type="text"
                    name="id"
                    placeholder="id"
                  />
                  <br />
                  <span className="absolute text-red-500">{formStatus.id}</span>
                </div>

                <input
                  className="px-3 py-2 rounded-lg border w-fit mt-2"
                  value="Create a URL"
                  type="submit"
                />
              </form>
            ) : (
              <div className="flex flex-col gap-3">
                <span className="text-4xl font-bold">
                  Here is your shortened URL!
                </span>
                <div className="flex items-center">
                  <input
                    ref={copyRef}
                    className="text-2xl bg-white w-fit"
                    type="text"
                    value={createdURL}
                    disabled
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
