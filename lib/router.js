var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import axios from "axios";
import memoize from "memoizee";
import { ethers } from "ethers";
import { curve } from "./curve.js";
import { _getCoinAddresses, _getCoinDecimals, _getUsdRate, ensureAllowance, ensureAllowanceEstimateGas, fromBN, hasAllowance, isEth, toBN, BN, parseUnits, _cutZeros, ETH_ADDRESS, _get_small_x, _get_price_impact, DIGas, smartNumber, getTxCostsUsd, getGasPriceFromL1, } from "./utils.js";
import { getPool } from "./pools/index.js";
import { _getAmplificationCoefficientsFromApi } from "./pools/utils.js";
import { L2Networks } from "./constants/L2Networks.js";
var MAX_STEPS = 5;
var ROUTE_LENGTH = (MAX_STEPS * 2) + 1;
var GRAPH_MAX_EDGES = 3;
var MAX_ROUTES_FOR_ONE_COIN = 5;
var OLD_CHAINS = [1, 10, 56, 100, 137, 250, 1284, 2222, 8453, 42161, 42220, 43114, 1313161554]; // these chains have non-ng pools
var _removeDuplications = function (routes) {
    return routes.filter(function (r, i, _routes) {
        var routesByPoolIds = _routes.map(function (r) { return r.route.map(function (s) { return s.poolId; }).toString(); });
        return routesByPoolIds.indexOf(r.route.map(function (s) { return s.poolId; }).toString()) === i;
    });
};
var _sortByTvl = function (a, b) { return b.minTvl - a.minTvl || b.totalTvl - a.totalTvl || a.route.length - b.route.length; };
var _sortByLength = function (a, b) { return a.route.length - b.route.length || b.minTvl - a.minTvl || b.totalTvl - a.totalTvl; };
var _getTVL = memoize(function (poolId) { return __awaiter(void 0, void 0, void 0, function () { var _a; return __generator(this, function (_b) {
    switch (_b.label) {
        case 0:
            _a = Number;
            return [4 /*yield*/, (getPool(poolId)).stats.totalLiquidity()];
        case 1: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
    }
}); }); }, {
    promise: true,
    maxAge: 5 * 60 * 1000, // 5m
});
// 4 --> 6, 5 --> 7 not allowed
// 4 --> 7, 5 --> 6 allowed
var _handleSwapType = function (swapType) {
    if (swapType === 6)
        return "4";
    if (swapType === 7)
        return "5";
    return swapType.toString();
};
var SNX = {
    10: {
        swap: "0x8700dAec35aF8Ff88c16BdF0418774CB3D7599B4".toLowerCase(),
        coins: [
            "0x8c6f28f2f1a3c87f0f938b96d27520d9751ec8d9",
            "0xFBc4198702E81aE77c06D58f81b629BDf36f0a71",
            "0xe405de8f52ba7559f9df3c368500b6e6ae6cee49",
            "0x298b9b95708152ff6968aafd889c6586e9169f1d", // sBTC
        ].map(function (a) { return a.toLowerCase(); }),
    },
};
var _buildRouteGraph = memoize(function () { return __awaiter(void 0, void 0, void 0, function () {
    var routerGraph, _i, _a, outCoin, _b, _c, inCoin, _d, _e, outCoin, ALL_POOLS, amplificationCoefficientDict, _f, ALL_POOLS_1, _h, poolId, poolData, wrappedCoinAddresses, underlyingCoinAddresses, poolAddress, tokenAddress, isAaveLikeLending, poolType, tvlMultiplier, basePool, basePoolAddress, baseTokenAddress, secondBasePool, secondBasePoolAddress, secondBaseTokenAddress, metaCoinAddresses, swapAddress, tvl, excludedUnderlyingSwaps, coins, k, l, i, j, swapType, coins, k, l, i, j, swapType, i, j, i, j, hasEth, swapType;
    var _j, _k, _l;
    return __generator(this, function (_m) {
        switch (_m.label) {
            case 0:
                routerGraph = {};
                // ETH <-> WETH (exclude Celo)
                if (curve.chainId !== 42220) {
                    routerGraph[curve.constants.NATIVE_TOKEN.address] = {};
                    routerGraph[curve.constants.NATIVE_TOKEN.address][curve.constants.NATIVE_TOKEN.wrappedAddress] = [{
                            poolId: "WETH wrapper",
                            swapAddress: curve.constants.NATIVE_TOKEN.wrappedAddress,
                            inputCoinAddress: curve.constants.NATIVE_TOKEN.address,
                            outputCoinAddress: curve.constants.NATIVE_TOKEN.wrappedAddress,
                            swapParams: [0, 0, 8, 0, 0],
                            poolAddress: curve.constants.ZERO_ADDRESS,
                            basePool: curve.constants.ZERO_ADDRESS,
                            baseToken: curve.constants.ZERO_ADDRESS,
                            secondBasePool: curve.constants.ZERO_ADDRESS,
                            secondBaseToken: curve.constants.ZERO_ADDRESS,
                            tvl: Infinity,
                        }];
                    routerGraph[curve.constants.NATIVE_TOKEN.wrappedAddress] = {};
                    routerGraph[curve.constants.NATIVE_TOKEN.wrappedAddress][curve.constants.NATIVE_TOKEN.address] = [{
                            poolId: "WETH wrapper",
                            swapAddress: curve.constants.NATIVE_TOKEN.wrappedAddress,
                            inputCoinAddress: curve.constants.NATIVE_TOKEN.wrappedAddress,
                            outputCoinAddress: curve.constants.NATIVE_TOKEN.address,
                            swapParams: [0, 0, 8, 0, 0],
                            poolAddress: curve.constants.ZERO_ADDRESS,
                            basePool: curve.constants.ZERO_ADDRESS,
                            baseToken: curve.constants.ZERO_ADDRESS,
                            secondBasePool: curve.constants.ZERO_ADDRESS,
                            secondBaseToken: curve.constants.ZERO_ADDRESS,
                            tvl: Infinity,
                        }];
                }
                // ETH -> stETH, ETH -> frxETH, ETH -> wBETH (Ethereum only)
                if (curve.chainId == 1) {
                    for (_i = 0, _a = ["stETH", "frxETH", "wBETH"]; _i < _a.length; _i++) {
                        outCoin = _a[_i];
                        routerGraph[curve.constants.NATIVE_TOKEN.address][curve.constants.COINS[outCoin.toLowerCase()]] = [{
                                poolId: outCoin + " minter",
                                swapAddress: outCoin === "frxETH" ? "0xbAFA44EFE7901E04E39Dad13167D089C559c1138".toLowerCase() : curve.constants.COINS[outCoin.toLowerCase()],
                                inputCoinAddress: curve.constants.NATIVE_TOKEN.address,
                                outputCoinAddress: curve.constants.COINS[outCoin.toLowerCase()],
                                swapParams: [0, 0, 8, 0, 0],
                                poolAddress: curve.constants.ZERO_ADDRESS,
                                basePool: curve.constants.ZERO_ADDRESS,
                                baseToken: curve.constants.ZERO_ADDRESS,
                                secondBasePool: curve.constants.ZERO_ADDRESS,
                                secondBaseToken: curve.constants.ZERO_ADDRESS,
                                tvl: Infinity,
                            }];
                    }
                }
                // stETH <-> wstETH (Ethereum only)
                if (curve.chainId === 1) {
                    routerGraph[curve.constants.COINS.steth] = {};
                    routerGraph[curve.constants.COINS.steth][curve.constants.COINS.wsteth] = [{
                            poolId: "wstETH wrapper",
                            swapAddress: curve.constants.COINS.wsteth,
                            inputCoinAddress: curve.constants.COINS.steth,
                            outputCoinAddress: curve.constants.COINS.wsteth,
                            swapParams: [0, 0, 8, 0, 0],
                            poolAddress: curve.constants.ZERO_ADDRESS,
                            basePool: curve.constants.ZERO_ADDRESS,
                            baseToken: curve.constants.ZERO_ADDRESS,
                            secondBasePool: curve.constants.ZERO_ADDRESS,
                            secondBaseToken: curve.constants.ZERO_ADDRESS,
                            tvl: Infinity,
                        }];
                    routerGraph[curve.constants.COINS.wsteth] = {};
                    routerGraph[curve.constants.COINS.wsteth][curve.constants.COINS.steth] = [{
                            poolId: "wstETH wrapper",
                            swapAddress: curve.constants.COINS.wsteth,
                            inputCoinAddress: curve.constants.COINS.wsteth,
                            outputCoinAddress: curve.constants.COINS.steth,
                            swapParams: [0, 0, 8, 0, 0],
                            poolAddress: curve.constants.ZERO_ADDRESS,
                            basePool: curve.constants.ZERO_ADDRESS,
                            baseToken: curve.constants.ZERO_ADDRESS,
                            secondBasePool: curve.constants.ZERO_ADDRESS,
                            secondBaseToken: curve.constants.ZERO_ADDRESS,
                            tvl: Infinity,
                        }];
                }
                // frxETH <-> sfrxETH (Ethereum only)
                if (curve.chainId === 1) {
                    routerGraph[curve.constants.COINS.frxeth] = {};
                    routerGraph[curve.constants.COINS.frxeth][curve.constants.COINS.sfrxeth] = [{
                            poolId: "sfrxETH wrapper",
                            swapAddress: curve.constants.COINS.sfrxeth,
                            inputCoinAddress: curve.constants.COINS.frxeth,
                            outputCoinAddress: curve.constants.COINS.sfrxeth,
                            swapParams: [0, 0, 8, 0, 0],
                            poolAddress: curve.constants.ZERO_ADDRESS,
                            basePool: curve.constants.ZERO_ADDRESS,
                            baseToken: curve.constants.ZERO_ADDRESS,
                            secondBasePool: curve.constants.ZERO_ADDRESS,
                            secondBaseToken: curve.constants.ZERO_ADDRESS,
                            tvl: Infinity,
                        }];
                    routerGraph[curve.constants.COINS.sfrxeth] = {};
                    routerGraph[curve.constants.COINS.sfrxeth][curve.constants.COINS.frxeth] = [{
                            poolId: "sfrxETH wrapper",
                            swapAddress: curve.constants.COINS.sfrxeth,
                            inputCoinAddress: curve.constants.COINS.sfrxeth,
                            outputCoinAddress: curve.constants.COINS.frxeth,
                            swapParams: [0, 0, 8, 0, 0],
                            poolAddress: curve.constants.ZERO_ADDRESS,
                            basePool: curve.constants.ZERO_ADDRESS,
                            baseToken: curve.constants.ZERO_ADDRESS,
                            secondBasePool: curve.constants.ZERO_ADDRESS,
                            secondBaseToken: curve.constants.ZERO_ADDRESS,
                            tvl: Infinity,
                        }];
                }
                // SNX swaps
                if (curve.chainId in SNX) {
                    // @ts-ignore
                    for (_b = 0, _c = SNX[curve.chainId].coins; _b < _c.length; _b++) {
                        inCoin = _c[_b];
                        // @ts-ignore
                        for (_d = 0, _e = SNX[curve.chainId].coins; _d < _e.length; _d++) {
                            outCoin = _e[_d];
                            if (inCoin === outCoin)
                                continue;
                            if (!routerGraph[inCoin])
                                routerGraph[inCoin] = {};
                            routerGraph[inCoin][outCoin] = [{
                                    poolId: "SNX exchanger",
                                    // @ts-ignore
                                    swapAddress: SNX[curve.chainId].swap,
                                    inputCoinAddress: inCoin,
                                    outputCoinAddress: outCoin,
                                    swapParams: [0, 0, 9, 0, 0],
                                    poolAddress: curve.constants.ZERO_ADDRESS,
                                    basePool: curve.constants.ZERO_ADDRESS,
                                    baseToken: curve.constants.ZERO_ADDRESS,
                                    secondBasePool: curve.constants.ZERO_ADDRESS,
                                    secondBaseToken: curve.constants.ZERO_ADDRESS,
                                    tvl: Infinity,
                                }];
                        }
                    }
                }
                ALL_POOLS = Object.entries(curve.getPoolsData()).filter(function (_a) {
                    var id = _a[0], _ = _a[1];
                    return !["crveth", "y", "busd", "pax"].includes(id);
                });
                return [4 /*yield*/, _getAmplificationCoefficientsFromApi()];
            case 1:
                amplificationCoefficientDict = _m.sent();
                _f = 0, ALL_POOLS_1 = ALL_POOLS;
                _m.label = 2;
            case 2:
                if (!(_f < ALL_POOLS_1.length)) return [3 /*break*/, 5];
                _h = ALL_POOLS_1[_f], poolId = _h[0], poolData = _h[1];
                wrappedCoinAddresses = poolData.wrapped_coin_addresses.map(function (a) { return a.toLowerCase(); });
                underlyingCoinAddresses = poolData.underlying_coin_addresses.map(function (a) { return a.toLowerCase(); });
                poolAddress = poolData.swap_address.toLowerCase();
                tokenAddress = poolData.token_address.toLowerCase();
                isAaveLikeLending = poolData.is_lending && wrappedCoinAddresses.length === 3 && !poolData.deposit_address;
                poolType = poolData.is_llamma ? 4 : poolData.is_crypto ? Math.min(poolData.wrapped_coins.length, 3) : 1;
                if (poolData.is_ng)
                    poolType *= 10;
                tvlMultiplier = poolData.is_crypto ? 1 : ((_j = amplificationCoefficientDict[poolData.swap_address]) !== null && _j !== void 0 ? _j : 1);
                basePool = poolData.is_meta ? __assign(__assign({}, curve.constants.POOLS_DATA), curve.constants.FACTORY_POOLS_DATA)[poolData.base_pool] : null;
                basePoolAddress = basePool ? basePool.swap_address.toLowerCase() : curve.constants.ZERO_ADDRESS;
                baseTokenAddress = basePool ? basePool.token_address.toLowerCase() : curve.constants.ZERO_ADDRESS;
                secondBasePool = basePool && basePool.base_pool ? __assign(__assign(__assign({}, curve.constants.POOLS_DATA), curve.constants.FACTORY_POOLS_DATA), curve.constants.CRVUSD_FACTORY_POOLS_DATA)[basePool.base_pool] : null;
                secondBasePoolAddress = secondBasePool ? secondBasePool.swap_address.toLowerCase() : curve.constants.ZERO_ADDRESS;
                // for double meta underlying (crv/tricrypto, wmatic/tricrypto)
                if (basePool && secondBasePoolAddress !== curve.constants.ZERO_ADDRESS)
                    baseTokenAddress = (_k = basePool.deposit_address) === null || _k === void 0 ? void 0 : _k.toLowerCase();
                secondBaseTokenAddress = secondBasePool ? secondBasePool.token_address.toLowerCase() : curve.constants.ZERO_ADDRESS;
                metaCoinAddresses = basePool ? basePool.underlying_coin_addresses.map(function (a) { return a.toLowerCase(); }) : [];
                swapAddress = poolData.is_fake ? (_l = poolData.deposit_address) === null || _l === void 0 ? void 0 : _l.toLowerCase() : poolAddress;
                return [4 /*yield*/, _getTVL(poolId)];
            case 3:
                tvl = (_m.sent()) * tvlMultiplier;
                // Skip empty pools
                if (curve.chainId === 1 && tvl < 1000)
                    return [3 /*break*/, 4];
                if (curve.chainId !== 1 && tvl < 100)
                    return [3 /*break*/, 4];
                excludedUnderlyingSwaps = (poolId === 'ib' && curve.chainId === 1) ||
                    (poolId === 'geist' && curve.chainId === 250) ||
                    (poolId === 'saave' && curve.chainId === 1);
                // Wrapped coin <-> LP "swaps" (actually add_liquidity/remove_liquidity_one_coin)
                if (!poolData.is_fake && !poolData.is_llamma && wrappedCoinAddresses.length < 6) {
                    coins = __spreadArray([tokenAddress], wrappedCoinAddresses, true);
                    for (k = 0; k < coins.length; k++) {
                        for (l = 0; l < coins.length; l++) {
                            if (k > 0 && l > 0)
                                continue;
                            if (k == 0 && l == 0)
                                continue;
                            i = Math.max(k - 1, 0);
                            j = Math.max(l - 1, 0);
                            swapType = k == 0 ? 6 : 4;
                            if (!routerGraph[coins[k]])
                                routerGraph[coins[k]] = {};
                            if (!routerGraph[coins[k]][coins[l]])
                                routerGraph[coins[k]][coins[l]] = [];
                            routerGraph[coins[k]][coins[l]].push({
                                poolId: poolId,
                                swapAddress: swapAddress,
                                inputCoinAddress: coins[k],
                                outputCoinAddress: coins[l],
                                swapParams: [i, j, swapType, poolType, wrappedCoinAddresses.length],
                                poolAddress: curve.constants.ZERO_ADDRESS,
                                basePool: curve.constants.ZERO_ADDRESS,
                                baseToken: curve.constants.ZERO_ADDRESS,
                                secondBasePool: curve.constants.ZERO_ADDRESS,
                                secondBaseToken: curve.constants.ZERO_ADDRESS,
                                tvl: tvl,
                            });
                        }
                    }
                }
                // Underlying coin <-> LP "swaps" (actually add_liquidity/remove_liquidity_one_coin)
                if ((poolData.is_fake || isAaveLikeLending) && underlyingCoinAddresses.length < 6 && !excludedUnderlyingSwaps) {
                    coins = __spreadArray([tokenAddress], underlyingCoinAddresses, true);
                    for (k = 0; k < coins.length; k++) {
                        for (l = 0; l < coins.length; l++) {
                            if (k > 0 && l > 0)
                                continue;
                            if (k == 0 && l == 0)
                                continue;
                            i = Math.max(k - 1, 0);
                            j = Math.max(l - 1, 0);
                            swapType = isAaveLikeLending ? 7 : 6;
                            if (k > 0)
                                swapType = isAaveLikeLending ? 5 : 4;
                            if (!routerGraph[coins[k]])
                                routerGraph[coins[k]] = {};
                            if (!routerGraph[coins[k]][coins[l]])
                                routerGraph[coins[k]][coins[l]] = [];
                            routerGraph[coins[k]][coins[l]].push({
                                poolId: poolId,
                                swapAddress: swapAddress,
                                inputCoinAddress: coins[k],
                                outputCoinAddress: coins[l],
                                swapParams: [i, j, swapType, poolType, underlyingCoinAddresses.length],
                                poolAddress: curve.constants.ZERO_ADDRESS,
                                basePool: curve.constants.ZERO_ADDRESS,
                                baseToken: curve.constants.ZERO_ADDRESS,
                                secondBasePool: curve.constants.ZERO_ADDRESS,
                                secondBaseToken: curve.constants.ZERO_ADDRESS,
                                tvl: tvl,
                            });
                        }
                    }
                }
                // Wrapped swaps
                if (!poolData.is_fake) {
                    for (i = 0; i < wrappedCoinAddresses.length; i++) {
                        for (j = 0; j < wrappedCoinAddresses.length; j++) {
                            if (i == j)
                                continue;
                            if (!routerGraph[wrappedCoinAddresses[i]])
                                routerGraph[wrappedCoinAddresses[i]] = {};
                            if (!routerGraph[wrappedCoinAddresses[i]][wrappedCoinAddresses[j]])
                                routerGraph[wrappedCoinAddresses[i]][wrappedCoinAddresses[j]] = [];
                            routerGraph[wrappedCoinAddresses[i]][wrappedCoinAddresses[j]] = routerGraph[wrappedCoinAddresses[i]][wrappedCoinAddresses[j]].concat({
                                poolId: poolId,
                                swapAddress: swapAddress,
                                inputCoinAddress: wrappedCoinAddresses[i],
                                outputCoinAddress: wrappedCoinAddresses[j],
                                swapParams: [i, j, 1, poolType, wrappedCoinAddresses.length],
                                poolAddress: poolAddress,
                                basePool: basePoolAddress,
                                baseToken: baseTokenAddress,
                                secondBasePool: secondBasePoolAddress,
                                secondBaseToken: secondBaseTokenAddress,
                                tvl: tvl,
                            }).sort(function (a, b) { return b.tvl - a.tvl; }).slice(0, GRAPH_MAX_EDGES);
                        }
                    }
                }
                // Only for underlying swaps
                swapAddress = (poolData.is_crypto && poolData.is_meta) || ((basePool === null || basePool === void 0 ? void 0 : basePool.is_lending) && poolData.is_factory) ?
                    poolData.deposit_address : poolData.swap_address;
                // Underlying swaps
                if (!poolData.is_plain && !excludedUnderlyingSwaps) {
                    for (i = 0; i < underlyingCoinAddresses.length; i++) {
                        for (j = 0; j < underlyingCoinAddresses.length; j++) {
                            if (i === j)
                                continue;
                            // Don't swap metacoins since they can be swapped directly in base pool
                            if (metaCoinAddresses.includes(underlyingCoinAddresses[i]) && metaCoinAddresses.includes(underlyingCoinAddresses[j]))
                                continue;
                            // avWBTC is frozen by Aave on Avalanche, deposits are not working
                            if (curve.chainId === 43114 && poolId === "atricrypto" && i === 3)
                                continue;
                            hasEth = underlyingCoinAddresses.includes(curve.constants.NATIVE_TOKEN.address);
                            swapType = (poolData.is_crypto && poolData.is_meta && poolData.is_factory) || ((basePool === null || basePool === void 0 ? void 0 : basePool.is_lending) && poolData.is_factory) ? 3
                                : hasEth && poolId !== 'avaxcrypto' ? 1 : 2;
                            if (!routerGraph[underlyingCoinAddresses[i]])
                                routerGraph[underlyingCoinAddresses[i]] = {};
                            if (!routerGraph[underlyingCoinAddresses[i]][underlyingCoinAddresses[j]])
                                routerGraph[underlyingCoinAddresses[i]][underlyingCoinAddresses[j]] = [];
                            routerGraph[underlyingCoinAddresses[i]][underlyingCoinAddresses[j]] = routerGraph[underlyingCoinAddresses[i]][underlyingCoinAddresses[j]].concat({
                                poolId: poolId,
                                swapAddress: swapAddress,
                                inputCoinAddress: underlyingCoinAddresses[i],
                                outputCoinAddress: underlyingCoinAddresses[j],
                                swapParams: [i, j, swapType, poolType, underlyingCoinAddresses.length],
                                poolAddress: poolAddress,
                                basePool: basePoolAddress,
                                baseToken: baseTokenAddress,
                                secondBasePool: secondBasePoolAddress,
                                secondBaseToken: secondBaseTokenAddress,
                                tvl: tvl,
                            }).sort(function (a, b) { return b.tvl - a.tvl; }).slice(0, GRAPH_MAX_EDGES);
                        }
                    }
                }
                _m.label = 4;
            case 4:
                _f++;
                return [3 /*break*/, 2];
            case 5: return [2 /*return*/, routerGraph];
        }
    });
}); }, {
    promise: true,
    maxAge: 5 * 1000, // 5m
});
var _isVisitedCoin = function (coinAddress, route) {
    return route.route.map(function (r) { return r.inputCoinAddress; }).includes(coinAddress);
};
var _isVisitedPool = function (poolId, route) {
    return route.route.map(function (r) { return r.poolId; }).includes(poolId);
};
// Breadth-first search
var _findRoutes = function (inputCoinAddress, outputCoinAddress) { return __awaiter(void 0, void 0, void 0, function () {
    var routes, targetRoutes, routerGraph, ALL_POOLS, route, inCoin, outCoin, _i, _a, step, poolData, routePoolIdsPlusSwapType, poolCoins;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                inputCoinAddress = inputCoinAddress.toLowerCase();
                outputCoinAddress = outputCoinAddress.toLowerCase();
                routes = [{ route: [], minTvl: Infinity, totalTvl: 0 }];
                targetRoutes = [];
                return [4 /*yield*/, _buildRouteGraph()];
            case 1:
                routerGraph = _b.sent();
                ALL_POOLS = curve.getPoolsData();
                while (routes.length > 0) {
                    route = routes.pop();
                    inCoin = route.route.length > 0 ? route.route[route.route.length - 1].outputCoinAddress : inputCoinAddress;
                    if (inCoin === outputCoinAddress) {
                        targetRoutes.push(route);
                    }
                    else if (route.route.length < 5) {
                        for (outCoin in routerGraph[inCoin]) {
                            if (_isVisitedCoin(outCoin, route))
                                continue;
                            for (_i = 0, _a = routerGraph[inCoin][outCoin]; _i < _a.length; _i++) {
                                step = _a[_i];
                                poolData = ALL_POOLS[step.poolId];
                                if (!(poolData === null || poolData === void 0 ? void 0 : poolData.is_lending) && _isVisitedPool(step.poolId, route))
                                    continue;
                                routePoolIdsPlusSwapType = route.route.map(function (s) { return s.poolId + "+" + _handleSwapType(s.swapParams[2]); });
                                if (routePoolIdsPlusSwapType.includes(step.poolId + "+" + _handleSwapType(step.swapParams[2])))
                                    continue;
                                poolCoins = poolData ? poolData.wrapped_coin_addresses.concat(poolData.underlying_coin_addresses) : [];
                                // Exclude such cases as:
                                // cvxeth -> tricrypto2 -> tusd -> susd (cvxeth -> tricrypto2 -> tusd instead)
                                if (!(poolData === null || poolData === void 0 ? void 0 : poolData.is_lending) && poolCoins.includes(outputCoinAddress) && outCoin !== outputCoinAddress)
                                    continue;
                                // Exclude such cases as:
                                // aave -> aave -> 3pool (aave -> aave instead)
                                if ((poolData === null || poolData === void 0 ? void 0 : poolData.is_lending) && poolCoins.includes(outputCoinAddress) && outCoin !== outputCoinAddress && outCoin !== poolData.token_address)
                                    continue;
                                routes.push({
                                    route: __spreadArray(__spreadArray([], route.route, true), [step], false),
                                    minTvl: Math.min(step.tvl, route.minTvl),
                                    totalTvl: route.totalTvl + step.tvl,
                                });
                            }
                        }
                    }
                }
                targetRoutes = _removeDuplications(__spreadArray(__spreadArray([], targetRoutes.sort(_sortByTvl).slice(0, MAX_ROUTES_FOR_ONE_COIN), true), targetRoutes.sort(_sortByLength).slice(0, MAX_ROUTES_FOR_ONE_COIN), true));
                return [2 /*return*/, targetRoutes.map(function (r) { return r.route; })];
        }
    });
}); };
var _getRouteKey = function (route, inputCoinAddress, outputCoinAddress) {
    var sortedCoins = [inputCoinAddress, outputCoinAddress].sort();
    var key = "".concat(sortedCoins[0], "-->");
    for (var _i = 0, route_1 = route; _i < route_1.length; _i++) {
        var routeStep = route_1[_i];
        key += "".concat(routeStep.poolId, "-->");
    }
    key += sortedCoins[1];
    return key;
};
export var _getExchangeArgs = function (route) {
    if (OLD_CHAINS.includes(curve.chainId)) {
        var _route = [];
        if (route.length > 0)
            _route.push(route[0].inputCoinAddress);
        var _swapParams = [];
        var _pools = [];
        var _basePools = [];
        var _baseTokens = [];
        var _secondBasePools = [];
        var _secondBaseTokens = [];
        for (var _i = 0, route_2 = route; _i < route_2.length; _i++) {
            var routeStep = route_2[_i];
            _route.push(routeStep.swapAddress, routeStep.outputCoinAddress);
            _swapParams.push(routeStep.swapParams);
            _pools.push(routeStep.poolAddress);
            _basePools.push(routeStep.basePool);
            _baseTokens.push(routeStep.baseToken);
            _secondBasePools.push(routeStep.secondBasePool);
            _secondBaseTokens.push(routeStep.secondBaseToken);
        }
        _route = _route.concat(Array(ROUTE_LENGTH - _route.length).fill(curve.constants.ZERO_ADDRESS));
        _swapParams = _swapParams.concat(Array(MAX_STEPS - _swapParams.length).fill([0, 0, 0, 0, 0]));
        _pools = _pools.concat(Array(MAX_STEPS - _pools.length).fill(curve.constants.ZERO_ADDRESS));
        _basePools = _basePools.concat(Array(MAX_STEPS - _basePools.length).fill(curve.constants.ZERO_ADDRESS));
        _baseTokens = _baseTokens.concat(Array(MAX_STEPS - _baseTokens.length).fill(curve.constants.ZERO_ADDRESS));
        _secondBasePools = _secondBasePools.concat(Array(MAX_STEPS - _secondBasePools.length).fill(curve.constants.ZERO_ADDRESS));
        _secondBaseTokens = _secondBaseTokens.concat(Array(MAX_STEPS - _secondBaseTokens.length).fill(curve.constants.ZERO_ADDRESS));
        return { _route: _route, _swapParams: _swapParams, _pools: _pools, _basePools: _basePools, _baseTokens: _baseTokens, _secondBasePools: _secondBasePools, _secondBaseTokens: _secondBaseTokens };
    }
    else { // RouterNgPoolsOnly
        var _route = [];
        if (route.length > 0)
            _route.push(route[0].inputCoinAddress);
        var _swapParams = [];
        for (var _a = 0, route_3 = route; _a < route_3.length; _a++) {
            var routeStep = route_3[_a];
            _route.push(routeStep.swapAddress, routeStep.outputCoinAddress);
            _swapParams.push(routeStep.swapParams.slice(0, 4));
        }
        _route = _route.concat(Array(ROUTE_LENGTH - _route.length).fill(curve.constants.ZERO_ADDRESS));
        _swapParams = _swapParams.concat(Array(MAX_STEPS - _swapParams.length).fill([0, 0, 0, 0]));
        return { _route: _route, _swapParams: _swapParams };
    }
};
var _estimatedGasForDifferentRoutesCache = {};
var _estimateGasForDifferentRoutes = function (routes, inputCoinAddress, outputCoinAddress, _amount) { return __awaiter(void 0, void 0, void 0, function () {
    var contract, gasPromises, value, _i, routes_1, route, routeKey, gasPromise, _a, _route, _swapParams, _pools, _gasAmounts_1, err_1;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                inputCoinAddress = inputCoinAddress.toLowerCase();
                outputCoinAddress = outputCoinAddress.toLowerCase();
                contract = curve.contracts[curve.constants.ALIASES.router].contract;
                gasPromises = [];
                value = isEth(inputCoinAddress) ? _amount : curve.parseUnits("0");
                for (_i = 0, routes_1 = routes; _i < routes_1.length; _i++) {
                    route = routes_1[_i];
                    routeKey = _getRouteKey(route, inputCoinAddress, outputCoinAddress);
                    gasPromise = void 0;
                    _a = _getExchangeArgs(route), _route = _a._route, _swapParams = _a._swapParams, _pools = _a._pools;
                    if ((((_b = _estimatedGasForDifferentRoutesCache[routeKey]) === null || _b === void 0 ? void 0 : _b.time) || 0) + 3600000 < Date.now()) {
                        if (_pools) {
                            gasPromise = contract.exchange.estimateGas(_route, _swapParams, _amount, 0, _pools, __assign(__assign({}, curve.constantOptions), { value: value }));
                        }
                        else {
                            gasPromise = contract.exchange.estimateGas(_route, _swapParams, _amount, 0, __assign(__assign({}, curve.constantOptions), { value: value }));
                        }
                    }
                    else {
                        gasPromise = Promise.resolve(_estimatedGasForDifferentRoutesCache[routeKey].gas);
                    }
                    gasPromises.push(gasPromise);
                }
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Promise.all(gasPromises)];
            case 2:
                _gasAmounts_1 = _c.sent();
                routes.forEach(function (route, i) {
                    var routeKey = _getRouteKey(route, inputCoinAddress, outputCoinAddress);
                    _estimatedGasForDifferentRoutesCache[routeKey] = { 'gas': _gasAmounts_1[i], 'time': Date.now() };
                });
                return [2 /*return*/, _gasAmounts_1.map(function (_g) { return smartNumber(_g); })];
            case 3:
                err_1 = _c.sent();
                return [2 /*return*/, routes.map(function () { return 0; })];
            case 4: return [2 /*return*/];
        }
    });
}); };
export var _getBestRoute = memoize(function (inputCoinAddress, outputCoinAddress, amount) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, inputCoinDecimals, outputCoinDecimals, _amount, routesRaw, routes, calls, multicallContract, _i, routesRaw_1, r, _b, _route, _swapParams, _pools, _outputAmounts, i, err_2, contract, _outputs, _c, routesRaw_2, r, _d, _route, _swapParams, _pools, _e, _f, _h, _j, e_1, i, _k, gasAmounts, outputCoinUsdRate, gasData, ethUsdRate, gasPrice, expectedAmounts, expectedAmountsUsd, L1GasPrice, _l, txCostsUsd;
    return __generator(this, function (_m) {
        switch (_m.label) {
            case 0:
                _a = _getCoinDecimals(inputCoinAddress, outputCoinAddress), inputCoinDecimals = _a[0], outputCoinDecimals = _a[1];
                _amount = parseUnits(amount, inputCoinDecimals);
                if (_amount === curve.parseUnits("0"))
                    return [2 /*return*/, []];
                return [4 /*yield*/, _findRoutes(inputCoinAddress, outputCoinAddress)];
            case 1:
                routesRaw = (_m.sent()).map(function (route) { return ({ route: route, _output: curve.parseUnits("0"), outputUsd: 0, txCostUsd: 0 }); });
                routes = [];
                _m.label = 2;
            case 2:
                _m.trys.push([2, 4, , 14]);
                calls = [];
                multicallContract = curve.contracts[curve.constants.ALIASES.router].multicallContract;
                for (_i = 0, routesRaw_1 = routesRaw; _i < routesRaw_1.length; _i++) {
                    r = routesRaw_1[_i];
                    _b = _getExchangeArgs(r.route), _route = _b._route, _swapParams = _b._swapParams, _pools = _b._pools;
                    if (_pools) {
                        calls.push(multicallContract.get_dy(_route, _swapParams, _amount, _pools));
                    }
                    else {
                        calls.push(multicallContract.get_dy(_route, _swapParams, _amount));
                    }
                }
                return [4 /*yield*/, curve.multicallProvider.all(calls)];
            case 3:
                _outputAmounts = _m.sent();
                for (i = 0; i < _outputAmounts.length; i++) {
                    routesRaw[i]._output = _outputAmounts[i];
                    routes.push(routesRaw[i]);
                }
                return [3 /*break*/, 14];
            case 4:
                err_2 = _m.sent();
                contract = curve.contracts[curve.constants.ALIASES.router].contract;
                _outputs = [];
                _c = 0, routesRaw_2 = routesRaw;
                _m.label = 5;
            case 5:
                if (!(_c < routesRaw_2.length)) return [3 /*break*/, 13];
                r = routesRaw_2[_c];
                _d = _getExchangeArgs(r.route), _route = _d._route, _swapParams = _d._swapParams, _pools = _d._pools;
                _m.label = 6;
            case 6:
                _m.trys.push([6, 11, , 12]);
                if (!_pools) return [3 /*break*/, 8];
                _f = (_e = _outputs).push;
                return [4 /*yield*/, contract.get_dy(_route, _swapParams, _amount, _pools, curve.constantOptions)];
            case 7:
                _f.apply(_e, [_m.sent()]);
                return [3 /*break*/, 10];
            case 8:
                _j = (_h = _outputs).push;
                return [4 /*yield*/, contract.get_dy(_route, _swapParams, _amount, curve.constantOptions)];
            case 9:
                _j.apply(_h, [_m.sent()]);
                _m.label = 10;
            case 10: return [3 /*break*/, 12];
            case 11:
                e_1 = _m.sent();
                _outputs.push(curve.parseUnits('-1', 0));
                return [3 /*break*/, 12];
            case 12:
                _c++;
                return [3 /*break*/, 5];
            case 13:
                for (i = 0; i < _outputs.length; i++) {
                    if (_outputs[i] < 0) {
                        console.log("Route ".concat((routesRaw[i].route.map(function (s) { return s.poolId; })).join(" --> "), " is unavailable"));
                        continue;
                    }
                    routesRaw[i]._output = _outputs[i];
                    routes.push(routesRaw[i]);
                }
                return [3 /*break*/, 14];
            case 14:
                if (routes.length === 0)
                    return [2 /*return*/, []];
                if (routes.length === 1)
                    return [2 /*return*/, routes[0].route];
                return [4 /*yield*/, Promise.all([
                        _estimateGasForDifferentRoutes(routes.map(function (r) { return r.route; }), inputCoinAddress, outputCoinAddress, _amount),
                        _getUsdRate(outputCoinAddress),
                        axios.get("https://api.curve.fi/api/getGas"),
                        _getUsdRate(ETH_ADDRESS),
                    ])];
            case 15:
                _k = _m.sent(), gasAmounts = _k[0], outputCoinUsdRate = _k[1], gasData = _k[2], ethUsdRate = _k[3];
                gasPrice = gasData.data.data.gas.standard;
                expectedAmounts = (routes).map(function (route) { return Number(curve.formatUnits(route._output, outputCoinDecimals)); });
                expectedAmountsUsd = expectedAmounts.map(function (a) { return a * outputCoinUsdRate; });
                if (!L2Networks.includes(curve.chainId)) return [3 /*break*/, 17];
                return [4 /*yield*/, getGasPriceFromL1()];
            case 16:
                _l = _m.sent();
                return [3 /*break*/, 18];
            case 17:
                _l = 0;
                _m.label = 18;
            case 18:
                L1GasPrice = _l;
                txCostsUsd = gasAmounts.map(function (a) { return getTxCostsUsd(ethUsdRate, gasPrice, a, L1GasPrice); });
                routes.forEach(function (route, i) {
                    route.outputUsd = expectedAmountsUsd[i];
                    route.txCostUsd = txCostsUsd[i];
                });
                return [2 /*return*/, routes.reduce(function (route1, route2) {
                        var diff = (route1.outputUsd - route1.txCostUsd) - (route2.outputUsd - route2.txCostUsd);
                        if (diff > 0)
                            return route1;
                        if (diff === 0 && route1.route.length < route2.route.length)
                            return route1;
                        return route2;
                    }).route];
        }
    });
}); }, {
    promise: true,
    maxAge: 5 * 60 * 1000, // 5m
});
export var _getOutputForRoute = memoize(function (route, _amount) { return __awaiter(void 0, void 0, void 0, function () {
    var contract, _a, _route, _swapParams, _pools;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                contract = curve.contracts[curve.constants.ALIASES.router].contract;
                _a = _getExchangeArgs(route), _route = _a._route, _swapParams = _a._swapParams, _pools = _a._pools;
                if (!_pools) return [3 /*break*/, 2];
                return [4 /*yield*/, contract.get_dy(_route, _swapParams, _amount, _pools, curve.constantOptions)];
            case 1: return [2 /*return*/, _b.sent()];
            case 2: return [4 /*yield*/, contract.get_dy(_route, _swapParams, _amount, curve.constantOptions)];
            case 3: return [2 /*return*/, _b.sent()];
        }
    });
}); }, {
    promise: true,
    maxAge: 15 * 1000, // 15s
});
export var _routesCache = {};
var _getBestRouteAndOutput = function (inputCoin, outputCoin, amount) {
    var _a = _getCoinAddresses(inputCoin, outputCoin), inputCoinAddress = _a[0], outputCoinAddress = _a[1];
    var key = "".concat(inputCoinAddress, "-").concat(outputCoinAddress, "-").concat(amount);
    if (!(key in _routesCache))
        throw Error("You must call getBestRouteAndOutput first");
    return _routesCache[key];
};
export var getBestRouteAndOutput = function (inputCoin, outputCoin, amount) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, inputCoinAddress, outputCoinAddress, _b, inputCoinDecimals, outputCoinDecimals, route, _output;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = _getCoinAddresses(inputCoin, outputCoin), inputCoinAddress = _a[0], outputCoinAddress = _a[1];
                _b = _getCoinDecimals(inputCoinAddress, outputCoinAddress), inputCoinDecimals = _b[0], outputCoinDecimals = _b[1];
                return [4 /*yield*/, _getBestRoute(inputCoinAddress, outputCoinAddress, amount)];
            case 1:
                route = _c.sent();
                if (route.length === 0)
                    return [2 /*return*/, { route: route, output: '0.0' }];
                return [4 /*yield*/, _getOutputForRoute(route, parseUnits(amount, inputCoinDecimals))];
            case 2:
                _output = _c.sent();
                _routesCache["".concat(inputCoinAddress, "-").concat(outputCoinAddress, "-").concat(amount)] = {
                    route: route,
                    output: curve.formatUnits(_output + BigInt(1), outputCoinDecimals),
                    timestamp: Date.now(),
                };
                return [2 /*return*/, { route: route, output: curve.formatUnits(_output + BigInt(1), outputCoinDecimals) }];
        }
    });
}); };
export var getArgs = function (route) {
    return _getExchangeArgs(route);
};
export var swapExpected = function (inputCoin, outputCoin, amount) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getBestRouteAndOutput(inputCoin, outputCoin, amount)];
            case 1: return [2 /*return*/, (_a.sent())['output']];
        }
    });
}); };
export var swapRequired = function (inputCoin, outputCoin, outAmount) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, inputCoinAddress, outputCoinAddress, _b, inputCoinDecimals, outputCoinDecimals, _outAmount, p1, p2, approximateRequiredAmount, route, contract, _c, _route, _swapParams, _pools, _basePools, _baseTokens, _secondBasePools, _secondBaseTokens, _required;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = _getCoinAddresses(inputCoin, outputCoin), inputCoinAddress = _a[0], outputCoinAddress = _a[1];
                _b = _getCoinDecimals(inputCoinAddress, outputCoinAddress), inputCoinDecimals = _b[0], outputCoinDecimals = _b[1];
                _outAmount = parseUnits(outAmount, outputCoinDecimals);
                return [4 /*yield*/, _getUsdRate(inputCoinAddress)];
            case 1:
                p1 = (_d.sent()) || 1;
                return [4 /*yield*/, _getUsdRate(outputCoinAddress)];
            case 2:
                p2 = (_d.sent()) || 1;
                approximateRequiredAmount = Number(outAmount) * p2 / p1;
                return [4 /*yield*/, _getBestRoute(inputCoinAddress, outputCoinAddress, approximateRequiredAmount)];
            case 3:
                route = _d.sent();
                contract = curve.contracts[curve.constants.ALIASES.router].contract;
                _c = _getExchangeArgs(route), _route = _c._route, _swapParams = _c._swapParams, _pools = _c._pools, _basePools = _c._basePools, _baseTokens = _c._baseTokens, _secondBasePools = _c._secondBasePools, _secondBaseTokens = _c._secondBaseTokens;
                _required = 0;
                if (!("get_dx(address[11],uint256[5][5],uint256,address[5],address[5],address[5],address[5],address[5])" in contract)) return [3 /*break*/, 5];
                return [4 /*yield*/, contract.get_dx(_route, _swapParams, _outAmount, _pools, _basePools, _baseTokens, _secondBasePools, _secondBaseTokens, curve.constantOptions)];
            case 4:
                _required = _d.sent();
                return [3 /*break*/, 9];
            case 5:
                if (!_pools) return [3 /*break*/, 7];
                return [4 /*yield*/, contract.get_dx(_route, _swapParams, _outAmount, _pools, _basePools, _baseTokens, curve.constantOptions)];
            case 6:
                _required = _d.sent();
                return [3 /*break*/, 9];
            case 7: return [4 /*yield*/, contract.get_dx(_route, _swapParams, _outAmount, curve.constantOptions)];
            case 8:
                _required = _d.sent();
                _d.label = 9;
            case 9: return [2 /*return*/, curve.formatUnits(_required, inputCoinDecimals)];
        }
    });
}); };
export var swapPriceImpact = function (inputCoin, outputCoin, amount) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, inputCoinAddress, outputCoinAddress, _b, inputCoinDecimals, outputCoinDecimals, _c, route, output, _amount, _output, smallAmountIntBN, amountIntBN, contract, _smallAmount, _d, _route, _swapParams, _pools, _smallOutput, e_2, priceImpactBN;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _a = _getCoinAddresses(inputCoin, outputCoin), inputCoinAddress = _a[0], outputCoinAddress = _a[1];
                _b = _getCoinDecimals(inputCoinAddress, outputCoinAddress), inputCoinDecimals = _b[0], outputCoinDecimals = _b[1];
                _c = _getBestRouteAndOutput(inputCoinAddress, outputCoinAddress, amount), route = _c.route, output = _c.output;
                _amount = parseUnits(amount, inputCoinDecimals);
                _output = parseUnits(output, outputCoinDecimals);
                smallAmountIntBN = _get_small_x(_amount, _output, inputCoinDecimals, outputCoinDecimals);
                amountIntBN = toBN(_amount, 0);
                if (smallAmountIntBN.gte(amountIntBN))
                    return [2 /*return*/, 0];
                contract = curve.contracts[curve.constants.ALIASES.router].contract;
                _smallAmount = fromBN(smallAmountIntBN.div(Math.pow(10, inputCoinDecimals)), inputCoinDecimals);
                _d = _getExchangeArgs(route), _route = _d._route, _swapParams = _d._swapParams, _pools = _d._pools;
                _e.label = 1;
            case 1:
                _e.trys.push([1, 6, , 11]);
                if (!_pools) return [3 /*break*/, 3];
                return [4 /*yield*/, contract.get_dy(_route, _swapParams, _smallAmount, _pools, curve.constantOptions)];
            case 2:
                _smallOutput = _e.sent();
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, contract.get_dy(_route, _swapParams, _smallAmount, curve.constantOptions)];
            case 4:
                _smallOutput = _e.sent();
                _e.label = 5;
            case 5: return [3 /*break*/, 11];
            case 6:
                e_2 = _e.sent();
                _smallAmount = curve.parseUnits("1", inputCoinDecimals); // Dirty hack
                if (!_pools) return [3 /*break*/, 8];
                return [4 /*yield*/, contract.get_dy(_route, _swapParams, _smallAmount, _pools, curve.constantOptions)];
            case 7:
                _smallOutput = _e.sent();
                return [3 /*break*/, 10];
            case 8: return [4 /*yield*/, contract.get_dy(_route, _swapParams, _smallAmount, curve.constantOptions)];
            case 9:
                _smallOutput = _e.sent();
                _e.label = 10;
            case 10: return [3 /*break*/, 11];
            case 11:
                priceImpactBN = _get_price_impact(_amount, _output, _smallAmount, _smallOutput, inputCoinDecimals, outputCoinDecimals);
                return [2 /*return*/, Number(_cutZeros(priceImpactBN.toFixed(4)))];
        }
    });
}); };
export var swapIsApproved = function (inputCoin, amount) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, hasAllowance([inputCoin], [amount], curve.signerAddress, curve.constants.ALIASES.router)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
export var swapApproveEstimateGas = function (inputCoin, amount) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ensureAllowanceEstimateGas([inputCoin], [amount], curve.constants.ALIASES.router)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
export var swapApprove = function (inputCoin, amount) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ensureAllowance([inputCoin], [amount], curve.constants.ALIASES.router)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
export var swapEstimateGas = function (inputCoin, outputCoin, amount) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, inputCoinAddress, outputCoinAddress, inputCoinDecimals, route, _amount, gas;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = _getCoinAddresses(inputCoin, outputCoin), inputCoinAddress = _a[0], outputCoinAddress = _a[1];
                inputCoinDecimals = _getCoinDecimals(inputCoinAddress, outputCoinAddress)[0];
                route = _getBestRouteAndOutput(inputCoinAddress, outputCoinAddress, amount).route;
                if (route.length === 0)
                    return [2 /*return*/, 0];
                _amount = parseUnits(amount, inputCoinDecimals);
                return [4 /*yield*/, _estimateGasForDifferentRoutes([route], inputCoinAddress, outputCoinAddress, _amount)];
            case 1:
                gas = (_b.sent())[0];
                return [2 /*return*/, gas];
        }
    });
}); };
export var swap = function (inputCoin, outputCoin, amount, slippage) {
    if (slippage === void 0) { slippage = 0.5; }
    return __awaiter(void 0, void 0, void 0, function () {
        var _a, inputCoinAddress, outputCoinAddress, _b, inputCoinDecimals, outputCoinDecimals, _c, route, output, _d, _route, _swapParams, _pools, _amount, minRecvAmountBN, _minRecvAmount, contract, value, gasLimit, _e, gasLimit, _f;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    _a = _getCoinAddresses(inputCoin, outputCoin), inputCoinAddress = _a[0], outputCoinAddress = _a[1];
                    _b = _getCoinDecimals(inputCoinAddress, outputCoinAddress), inputCoinDecimals = _b[0], outputCoinDecimals = _b[1];
                    return [4 /*yield*/, swapApprove(inputCoin, amount)];
                case 1:
                    _h.sent();
                    _c = _getBestRouteAndOutput(inputCoinAddress, outputCoinAddress, amount), route = _c.route, output = _c.output;
                    if (route.length === 0) {
                        throw new Error("This pair can't be exchanged");
                    }
                    _d = _getExchangeArgs(route), _route = _d._route, _swapParams = _d._swapParams, _pools = _d._pools;
                    _amount = parseUnits(amount, inputCoinDecimals);
                    minRecvAmountBN = BN(output).times(100 - slippage).div(100);
                    _minRecvAmount = fromBN(minRecvAmountBN, outputCoinDecimals);
                    contract = curve.contracts[curve.constants.ALIASES.router].contract;
                    value = isEth(inputCoinAddress) ? _amount : curve.parseUnits("0");
                    return [4 /*yield*/, curve.updateFeeData()];
                case 2:
                    _h.sent();
                    if (!_pools) return [3 /*break*/, 5];
                    _e = DIGas;
                    return [4 /*yield*/, contract.exchange.estimateGas(_route, _swapParams, _amount, _minRecvAmount, _pools, __assign(__assign({}, curve.constantOptions), { value: value }))];
                case 3:
                    gasLimit = (_e.apply(void 0, [_h.sent()])) * (curve.chainId === 1 ? curve.parseUnits("130", 0) : curve.parseUnits("160", 0)) / curve.parseUnits("100", 0);
                    return [4 /*yield*/, contract.exchange(_route, _swapParams, _amount, _minRecvAmount, _pools, __assign(__assign({}, curve.options), { value: value, gasLimit: gasLimit }))];
                case 4: return [2 /*return*/, _h.sent()];
                case 5:
                    _f = DIGas;
                    return [4 /*yield*/, contract.exchange.estimateGas(_route, _swapParams, _amount, _minRecvAmount, __assign(__assign({}, curve.constantOptions), { value: value }))];
                case 6:
                    gasLimit = (_f.apply(void 0, [_h.sent()])) * curve.parseUnits("160", 0) / curve.parseUnits("100", 0);
                    return [4 /*yield*/, contract.exchange(_route, _swapParams, _amount, _minRecvAmount, __assign(__assign({}, curve.options), { value: value, gasLimit: gasLimit }))];
                case 7: return [2 /*return*/, _h.sent()];
            }
        });
    });
};
export var getSwappedAmount = function (tx, outputCoin) { return __awaiter(void 0, void 0, void 0, function () {
    var outputCoinAddress, outputCoinDecimals, txInfo, res, i, abiCoder;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                outputCoinAddress = _getCoinAddresses(outputCoin)[0];
                outputCoinDecimals = _getCoinDecimals(outputCoinAddress)[0];
                return [4 /*yield*/, tx.wait()];
            case 1:
                txInfo = _a.sent();
                if (txInfo === null)
                    return [2 /*return*/, '0.0'];
                for (i = 1; i <= txInfo.logs.length; i++) {
                    try {
                        abiCoder = ethers.AbiCoder.defaultAbiCoder();
                        res = abiCoder.decode(["address[".concat(ROUTE_LENGTH, "]"), "uint256[".concat(MAX_STEPS, "][").concat(MAX_STEPS, "]"), "address[".concat(MAX_STEPS, "]"), 'uint256', 'uint256'], ethers.dataSlice(txInfo.logs[txInfo.logs.length - i].data, 0));
                        break;
                    }
                    catch (err) { }
                }
                if (res === undefined)
                    return [2 /*return*/, '0.0'];
                return [2 /*return*/, curve.formatUnits(res[res.length - 1], outputCoinDecimals)];
        }
    });
}); };
