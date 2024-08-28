import { IChainId } from "../interfaces";
export interface IVolumeNetworks {
    getVolumes: IChainId[];
    getSubgraphData: IChainId[];
    getFactoryAPYs: IChainId[];
}
export declare const volumeNetworks: IVolumeNetworks;
