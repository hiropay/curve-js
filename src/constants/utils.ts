import { ethers } from "ethers";
import { DictInterface, PoolDataInterface } from "../interfaces";


export const lowerCasePoolDataAddresses = (poolsData: DictInterface<PoolDataInterface>): DictInterface<PoolDataInterface> => {
    for (const poolId in poolsData) {
        if (!Object.prototype.hasOwnProperty.call(poolsData, poolId)) continue;
        const poolData = poolsData[poolId];
        poolData.swap_address = poolData.swap_address.toLowerCase();
        poolData.token_address = poolData.token_address.toLowerCase();
        poolData.gauge_address = poolData.gauge_address.toLowerCase();
        if (poolData.deposit_address) poolData.deposit_address = poolData.deposit_address.toLowerCase();
        if (poolData.sCurveRewards_address) poolData.sCurveRewards_address = poolData.sCurveRewards_address.toLowerCase();
        if (poolData.reward_contract) poolData.reward_contract = poolData.reward_contract.toLowerCase();
        poolData.underlying_coin_addresses = poolData.underlying_coin_addresses.map((a) => a.toLowerCase());
        poolData.coin_addresses = poolData.coin_addresses.map((a) => a.toLowerCase());
        if (poolData.reward_tokens) poolData.reward_tokens = poolData.reward_tokens.map((a) => a.toLowerCase());
    }

    return poolsData
}

export const extractDecimals = (poolsData: DictInterface<PoolDataInterface>): DictInterface<number> => {
    const DECIMALS: DictInterface<number> = {};
    for (const poolId in poolsData) {
        if (!Object.prototype.hasOwnProperty.call(poolsData, poolId)) continue;
        const poolData = poolsData[poolId];

        // LP token
        DECIMALS[poolData.token_address] = 18;

        // Underlying coins
        for (let i = 0; i < poolData.underlying_coin_addresses.length; i++) {
            DECIMALS[poolData.underlying_coin_addresses[i]] = poolData.underlying_decimals[i];
        }

        // Wrapped coins
        for (let i = 0; i < poolData.coin_addresses.length; i++) {
            DECIMALS[poolData.coin_addresses[i]] = poolData.decimals[i];
        }

        // Wrapped coins
        const rewardTokens = poolData.reward_tokens ?? [];
        const rewardDecimals = poolData.reward_decimals ?? [];
        for (let i = 0; i < rewardTokens.length; i++) {
            DECIMALS[rewardTokens[i]] = rewardDecimals[i];
        }
    }

    return DECIMALS;
}

export const extractGauges = (poolsData: DictInterface<PoolDataInterface>): string[] => {
    const GAUGES: string[] = [];
    for (const poolData of Object.values(poolsData)) {
        if (poolData.gauge_address === ethers.constants.AddressZero) continue;
        GAUGES.push(poolData.gauge_address);
    }

    return GAUGES;
}

export const lowerCaseValues = (dict: DictInterface<string>): DictInterface<string> => {
    // @ts-ignore
    return Object.fromEntries(Object.entries(dict).map((entry) => [entry[0], entry[1].toLowerCase()]))
}
