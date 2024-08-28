import memoize from "memoizee";
import { IExtendedPoolDataFromApi, IDict, INetworkName, IPoolType, IGaugesDataFromApi, IDaoProposal, IDaoProposalListItem, IVolumeAndAPYs } from "./interfaces";
export declare const _getPoolsFromApi: ((network: INetworkName, poolType: IPoolType) => Promise<IExtendedPoolDataFromApi>) & memoize.Memoized<(network: INetworkName, poolType: IPoolType) => Promise<IExtendedPoolDataFromApi>>;
export declare const _getAllPoolsFromApi: (network: INetworkName) => Promise<IExtendedPoolDataFromApi[]>;
export declare const _getSubgraphData: ((network: INetworkName) => Promise<IVolumeAndAPYs>) & memoize.Memoized<(network: INetworkName) => Promise<IVolumeAndAPYs>>;
export declare const _getVolumes: ((network: string) => Promise<IVolumeAndAPYs>) & memoize.Memoized<(network: string) => Promise<IVolumeAndAPYs>>;
export declare const _getFactoryAPYs: ((network: string) => Promise<IVolumeAndAPYs>) & memoize.Memoized<(network: string) => Promise<IVolumeAndAPYs>>;
export declare const _getTotalVolumes: ((network: string) => Promise<{
    totalVolume: number;
    cryptoVolume: number;
    cryptoShare: number;
}>) & memoize.Memoized<(network: string) => Promise<{
    totalVolume: number;
    cryptoVolume: number;
    cryptoShare: number;
}>>;
export declare const _getAllGauges: (() => Promise<IDict<IGaugesDataFromApi>>) & memoize.Memoized<() => Promise<IDict<IGaugesDataFromApi>>>;
export declare const _getAllGaugesFormatted: (() => Promise<IDict<any>>) & memoize.Memoized<() => Promise<IDict<any>>>;
export declare const _getHiddenPools: (() => Promise<IDict<string[]>>) & memoize.Memoized<() => Promise<IDict<string[]>>>;
export declare const _generateBoostingProof: ((block: number, address: string) => Promise<{
    block_header_rlp: string;
    proof_rlp: string;
}>) & memoize.Memoized<(block: number, address: string) => Promise<{
    block_header_rlp: string;
    proof_rlp: string;
}>>;
export declare const _getDaoProposalList: (() => Promise<IDaoProposalListItem[]>) & memoize.Memoized<() => Promise<IDaoProposalListItem[]>>;
export declare const _getDaoProposal: ((type: "PARAMETER" | "OWNERSHIP", id: number) => Promise<IDaoProposal>) & memoize.Memoized<(type: "PARAMETER" | "OWNERSHIP", id: number) => Promise<IDaoProposal>>;
