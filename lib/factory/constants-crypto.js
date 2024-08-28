import { lowerCaseKeys } from "../constants/utils.js";
// --- ZAPS --
import atricrypto3ZapABI from "../constants/abis/atricrypto3/base_pool_zap.json" assert { type: 'json' };
import tripoolZapABI from "../constants/abis/3pool/meta_zap_crypto.json" assert { type: 'json' };
import fraxusdcZapABI from "../constants/abis/fraxusdc/meta_zap_crypto.json" assert { type: 'json' };
export var lpTokenBasePoolIdDictEthereum = lowerCaseKeys({
    '0x6c3F90f043a72FA612cbac8115EE7e52BDe6E490': '3pool',
    '0x3175Df0976dFA876431C2E9eE6Bc45b65d3473CC': 'fraxusdc',
});
export var lpTokenBasePoolIdDictPolygon = lowerCaseKeys({
    '0xdAD97F7713Ae9437fa9249920eC8507e5FbB23d3': 'atricrypto3',
});
export var lpTokenBasePoolIdDictFantom = lowerCaseKeys({});
export var lpTokenBasePoolIdDictAvalanche = lowerCaseKeys({});
export var lpTokenBasePoolIdDictArbitrum = lowerCaseKeys({});
export var lpTokenBasePoolIdDictOptimism = lowerCaseKeys({});
export var lpTokenBasePoolIdDictXDai = lowerCaseKeys({});
export var lpTokenBasePoolIdDictMoonbeam = lowerCaseKeys({});
export var lpTokenBasePoolIdDictKava = lowerCaseKeys({});
export var lpTokenBasePoolIdDictCelo = lowerCaseKeys({});
export var lpTokenBasePoolIdDictZkSync = lowerCaseKeys({});
export var lpTokenBasePoolIdDictBase = lowerCaseKeys({});
export var lpTokenBasePoolIdDictBsc = lowerCaseKeys({});
export var lpTokenBasePoolIdDictFraxtal = lowerCaseKeys({});
export var lpTokenBasePoolIdDictXLayer = lowerCaseKeys({});
export var lpTokenBasePoolIdDictMantle = lowerCaseKeys({});
export var basePoolIdZapDictEthereum = {
    '3pool': {
        address: "0x97aDC08FA1D849D2C48C5dcC1DaB568B169b0267".toLowerCase(),
        ABI: tripoolZapABI,
    },
    fraxusdc: {
        address: "0x5de4ef4879f4fe3bbadf2227d2ac5d0e2d76c895".toLowerCase(),
        ABI: fraxusdcZapABI,
    },
};
export var basePoolIdZapDictPolygon = {
    atricrypto3: {
        address: "0x3d8EADb739D1Ef95dd53D718e4810721837c69c1".toLowerCase(),
        ABI: atricrypto3ZapABI,
    },
};
export var basePoolIdZapDictFantom = {};
export var basePoolIdZapDictAvalanche = {};
export var basePoolIdZapDictArbitrum = {};
export var basePoolIdZapDictOptimism = {};
export var basePoolIdZapDictXDai = {};
export var basePoolIdZapDictMoonbeam = {};
export var basePoolIdZapDictKava = {};
export var basePoolIdZapDictCelo = {};
export var basePoolIdZapDictZkSync = {};
export var basePoolIdZapDictBase = {};
export var basePoolIdZapDictBsc = {};
export var basePoolIdZapDictFraxtal = {};
export var basePoolIdZapDictXLayer = {};
export var basePoolIdZapDictMantle = {};
export var CRYPTO_FACTORY_CONSTANTS = {
    1: {
        lpTokenBasePoolIdDict: lpTokenBasePoolIdDictEthereum,
        basePoolIdZapDict: basePoolIdZapDictEthereum,
    },
    10: {
        lpTokenBasePoolIdDict: lpTokenBasePoolIdDictOptimism,
        basePoolIdZapDict: basePoolIdZapDictOptimism,
    },
    56: {
        lpTokenBasePoolIdDict: lpTokenBasePoolIdDictBsc,
        basePoolIdZapDict: basePoolIdZapDictBsc,
    },
    100: {
        lpTokenBasePoolIdDict: lpTokenBasePoolIdDictXDai,
        basePoolIdZapDict: basePoolIdZapDictXDai,
    },
    137: {
        lpTokenBasePoolIdDict: lpTokenBasePoolIdDictPolygon,
        basePoolIdZapDict: basePoolIdZapDictPolygon,
    },
    196: {
        lpTokenBasePoolIdDict: lpTokenBasePoolIdDictXLayer,
        basePoolIdZapDict: basePoolIdZapDictXLayer,
    },
    250: {
        lpTokenBasePoolIdDict: lpTokenBasePoolIdDictFantom,
        basePoolIdZapDict: basePoolIdZapDictFantom,
    },
    252: {
        lpTokenBasePoolIdDict: lpTokenBasePoolIdDictFraxtal,
        basePoolIdZapDict: basePoolIdZapDictFraxtal,
    },
    324: {
        lpTokenBasePoolIdDict: lpTokenBasePoolIdDictZkSync,
        basePoolIdZapDict: basePoolIdZapDictZkSync,
    },
    1284: {
        lpTokenBasePoolIdDict: lpTokenBasePoolIdDictMoonbeam,
        basePoolIdZapDict: basePoolIdZapDictMoonbeam,
    },
    2222: {
        lpTokenBasePoolIdDict: lpTokenBasePoolIdDictKava,
        basePoolIdZapDict: basePoolIdZapDictKava,
    },
    5000: {
        lpTokenBasePoolIdDict: lpTokenBasePoolIdDictMantle,
        basePoolIdZapDict: basePoolIdZapDictMantle,
    },
    8453: {
        lpTokenBasePoolIdDict: lpTokenBasePoolIdDictBase,
        basePoolIdZapDict: basePoolIdZapDictBase,
    },
    42220: {
        lpTokenBasePoolIdDict: lpTokenBasePoolIdDictCelo,
        basePoolIdZapDict: basePoolIdZapDictCelo,
    },
    43114: {
        lpTokenBasePoolIdDict: lpTokenBasePoolIdDictAvalanche,
        basePoolIdZapDict: basePoolIdZapDictAvalanche,
    },
    42161: {
        lpTokenBasePoolIdDict: lpTokenBasePoolIdDictArbitrum,
        basePoolIdZapDict: basePoolIdZapDictArbitrum,
    },
};
