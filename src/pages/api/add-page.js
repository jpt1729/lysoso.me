// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectToDeta from "@/lib/deta";

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log('???')
    const { id, page } = req.body;
    const db = connectToDeta()
    const pageData = db.insert({page}, id)
    res.status(200).json(pageData);
  } else {
    res.status(405)
  }
}
