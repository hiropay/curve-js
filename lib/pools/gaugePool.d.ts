import { IDict } from '../interfaces';
export interface IGaugePool {
    address: string;
    poolName: string;
    gaugeManager(): Promise<string>;
    gaugeDistributors(): Promise<IDict<string>>;
    gaugeVersion(): Promise<string | null>;
    addReward(rewardToken: string, distributor: string): Promise<string>;
    isDepositRewardAvailable(): Promise<boolean>;
    depositRewardIsApproved(rewardToken: string, amount: number | string): Promise<boolean>;
    depositReward(rewardToken: string, amount: string | number, epoch: string | number): Promise<string>;
    depositRewardApprove(rewardToken: string, amount: number | string): Promise<string[]>;
    estimateGas: {
        addReward(rewardToken: string, distributor: string): Promise<number | number[]>;
        depositReward(rewardToken: string, amount: string | number, epoch: string | number): Promise<number | number[]>;
        depositRewardApprove(rewardToken: string, amount: number | string): Promise<number | number[]>;
    };
}
export declare class GaugePool implements IGaugePool {
    address: string;
    poolName: string;
    estimateGas: {
        addReward: (rewardToken: string, distributor: string) => Promise<number | number[]>;
        depositRewardApprove: (rewardToken: string, amount: number | string) => Promise<number | number[]>;
        depositReward: (rewardToken: string, amount: string | number, epoch: string | number) => Promise<number | number[]>;
    };
    constructor(address: string, poolName: string);
    gaugeManager(): Promise<string>;
    gaugeDistributors(): Promise<IDict<string>>;
    gaugeVersion(): Promise<string | null>;
    private _addReward;
    private addRewardEstimateGas;
    addReward(rewardToken: string, distributor: string): Promise<string>;
    isDepositRewardAvailable(): Promise<boolean>;
    depositRewardIsApproved(rewardToken: string, amount: number | string): Promise<boolean>;
    private depositRewardApproveEstimateGas;
    depositRewardApprove(rewardToken: string, amount: number | string): Promise<string[]>;
    private _depositReward;
    depositRewardEstimateGas(rewardToken: string, amount: string | number, epoch: string | number): Promise<number | number[]>;
    depositReward(rewardToken: string, amount: string | number, epoch: string | number): Promise<string>;
}
