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
import axios from 'axios';
import { Contract } from 'ethers';
import { Contract as MulticallContract } from "@curvefi/ethcall";
import BigNumber from 'bignumber.js';
import { curve, NETWORK_CONSTANTS } from "./curve.js";
import { _getAllPoolsFromApi, _getFactoryAPYs, _getSubgraphData, _getVolumes, } from "./external-api.js";
import ERC20Abi from './constants/abis/ERC20.json' assert { type: 'json' };
import { L2Networks } from './constants/L2Networks.js';
import { volumeNetworks } from "./constants/volumeNetworks.js";
import { getPool } from "./pools/index.js";
export var ETH_ADDRESS = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
// export const MAX_ALLOWANCE = curve.parseUnits(new BigNumber(2).pow(256).minus(1).toFixed(), 0);
export var MAX_ALLOWANCE = BigInt("115792089237316195423570985008687907853269984665640564039457584007913129639935"); // 2**256 - 1
// Formatting numbers
export var _cutZeros = function (strn) {
    return strn.replace(/0+$/gi, '').replace(/\.$/gi, '');
};
export var checkNumber = function (n) {
    if (Number(n) !== Number(n))
        throw Error("".concat(n, " is not a number")); // NaN
    return n;
};
export var formatNumber = function (n, decimals) {
    if (decimals === void 0) { decimals = 18; }
    if (Number(n) !== Number(n))
        throw Error("".concat(n, " is not a number")); // NaN
    var _a = String(n).split("."), integer = _a[0], fractional = _a[1];
    return !fractional ? integer : integer + "." + fractional.slice(0, decimals);
};
export var parseUnits = function (n, decimals) {
    if (decimals === void 0) { decimals = 18; }
    return curve.parseUnits(formatNumber(n, decimals), decimals);
};
// bignumber.js
export var BN = function (val) { return new BigNumber(checkNumber(val)); };
export var toBN = function (n, decimals) {
    if (decimals === void 0) { decimals = 18; }
    return BN(curve.formatUnits(n, decimals));
};
export var toStringFromBN = function (bn, decimals) {
    if (decimals === void 0) { decimals = 18; }
    return bn.toFixed(decimals);
};
export var fromBN = function (bn, decimals) {
    if (decimals === void 0) { decimals = 18; }
    return curve.parseUnits(toStringFromBN(bn, decimals), decimals);
};
// -------------------
export var isEth = function (address) { return address.toLowerCase() === ETH_ADDRESS.toLowerCase(); };
export var getEthIndex = function (addresses) { return addresses.map(function (address) { return address.toLowerCase(); }).indexOf(ETH_ADDRESS.toLowerCase()); };
export var mulBy1_3 = function (n) { return n * curve.parseUnits("130", 0) / curve.parseUnits("100", 0); };
export var smartNumber = function (abstractNumber) {
    if (Array.isArray(abstractNumber)) {
        return [Number(abstractNumber[0]), Number(abstractNumber[1])];
    }
    else {
        return Number(abstractNumber);
    }
};
export var DIGas = function (gas) {
    if (Array.isArray(gas)) {
        return gas[0];
    }
    else {
        return gas;
    }
};
export var getGasFromArray = function (gas) {
    if (gas[1] === 0) {
        return gas[0];
    }
    else {
        return gas;
    }
};
export var gasSum = function (gas, currentGas) {
    if (Array.isArray(currentGas)) {
        gas[0] = gas[0] + currentGas[0];
        gas[1] = gas[1] + currentGas[1];
    }
    else {
        gas[0] = gas[0] + currentGas;
    }
    return gas;
};
// coins can be either addresses or symbols
export var _getCoinAddressesNoCheck = function () {
    var coins = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        coins[_i] = arguments[_i];
    }
    if (coins.length == 1 && Array.isArray(coins[0]))
        coins = coins[0];
    coins = coins;
    return coins.map(function (c) { return c.toLowerCase(); }).map(function (c) { return curve.constants.COINS[c] || c; });
};
export var _getCoinAddresses = function () {
    var coins = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        coins[_i] = arguments[_i];
    }
    var coinAddresses = _getCoinAddressesNoCheck.apply(void 0, coins);
    var availableAddresses = __spreadArray(__spreadArray([], Object.keys(curve.constants.DECIMALS), true), curve.constants.GAUGES, true);
    for (var _a = 0, coinAddresses_1 = coinAddresses; _a < coinAddresses_1.length; _a++) {
        var coinAddr = coinAddresses_1[_a];
        if (!availableAddresses.includes(coinAddr))
            throw Error("Coin with address '".concat(coinAddr, "' is not available"));
    }
    return coinAddresses;
};
export var _getCoinDecimals = function () {
    var coinAddresses = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        coinAddresses[_i] = arguments[_i];
    }
    if (coinAddresses.length == 1 && Array.isArray(coinAddresses[0]))
        coinAddresses = coinAddresses[0];
    coinAddresses = coinAddresses;
    return coinAddresses.map(function (coinAddr) { var _a; return (_a = curve.constants.DECIMALS[coinAddr.toLowerCase()]) !== null && _a !== void 0 ? _a : 18; }); // 18 for gauges
};
export var _getBalances = function (coins, addresses) { return __awaiter(void 0, void 0, void 0, function () {
    var coinAddresses, decimals, ethIndex, contractCalls, _loop_1, _i, coinAddresses_2, coinAddr, _response, ethBalances, _a, addresses_1, address, _b, _c, _balances, balances, _d, addresses_2, address;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                coinAddresses = _getCoinAddresses(coins);
                decimals = _getCoinDecimals(coinAddresses);
                ethIndex = getEthIndex(coinAddresses);
                if (ethIndex !== -1) {
                    coinAddresses.splice(ethIndex, 1);
                }
                contractCalls = [];
                _loop_1 = function (coinAddr) {
                    contractCalls.push.apply(contractCalls, addresses.map(function (address) { return curve.contracts[coinAddr].multicallContract.balanceOf(address); }));
                };
                for (_i = 0, coinAddresses_2 = coinAddresses; _i < coinAddresses_2.length; _i++) {
                    coinAddr = coinAddresses_2[_i];
                    _loop_1(coinAddr);
                }
                return [4 /*yield*/, curve.multicallProvider.all(contractCalls)];
            case 1:
                _response = _e.sent();
                if (!(ethIndex !== -1)) return [3 /*break*/, 6];
                ethBalances = [];
                _a = 0, addresses_1 = addresses;
                _e.label = 2;
            case 2:
                if (!(_a < addresses_1.length)) return [3 /*break*/, 5];
                address = addresses_1[_a];
                _c = (_b = ethBalances).push;
                return [4 /*yield*/, curve.provider.getBalance(address)];
            case 3:
                _c.apply(_b, [_e.sent()]);
                _e.label = 4;
            case 4:
                _a++;
                return [3 /*break*/, 2];
            case 5:
                _response.splice.apply(_response, __spreadArray([ethIndex * addresses.length, 0], ethBalances, false));
                _e.label = 6;
            case 6:
                _balances = {};
                addresses.forEach(function (address, i) {
                    _balances[address] = coins.map(function (_, j) { return _response[i + (j * addresses.length)]; });
                });
                balances = {};
                for (_d = 0, addresses_2 = addresses; _d < addresses_2.length; _d++) {
                    address = addresses_2[_d];
                    balances[address] = _balances[address].map(function (b, i) { return curve.formatUnits(b, decimals[i]); });
                }
                return [2 /*return*/, balances];
        }
    });
}); };
export var _prepareAddresses = function (addresses) {
    if (addresses.length == 1 && Array.isArray(addresses[0]))
        addresses = addresses[0];
    if (addresses.length === 0 && curve.signerAddress !== '')
        addresses = [curve.signerAddress];
    addresses = addresses;
    return addresses.filter(function (val, idx, arr) { return arr.indexOf(val) === idx; });
};
export var _getAddress = function (address) {
    address = address || curve.signerAddress;
    if (!address)
        throw Error("Need to connect wallet or pass address into args");
    return address;
};
export var getBalances = function (coins) {
    var addresses = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        addresses[_i - 1] = arguments[_i];
    }
    return __awaiter(void 0, void 0, void 0, function () {
        var balances;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    addresses = _prepareAddresses(addresses);
                    return [4 /*yield*/, _getBalances(coins, addresses)];
                case 1:
                    balances = _a.sent();
                    return [2 /*return*/, addresses.length === 1 ? balances[addresses[0]] : balances];
            }
        });
    });
};
export var _getAllowance = function (coins, address, spender) { return __awaiter(void 0, void 0, void 0, function () {
    var _coins, ethIndex, allowance, contractCalls;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _coins = __spreadArray([], coins, true);
                ethIndex = getEthIndex(_coins);
                if (ethIndex !== -1) {
                    _coins.splice(ethIndex, 1);
                }
                if (!(_coins.length === 1)) return [3 /*break*/, 2];
                return [4 /*yield*/, curve.contracts[_coins[0]].contract.allowance(address, spender, curve.constantOptions)];
            case 1:
                allowance = [_a.sent()];
                return [3 /*break*/, 4];
            case 2:
                contractCalls = _coins.map(function (coinAddr) { return curve.contracts[coinAddr].multicallContract.allowance(address, spender); });
                return [4 /*yield*/, curve.multicallProvider.all(contractCalls)];
            case 3:
                allowance = _a.sent();
                _a.label = 4;
            case 4:
                if (ethIndex !== -1) {
                    allowance.splice(ethIndex, 0, MAX_ALLOWANCE);
                }
                return [2 /*return*/, allowance];
        }
    });
}); };
// coins can be either addresses or symbols
export var getAllowance = function (coins, address, spender) { return __awaiter(void 0, void 0, void 0, function () {
    var coinAddresses, decimals, _allowance;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                coinAddresses = _getCoinAddresses(coins);
                decimals = _getCoinDecimals(coinAddresses);
                return [4 /*yield*/, _getAllowance(coinAddresses, address, spender)];
            case 1:
                _allowance = _a.sent();
                return [2 /*return*/, _allowance.map(function (a, i) { return curve.formatUnits(a, decimals[i]); })];
        }
    });
}); };
// coins can be either addresses or symbols
export var hasAllowance = function (coins, amounts, address, spender) { return __awaiter(void 0, void 0, void 0, function () {
    var coinAddresses, decimals, _allowance, _amounts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                coinAddresses = _getCoinAddresses(coins);
                decimals = _getCoinDecimals(coinAddresses);
                return [4 /*yield*/, _getAllowance(coinAddresses, address, spender)];
            case 1:
                _allowance = _a.sent();
                _amounts = amounts.map(function (a, i) { return parseUnits(a, decimals[i]); });
                return [2 /*return*/, _allowance.map(function (a, i) { return a >= _amounts[i]; }).reduce(function (a, b) { return a && b; })];
        }
    });
}); };
export var _ensureAllowance = function (coins, amounts, spender, isMax) {
    if (isMax === void 0) { isMax = true; }
    return __awaiter(void 0, void 0, void 0, function () {
        var address, allowance, txHashes, i, contract, _approveAmount, gasLimit_1, _a, _b, resetTx, gasLimit, _c, _d, approveTx;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    address = curve.signerAddress;
                    return [4 /*yield*/, _getAllowance(coins, address, spender)];
                case 1:
                    allowance = _e.sent();
                    txHashes = [];
                    i = 0;
                    _e.label = 2;
                case 2:
                    if (!(i < allowance.length)) return [3 /*break*/, 12];
                    if (!(allowance[i] < amounts[i])) return [3 /*break*/, 11];
                    contract = curve.contracts[coins[i]].contract;
                    _approveAmount = isMax ? MAX_ALLOWANCE : amounts[i];
                    return [4 /*yield*/, curve.updateFeeData()];
                case 3:
                    _e.sent();
                    if (!(allowance[i] > curve.parseUnits("0"))) return [3 /*break*/, 7];
                    _a = mulBy1_3;
                    _b = DIGas;
                    return [4 /*yield*/, contract.approve.estimateGas(spender, curve.parseUnits("0"), curve.constantOptions)];
                case 4:
                    gasLimit_1 = _a.apply(void 0, [_b.apply(void 0, [_e.sent()])]);
                    return [4 /*yield*/, contract.approve(spender, curve.parseUnits("0"), __assign(__assign({}, curve.options), { gasLimit: gasLimit_1 }))];
                case 5:
                    resetTx = _e.sent();
                    txHashes.push(resetTx.hash);
                    return [4 /*yield*/, resetTx.wait()];
                case 6:
                    _e.sent();
                    _e.label = 7;
                case 7:
                    _c = mulBy1_3;
                    _d = DIGas;
                    return [4 /*yield*/, contract.approve.estimateGas(spender, _approveAmount, curve.constantOptions)];
                case 8:
                    gasLimit = _c.apply(void 0, [_d.apply(void 0, [_e.sent()])]);
                    return [4 /*yield*/, contract.approve(spender, _approveAmount, __assign(__assign({}, curve.options), { gasLimit: gasLimit }))];
                case 9:
                    approveTx = _e.sent();
                    txHashes.push(approveTx.hash);
                    return [4 /*yield*/, approveTx.wait()];
                case 10:
                    _e.sent();
                    _e.label = 11;
                case 11:
                    i++;
                    return [3 /*break*/, 2];
                case 12: return [2 /*return*/, txHashes];
            }
        });
    });
};
// coins can be either addresses or symbols
export var ensureAllowanceEstimateGas = function (coins, amounts, spender, isMax) {
    if (isMax === void 0) { isMax = true; }
    return __awaiter(void 0, void 0, void 0, function () {
        var coinAddresses, decimals, _amounts, address, _allowance, gas, i, contract, _approveAmount, currentGas, _a, currentGas, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    coinAddresses = _getCoinAddresses(coins);
                    decimals = _getCoinDecimals(coinAddresses);
                    _amounts = amounts.map(function (a, i) { return parseUnits(a, decimals[i]); });
                    address = curve.signerAddress;
                    return [4 /*yield*/, _getAllowance(coinAddresses, address, spender)];
                case 1:
                    _allowance = _c.sent();
                    gas = [0, 0];
                    i = 0;
                    _c.label = 2;
                case 2:
                    if (!(i < _allowance.length)) return [3 /*break*/, 7];
                    if (!(_allowance[i] < _amounts[i])) return [3 /*break*/, 6];
                    contract = curve.contracts[coinAddresses[i]].contract;
                    _approveAmount = isMax ? MAX_ALLOWANCE : _amounts[i];
                    if (!(_allowance[i] > curve.parseUnits("0"))) return [3 /*break*/, 4];
                    _a = smartNumber;
                    return [4 /*yield*/, contract.approve.estimateGas(spender, curve.parseUnits("0"), curve.constantOptions)];
                case 3:
                    currentGas = _a.apply(void 0, [_c.sent()]);
                    // For some coins (crv for example ) we can't estimate the second tx gas (approve: 0 --> amount), so we assume it will cost the same amount of gas
                    if (typeof currentGas === "number") {
                        currentGas = currentGas * 2;
                    }
                    else {
                        currentGas = currentGas.map(function (g) { return g * 2; });
                    }
                    gas = gasSum(gas, currentGas);
                    return [3 /*break*/, 6];
                case 4:
                    _b = smartNumber;
                    return [4 /*yield*/, contract.approve.estimateGas(spender, _approveAmount, curve.constantOptions)];
                case 5:
                    currentGas = _b.apply(void 0, [_c.sent()]);
                    gas = gasSum(gas, currentGas);
                    _c.label = 6;
                case 6:
                    i++;
                    return [3 /*break*/, 2];
                case 7: return [2 /*return*/, getGasFromArray(gas)];
            }
        });
    });
};
// coins can be either addresses or symbols
export var ensureAllowance = function (coins, amounts, spender, isMax) {
    if (isMax === void 0) { isMax = true; }
    return __awaiter(void 0, void 0, void 0, function () {
        var coinAddresses, decimals, _amounts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    coinAddresses = _getCoinAddresses(coins);
                    decimals = _getCoinDecimals(coinAddresses);
                    _amounts = amounts.map(function (a, i) { return parseUnits(a, decimals[i]); });
                    return [4 /*yield*/, _ensureAllowance(coinAddresses, _amounts, spender, isMax)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
};
export var getPoolIdBySwapAddress = function (swapAddress) {
    var poolsData = curve.getPoolsData();
    var poolIds = Object.entries(poolsData).filter(function (_a) {
        var _ = _a[0], poolData = _a[1];
        return poolData.swap_address.toLowerCase() === swapAddress.toLowerCase();
    });
    if (poolIds.length === 0)
        return "";
    return poolIds[0][0];
};
var _getTokenAddressBySwapAddress = function (swapAddress) {
    var poolsData = curve.getPoolsData();
    var res = Object.entries(poolsData).filter(function (_a) {
        var _ = _a[0], poolData = _a[1];
        return poolData.swap_address.toLowerCase() === swapAddress.toLowerCase();
    });
    if (res.length === 0)
        return "";
    return res[0][1].token_address;
};
export var _getUsdPricesFromApi = function () { return __awaiter(void 0, void 0, void 0, function () {
    var network, allTypesExtendedPoolData, priceDict, priceDictByMaxTvl, _i, allTypesExtendedPoolData_1, extendedPoolData, _a, _b, pool, lpTokenAddress, totalSupply, _c, _d, coin, _e, _f, coin, address, maxTvlItem;
    var _g, _h;
    return __generator(this, function (_j) {
        switch (_j.label) {
            case 0:
                network = curve.constants.NETWORK_NAME;
                return [4 /*yield*/, _getAllPoolsFromApi(network)];
            case 1:
                allTypesExtendedPoolData = _j.sent();
                priceDict = {};
                priceDictByMaxTvl = {};
                for (_i = 0, allTypesExtendedPoolData_1 = allTypesExtendedPoolData; _i < allTypesExtendedPoolData_1.length; _i++) {
                    extendedPoolData = allTypesExtendedPoolData_1[_i];
                    for (_a = 0, _b = extendedPoolData.poolData; _a < _b.length; _a++) {
                        pool = _b[_a];
                        lpTokenAddress = (_g = pool.lpTokenAddress) !== null && _g !== void 0 ? _g : pool.address;
                        totalSupply = pool.totalSupply / (Math.pow(10, 18));
                        if (lpTokenAddress.toLowerCase() in priceDict) {
                            priceDict[lpTokenAddress.toLowerCase()].push({
                                price: pool.usdTotal && totalSupply ? pool.usdTotal / totalSupply : 0,
                                tvl: pool.usdTotal,
                            });
                        }
                        else {
                            priceDict[lpTokenAddress.toLowerCase()] = [];
                            priceDict[lpTokenAddress.toLowerCase()].push({
                                price: pool.usdTotal && totalSupply ? pool.usdTotal / totalSupply : 0,
                                tvl: pool.usdTotal,
                            });
                        }
                        for (_c = 0, _d = pool.coins; _c < _d.length; _c++) {
                            coin = _d[_c];
                            if (typeof coin.usdPrice === "number") {
                                if (coin.address.toLowerCase() in priceDict) {
                                    priceDict[coin.address.toLowerCase()].push({
                                        price: coin.usdPrice,
                                        tvl: pool.usdTotal,
                                    });
                                }
                                else {
                                    priceDict[coin.address.toLowerCase()] = [];
                                    priceDict[coin.address.toLowerCase()].push({
                                        price: coin.usdPrice,
                                        tvl: pool.usdTotal,
                                    });
                                }
                            }
                        }
                        for (_e = 0, _f = (_h = pool.gaugeRewards) !== null && _h !== void 0 ? _h : []; _e < _f.length; _e++) {
                            coin = _f[_e];
                            if (typeof coin.tokenPrice === "number") {
                                if (coin.tokenAddress.toLowerCase() in priceDict) {
                                    priceDict[coin.tokenAddress.toLowerCase()].push({
                                        price: coin.tokenPrice,
                                        tvl: pool.usdTotal,
                                    });
                                }
                                else {
                                    priceDict[coin.tokenAddress.toLowerCase()] = [];
                                    priceDict[coin.tokenAddress.toLowerCase()].push({
                                        price: coin.tokenPrice,
                                        tvl: pool.usdTotal,
                                    });
                                }
                            }
                        }
                    }
                }
                for (address in priceDict) {
                    if (priceDict[address].length > 0) {
                        maxTvlItem = priceDict[address].reduce(function (prev, current) {
                            if (+current.tvl > +prev.tvl) {
                                return current;
                            }
                            else {
                                return prev;
                            }
                        });
                        priceDictByMaxTvl[address] = maxTvlItem.price;
                    }
                    else {
                        priceDictByMaxTvl[address] = 0;
                    }
                }
                return [2 /*return*/, priceDictByMaxTvl];
        }
    });
}); };
export var _getCrvApyFromApi = function () { return __awaiter(void 0, void 0, void 0, function () {
    var network, allTypesExtendedPoolData, apyDict, _i, allTypesExtendedPoolData_2, extendedPoolData, _a, _b, pool;
    var _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                network = curve.constants.NETWORK_NAME;
                return [4 /*yield*/, _getAllPoolsFromApi(network)];
            case 1:
                allTypesExtendedPoolData = _e.sent();
                apyDict = {};
                for (_i = 0, allTypesExtendedPoolData_2 = allTypesExtendedPoolData; _i < allTypesExtendedPoolData_2.length; _i++) {
                    extendedPoolData = allTypesExtendedPoolData_2[_i];
                    for (_a = 0, _b = extendedPoolData.poolData; _a < _b.length; _a++) {
                        pool = _b[_a];
                        if (pool.gaugeAddress) {
                            if (!pool.gaugeCrvApy) {
                                apyDict[pool.gaugeAddress.toLowerCase()] = [0, 0];
                            }
                            else {
                                apyDict[pool.gaugeAddress.toLowerCase()] = [(_c = pool.gaugeCrvApy[0]) !== null && _c !== void 0 ? _c : 0, (_d = pool.gaugeCrvApy[1]) !== null && _d !== void 0 ? _d : 0];
                            }
                        }
                    }
                }
                return [2 /*return*/, apyDict];
        }
    });
}); };
export var _getRewardsFromApi = function () { return __awaiter(void 0, void 0, void 0, function () {
    var network, allTypesExtendedPoolData, rewardsDict, _i, allTypesExtendedPoolData_3, extendedPoolData, _a, _b, pool;
    var _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                network = curve.constants.NETWORK_NAME;
                return [4 /*yield*/, _getAllPoolsFromApi(network)];
            case 1:
                allTypesExtendedPoolData = _d.sent();
                rewardsDict = {};
                for (_i = 0, allTypesExtendedPoolData_3 = allTypesExtendedPoolData; _i < allTypesExtendedPoolData_3.length; _i++) {
                    extendedPoolData = allTypesExtendedPoolData_3[_i];
                    for (_a = 0, _b = extendedPoolData.poolData; _a < _b.length; _a++) {
                        pool = _b[_a];
                        if (pool.gaugeAddress) {
                            rewardsDict[pool.gaugeAddress.toLowerCase()] = ((_c = pool.gaugeRewards) !== null && _c !== void 0 ? _c : [])
                                .filter(function (r) { return curve.chainId === 1 || r.tokenAddress.toLowerCase() !== curve.constants.COINS.crv; });
                        }
                    }
                }
                return [2 /*return*/, rewardsDict];
        }
    });
}); };
var _usdRatesCache = {};
export var _getUsdRate = function (assetId) { return __awaiter(void 0, void 0, void 0, function () {
    var pricesFromApi, chainName, nativeTokenName, url, response;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (curve.chainId === 1 && assetId.toLowerCase() === '0x8762db106b2c2a0bccb3a80d1ed41273552616e8')
                    return [2 /*return*/, 0]; // RSR
                return [4 /*yield*/, _getUsdPricesFromApi()];
            case 1:
                pricesFromApi = _c.sent();
                if (assetId.toLowerCase() in pricesFromApi)
                    return [2 /*return*/, pricesFromApi[assetId.toLowerCase()]];
                if (assetId === 'USD' || (curve.chainId === 137 && (assetId.toLowerCase() === curve.constants.COINS.am3crv.toLowerCase())))
                    return [2 /*return*/, 1];
                chainName = {
                    1: 'ethereum',
                    10: 'optimistic-ethereum',
                    56: "binance-smart-chain",
                    100: 'xdai',
                    137: 'polygon-pos',
                    196: 'x-layer',
                    250: 'fantom',
                    252: 'fraxtal',
                    324: 'zksync',
                    1284: 'moonbeam',
                    2222: 'kava',
                    5000: 'mantle',
                    8453: 'base',
                    42220: 'celo',
                    43114: 'avalanche',
                    42161: 'arbitrum-one',
                    1313161554: 'aurora',
                }[curve.chainId];
                nativeTokenName = {
                    1: 'ethereum',
                    10: 'ethereum',
                    56: 'binancecoin',
                    100: 'xdai',
                    137: 'matic-network',
                    196: 'okb',
                    250: 'fantom',
                    252: 'frax-ether',
                    324: 'ethereum',
                    1284: 'moonbeam',
                    2222: 'kava',
                    5000: 'mantle',
                    8453: 'ethereum',
                    42220: 'celo',
                    43114: 'avalanche-2',
                    42161: 'ethereum',
                    1313161554: 'ethereum',
                }[curve.chainId];
                if (chainName === undefined) {
                    throw Error('curve object is not initialized');
                }
                assetId = {
                    'CRV': 'curve-dao-token',
                    'EUR': 'stasis-eurs',
                    'BTC': 'bitcoin',
                    'ETH': 'ethereum',
                    'LINK': 'link',
                }[assetId.toUpperCase()] || assetId;
                assetId = isEth(assetId) ? nativeTokenName : assetId.toLowerCase();
                // No EURT on Coingecko Polygon
                if (curve.chainId === 137 && assetId.toLowerCase() === curve.constants.COINS.eurt) {
                    chainName = 'ethereum';
                    assetId = '0xC581b735A1688071A1746c968e0798D642EDE491'.toLowerCase(); // EURT Ethereum
                }
                // CRV
                if (assetId.toLowerCase() === curve.constants.ALIASES.crv) {
                    assetId = 'curve-dao-token';
                }
                if (!((((_a = _usdRatesCache[assetId]) === null || _a === void 0 ? void 0 : _a.time) || 0) + 600000 < Date.now())) return [3 /*break*/, 3];
                url = [nativeTokenName, 'ethereum', 'bitcoin', 'link', 'curve-dao-token', 'stasis-eurs'].includes(assetId.toLowerCase()) ?
                    "https://api.coingecko.com/api/v3/simple/price?ids=".concat(assetId, "&vs_currencies=usd") :
                    "https://api.coingecko.com/api/v3/simple/token_price/".concat(chainName, "?contract_addresses=").concat(assetId, "&vs_currencies=usd");
                return [4 /*yield*/, axios.get(url)];
            case 2:
                response = _c.sent();
                try {
                    _usdRatesCache[assetId] = { 'rate': (_b = response.data[assetId]['usd']) !== null && _b !== void 0 ? _b : 0, 'time': Date.now() };
                }
                catch (err) { // TODO pay attention!
                    _usdRatesCache[assetId] = { 'rate': 0, 'time': Date.now() };
                }
                _c.label = 3;
            case 3: return [2 /*return*/, _usdRatesCache[assetId]['rate']];
        }
    });
}); };
export var getUsdRate = function (coin) { return __awaiter(void 0, void 0, void 0, function () {
    var coinAddress;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                coinAddress = _getCoinAddressesNoCheck(coin)[0];
                return [4 /*yield*/, _getUsdRate(coinAddress)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
export var getBaseFeeByLastBlock = function () { return __awaiter(void 0, void 0, void 0, function () {
    var provider, block, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                provider = curve.provider;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, provider.getBlock('latest')];
            case 2:
                block = _a.sent();
                if (!block) {
                    return [2 /*return*/, 0.01];
                }
                return [2 /*return*/, Number(block.baseFeePerGas) / (Math.pow(10, 9))];
            case 3:
                error_1 = _a.sent();
                throw new Error(error_1);
            case 4: return [2 /*return*/];
        }
    });
}); };
export var getGasPrice = function () { return __awaiter(void 0, void 0, void 0, function () {
    var provider, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                provider = curve.provider;
                _a = Number;
                _b = Number;
                return [4 /*yield*/, provider.getFeeData()];
            case 1: return [2 /*return*/, _a.apply(void 0, [(_b.apply(void 0, [(_c.sent()).gasPrice]) / 1e9).toFixed(2)])];
        }
    });
}); };
export var getGasPriceFromL1 = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (L2Networks.includes(curve.chainId) && curve.L1WeightedGasPrice) {
            return [2 /*return*/, curve.L1WeightedGasPrice + 1e9]; // + 1 gwei
        }
        else {
            throw Error("This method exists only for L2 networks");
        }
        return [2 /*return*/];
    });
}); };
export var getGasPriceFromL2 = function () { return __awaiter(void 0, void 0, void 0, function () {
    var gasPrice;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(curve.chainId === 42161)) return [3 /*break*/, 2];
                return [4 /*yield*/, getBaseFeeByLastBlock()];
            case 1: return [2 /*return*/, _a.sent()];
            case 2:
                if (!(curve.chainId === 196)) return [3 /*break*/, 4];
                return [4 /*yield*/, getGasPrice()]; // gwei
            case 3: return [2 /*return*/, _a.sent()]; // gwei
            case 4:
                if (!(curve.chainId === 5000)) return [3 /*break*/, 6];
                return [4 /*yield*/, getGasPrice()]; // gwei
            case 5: return [2 /*return*/, _a.sent()]; // gwei
            case 6:
                if (!L2Networks.includes(curve.chainId)) return [3 /*break*/, 8];
                return [4 /*yield*/, curve.contracts[curve.constants.ALIASES.gas_oracle_blob].contract.gasPrice({ "gasPrice": "0x2000000" })];
            case 7:
                gasPrice = _a.sent();
                return [2 /*return*/, Number(gasPrice)];
            case 8: throw Error("This method exists only for L2 networks");
        }
    });
}); };
export var getGasInfoForL2 = function () { return __awaiter(void 0, void 0, void 0, function () {
    var baseFee, gasPrice, baseFee;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(curve.chainId === 42161)) return [3 /*break*/, 2];
                return [4 /*yield*/, getBaseFeeByLastBlock()];
            case 1:
                baseFee = _a.sent();
                return [2 /*return*/, {
                        maxFeePerGas: Number(((baseFee * 1.1) + 0.01).toFixed(2)),
                        maxPriorityFeePerGas: 0.01,
                    }];
            case 2:
                if (!(curve.chainId === 196)) return [3 /*break*/, 4];
                return [4 /*yield*/, getGasPrice()];
            case 3:
                gasPrice = _a.sent();
                return [2 /*return*/, {
                        gasPrice: gasPrice,
                    }];
            case 4:
                if (!(curve.chainId === 5000)) return [3 /*break*/, 6];
                return [4 /*yield*/, getBaseFeeByLastBlock()];
            case 5:
                baseFee = _a.sent();
                return [2 /*return*/, {
                        maxFeePerGas: Number(((baseFee * 1.1) + 0.01).toFixed(2)),
                        maxPriorityFeePerGas: 0.01,
                    }];
            case 6: throw Error("This method exists only for L2 networks");
        }
    });
}); };
export var getTxCostsUsd = function (ethUsdRate, gasPrice, gas, gasPriceL1) {
    if (gasPriceL1 === void 0) { gasPriceL1 = 0; }
    if (Array.isArray(gas)) {
        return ethUsdRate * ((gas[0] * gasPrice / 1e18) + (gas[1] * gasPriceL1 / 1e18));
    }
    else {
        return ethUsdRate * gas * gasPrice / 1e18;
    }
};
var _getNetworkName = function (network) {
    if (network === void 0) { network = curve.chainId; }
    if (typeof network === "number" && NETWORK_CONSTANTS[network]) {
        return NETWORK_CONSTANTS[network].NAME;
    }
    else if (typeof network === "string" && Object.values(NETWORK_CONSTANTS).map(function (n) { return n.NAME; }).includes(network)) {
        return network;
    }
    else {
        throw Error("Wrong network name or id: ".concat(network));
    }
};
var _getChainId = function (network) {
    if (network === void 0) { network = curve.chainId; }
    if (typeof network === "number" && NETWORK_CONSTANTS[network]) {
        return network;
    }
    else if (typeof network === "string" && Object.values(NETWORK_CONSTANTS).map(function (n) { return n.NAME; }).includes(network)) {
        var idx = Object.values(NETWORK_CONSTANTS).map(function (n) { return n.NAME; }).indexOf(network);
        return Number(Object.keys(NETWORK_CONSTANTS)[idx]);
    }
    else {
        throw Error("Wrong network name or id: ".concat(network));
    }
};
export var getTVL = function (network) {
    if (network === void 0) { network = curve.chainId; }
    return __awaiter(void 0, void 0, void 0, function () {
        var allTypesExtendedPoolData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    network = _getNetworkName(network);
                    return [4 /*yield*/, _getAllPoolsFromApi(network)];
                case 1:
                    allTypesExtendedPoolData = _a.sent();
                    return [2 /*return*/, allTypesExtendedPoolData.reduce(function (sum, data) { var _a, _b; return sum + ((_b = (_a = data.tvl) !== null && _a !== void 0 ? _a : data.tvlAll) !== null && _b !== void 0 ? _b : 0); }, 0)];
            }
        });
    });
};
export var getVolumeApiController = function (network) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!volumeNetworks.getVolumes.includes(curve.chainId)) return [3 /*break*/, 2];
                return [4 /*yield*/, _getVolumes(network)];
            case 1: return [2 /*return*/, _a.sent()];
            case 2:
                if (!volumeNetworks.getFactoryAPYs.includes(curve.chainId)) return [3 /*break*/, 4];
                return [4 /*yield*/, _getFactoryAPYs(network)];
            case 3: return [2 /*return*/, _a.sent()];
            case 4:
                if (!volumeNetworks.getSubgraphData.includes(curve.chainId)) return [3 /*break*/, 6];
                return [4 /*yield*/, _getSubgraphData(network)];
            case 5: return [2 /*return*/, _a.sent()];
            case 6: throw Error("Can't get volume for network: ".concat(network));
        }
    });
}); };
export var getVolume = function (network) {
    if (network === void 0) { network = curve.chainId; }
    return __awaiter(void 0, void 0, void 0, function () {
        var _a, totalVolume, cryptoVolume, cryptoShare;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    network = _getNetworkName(network);
                    return [4 /*yield*/, getVolumeApiController(network)];
                case 1:
                    _a = _b.sent(), totalVolume = _a.totalVolume, cryptoVolume = _a.cryptoVolume, cryptoShare = _a.cryptoShare;
                    return [2 /*return*/, { totalVolume: totalVolume, cryptoVolume: cryptoVolume, cryptoShare: cryptoShare }];
            }
        });
    });
};
export var _setContracts = function (address, abi) {
    curve.contracts[address] = {
        contract: new Contract(address, abi, curve.signer || curve.provider),
        multicallContract: new MulticallContract(address, abi),
    };
};
// Find k for which x * k = target_x or y * k = target_y
// k = max(target_x / x, target_y / y)
// small_x = x * k
export var _get_small_x = function (_x, _y, x_decimals, y_decimals) {
    var target_x = BN(Math.pow(10, (x_decimals > 5 ? x_decimals - 3 : x_decimals)));
    var target_y = BN(Math.pow(10, (y_decimals > 5 ? y_decimals - 3 : y_decimals)));
    var x_int_BN = toBN(_x, 0);
    var y_int_BN = toBN(_y, 0);
    var k = BigNumber.max(target_x.div(x_int_BN), target_y.div(y_int_BN));
    return BigNumber.min(x_int_BN.times(k), BN(Math.pow(10, x_decimals)));
};
export var _get_price_impact = function (_x, _y, _small_x, _small_y, x_decimals, y_decimals) {
    var x_BN = toBN(_x, x_decimals);
    var y_BN = toBN(_y, y_decimals);
    var small_x_BN = toBN(_small_x, x_decimals);
    var small_y_BN = toBN(_small_y, y_decimals);
    var rateBN = y_BN.div(x_BN);
    var smallRateBN = small_y_BN.div(small_x_BN);
    if (rateBN.gt(smallRateBN))
        return BN(0);
    return BN(1).minus(rateBN.div(smallRateBN)).times(100);
};
export var getCoinsData = function () {
    var coins = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        coins[_i] = arguments[_i];
    }
    return __awaiter(void 0, void 0, void 0, function () {
        var coinAddresses, ethIndex, contractCalls, _a, coinAddresses_3, coinAddr, coinContract, _response, res;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (coins.length == 1 && Array.isArray(coins[0]))
                        coins = coins[0];
                    coins = coins;
                    coinAddresses = _getCoinAddressesNoCheck(coins);
                    console.log(coinAddresses);
                    ethIndex = getEthIndex(coinAddresses);
                    if (ethIndex !== -1) {
                        coinAddresses.splice(ethIndex, 1);
                    }
                    contractCalls = [];
                    for (_a = 0, coinAddresses_3 = coinAddresses; _a < coinAddresses_3.length; _a++) {
                        coinAddr = coinAddresses_3[_a];
                        coinContract = new MulticallContract(coinAddr, ERC20Abi);
                        contractCalls.push(coinContract.name(), coinContract.symbol(), coinContract.decimals());
                    }
                    return [4 /*yield*/, curve.multicallProvider.all(contractCalls)];
                case 1:
                    _response = _b.sent();
                    if (ethIndex !== -1) {
                        _response.splice.apply(_response, __spreadArray([ethIndex * 2, 0], ['Ethereum', 'ETH', 18], false));
                    }
                    res = [];
                    coins.forEach(function (address, i) {
                        res.push({
                            name: _response.shift(),
                            symbol: _response.shift(),
                            decimals: Number(curve.formatUnits(_response.shift(), 0)),
                        });
                    });
                    return [2 /*return*/, res];
            }
        });
    });
};
export var hasDepositAndStake = function () { return curve.constants.ALIASES.deposit_and_stake !== curve.constants.ZERO_ADDRESS; };
export var hasRouter = function () { return curve.constants.ALIASES.router !== curve.constants.ZERO_ADDRESS; };
export var getCountArgsOfMethodByContract = function (contract, methodName) {
    var func = contract.interface.fragments.find(function (item) { return item.name === methodName; });
    if (func) {
        return func.inputs.length;
    }
    else {
        return -1;
    }
};
export var isMethodExist = function (contract, methodName) {
    var func = contract.interface.fragments.find(function (item) { return item.name === methodName; });
    if (func) {
        return true;
    }
    else {
        return false;
    }
};
export var getPoolName = function (name) {
    var separatedName = name.split(": ");
    if (separatedName.length > 1) {
        return separatedName[1].trim();
    }
    else {
        return separatedName[0].trim();
    }
};
export var isStableNgPool = function (name) {
    return name.includes('factory-stable-ng');
};
export var assetTypeNameHandler = function (assetTypeName) {
    if (assetTypeName.toUpperCase() === 'UNKNOWN') {
        return 'OTHER';
    }
    else {
        return assetTypeName.toUpperCase();
    }
};
export var getBasePools = function () { return __awaiter(void 0, void 0, void 0, function () {
    var factoryContract, factoryMulticallContract, basePoolCount, _a, _b, _c, calls, i, basePoolList, pools, basePoolIds;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                factoryContract = curve.contracts[curve.constants.ALIASES['stable_ng_factory']].contract;
                factoryMulticallContract = curve.contracts[curve.constants.ALIASES['stable_ng_factory']].multicallContract;
                _a = Number;
                _c = (_b = curve).formatUnits;
                return [4 /*yield*/, factoryContract.base_pool_count()];
            case 1:
                basePoolCount = _a.apply(void 0, [_c.apply(_b, [_d.sent(), 0])]);
                calls = [];
                for (i = 0; i < basePoolCount; i++) {
                    calls.push(factoryMulticallContract.base_pool_list(i));
                }
                return [4 /*yield*/, curve.multicallProvider.all(calls)];
            case 2:
                basePoolList = (_d.sent()).map(function (item) { return item.toLowerCase(); });
                pools = __assign(__assign(__assign({}, curve.constants.STABLE_NG_FACTORY_POOLS_DATA), curve.constants.FACTORY_POOLS_DATA), curve.constants.POOLS_DATA);
                basePoolIds = Object.keys(pools).filter(function (item) { return basePoolList.includes(pools[item].swap_address); });
                return [2 /*return*/, basePoolIds.map(function (poolId) {
                        var pool = getPool(poolId);
                        return {
                            id: poolId,
                            name: pool.name,
                            pool: pool.address,
                            token: pool.lpToken,
                            coins: pool.underlyingCoinAddresses,
                        };
                    })];
        }
    });
}); };
export var memoizedContract = function () {
    var cache = {};
    return function (address, abi, provider) {
        if (address in cache) {
            return cache[address];
        }
        else {
            var result = new Contract(address, abi, provider);
            cache[address] = result;
            return result;
        }
    };
};
export var memoizedMulticallContract = function () {
    var cache = {};
    return function (address, abi) {
        if (address in cache) {
            return cache[address];
        }
        else {
            var result = new MulticallContract(address, abi);
            cache[address] = result;
            return result;
        }
    };
};
