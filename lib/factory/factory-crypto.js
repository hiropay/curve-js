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
import { curve } from "../curve.js";
import ERC20ABI from "../constants/abis/ERC20.json" assert { type: 'json' };
import cryptoFactorySwapABI from "../constants/abis/factory-crypto/factory-crypto-pool-2.json" assert { type: 'json' };
import factoryGaugeABI from "../constants/abis/gauge_factory.json" assert { type: 'json' };
import gaugeChildABI from "../constants/abis/gauge_child.json" assert { type: 'json' };
import { setFactoryZapContracts } from "./common.js";
import { CRYPTO_FACTORY_CONSTANTS } from "./constants-crypto.js";
var deepFlatten = function (arr) { return [].concat.apply([], arr.map(function (v) { return (Array.isArray(v) ? deepFlatten(v) : v); })); };
function getRecentlyCreatedCryptoPoolId(swapAddress) {
    return __awaiter(this, void 0, void 0, function () {
        var factoryContract, poolCount, _a, _b, _c, i, address;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    factoryContract = this.contracts[this.constants.ALIASES.crypto_factory].contract;
                    _a = Number;
                    _c = (_b = curve).formatUnits;
                    return [4 /*yield*/, factoryContract.pool_count(this.constantOptions)];
                case 1:
                    poolCount = _a.apply(void 0, [_c.apply(_b, [_e.sent(), 0])]);
                    i = 1;
                    _e.label = 2;
                case 2:
                    if (!(i <= poolCount)) return [3 /*break*/, 5];
                    return [4 /*yield*/, factoryContract.pool_list(poolCount - i)];
                case 3:
                    address = _e.sent();
                    if (address.toLowerCase() === swapAddress.toLowerCase())
                        return [2 /*return*/, "factory-crypto-".concat(poolCount - i)];
                    _e.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 2];
                case 5: throw Error("Unknown pool");
            }
        });
    });
}
function getCryptoFactoryIdsAndSwapAddresses(fromIdx) {
    if (fromIdx === void 0) { fromIdx = 0; }
    return __awaiter(this, void 0, void 0, function () {
        var factoryContract, factoryMulticallContract, poolCount, _a, _b, _c, calls, i, factories, swapAddresses;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    factoryContract = this.contracts[this.constants.ALIASES.crypto_factory].contract;
                    factoryMulticallContract = this.contracts[this.constants.ALIASES.crypto_factory].multicallContract;
                    _a = Number;
                    _c = (_b = curve).formatUnits;
                    return [4 /*yield*/, factoryContract.pool_count(this.constantOptions)];
                case 1:
                    poolCount = _a.apply(void 0, [_c.apply(_b, [_e.sent(), 0])]);
                    calls = [];
                    for (i = fromIdx; i < poolCount; i++) {
                        calls.push(factoryMulticallContract.pool_list(i));
                    }
                    if (calls.length === 0)
                        return [2 /*return*/, [[], []]];
                    return [4 /*yield*/, this.multicallProvider.all(calls)];
                case 2:
                    factories = (_e.sent()).map(function (addr, i) { return ({ id: "factory-crypto-".concat(fromIdx + i), address: addr.toLowerCase() }); });
                    swapAddresses = Object.values(this.constants.POOLS_DATA).map(function (pool) { return pool.swap_address.toLowerCase(); });
                    factories = factories.filter(function (f) { return !swapAddresses.includes(f.address); });
                    return [2 /*return*/, [factories.map(function (f) { return f.id; }), factories.map(function (f) { return f.address; })]];
            }
        });
    });
}
function _handleCoinAddresses(coinAddresses) {
    var _this = this;
    return coinAddresses.map(function (addresses) { return addresses.map(function (addr) { return _this.chainId === 137 && addr === "0x0000000000000000000000000000000000001010" ? _this.constants.NATIVE_TOKEN.wrappedAddress : addr.toLowerCase(); }); });
}
function _getLpTokenMap(factorySwapAddresses) {
    return __awaiter(this, void 0, void 0, function () {
        var factoryMulticallContract, LpTokenMap, getLpTokenCalls, _i, factorySwapAddresses_1, addr, lpTokens;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    factoryMulticallContract = this.contracts[this.constants.ALIASES.crypto_factory].multicallContract;
                    LpTokenMap = {};
                    getLpTokenCalls = [];
                    for (_i = 0, factorySwapAddresses_1 = factorySwapAddresses; _i < factorySwapAddresses_1.length; _i++) {
                        addr = factorySwapAddresses_1[_i];
                        getLpTokenCalls.push(factoryMulticallContract.get_token(addr));
                    }
                    return [4 /*yield*/, this.multicallProvider.all(getLpTokenCalls)];
                case 1:
                    lpTokens = _a.sent();
                    lpTokens.forEach(function (item, index) {
                        if (typeof item === "string") {
                            LpTokenMap[factorySwapAddresses[index]] = item;
                        }
                        else {
                            throw Error("Lp token is not string");
                        }
                    });
                    return [2 /*return*/, LpTokenMap];
            }
        });
    });
}
function getPoolsData(factorySwapAddresses) {
    return __awaiter(this, void 0, void 0, function () {
        var factoryMulticallContract, isfactoryGaugeNull, calls, _i, factorySwapAddresses_2, addr, factoryMulticallGaugeContract, LpTokenMap, _a, factorySwapAddresses_3, addr, res, tokenAddresses, coinAddresses, gaugeAddresses, tokenAddresses, gaugeAddresses, coinAddresses;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    factoryMulticallContract = this.contracts[this.constants.ALIASES.crypto_factory].multicallContract;
                    isfactoryGaugeNull = this.constants.ALIASES.gauge_factory === '0x0000000000000000000000000000000000000000';
                    calls = [];
                    if (!(this.chainId === 1)) return [3 /*break*/, 1];
                    for (_i = 0, factorySwapAddresses_2 = factorySwapAddresses; _i < factorySwapAddresses_2.length; _i++) {
                        addr = factorySwapAddresses_2[_i];
                        calls.push(factoryMulticallContract.get_token(addr));
                        calls.push(factoryMulticallContract.get_gauge(addr));
                        calls.push(factoryMulticallContract.get_coins(addr));
                    }
                    return [3 /*break*/, 3];
                case 1:
                    factoryMulticallGaugeContract = this.contracts[this.constants.ALIASES.gauge_factory].multicallContract;
                    return [4 /*yield*/, _getLpTokenMap.call(this, factorySwapAddresses)];
                case 2:
                    LpTokenMap = _b.sent();
                    for (_a = 0, factorySwapAddresses_3 = factorySwapAddresses; _a < factorySwapAddresses_3.length; _a++) {
                        addr = factorySwapAddresses_3[_a];
                        calls.push(factoryMulticallContract.get_token(addr));
                        if (!isfactoryGaugeNull) {
                            calls.push(factoryMulticallGaugeContract.get_gauge_from_lp_token(LpTokenMap[addr]));
                        }
                        calls.push(factoryMulticallContract.get_coins(addr));
                    }
                    _b.label = 3;
                case 3: return [4 /*yield*/, this.multicallProvider.all(calls)];
                case 4:
                    res = _b.sent();
                    if (isfactoryGaugeNull) {
                        tokenAddresses = res.filter(function (a, i) { return i % 3 == 0; }).map(function (a) { return a.toLowerCase(); });
                        coinAddresses = _handleCoinAddresses.call(this, res.filter(function (a, i) { return i % 3 == 1; }));
                        gaugeAddresses = Array.from(Array(factorySwapAddresses.length)).map(function () { return '0x0000000000000000000000000000000000000000'; });
                        return [2 /*return*/, [tokenAddresses, gaugeAddresses, coinAddresses]];
                    }
                    else {
                        tokenAddresses = res.filter(function (a, i) { return i % 3 == 0; }).map(function (a) { return a.toLowerCase(); });
                        gaugeAddresses = res.filter(function (a, i) { return i % 3 == 1; }).map(function (a) { return a.toLowerCase(); });
                        coinAddresses = _handleCoinAddresses.call(this, res.filter(function (a, i) { return i % 3 == 2; }));
                        return [2 /*return*/, [tokenAddresses, gaugeAddresses, coinAddresses]];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
function setCryptoFactorySwapContracts(factorySwapAddresses) {
    var _this = this;
    factorySwapAddresses.forEach(function (addr) {
        _this.setContract(addr, cryptoFactorySwapABI);
    });
}
function setCryptoFactoryTokenContracts(factoryTokenAddresses) {
    var _this = this;
    factoryTokenAddresses.forEach(function (addr) {
        _this.setContract(addr, ERC20ABI);
    });
}
function setCryptoFactoryGaugeContracts(factoryGaugeAddresses) {
    var _this = this;
    factoryGaugeAddresses.filter(function (addr) { return addr !== curve.constants.ZERO_ADDRESS; }).forEach(function (addr, i) {
        _this.setContract(addr, _this.chainId === 1 ? factoryGaugeABI : gaugeChildABI);
    });
}
function setCryptoFactoryCoinsContracts(coinAddresses) {
    var flattenedCoinAddresses = Array.from(new Set(deepFlatten(coinAddresses)));
    for (var _i = 0, flattenedCoinAddresses_1 = flattenedCoinAddresses; _i < flattenedCoinAddresses_1.length; _i++) {
        var addr = flattenedCoinAddresses_1[_i];
        if (addr in this.contracts)
            continue;
        this.setContract(addr, ERC20ABI);
    }
}
function getCryptoFactoryUnderlyingCoinAddresses(coinAddresses) {
    var _this = this;
    return __spreadArray([], coinAddresses.map(function (coins) { return coins.map(function (c) { return c === _this.constants.NATIVE_TOKEN.wrappedAddress ? _this.constants.NATIVE_TOKEN.address : c; }); }), true);
}
function getExistingCoinAddressNameDict() {
    var dict = {};
    var _loop_1 = function (poolData) {
        poolData.wrapped_coin_addresses.forEach(function (addr, i) {
            if (!(addr.toLowerCase() in dict)) {
                dict[addr.toLowerCase()] = poolData.wrapped_coins[i];
            }
        });
        poolData.underlying_coin_addresses.forEach(function (addr, i) {
            if (!(addr.toLowerCase() in dict)) {
                dict[addr.toLowerCase()] = poolData.underlying_coins[i];
            }
        });
    };
    for (var _i = 0, _a = Object.values(this.constants.POOLS_DATA); _i < _a.length; _i++) {
        var poolData = _a[_i];
        _loop_1(poolData);
    }
    dict[this.constants.NATIVE_TOKEN.address] = this.constants.NATIVE_TOKEN.symbol;
    return dict;
}
function getCoinsData(tokenAddresses, coinAddresses, existingCoinAddrNameDict, existingCoinAddrDecimalsDict) {
    return __awaiter(this, void 0, void 0, function () {
        var flattenedCoinAddresses, newCoinAddresses, coinAddrNamesDict, coinAddrDecimalsDict, _i, flattenedCoinAddresses_2, addr, calls, _a, tokenAddresses_1, addr, _b, newCoinAddresses_1, addr, res, res1, tokenSymbols, tokenNames, res2, symbols, decimals;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    flattenedCoinAddresses = Array.from(new Set(deepFlatten(coinAddresses)));
                    newCoinAddresses = [];
                    coinAddrNamesDict = {};
                    coinAddrDecimalsDict = {};
                    for (_i = 0, flattenedCoinAddresses_2 = flattenedCoinAddresses; _i < flattenedCoinAddresses_2.length; _i++) {
                        addr = flattenedCoinAddresses_2[_i];
                        if (addr in existingCoinAddrNameDict) {
                            coinAddrNamesDict[addr] = existingCoinAddrNameDict[addr];
                            coinAddrDecimalsDict[addr] = existingCoinAddrDecimalsDict[addr];
                        }
                        else if (addr === "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2") {
                            coinAddrNamesDict[addr] = "MKR";
                            coinAddrDecimalsDict[addr] = 18;
                        }
                        else {
                            newCoinAddresses.push(addr);
                        }
                    }
                    calls = [];
                    for (_a = 0, tokenAddresses_1 = tokenAddresses; _a < tokenAddresses_1.length; _a++) {
                        addr = tokenAddresses_1[_a];
                        calls.push(this.contracts[addr].multicallContract.symbol());
                        calls.push(this.contracts[addr].multicallContract.name());
                    }
                    for (_b = 0, newCoinAddresses_1 = newCoinAddresses; _b < newCoinAddresses_1.length; _b++) {
                        addr = newCoinAddresses_1[_b];
                        calls.push(this.contracts[addr].multicallContract.symbol());
                        calls.push(this.contracts[addr].multicallContract.decimals());
                    }
                    return [4 /*yield*/, this.multicallProvider.all(calls)];
                case 1:
                    res = _c.sent();
                    res1 = res.slice(0, tokenAddresses.length * 2);
                    tokenSymbols = res1.filter(function (a, i) { return i % 2 == 0; });
                    tokenNames = res1.filter(function (a, i) { return i % 2 == 1; });
                    res2 = res.slice(tokenAddresses.length * 2);
                    symbols = res2.filter(function (a, i) { return i % 2 == 0; });
                    decimals = res2.filter(function (a, i) { return i % 2 == 1; }).map(function (_d) { return Number(curve.formatUnits(_d, 0)); });
                    newCoinAddresses.forEach(function (addr, i) {
                        coinAddrNamesDict[addr] = symbols[i];
                        coinAddrDecimalsDict[addr] = decimals[i];
                    });
                    coinAddrNamesDict[this.constants.NATIVE_TOKEN.address] = this.constants.NATIVE_TOKEN.symbol;
                    coinAddrDecimalsDict[this.constants.NATIVE_TOKEN.address] = 18;
                    return [2 /*return*/, [tokenSymbols, tokenNames, coinAddrNamesDict, coinAddrDecimalsDict]];
            }
        });
    });
}
export function getCryptoFactoryPoolData(fromIdx, swapAddress) {
    if (fromIdx === void 0) { fromIdx = 0; }
    return __awaiter(this, void 0, void 0, function () {
        var _a, poolIds, swapAddresses, _b, _c, tokenAddresses, gaugeAddresses, coinAddresses, underlyingCoinAddresses, existingCoinAddressNameDict, _e, poolSymbols, poolNames, coinAddressNameDict, coinAddressDecimalsDict, CRYPTO_FACTORY_POOLS_DATA, i, lpTokenBasePoolIdDict, basePoolIdZapDict, basePoolId, allPoolsData, basePoolCoinNames, basePoolCoinAddresses, basePoolDecimals, basePoolZap;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    if (!swapAddress) return [3 /*break*/, 2];
                    return [4 /*yield*/, getRecentlyCreatedCryptoPoolId.call(this, swapAddress)];
                case 1:
                    _b = [[_f.sent()], [swapAddress.toLowerCase()]];
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, getCryptoFactoryIdsAndSwapAddresses.call(this, fromIdx)];
                case 3:
                    _b = _f.sent();
                    _f.label = 4;
                case 4:
                    _a = _b, poolIds = _a[0], swapAddresses = _a[1];
                    if (poolIds.length === 0)
                        return [2 /*return*/, {}];
                    return [4 /*yield*/, getPoolsData.call(this, swapAddresses)];
                case 5:
                    _c = _f.sent(), tokenAddresses = _c[0], gaugeAddresses = _c[1], coinAddresses = _c[2];
                    setCryptoFactorySwapContracts.call(this, swapAddresses);
                    setCryptoFactoryTokenContracts.call(this, tokenAddresses);
                    setCryptoFactoryGaugeContracts.call(this, gaugeAddresses);
                    setCryptoFactoryCoinsContracts.call(this, coinAddresses);
                    setFactoryZapContracts.call(this, true);
                    underlyingCoinAddresses = getCryptoFactoryUnderlyingCoinAddresses.call(this, coinAddresses);
                    existingCoinAddressNameDict = getExistingCoinAddressNameDict.call(this);
                    return [4 /*yield*/, getCoinsData.call(this, tokenAddresses, coinAddresses, existingCoinAddressNameDict, this.constants.DECIMALS)];
                case 6:
                    _e = _f.sent(), poolSymbols = _e[0], poolNames = _e[1], coinAddressNameDict = _e[2], coinAddressDecimalsDict = _e[3];
                    CRYPTO_FACTORY_POOLS_DATA = {};
                    for (i = 0; i < poolIds.length; i++) {
                        lpTokenBasePoolIdDict = CRYPTO_FACTORY_CONSTANTS[this.chainId].lpTokenBasePoolIdDict;
                        basePoolIdZapDict = CRYPTO_FACTORY_CONSTANTS[this.chainId].basePoolIdZapDict;
                        basePoolId = lpTokenBasePoolIdDict[coinAddresses[i][1].toLowerCase()];
                        if (basePoolId) { // isMeta
                            allPoolsData = __assign(__assign({}, this.constants.POOLS_DATA), CRYPTO_FACTORY_POOLS_DATA);
                            basePoolCoinNames = __spreadArray([], allPoolsData[basePoolId].underlying_coins, true);
                            basePoolCoinAddresses = __spreadArray([], allPoolsData[basePoolId].underlying_coin_addresses, true);
                            basePoolDecimals = __spreadArray([], allPoolsData[basePoolId].underlying_decimals, true);
                            basePoolZap = basePoolIdZapDict[basePoolId];
                            this.constants.BASE_POOLS[basePoolId] = this.constants.BASE_POOLS[basePoolId] ? this.constants.BASE_POOLS[basePoolId] + 1 : 1;
                            CRYPTO_FACTORY_POOLS_DATA[poolIds[i]] = {
                                name: poolNames[i].split(": ")[1].trim(),
                                full_name: poolNames[i],
                                symbol: poolSymbols[i],
                                reference_asset: "CRYPTO",
                                swap_address: swapAddresses[i],
                                token_address: tokenAddresses[i],
                                gauge_address: gaugeAddresses[i],
                                deposit_address: basePoolZap.address,
                                is_meta: true,
                                is_crypto: true,
                                is_factory: true,
                                base_pool: basePoolId,
                                underlying_coins: __spreadArray([coinAddressNameDict[underlyingCoinAddresses[i][0]]], basePoolCoinNames, true),
                                wrapped_coins: __spreadArray([], coinAddresses[i].map(function (addr) { return coinAddressNameDict[addr]; }), true),
                                underlying_coin_addresses: __spreadArray([underlyingCoinAddresses[i][0]], basePoolCoinAddresses, true),
                                wrapped_coin_addresses: coinAddresses[i],
                                underlying_decimals: __spreadArray([coinAddressDecimalsDict[underlyingCoinAddresses[i][0]]], basePoolDecimals, true),
                                wrapped_decimals: __spreadArray([], coinAddresses[i].map(function (addr) { return coinAddressDecimalsDict[addr]; }), true),
                                swap_abi: cryptoFactorySwapABI,
                                gauge_abi: this.chainId === 1 ? factoryGaugeABI : gaugeChildABI,
                                deposit_abi: basePoolZap.ABI,
                            };
                        }
                        else {
                            CRYPTO_FACTORY_POOLS_DATA[poolIds[i]] = {
                                name: poolNames[i].split(": ")[1].trim(),
                                full_name: poolNames[i],
                                symbol: poolSymbols[i],
                                reference_asset: "CRYPTO",
                                swap_address: swapAddresses[i],
                                token_address: tokenAddresses[i],
                                gauge_address: gaugeAddresses[i],
                                is_crypto: true,
                                is_plain: underlyingCoinAddresses[i].toString() === coinAddresses[i].toString(),
                                is_factory: true,
                                underlying_coins: __spreadArray([], underlyingCoinAddresses[i].map(function (addr) { return coinAddressNameDict[addr]; }), true),
                                wrapped_coins: __spreadArray([], coinAddresses[i].map(function (addr) { return coinAddressNameDict[addr]; }), true),
                                underlying_coin_addresses: underlyingCoinAddresses[i],
                                wrapped_coin_addresses: coinAddresses[i],
                                underlying_decimals: __spreadArray([], underlyingCoinAddresses[i].map(function (addr) { return coinAddressDecimalsDict[addr]; }), true),
                                wrapped_decimals: __spreadArray([], coinAddresses[i].map(function (addr) { return coinAddressDecimalsDict[addr]; }), true),
                                swap_abi: cryptoFactorySwapABI,
                                gauge_abi: this.chainId === 1 ? factoryGaugeABI : gaugeChildABI,
                            };
                        }
                    }
                    return [2 /*return*/, CRYPTO_FACTORY_POOLS_DATA];
            }
        });
    });
}
