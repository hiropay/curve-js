import { IDict, IPoolData, ICurve } from "../interfaces";
export declare function getTwocryptoFactoryPoolData(this: ICurve, fromIdx?: number, swapAddress?: string): Promise<IDict<IPoolData>>;
