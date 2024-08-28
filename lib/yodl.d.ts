import { IRoute } from "./interfaces";
export declare const yodlGetBestRouteAndOutput: (inputCoinAddress: string, outputCoinAddress: string, inputCoinDecimals: number, outputCoinDecimals: number, amount: number | string) => Promise<{
    route: IRoute;
    output: string;
}>;
export declare const yodlSwapPriceImpact: (inputCoinAddress: string, outputCoinAddress: string, inputCoinDecimals: number, outputCoinDecimals: number, amount: number | string) => Promise<number>;
