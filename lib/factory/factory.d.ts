import { IDict, IPoolData, ICurve, IPoolDataShort } from "../interfaces";
export declare const BLACK_LIST: {
    [index: number]: any;
};
export declare function getBasePools(this: ICurve, factoryAddress: string, rawSwapAddresses: string[], tmpPools: IPoolDataShort[]): Promise<{
    ids: string[];
    addresses: string[];
}>;
export declare function getFactoryPoolData(this: ICurve, fromIdx?: number, swapAddress?: string, factoryAddress?: string): Promise<IDict<IPoolData>>;
