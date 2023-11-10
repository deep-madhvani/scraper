import { Request, Response } from 'express';
// import { mongo } from '@src/services/MongoDB';
import logger from 'jet-logger';
import { IProduct } from '@src/models';
import * as jsonData from '../data/data.json'

interface UserData {
  products: any;
  input: any;
}

// Assuming jsonData is an array and you want the first element
const firstUserData = jsonData[0];

const SampleData: UserData = {
  products: firstUserData.products,
  input: firstUserData.input || {} // Provide a default empty object if input is missing
};

enum Competitors {
  AMAZON = "amazon",
  EBAY = "ebay",
  NEWEGG = 'newegg',
}

const competitors = [Competitors.AMAZON, Competitors.EBAY, Competitors.NEWEGG];

/**
 * Given a keyword, search the db for a Query object. If found, return data.
 */
export async function getQuery(req: Request, res: Response): Promise<Response> {
  const method = "brightData.getQuery";
  const metadata = { method, queryParam: req.query as { keyword: string, top?: string } };
  const { keyword, top } = req.query as { keyword: string, top?: string };
  const truncatedProducts: IProduct[] = [];

  if (!keyword) {
    const message = "No keyword provided";
    logger.err({ message, ...{ metadata } }, true);
    return res.status(400).json({ success: false, errorMessage: message });
  }

  try {
    // console.log(mongo.find)
    const data = SampleData;
    // const data = await mongo.find<IQuery>({ keyword });
    if (!data) {
      return res.status(200).json({ success: false });
    }

    competitors.forEach((competitor) => {
      const competitorProducts = data.products.filter((product: { competitor: { toLowerCase: () => Competitors; }; }) => {
        return product.competitor.toLowerCase() === competitor;
      }).slice(0, Number(top) || 10);

      truncatedProducts.push(...competitorProducts);
    });

    const returnQuery = {
      ...data,
      products: truncatedProducts,
    };

    return res.status(200).json({ success: true, data: returnQuery });
  }
  catch (error) {
    logger.err({ method, message: "Error finding query in MongoDB", error: error as unknown, metadata }, true);
    return res.status(500).json({ success: false, errorMessage: "An unexpected error has occurred" });
  }
}


