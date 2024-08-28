import { FACTORY_CONSTANTS } from "./constants.js";
import { CRYPTO_FACTORY_CONSTANTS } from "./constants-crypto.js";
import { getPoolIdBySwapAddress } from "../utils.js";
export function setFactoryZapContracts(isCrypto) {
    var basePoolIdZapDict = (isCrypto ? CRYPTO_FACTORY_CONSTANTS : FACTORY_CONSTANTS)[this.chainId].basePoolIdZapDict;
    for (var basePoolId in basePoolIdZapDict) {
        if (!Object.prototype.hasOwnProperty.call(basePoolIdZapDict, basePoolId))
            continue;
        var basePool = basePoolIdZapDict[basePoolId];
        if (basePool.address in this.constants)
            continue;
        this.setContract(basePool.address, basePool.ABI);
    }
}
export function getPoolIdByAddress(poolList, address) {
    var pool = poolList.find(function (item) { return item.address.toLowerCase() === address.toLowerCase(); });
    if (pool) {
        return pool.id;
    }
    else {
        return getPoolIdBySwapAddress(address.toLowerCase());
    }
}
