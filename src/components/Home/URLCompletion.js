import { useState } from "react";

import { motion } from "framer-motion";

export default function URLCompletion({ createdURL, setCreatedURL }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="flex flex-col gap-3 w-full">
      <span className="text-4xl font-bold">Here is your shortened URL!</span>
      <div className="flex items-center w-fit flex-wrap">
        <span className="text-2xl">{createdURL}</span>
        <motion.div
          className="flex flex-col h-8 overflow-y-hidden pl-3"
          initial="notCopied"
          animate={copied ? "copied" : "notCopied"}
        >
          <motion.button
            onClick={() => {
              navigator.clipboard.writeText(createdURL);
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
            className="text-2xl w-fit md:static relative"
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
          setCreatedURL(null);
        }}
        className="px-3 py-2 rounded-lg font-semibold border-2 bg-[#279AF1] text-white w-fit mt-2 hover:bg-white hover:text-black border-[#279AF1] transition-all"
        value=""
      >
        Create a New URL
      </button>
    </div>
  );
}
