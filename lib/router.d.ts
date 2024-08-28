import memoize from "memoizee";
import { ethers } from "ethers";
import { IDict, IRoute } from "./interfaces";
export declare const _getExchangeArgs: (route: IRoute) => {
    _route: string[];
    _swapParams: number[][];
    _pools?: string[];
    _basePools?: string[];
    _baseTokens?: string[];
    _secondBasePools?: string[];
    _secondBaseTokens?: string[];
};
export declare const _getBestRoute: ((inputCoinAddress: string, outputCoinAddress: string, amount: number | string) => Promise<IRoute>) & memoize.Memoized<(inputCoinAddress: string, outputCoinAddress: string, amount: number | string) => Promise<IRoute>>;
export declare const _getOutputForRoute: ((route: IRoute, _amount: bigint) => Promise<bigint>) & memoize.Memoized<(route: IRoute, _amount: bigint) => Promise<bigint>>;
export declare const _routesCache: IDict<{
    route: IRoute;
    output: string;
    timestamp: number;
}>;
export declare const getBestRouteAndOutput: (inputCoin: string, outputCoin: string, amount: number | string) => Promise<{
    route: IRoute;
    output: string;
}>;
export declare const getArgs: (route: IRoute) => {
    _route: string[];
    _swapParams: number[][];
    _pools?: string[];
    _basePools?: string[];
    _baseTokens?: string[];
    _secondBasePools?: string[];
    _secondBaseTokens?: string[];
};
export declare const swapExpected: (inputCoin: string, outputCoin: string, amount: number | string) => Promise<string>;
export declare const swapRequired: (inputCoin: string, outputCoin: string, outAmount: number | string) => Promise<string>;
export declare const swapPriceImpact: (inputCoin: string, outputCoin: string, amount: number | string) => Promise<number>;
export declare const swapIsApproved: (inputCoin: string, amount: number | string) => Promise<boolean>;
export declare const swapApproveEstimateGas: (inputCoin: string, amount: number | string) => Promise<number | number[]>;
export declare const swapApprove: (inputCoin: string, amount: number | string) => Promise<string[]>;
export declare const swapEstimateGas: (inputCoin: string, outputCoin: string, amount: number | string) => Promise<number | number[]>;
export declare const swap: (inputCoin: string, outputCoin: string, amount: number | string, slippage?: number) => Promise<ethers.ContractTransactionResponse>;
export declare const getSwappedAmount: (tx: ethers.ContractTransactionResponse, outputCoin: string) => Promise<string>;
