// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Unsplash } from "../../Types";

const BASE_API_URL = "https://api.unsplash.com/";
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

interface Req extends NextApiRequest {
  body: string;
}
let TTR = 0;
setInterval(() => {
  TTR -= 1;
}, 1000);
export default async function handler({ body }: Req, res: NextApiResponse) {
  console.log(body);
  console.log(TTR);

  try {
    if (TTR < 1) {
      console.log("inside");
      TTR = 10;
      const unsplashRes = await fetch(
        `${BASE_API_URL}search/photos?query=${body}&per_page=10&order_by=popular&client_id=${UNSPLASH_ACCESS_KEY}`
      );
      const { results } = (await unsplashRes.json()) as { results: Unsplash[] };
      console.log(results);
      const urls = results.map(({ urls: { thumb, full } }: Unsplash) => {
        return { thumb, full };
      });
      console.log(urls);
      res.status(200).send(urls);
    } else {
      res.status(429).send({
        message: `you may send another request in ${TTR} seconds`,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
