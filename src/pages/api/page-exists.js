// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectToDeta from "@/lib/deta";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { id } = req.query;
    const db = connectToDeta()
    const idData = await db.get(id)
    res.status(200).json(idData);
  } else {
    res.status(405)
  }
}
