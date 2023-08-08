// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectToDeta from "@/lib/deta";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405);
    return;
  }
  const { id, page } = req.body;
  const db = connectToDeta();
  if (
    !/(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/.test(
      page
    )
  ) {
    res.status(400).json({ page: "invalid" });
    return;
  }
  if (id !== "") {
    try {
      const pageData = await db.insert({ page }, id);
      res.status(200).json({ page: `https://lysoso.me/${pageData.key}` });
    } catch (err) {
      res.status(400).send(err);
    }
  } else {
    const pageData = await db.insert({ page });
    res.status(200).json({ page: `https://lysoso.me/${pageData.key}` });
  }
}
