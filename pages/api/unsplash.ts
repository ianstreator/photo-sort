// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { UidUrls, UrlSizes } from "../../Types";

const BASE_API_URL = "https://api.unsplash.com/";
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

interface Req extends NextApiRequest {
  body: string;
}

type Unsplash = {
  urls: UrlSizes;
};

let TTR = 0;
setInterval(() => {
  TTR -= 1;
}, 1000);
export default async function handler({ body }: Req, res: NextApiResponse) {
  try {
    if (TTR < 1) {
      TTR = 10;

      const unsplashRes = await fetch(
        `${BASE_API_URL}search/photos?query=${body}&per_page=50&order_by=popular&client_id=${UNSPLASH_ACCESS_KEY}`
      );
      const { results } = (await unsplashRes.json()) as { results: Unsplash[] };

      const urlsObject = {} as UidUrls;
      results.forEach(({ urls: { thumb, full } }: Unsplash) => {
        const uid = thumb.split("?")[0].split("-")[1];
        urlsObject[uid] = { thumb, full };
      });
      res.status(200).send(urlsObject);
    } else {
      res
        .status(429)
        .send({ message: `you may send another request in ${TTR} seconds` });
    }
  } catch (error) {
    res.status(500).send(error);
  }
}
