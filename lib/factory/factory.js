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
import { Contract as MulticallContract } from "@curvefi/ethcall";
import { curve } from "../curve.js";
import ERC20ABI from "../constants/abis/ERC20.json" assert { type: 'json' };
import factoryGaugeABI from "../constants/abis/gauge_factory.json" assert { type: 'json' };
import gaugeChildABI from "../constants/abis/gauge_child.json" assert { type: 'json' };
import { getPoolIdByAddress, setFactoryZapContracts } from "./common.js";
import { FACTORY_CONSTANTS } from "./constants.js";
import { getPoolName, isStableNgPool } from "../utils.js";
export var BLACK_LIST = {
    1: [
        "0x066b6e1e93fa7dcd3f0eb7f8bac7d5a747ce0bf9",
        "0xc61557c5d177bd7dc889a3b621eec333e168f68a",
    ],
    137: [
        "0x666dc3b4babfd063faf965bd020024af0dc51b64",
        "0xe4199bc5c5c1f63dba47b56b6db7144c51cf0bf8",
        "0x88c4d6534165510b2e2caf0a130d4f70aa4b6d71",
    ],
    42161: [
        "0xd7bb79aee866672419999a0496d99c54741d67b5",
    ],
};
var deepFlatten = function (arr) { return [].concat.apply([], arr.map(function (v) { return (Array.isArray(v) ? deepFlatten(v) : v); })); };
export function getBasePools(factoryAddress, rawSwapAddresses, tmpPools) {
    return __awaiter(this, void 0, void 0, function () {
        var factoryMulticallContract, calls, _i, rawSwapAddresses_1, addr, result, basePoolIds, basePoolAddresses;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    factoryMulticallContract = this.contracts[factoryAddress].multicallContract;
                    calls = [];
                    for (_i = 0, rawSwapAddresses_1 = rawSwapAddresses; _i < rawSwapAddresses_1.length; _i++) {
                        addr = rawSwapAddresses_1[_i];
                        calls.push(factoryMulticallContract.get_base_pool(addr));
                    }
                    return [4 /*yield*/, this.multicallProvider.all(calls)];
                case 1:
                    result = _a.sent();
                    basePoolIds = [];
                    basePoolAddresses = [];
                    result.forEach(function (item) {
                        if (item !== '0x0000000000000000000000000000000000000000') {
                            basePoolIds.push(getPoolIdByAddress(tmpPools, item));
                            basePoolAddresses.push(item);
                        }
                        else {
                            basePoolIds.push('');
                            basePoolAddresses.push(item);
                        }
                    });
                    return [2 /*return*/, {
                            ids: basePoolIds,
                            addresses: basePoolAddresses,
                        }];
            }
        });
    });
}
function getRecentlyCreatedPoolId(swapAddress, factoryAddress) {
    return __awaiter(this, void 0, void 0, function () {
        var factoryContract, prefix, poolCount, _a, _b, _c, i, address;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    factoryContract = this.contracts[factoryAddress].contract;
                    prefix = factoryAddress === this.constants.ALIASES.factory ? 'factory-v2' : 'factory-stable-ng';
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
                        return [2 /*return*/, "".concat(prefix, "-").concat(poolCount - i)];
                    _e.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 2];
                case 5: throw Error("Unknown pool");
            }
        });
    });
}
function getFactoryIdsAndSwapAddresses(fromIdx, factoryAddress) {
    var _a;
    if (fromIdx === void 0) { fromIdx = 0; }
    return __awaiter(this, void 0, void 0, function () {
        var factoryContract, factoryMulticallContract, poolCount, _b, _c, _e, calls, i, prefix, factories, swapAddresses, blacklist;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    factoryContract = this.contracts[factoryAddress].contract;
                    factoryMulticallContract = this.contracts[factoryAddress].multicallContract;
                    _b = Number;
                    _e = (_c = curve).formatUnits;
                    return [4 /*yield*/, factoryContract.pool_count(this.constantOptions)];
                case 1:
                    poolCount = _b.apply(void 0, [_e.apply(_c, [_f.sent(), 0])]);
                    calls = [];
                    for (i = fromIdx; i < poolCount; i++) {
                        calls.push(factoryMulticallContract.pool_list(i));
                    }
                    if (calls.length === 0)
                        return [2 /*return*/, [[], []]];
                    prefix = factoryAddress === this.constants.ALIASES.factory ? "factory-v2-" :
                        factoryAddress === this.constants.ALIASES.crvusd_factory ? "factory-crvusd-" :
                            factoryAddress === this.constants.ALIASES.stable_ng_factory ? "factory-stable-ng-" : "factory-eywa-";
                    return [4 /*yield*/, this.multicallProvider.all(calls)];
                case 2:
                    factories = (_f.sent()).map(function (addr, i) { return ({ id: prefix + (fromIdx + i), address: addr.toLowerCase() }); });
                    swapAddresses = Object.values(this.constants.POOLS_DATA).map(function (pool) { return pool.swap_address.toLowerCase(); });
                    blacklist = (_a = BLACK_LIST[this.chainId]) !== null && _a !== void 0 ? _a : [];
                    factories = factories.filter(function (f) { return !swapAddresses.includes(f.address) && !blacklist.includes(f.address); });
                    return [2 /*return*/, [factories.map(function (f) { return f.id; }), factories.map(function (f) { return f.address; })]];
            }
        });
    });
}
function _handleReferenceAssets(referenceAssets) {
    return referenceAssets.map(function (t) {
        return {
            0: "USD",
            1: "ETH",
            2: "BTC",
        }[curve.formatUnits(t, 0)] || "OTHER";
    });
}
function _handleCoinAddresses(coinAddresses) {
    var _this = this;
    return coinAddresses.map(function (addresses) { return addresses
        .filter(function (addr) { return addr !== curve.constants.ZERO_ADDRESS; })
        .map(function (addr) { return _this.chainId === 137 && addr === "0x0000000000000000000000000000000000001010" ? _this.constants.NATIVE_TOKEN.address : addr.toLowerCase(); }); });
}
function getPoolsData(factorySwapAddresses, factoryAddress) {
    return __awaiter(this, void 0, void 0, function () {
        var factoryMulticallContract, isFactoryGaugeNull, isStableNgFactory, factoryGaugeContract, calls, _i, factorySwapAddresses_1, addr, tempSwapContract, res, index, index, implememntationAddresses, gaugeAddresses, referenceAssets, symbols, names, isMeta, coinAddresses;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    factoryMulticallContract = this.contracts[factoryAddress].multicallContract;
                    isFactoryGaugeNull = this.constants.ALIASES.gauge_factory === '0x0000000000000000000000000000000000000000';
                    isStableNgFactory = factoryAddress === this.constants.ALIASES['stable_ng_factory'];
                    factoryGaugeContract = this.contracts[this.constants.ALIASES.gauge_factory].multicallContract;
                    calls = [];
                    for (_i = 0, factorySwapAddresses_1 = factorySwapAddresses; _i < factorySwapAddresses_1.length; _i++) {
                        addr = factorySwapAddresses_1[_i];
                        tempSwapContract = new MulticallContract(addr, ERC20ABI);
                        calls.push(factoryMulticallContract.get_implementation_address(addr));
                        if (this.chainId === 1) {
                            calls.push(factoryMulticallContract.get_gauge(addr));
                        }
                        else if (!isFactoryGaugeNull) {
                            calls.push(factoryGaugeContract.get_gauge_from_lp_token(addr));
                        }
                        if (!isStableNgFactory) {
                            calls.push(factoryMulticallContract.get_pool_asset_type(addr));
                        }
                        calls.push(tempSwapContract.symbol());
                        calls.push(tempSwapContract.name());
                        calls.push(factoryMulticallContract.is_meta(addr));
                        calls.push(factoryMulticallContract.get_coins(addr));
                    }
                    return [4 /*yield*/, this.multicallProvider.all(calls)];
                case 1:
                    res = _a.sent();
                    if (isFactoryGaugeNull) {
                        for (index = 0; index < res.length; index++) {
                            if (index % 7 == 1) {
                                res.splice(index, 0, '0x0000000000000000000000000000000000000000');
                            }
                        }
                    }
                    if (isStableNgFactory) {
                        for (index = 0; index < res.length; index++) {
                            if (index % 7 == 2) {
                                res.splice(index, 0, -1);
                            }
                        }
                    }
                    implememntationAddresses = res.filter(function (a, i) { return i % 7 == 0; }).map(function (a) { return a.toLowerCase(); });
                    gaugeAddresses = res.filter(function (a, i) { return i % 7 == 1; }).map(function (a) { return a.toLowerCase(); });
                    referenceAssets = _handleReferenceAssets(res.filter(function (a, i) { return i % 7 == 2; }));
                    symbols = res.filter(function (a, i) { return i % 7 == 3; });
                    names = res.filter(function (a, i) { return i % 7 == 4; });
                    isMeta = res.filter(function (a, i) { return i % 7 == 5; });
                    coinAddresses = _handleCoinAddresses.call(this, res.filter(function (a, i) { return i % 7 == 6; }));
                    return [2 /*return*/, [implememntationAddresses, gaugeAddresses, referenceAssets, symbols, names, isMeta, coinAddresses]];
            }
        });
    });
}
function setFactorySwapContracts(factorySwapAddresses, factorySwapABIs) {
    var _this = this;
    factorySwapAddresses.forEach(function (addr, i) {
        _this.setContract(addr, factorySwapABIs[i]);
    });
}
function setFactoryGaugeContracts(factoryGaugeAddresses) {
    var _this = this;
    factoryGaugeAddresses.filter(function (addr) { return addr !== curve.constants.ZERO_ADDRESS; }).forEach(function (addr, i) {
        _this.setContract(addr, _this.chainId === 1 ? factoryGaugeABI : gaugeChildABI);
    });
}
function setFactoryCoinsContracts(coinAddresses) {
    var flattenedCoinAddresses = Array.from(new Set(deepFlatten(coinAddresses)));
    for (var _i = 0, flattenedCoinAddresses_1 = flattenedCoinAddresses; _i < flattenedCoinAddresses_1.length; _i++) {
        var addr = flattenedCoinAddresses_1[_i];
        if (addr in this.contracts)
            continue;
        this.setContract(addr, ERC20ABI);
    }
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
function getCoinsData(coinAddresses, existingCoinAddrNameDict, existingCoinAddrDecimalsDict) {
    return __awaiter(this, void 0, void 0, function () {
        var flattenedCoinAddresses, newCoinAddresses, coinAddrNamesDict, coinAddrDecimalsDict, _i, flattenedCoinAddresses_2, addr, calls, _a, newCoinAddresses_1, addr, res, symbols, decimals;
        return __generator(this, function (_b) {
            switch (_b.label) {
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
                        else {
                            newCoinAddresses.push(addr);
                        }
                    }
                    calls = [];
                    for (_a = 0, newCoinAddresses_1 = newCoinAddresses; _a < newCoinAddresses_1.length; _a++) {
                        addr = newCoinAddresses_1[_a];
                        calls.push(this.contracts[addr].multicallContract.symbol());
                        calls.push(this.contracts[addr].multicallContract.decimals());
                    }
                    return [4 /*yield*/, this.multicallProvider.all(calls)];
                case 1:
                    res = _b.sent();
                    symbols = res.filter(function (a, i) { return i % 2 == 0; });
                    decimals = res.filter(function (a, i) { return i % 2 == 1; }).map(function (_d) { return Number(curve.formatUnits(_d, 0)); });
                    newCoinAddresses.forEach(function (addr, i) {
                        coinAddrNamesDict[addr] = symbols[i];
                        coinAddrDecimalsDict[addr] = decimals[i];
                    });
                    return [2 /*return*/, [coinAddrNamesDict, coinAddrDecimalsDict]];
            }
        });
    });
}
export function getFactoryPoolData(fromIdx, swapAddress, factoryAddress) {
    if (fromIdx === void 0) { fromIdx = 0; }
    if (factoryAddress === void 0) { factoryAddress = curve.constants.ALIASES.factory; }
    return __awaiter(this, void 0, void 0, function () {
        var _a, rawPoolIds, rawSwapAddresses, _b, _c, rawImplementations, rawGauges, rawReferenceAssets, rawPoolSymbols, rawPoolNames, rawIsMeta, rawCoinAddresses, poolIds, swapAddresses, implementations, gaugeAddresses, referenceAssets, poolSymbols, poolNames, isMeta, coinAddresses, implementationABIDict, i, swapABIs, _e, coinAddressNameDict, coinAddressDecimalsDict, tmpPools, basePools, FACTORY_POOLS_DATA, _loop_2, this_1, i;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    if (!swapAddress) return [3 /*break*/, 2];
                    return [4 /*yield*/, getRecentlyCreatedPoolId.call(this, swapAddress, factoryAddress)];
                case 1:
                    _b = [[_f.sent()], [swapAddress.toLowerCase()]];
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, getFactoryIdsAndSwapAddresses.call(this, fromIdx, factoryAddress)];
                case 3:
                    _b = _f.sent();
                    _f.label = 4;
                case 4:
                    _a = _b, rawPoolIds = _a[0], rawSwapAddresses = _a[1];
                    if (rawPoolIds.length === 0)
                        return [2 /*return*/, {}];
                    return [4 /*yield*/, getPoolsData.call(this, rawSwapAddresses, factoryAddress)];
                case 5:
                    _c = _f.sent(), rawImplementations = _c[0], rawGauges = _c[1], rawReferenceAssets = _c[2], rawPoolSymbols = _c[3], rawPoolNames = _c[4], rawIsMeta = _c[5], rawCoinAddresses = _c[6];
                    poolIds = [];
                    swapAddresses = [];
                    implementations = [];
                    gaugeAddresses = [];
                    referenceAssets = [];
                    poolSymbols = [];
                    poolNames = [];
                    isMeta = [];
                    coinAddresses = [];
                    implementationABIDict = FACTORY_CONSTANTS[this.chainId].implementationABIDict;
                    for (i = 0; i < rawPoolIds.length; i++) {
                        if (rawImplementations[i] in implementationABIDict) {
                            poolIds.push(rawPoolIds[i]);
                            swapAddresses.push(rawSwapAddresses[i]);
                            implementations.push(rawImplementations[i]);
                            gaugeAddresses.push(rawGauges[i]);
                            referenceAssets.push(rawReferenceAssets[i]);
                            poolSymbols.push(rawPoolSymbols[i]);
                            poolNames.push(rawPoolNames[i]);
                            isMeta.push(rawIsMeta[i]);
                            coinAddresses.push(rawCoinAddresses[i]);
                        }
                    }
                    swapABIs = implementations.map(function (addr) { return implementationABIDict[addr]; });
                    setFactorySwapContracts.call(this, swapAddresses, swapABIs);
                    setFactoryGaugeContracts.call(this, gaugeAddresses);
                    setFactoryCoinsContracts.call(this, coinAddresses);
                    setFactoryZapContracts.call(this, false);
                    return [4 /*yield*/, getCoinsData.call(this, coinAddresses, getExistingCoinAddressNameDict.call(this), this.constants.DECIMALS)];
                case 6:
                    _e = _f.sent(), coinAddressNameDict = _e[0], coinAddressDecimalsDict = _e[1];
                    tmpPools = [];
                    poolIds.forEach(function (item, index) {
                        tmpPools.push({
                            id: item,
                            address: swapAddresses[index],
                        });
                    });
                    return [4 /*yield*/, getBasePools.call(this, factoryAddress, swapAddresses, tmpPools)];
                case 7:
                    basePools = _f.sent();
                    FACTORY_POOLS_DATA = {};
                    _loop_2 = function (i) {
                        if (!isMeta[i]) {
                            FACTORY_POOLS_DATA[poolIds[i]] = {
                                name: getPoolName(poolNames[i]),
                                full_name: poolNames[i],
                                symbol: poolSymbols[i],
                                reference_asset: referenceAssets[i],
                                swap_address: swapAddresses[i],
                                token_address: swapAddresses[i],
                                gauge_address: gaugeAddresses[i],
                                implementation_address: implementations[i],
                                is_plain: true,
                                is_factory: true,
                                underlying_coins: __spreadArray([], coinAddresses[i].map(function (addr) { return coinAddressNameDict[addr]; }), true),
                                wrapped_coins: __spreadArray([], coinAddresses[i].map(function (addr) { return coinAddressNameDict[addr]; }), true),
                                underlying_coin_addresses: coinAddresses[i],
                                wrapped_coin_addresses: coinAddresses[i],
                                underlying_decimals: __spreadArray([], coinAddresses[i].map(function (addr) { return coinAddressDecimalsDict[addr]; }), true),
                                wrapped_decimals: __spreadArray([], coinAddresses[i].map(function (addr) { return coinAddressDecimalsDict[addr]; }), true),
                                swap_abi: swapABIs[i],
                                gauge_abi: this_1.chainId === 1 ? factoryGaugeABI : gaugeChildABI,
                                is_ng: factoryAddress === curve.constants.ALIASES.stable_ng_factory,
                            };
                        }
                        else {
                            var allPoolsData_1 = __assign(__assign(__assign({}, this_1.constants.POOLS_DATA), this_1.constants.FACTORY_POOLS_DATA), FACTORY_POOLS_DATA);
                            // @ts-ignore
                            var basePoolIdCoinsDict = Object.fromEntries(basePools.ids.map(function (poolId) { var _a; return [poolId, (_a = allPoolsData_1[poolId]) === null || _a === void 0 ? void 0 : _a.underlying_coins]; }));
                            // @ts-ignore
                            var basePoolIdCoinAddressesDict = Object.fromEntries(basePools.ids.map(function (poolId) { var _a; return [poolId, (_a = allPoolsData_1[poolId]) === null || _a === void 0 ? void 0 : _a.underlying_coin_addresses]; }));
                            // @ts-ignore
                            var basePoolIdDecimalsDict = Object.fromEntries(basePools.ids.map(function (poolId) { var _a; return [poolId, (_a = allPoolsData_1[poolId]) === null || _a === void 0 ? void 0 : _a.underlying_decimals]; }));
                            var basePoolIdZapDict = FACTORY_CONSTANTS[this_1.chainId].basePoolIdZapDict;
                            this_1.constants.BASE_POOLS[basePools.ids[i]] = this_1.constants.BASE_POOLS[basePools.ids[i]] ? this_1.constants.BASE_POOLS[basePools.ids[i]] + 1 : 1;
                            var basePoolZap = isStableNgPool(basePools.ids[i]) ? FACTORY_CONSTANTS[this_1.chainId].stableNgBasePoolZap : basePoolIdZapDict[basePools.ids[i]];
                            if (isStableNgPool(basePools.ids[i])) {
                                this_1.setContract(FACTORY_CONSTANTS[this_1.chainId].stableNgBasePoolZap.address, FACTORY_CONSTANTS[this_1.chainId].stableNgBasePoolZap.ABI);
                            }
                            FACTORY_POOLS_DATA[poolIds[i]] = {
                                name: getPoolName(poolNames[i]),
                                full_name: poolNames[i],
                                symbol: poolSymbols[i],
                                reference_asset: referenceAssets[i],
                                swap_address: swapAddresses[i],
                                token_address: swapAddresses[i],
                                gauge_address: gaugeAddresses[i],
                                deposit_address: basePoolZap.address,
                                implementation_address: implementations[i],
                                is_meta: true,
                                is_factory: true,
                                base_pool: basePools.ids[i],
                                underlying_coins: __spreadArray([coinAddressNameDict[coinAddresses[i][0]]], basePoolIdCoinsDict[basePools.ids[i]], true),
                                wrapped_coins: __spreadArray([], coinAddresses[i].map(function (addr) { return coinAddressNameDict[addr]; }), true),
                                underlying_coin_addresses: __spreadArray([coinAddresses[i][0]], basePoolIdCoinAddressesDict[basePools.ids[i]], true),
                                wrapped_coin_addresses: coinAddresses[i],
                                underlying_decimals: __spreadArray([coinAddressDecimalsDict[coinAddresses[i][0]]], basePoolIdDecimalsDict[basePools.ids[i]], true),
                                wrapped_decimals: __spreadArray([], coinAddresses[i].map(function (addr) { return coinAddressDecimalsDict[addr]; }), true),
                                swap_abi: swapABIs[i],
                                gauge_abi: this_1.chainId === 1 ? factoryGaugeABI : gaugeChildABI,
                                deposit_abi: basePoolZap.ABI,
                                is_ng: factoryAddress === curve.constants.ALIASES.stable_ng_factory,
                            };
                        }
                    };
                    this_1 = this;
                    for (i = 0; i < poolIds.length; i++) {
                        _loop_2(i);
                    }
                    return [2 /*return*/, FACTORY_POOLS_DATA];
            }
        });
    });
}
