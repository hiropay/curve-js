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
import { ethers, Contract, Typed } from "ethers";
import { curve } from "../curve.js";
import { getPool } from "../pools/index.js";
import { parseUnits, BN, mulBy1_3, getPoolIdBySwapAddress, DIGas, smartNumber } from '../utils.js';
import CurveLpTokenV5ABI from "../constants/abis/curve_lp_token_v5.json" assert { type: 'json' };
import Plain2ETHOracleABIABI from "../constants/abis/factory-v2/Plain2ETHOracle.json" assert { type: 'json' };
import { tricryptoDeployImplementations } from "../constants/tricryptoDeployImplementations.js";
// ------- STABLE PLAIN POOLS -------
var _deployStablePlainPool = function (name, symbol, coins, A, fee, // %
assetType, // 0 = USD, 1 = ETH, 2 = BTC, 3 = Other
implementationIdx, emaTime, // seconds
oracleAddress, methodName, estimateGas) { return __awaiter(void 0, void 0, void 0, function () {
    var _A, _fee, _coins, useProxy, setOracle, contractAddress, contract, args, methodId, methodToCall, gas, gasLimit;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (name.length > 32)
                    throw Error("Max name length = 32");
                if (symbol.length > 10)
                    throw Error("Max symbol length = 10");
                if (![2, 3, 4].includes(coins.length))
                    throw Error("Invalid number of coins. Must be 2, 3 or 4");
                if (BN(fee).lt(0.04))
                    throw Error("fee must be >= 0.04%. Passed fee = ".concat(fee));
                if (BN(fee).gt(1))
                    throw Error("fee must be <= 1%. Passed fee = ".concat(fee));
                if (![0, 1, 2, 3].includes(assetType))
                    throw Error("Invalid assetType. Must be one of: 0 = USD, 1 = ETH, 2 = BTC, 3 = Other");
                if (curve.chainId !== 1 || coins.length > 2) {
                    if (![0, 1, 2, 3].includes(implementationIdx))
                        throw Error("Invalid implementationIdx. Must be one 0, 1, 2 or 3");
                }
                else {
                    if (![0, 1, 2, 3, 4, 5].includes(implementationIdx))
                        throw Error("Invalid implementationIdx. Must be one 0, 1, 2, 3, 4 or 5");
                }
                if (emaTime <= 0)
                    throw Error("emaTime must be > 0. Passed emaTime = ".concat(emaTime));
                _A = parseUnits(A, 0);
                _fee = parseUnits(fee, 8);
                _coins = coins.concat(Array(4 - coins.length).fill(curve.constants.ZERO_ADDRESS));
                useProxy = (curve.chainId === 1 && coins.length === 2 && implementationIdx === 4 && emaTime !== 600) ||
                    (curve.chainId === 1 && coins.length === 2 && implementationIdx === 5 && emaTime !== 600) ||
                    ((curve.chainId === 42161 || curve.chainId == 10) && coins.length === 2 && implementationIdx === 0 && emaTime !== 600);
                setOracle = ((curve.chainId === 42161 || curve.chainId == 10) && coins.length === 2 && implementationIdx === 2);
                contractAddress = (useProxy || setOracle) ? curve.constants.ALIASES.factory_admin : curve.constants.ALIASES.factory;
                contract = curve.contracts[contractAddress].contract;
                args = [name, symbol, _coins, _A, _fee, assetType, implementationIdx];
                if (useProxy || setOracle)
                    args.push(parseUnits(Math.floor(emaTime / Math.log(2)), 0));
                if (setOracle) {
                    methodId = methodName === "0x00000000" ? "0x00000000" : ethers.id(methodName).substring(0, 10);
                    args.push(methodId, oracleAddress);
                }
                methodToCall = setOracle ? "deploy_plain_pool_and_set_oracle" : "deploy_plain_pool";
                return [4 /*yield*/, (_a = contract[methodToCall]).estimateGas.apply(_a, __spreadArray(__spreadArray([], args, false), [curve.constantOptions], false))];
            case 1:
                gas = _b.sent();
                if (estimateGas)
                    return [2 /*return*/, smartNumber(gas)];
                gasLimit = mulBy1_3(DIGas(gas));
                return [4 /*yield*/, curve.updateFeeData()];
            case 2:
                _b.sent();
                return [4 /*yield*/, contract[methodToCall].apply(contract, __spreadArray(__spreadArray([], args, false), [__assign(__assign({}, curve.options), { gasLimit: gasLimit })], false))];
            case 3: return [2 /*return*/, _b.sent()];
        }
    });
}); };
export var deployStablePlainPoolEstimateGas = function (name, symbol, coins, A, fee, // %
assetType, // 0 = USD, 1 = ETH, 2 = BTC, 3 = Other
implementationIdx, emaTime, // seconds
oracleAddress, methodName) {
    if (emaTime === void 0) { emaTime = 600; }
    if (oracleAddress === void 0) { oracleAddress = curve.constants.ZERO_ADDRESS; }
    if (methodName === void 0) { methodName = "0x00000000"; }
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, _deployStablePlainPool(name, symbol, coins, A, fee, assetType, implementationIdx, emaTime, oracleAddress, methodName, true)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
};
export var deployStablePlainPool = function (name, symbol, coins, A, fee, // %
assetType, // 0 = USD, 1 = ETH, 2 = BTC, 3 = Other
implementationIdx, emaTime, // seconds
oracleAddress, methodName) {
    if (emaTime === void 0) { emaTime = 600; }
    if (oracleAddress === void 0) { oracleAddress = curve.constants.ZERO_ADDRESS; }
    if (methodName === void 0) { methodName = "0x00000000"; }
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, _deployStablePlainPool(name, symbol, coins, A, fee, assetType, implementationIdx, emaTime, oracleAddress, methodName, false)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
};
var _deployStableNgPlainPool = function (name, symbol, coins, A, fee, // %
offpegFeeMultiplier, assetTypes, // 0 = Standard, 1 = Oracle, 2 = Rebasing, 3 = ERC4626
implementationIdx, emaTime, // seconds
oracleAddresses, methodNames, estimateGas) {
    if (emaTime === void 0) { emaTime = 600; }
    return __awaiter(void 0, void 0, void 0, function () {
        var _oracleAddresses, _methodNames, _A, _fee, _offpegFeeMultiplier, _coins, contractAddress, contract, methodIds, args, gas, gasLimit;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (name.length > 32)
                        throw Error("Max name length = 32");
                    if (symbol.length > 10)
                        throw Error("Max symbol length = 10");
                    if (coins.length < 1)
                        throw Error("Invalid number of coins. Must be more than 1");
                    if (coins.length > 9)
                        throw Error("Invalid number of coins. Must be less than 9");
                    if (BN(fee).gt(1))
                        throw Error("fee must be <= 1%. Passed fee = ".concat(fee));
                    if (oracleAddresses.length === 0) {
                        _oracleAddresses = new Array(coins.length).fill(curve.constants.ZERO_ADDRESS);
                    }
                    else {
                        _oracleAddresses = oracleAddresses;
                    }
                    if (methodNames.length === 0) {
                        _methodNames = new Array(coins.length).fill("0x00000000");
                    }
                    else {
                        _methodNames = methodNames;
                    }
                    if (coins.length !== assetTypes.length)
                        throw Error("Invalid length of assetTypes. Must be same coins length");
                    if (coins.length !== _oracleAddresses.length)
                        throw Error("Invalid length of oracleAddresses. Must be same coins length");
                    if (coins.length !== _methodNames.length)
                        throw Error("Invalid length of methodNames. Must be same coins length");
                    assetTypes.forEach(function (item, index) {
                        if (![0, 1, 2, 3].includes(item))
                            throw Error("Invalid assetType. Must be one of: 0 = Standard, 1 = Oracle, 2 = Rebasing, 3 = ERC4626 for assetTypes[".concat(index, "]"));
                    });
                    if (![0].includes(implementationIdx))
                        throw Error("Invalid implementationIdx. Must be 0");
                    if (emaTime <= 0)
                        throw Error("emaTime must be > 0. Passed emaTime = ".concat(emaTime));
                    _A = parseUnits(A, 0);
                    _fee = parseUnits(fee, 8);
                    _offpegFeeMultiplier = parseUnits(offpegFeeMultiplier, 10);
                    _coins = coins;
                    contractAddress = curve.constants.ALIASES.stable_ng_factory;
                    contract = curve.contracts[contractAddress].contract;
                    methodIds = [];
                    _methodNames.forEach(function (item) {
                        if (item === '0x00000000' || item === '') {
                            methodIds.push('0x00000000');
                        }
                        else {
                            methodIds.push(ethers.id(item).substring(0, 10));
                        }
                    });
                    args = [name, symbol, _coins, _A, _fee, _offpegFeeMultiplier, emaTime, implementationIdx, assetTypes, methodIds, _oracleAddresses];
                    return [4 /*yield*/, (_a = contract.deploy_plain_pool).estimateGas.apply(_a, __spreadArray(__spreadArray([], args, false), [curve.constantOptions], false))];
                case 1:
                    gas = _b.sent();
                    if (estimateGas)
                        return [2 /*return*/, smartNumber(gas)];
                    gasLimit = mulBy1_3(DIGas(gas));
                    return [4 /*yield*/, curve.updateFeeData()];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, contract.deploy_plain_pool.apply(contract, __spreadArray(__spreadArray([], args, false), [__assign(__assign({}, curve.options), { gasLimit: gasLimit })], false))];
                case 3: return [2 /*return*/, _b.sent()];
            }
        });
    });
};
export var deployStableNgPlainPoolEstimateGas = function (name, symbol, coins, A, fee, // %
offpegFeeMultiplier, assetTypes, // 0 = Standard, 1 = Oracle, 2 = Rebasing, 3 = ERC4626
implementationIdx, emaTime, // seconds
oracleAddresses, methodNames) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, _deployStableNgPlainPool(name, symbol, coins, A, fee, offpegFeeMultiplier, assetTypes, implementationIdx, emaTime, oracleAddresses, methodNames, true)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
export var deployStableNgPlainPool = function (name, symbol, coins, A, fee, // %
offpegFeeMultiplier, assetTypes, // 0 = Standard, 1 = Oracle, 2 = Rebasing, 3 = ERC4626
implementationIdx, emaTime, // seconds
oracleAddresses, methodNames) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, _deployStableNgPlainPool(name, symbol, coins, A, fee, offpegFeeMultiplier, assetTypes, implementationIdx, emaTime, oracleAddresses, methodNames, false)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
export var getDeployedStablePlainPoolAddress = function (tx) { return __awaiter(void 0, void 0, void 0, function () {
    var txInfo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, tx.wait()];
            case 1:
                txInfo = _a.sent();
                if (!txInfo)
                    throw Error("Can't get tx info");
                return [2 /*return*/, txInfo.logs[0].address.toLowerCase()];
        }
    });
}); };
export var _setOracle = function (poolAddress, oracleAddress, methodName, estimateGas) { return __awaiter(void 0, void 0, void 0, function () {
    var poolContract, methodId, _gas, gasLimit;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                curve.setContract(poolAddress, Plain2ETHOracleABIABI);
                poolContract = curve.contracts[poolAddress].contract;
                methodId = methodName === "0x00000000" ? "0x00000000" : ethers.id(methodName).substring(0, 10);
                return [4 /*yield*/, poolContract.set_oracle.estimateGas(methodId, oracleAddress, curve.constantOptions)];
            case 1:
                _gas = _a.sent();
                if (estimateGas)
                    return [2 /*return*/, Number(_gas)];
                gasLimit = mulBy1_3(_gas);
                return [4 /*yield*/, curve.updateFeeData()];
            case 2:
                _a.sent();
                return [4 /*yield*/, poolContract.set_oracle(methodId, oracleAddress, __assign(__assign({}, curve.options), { gasLimit: gasLimit }))];
            case 3: return [2 /*return*/, _a.sent()];
        }
    });
}); };
export var setOracleEstimateGas = function (poolAddress, oracleAddress, methodName) {
    if (oracleAddress === void 0) { oracleAddress = curve.constants.ZERO_ADDRESS; }
    if (methodName === void 0) { methodName = "0x00000000"; }
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, _setOracle(poolAddress, oracleAddress, methodName, true)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
};
export var setOracle = function (poolAddress, oracleAddress, methodName) {
    if (oracleAddress === void 0) { oracleAddress = curve.constants.ZERO_ADDRESS; }
    if (methodName === void 0) { methodName = "0x00000000"; }
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, _setOracle(poolAddress, oracleAddress, methodName, false)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
};
// ------- STABLE META POOLS -------
var _deployStableMetaPool = function (basePool, name, symbol, coin, A, fee, // %
implementationIdx, estimateGas) { return __awaiter(void 0, void 0, void 0, function () {
    var _A, _fee, contract, gas, gasLimit;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (name.length > 32)
                    throw Error("Max name length = 32");
                if (symbol.length > 10)
                    throw Error("Max symbol length = 10");
                if (BN(fee).lt(0.04))
                    throw Error("fee must be >= 0.04%. Passed fee = ".concat(fee));
                if (BN(fee).gt(1))
                    throw Error("fee must be <= 1%. Passed fee = ".concat(fee));
                if (![0, 1].includes(implementationIdx))
                    throw Error("Invalid implementationIdx. Must be one 0 or 1");
                _A = parseUnits(A, 0);
                _fee = parseUnits(fee, 8);
                contract = curve.contracts[curve.constants.ALIASES.factory].contract;
                return [4 /*yield*/, contract.deploy_metapool.estimateGas(basePool, name, symbol, coin, _A, _fee, implementationIdx, curve.constantOptions)];
            case 1:
                gas = _a.sent();
                if (estimateGas)
                    return [2 /*return*/, smartNumber(gas)];
                gasLimit = mulBy1_3(DIGas(gas));
                return [4 /*yield*/, curve.updateFeeData()];
            case 2:
                _a.sent();
                return [4 /*yield*/, contract.deploy_metapool(basePool, name, symbol, coin, _A, _fee, implementationIdx, __assign(__assign({}, curve.options), { gasLimit: gasLimit }))];
            case 3: return [2 /*return*/, _a.sent()];
        }
    });
}); };
export var deployStableMetaPoolEstimateGas = function (basePool, name, symbol, coin, A, fee, // %
implementationIdx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, _deployStableMetaPool(basePool, name, symbol, coin, A, fee, implementationIdx, true)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
export var deployStableMetaPool = function (basePool, name, symbol, coin, A, fee, // %
implementationIdx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, _deployStableMetaPool(basePool, name, symbol, coin, A, fee, implementationIdx, false)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var _deployStableNgMetaPool = function (basePool, name, symbol, coin, A, fee, // %
offpegFeeMultiplier, assetType, // 0 = Standard, 1 = Oracle, 2 = Rebasing, 3 = ERC4626
emaTime, // seconds
implementationIdx, methodName, oracleAddress, estimateGas) {
    if (emaTime === void 0) { emaTime = 600; }
    if (implementationIdx === void 0) { implementationIdx = 0; }
    if (methodName === void 0) { methodName = "0x00000000"; }
    if (oracleAddress === void 0) { oracleAddress = curve.constants.ZERO_ADDRESS; }
    return __awaiter(void 0, void 0, void 0, function () {
        var _A, _fee, _offpegFeeMultiplier, methodId, contract, gas, gasLimit;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (name.length > 32)
                        throw Error("Max name length = 32");
                    if (symbol.length > 10)
                        throw Error("Max symbol length = 10");
                    if (BN(fee).gt(1))
                        throw Error("fee must be <= 1%. Passed fee = ".concat(fee));
                    if (![0, 1].includes(implementationIdx))
                        throw Error("Invalid implementationIdx. Must be one 0 or 1");
                    _A = parseUnits(A, 0);
                    _fee = parseUnits(fee, 8);
                    _offpegFeeMultiplier = parseUnits(offpegFeeMultiplier, 10);
                    methodId = methodName === "0x00000000" ? "0x00000000" : ethers.id(methodName).substring(0, 10);
                    contract = curve.contracts[curve.constants.ALIASES.stable_ng_factory].contract;
                    return [4 /*yield*/, contract.deploy_metapool.estimateGas(basePool, name, symbol, coin, _A, _fee, _offpegFeeMultiplier, emaTime, implementationIdx, assetType, methodId, oracleAddress, curve.constantOptions)];
                case 1:
                    gas = _a.sent();
                    if (estimateGas)
                        return [2 /*return*/, smartNumber(gas)];
                    gasLimit = mulBy1_3(DIGas(gas));
                    return [4 /*yield*/, curve.updateFeeData()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, contract.deploy_metapool(basePool, name, symbol, coin, _A, _fee, _offpegFeeMultiplier, emaTime, implementationIdx, assetType, methodId, oracleAddress, __assign(__assign({}, curve.options), { gasLimit: gasLimit }))];
                case 3: return [2 /*return*/, _a.sent()];
            }
        });
    });
};
export var deployStableNgMetaPoolEstimateGas = function (basePool, name, symbol, coin, A, fee, // %
offpegFeeMultiplier, assetType, // 0 = Standard, 1 = Oracle, 2 = Rebasing, 3 = ERC4626
emaTime, // seconds
implementationIdx, methodName, oracleAddress) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, _deployStableNgMetaPool(basePool, name, symbol, coin, A, fee, offpegFeeMultiplier, assetType, emaTime, implementationIdx, methodName, oracleAddress, true)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
export var deployStableNgMetaPool = function (basePool, name, symbol, coin, A, fee, // %
offpegFeeMultiplier, emaTime, // seconds
implementationIdx, assetType, // 0 = Standard, 1 = Oracle, 2 = Rebasing, 3 = ERC4626
methodName, oracleAddress) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, _deployStableNgMetaPool(basePool, name, symbol, coin, A, fee, offpegFeeMultiplier, assetType, emaTime, implementationIdx, methodName, oracleAddress, false)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
export var getDeployedStableMetaPoolAddress = function (tx) { return __awaiter(void 0, void 0, void 0, function () {
    var txInfo, i, basePoolId, basePool;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, tx.wait()];
            case 1:
                txInfo = _a.sent();
                if (!txInfo)
                    throw Error("Can't get tx info");
                for (i = txInfo.logs.length - 1; i > -1; i--) {
                    if ("args" in txInfo.logs[i]) {
                        basePoolId = getPoolIdBySwapAddress(txInfo.logs[i].args[1]);
                        basePool = getPool(basePoolId);
                        return [2 /*return*/, txInfo.logs[basePool.underlyingCoins.length].address.toLowerCase()];
                    }
                }
                throw Error("Can't get deployed metapool address");
        }
    });
}); };
// ------- CRYPTO POOLS -------
var _deployCryptoPool = function (name, symbol, coins, A, gamma, midFee, // %
outFee, // %
allowedExtraProfit, feeGamma, adjustmentStep, maHalfTime, // Seconds
initialPrice, estimateGas) { return __awaiter(void 0, void 0, void 0, function () {
    var _A, _gamma, _midFee, _outFee, _allowedExtraProfit, _feeGamma, _adjustmentStep, _maHalfTime, _initialPrice, contract, gas, gasLimit;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (name.length > 32)
                    throw Error("Max name length = 32");
                if (symbol.length > 10)
                    throw Error("Max symbol length = 10");
                if (coins.length !== 2)
                    throw Error("Invalid number of coins. Must be 2");
                if (coins[0] === coins[1])
                    throw Error("Coins must be different");
                if (BN(A).lt(4000))
                    throw Error("A must be >= 4000. Passed A = ".concat(A));
                if (BN(A).gt(4 * (Math.pow(10, 9))))
                    throw Error("A must be <= 4 * 10 ** 9. Passed A = ".concat(A));
                if (BN(gamma).lt(1e-8))
                    throw Error("gamma must be >= 1e-8. Passed gamma = ".concat(gamma));
                if (BN(gamma).gt(0.02))
                    throw Error("gamma must be <= 0.02. Passed gamma = ".concat(gamma));
                if (BN(midFee).lt(0.005))
                    throw Error("midFee must be >= 0.005. Passed midFee = ".concat(midFee));
                if (BN(midFee).gt(100))
                    throw Error("midFee must be <= 100. Passed midFee = ".concat(midFee));
                if (BN(outFee).lt(BN(midFee)))
                    throw Error("outFee must be >= midFee. Passed outFee = ".concat(outFee, " < midFee = ").concat(midFee));
                if (BN(outFee).gt(100))
                    throw Error("outFee must be <= 100. Passed outFee = ".concat(outFee));
                if (BN(allowedExtraProfit).lt(0))
                    throw Error("allowedExtraProfit must be >= 0. Passed allowedExtraProfit = ".concat(allowedExtraProfit));
                if (BN(allowedExtraProfit).gt(0.01))
                    throw Error("allowedExtraProfit must be <= 0.01. Passed allowedExtraProfit = ".concat(allowedExtraProfit));
                if (BN(feeGamma).lt(0))
                    throw Error("feeGamma must be >= 0. Passed feeGamma = ".concat(feeGamma));
                if (BN(feeGamma).gt(1))
                    throw Error("feeGamma must be <= 1. Passed feeGamma = ".concat(feeGamma));
                if (BN(adjustmentStep).lt(0))
                    throw Error("adjustmentStep must be >= 0. Passed adjustmentStep=".concat(adjustmentStep));
                if (BN(adjustmentStep).gt(1))
                    throw Error("adjustmentStep must be <= 1. Passed adjustmentStep=".concat(adjustmentStep));
                if (BN(maHalfTime).lt(0))
                    throw Error("maHalfTime must be >= 0. Passed maHalfTime=".concat(maHalfTime));
                if (BN(maHalfTime).gt(604800))
                    throw Error("maHalfTime must be <= 604800. Passed maHalfTime=".concat(maHalfTime));
                if (BN(initialPrice).lt(1e-12))
                    throw Error("initialPrice must be >= 1e-12. Passed initialPrice=".concat(initialPrice));
                if (BN(initialPrice).gt(1e12))
                    throw Error("initialPrice must be <= 1e12. Passed initialPrice=".concat(initialPrice));
                _A = parseUnits(A, 0);
                _gamma = parseUnits(gamma);
                _midFee = parseUnits(midFee, 8);
                _outFee = parseUnits(outFee, 8);
                _allowedExtraProfit = parseUnits(allowedExtraProfit);
                _feeGamma = parseUnits(feeGamma);
                _adjustmentStep = parseUnits(adjustmentStep);
                _maHalfTime = parseUnits(maHalfTime, 0);
                _initialPrice = parseUnits(initialPrice);
                contract = curve.contracts[curve.constants.ALIASES.crypto_factory].contract;
                return [4 /*yield*/, contract.deploy_pool.estimateGas(name, symbol, coins, _A, _gamma, _midFee, _outFee, _allowedExtraProfit, _feeGamma, _adjustmentStep, 5000000000, _maHalfTime, _initialPrice, curve.constantOptions)];
            case 1:
                gas = _a.sent();
                if (estimateGas)
                    return [2 /*return*/, smartNumber(gas)];
                gasLimit = mulBy1_3(DIGas(gas));
                return [4 /*yield*/, curve.updateFeeData()];
            case 2:
                _a.sent();
                return [4 /*yield*/, contract.deploy_pool(name, symbol, coins, _A, _gamma, _midFee, _outFee, _allowedExtraProfit, _feeGamma, _adjustmentStep, 5000000000, // 50%
                    _maHalfTime, _initialPrice, __assign(__assign({}, curve.options), { gasLimit: gasLimit }))];
            case 3: return [2 /*return*/, _a.sent()];
        }
    });
}); };
export var deployCryptoPoolEstimateGas = function (name, symbol, coins, A, gamma, midFee, // %
outFee, // %
allowedExtraProfit, feeGamma, adjustmentStep, maHalfTime, // Seconds
initialPrice) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, _deployCryptoPool(name, symbol, coins, A, gamma, midFee, outFee, allowedExtraProfit, feeGamma, adjustmentStep, maHalfTime, initialPrice, true)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
export var deployCryptoPool = function (name, symbol, coins, A, gamma, midFee, // %
outFee, // %
allowedExtraProfit, feeGamma, adjustmentStep, maHalfTime, // Seconds
initialPrice) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, _deployCryptoPool(name, symbol, coins, A, gamma, midFee, outFee, allowedExtraProfit, feeGamma, adjustmentStep, maHalfTime, initialPrice, false)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
export var getDeployedCryptoPoolAddress = function (tx) { return __awaiter(void 0, void 0, void 0, function () {
    var txInfo, lpTokenAddress, contract;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, tx.wait()];
            case 1:
                txInfo = _a.sent();
                if (!txInfo)
                    throw Error("Can't get tx info");
                lpTokenAddress = txInfo.logs[0].address;
                contract = new Contract(lpTokenAddress, CurveLpTokenV5ABI, curve.provider);
                return [4 /*yield*/, contract.minter(curve.constantOptions)];
            case 2: return [2 /*return*/, (_a.sent()).toLowerCase()];
        }
    });
}); };
// ------- TWOCRYPTO POOLS -------
var _deployTwocryptoPool = function (name, symbol, coins, A, gamma, midFee, // %
outFee, // %
allowedExtraProfit, feeGamma, adjustmentStep, maHalfTime, // Seconds
initialPrice, estimateGas) { return __awaiter(void 0, void 0, void 0, function () {
    var MIN_GAMMA, MAX_GAMMA, _A, _gamma, _midFee, _outFee, _allowedExtraProfit, _feeGamma, _adjustmentStep, _maHalfTime, _initialPrice, contract, gas, gasLimit;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (name.length > 32)
                    throw Error("Max name length = 32");
                if (symbol.length > 10)
                    throw Error("Max symbol length = 10");
                if (coins.length !== 2)
                    throw Error("Invalid number of coins. Must be 2");
                if (coins[0] === coins[1])
                    throw Error("Coins must be different");
                if (BN(A).lt(4000))
                    throw Error("A must be >= 4000. Passed A = ".concat(A));
                if (BN(A).gt(4 * (Math.pow(10, 9))))
                    throw Error("A must be <= 4 * 10 ** 9. Passed A = ".concat(A));
                MIN_GAMMA = BN((Math.pow(10, 10)) / (Math.pow(10, 18)));
                MAX_GAMMA = BN(199 * (Math.pow(10, 15)) / (Math.pow(10, 18)));
                if (BN(gamma).lt(MIN_GAMMA))
                    throw Error("gamma must be >= ".concat(MIN_GAMMA, ". Passed gamma = ").concat(gamma));
                if (BN(gamma).gt(MAX_GAMMA))
                    throw Error("gamma must be <= ".concat(MAX_GAMMA, ". Passed gamma = ").concat(gamma));
                if (BN(midFee).lt(0.005))
                    throw Error("midFee must be >= 0.005. Passed midFee = ".concat(midFee));
                if (BN(midFee).gt(100))
                    throw Error("midFee must be <= 100. Passed midFee = ".concat(midFee));
                if (BN(outFee).lt(BN(midFee)))
                    throw Error("outFee must be >= midFee. Passed outFee = ".concat(outFee, " < midFee = ").concat(midFee));
                if (BN(outFee).gt(100))
                    throw Error("outFee must be <= 100. Passed outFee = ".concat(outFee));
                if (BN(allowedExtraProfit).lt(0))
                    throw Error("allowedExtraProfit must be >= 0. Passed allowedExtraProfit = ".concat(allowedExtraProfit));
                if (BN(allowedExtraProfit).gt(0.01))
                    throw Error("allowedExtraProfit must be <= 0.01. Passed allowedExtraProfit = ".concat(allowedExtraProfit));
                if (BN(feeGamma).lt(0))
                    throw Error("feeGamma must be >= 0. Passed feeGamma = ".concat(feeGamma));
                if (BN(feeGamma).gt(1))
                    throw Error("feeGamma must be <= 1. Passed feeGamma = ".concat(feeGamma));
                if (BN(adjustmentStep).lt(0))
                    throw Error("adjustmentStep must be >= 0. Passed adjustmentStep=".concat(adjustmentStep));
                if (BN(adjustmentStep).gt(1))
                    throw Error("adjustmentStep must be <= 1. Passed adjustmentStep=".concat(adjustmentStep));
                if (BN(maHalfTime).lt(0))
                    throw Error("maHalfTime must be >= 0. Passed maHalfTime=".concat(maHalfTime));
                if (BN(maHalfTime).gt(604800))
                    throw Error("maHalfTime must be <= 604800. Passed maHalfTime=".concat(maHalfTime));
                if (BN(initialPrice).lt(1e-12))
                    throw Error("initialPrice must be >= 1e-12. Passed initialPrice=".concat(initialPrice));
                if (BN(initialPrice).gt(1e12))
                    throw Error("initialPrice must be <= 1e12. Passed initialPrice=".concat(initialPrice));
                _A = parseUnits(A, 0);
                _gamma = parseUnits(gamma);
                _midFee = parseUnits(midFee, 8);
                _outFee = parseUnits(outFee, 8);
                _allowedExtraProfit = parseUnits(allowedExtraProfit);
                _feeGamma = parseUnits(feeGamma);
                _adjustmentStep = parseUnits(adjustmentStep);
                _maHalfTime = parseUnits(maHalfTime, 0);
                _initialPrice = parseUnits(initialPrice);
                contract = curve.contracts[curve.constants.ALIASES.twocrypto_factory].contract;
                return [4 /*yield*/, contract.deploy_pool.estimateGas(name, symbol, coins, 0, _A, _gamma, _midFee, _outFee, _feeGamma, _allowedExtraProfit, _adjustmentStep, _maHalfTime, _initialPrice, curve.constantOptions)];
            case 1:
                gas = _a.sent();
                if (estimateGas)
                    return [2 /*return*/, smartNumber(gas)];
                gasLimit = mulBy1_3(DIGas(gas));
                return [4 /*yield*/, curve.updateFeeData()];
            case 2:
                _a.sent();
                return [4 /*yield*/, contract.deploy_pool(name, symbol, coins, 0, _A, _gamma, _midFee, _outFee, _feeGamma, _allowedExtraProfit, _adjustmentStep, _maHalfTime, _initialPrice, __assign(__assign({}, curve.options), { gasLimit: gasLimit }))];
            case 3: return [2 /*return*/, _a.sent()];
        }
    });
}); };
export var deployTwocryptoPoolEstimateGas = function (name, symbol, coins, A, gamma, midFee, // %
outFee, // %
allowedExtraProfit, feeGamma, adjustmentStep, maHalfTime, // Seconds
initialPrice) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, _deployTwocryptoPool(name, symbol, coins, A, gamma, midFee, outFee, allowedExtraProfit, feeGamma, adjustmentStep, maHalfTime, initialPrice, true)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
export var deployTwocryptoPool = function (name, symbol, coins, A, gamma, midFee, // %
outFee, // %
allowedExtraProfit, feeGamma, adjustmentStep, maHalfTime, // Seconds
initialPrice) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, _deployTwocryptoPool(name, symbol, coins, A, gamma, midFee, outFee, allowedExtraProfit, feeGamma, adjustmentStep, maHalfTime, initialPrice, false)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
export var getDeployedTwocryptoPoolAddress = function (tx) { return __awaiter(void 0, void 0, void 0, function () {
    var txInfo, i;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, tx.wait()];
            case 1:
                txInfo = _a.sent();
                if (!txInfo)
                    throw Error("Can't get tx info");
                for (i = txInfo.logs.length - 1; i > -1; i--) {
                    if ("args" in txInfo.logs[i]) {
                        // @ts-ignore
                        return [2 /*return*/, txInfo.logs[i].args[0]];
                    }
                }
                throw Error("Can't get deployed tricrypto pool address");
        }
    });
}); };
// ------- TRICRYPTO POOLS -------
var _deployTricryptoPool = function (name, symbol, coins, A, gamma, midFee, // %
outFee, // %
allowedExtraProfit, feeGamma, adjustmentStep, emaTime, // Seconds
initialPrices, estimateGas) { return __awaiter(void 0, void 0, void 0, function () {
    var _A, _gamma, _midFee, _outFee, _allowedExtraProfit, _feeGamma, _adjustmentStep, _emaTime, _initialPrices, contract, gas, gasLimit;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (name.length > 64)
                    throw Error("Max name length = 64");
                if (symbol.length > 32)
                    throw Error("Max symbol length = 32");
                if (coins.length !== 3)
                    throw Error("Invalid number of coins. Must be 3");
                if (coins[0] === coins[1] || coins[1] === coins[2] || coins[0] === coins[2])
                    throw Error("Coins must be different");
                if (BN(A).lt(2700))
                    throw Error("A must be >= 2700. Passed A = ".concat(A));
                if (BN(A).gt(27 * (Math.pow(10, 7))))
                    throw Error("A must be <= 27 * 10 ** 7. Passed A = ".concat(A));
                if (BN(gamma).lt(1e-8))
                    throw Error("gamma must be >= 1e-8. Passed gamma = ".concat(gamma));
                if (BN(gamma).gt(0.05))
                    throw Error("gamma must be <= 0.05. Passed gamma = ".concat(gamma));
                if (BN(midFee).lt(0))
                    throw Error("midFee must be >= 0. Passed midFee = ".concat(midFee));
                if (BN(midFee).gt(100))
                    throw Error("midFee must be <= 100. Passed midFee = ".concat(midFee));
                if (BN(outFee).lt(BN(midFee)))
                    throw Error("outFee must be >= midFee. Passed outFee = ".concat(outFee, " < midFee = ").concat(midFee));
                if (BN(outFee).gt(100))
                    throw Error("outFee must be <= 100. Passed outFee = ".concat(outFee));
                if (BN(allowedExtraProfit).lt(0))
                    throw Error("allowedExtraProfit must be >= 0. Passed allowedExtraProfit = ".concat(allowedExtraProfit));
                if (BN(allowedExtraProfit).gt(1))
                    throw Error("allowedExtraProfit must be <= 1. Passed allowedExtraProfit = ".concat(allowedExtraProfit));
                if (BN(feeGamma).lt(0))
                    throw Error("feeGamma must be >= 0. Passed feeGamma = ".concat(feeGamma));
                if (BN(feeGamma).gt(1))
                    throw Error("feeGamma must be <= 1. Passed feeGamma = ".concat(feeGamma));
                if (BN(adjustmentStep).lt(0))
                    throw Error("adjustmentStep must be >= 0. Passed adjustmentStep=".concat(adjustmentStep));
                if (BN(adjustmentStep).gt(1))
                    throw Error("adjustmentStep must be <= 1. Passed adjustmentStep=".concat(adjustmentStep));
                if (BN(emaTime).lt(60))
                    throw Error("maHalfTime must be >= 60. Passed maHalfTime=".concat(emaTime));
                if (BN(emaTime).gt(604800))
                    throw Error("maHalfTime must be <= 604800. Passed maHalfTime=".concat(emaTime));
                if (initialPrices.length !== 2)
                    throw Error("Invalid number of initial prices. Must be 2");
                if (BN(initialPrices[0]).lt(1e-12))
                    throw Error("initialPrices[0] must be >= 1e-12. Passed initialPrices[0]=".concat(initialPrices[0]));
                if (BN(initialPrices[0]).gt(1e12))
                    throw Error("initialPrices[0] must be <= 1e12. Passed initialPrices[0]=".concat(initialPrices[0]));
                if (BN(initialPrices[1]).lt(1e-12))
                    throw Error("initialPrices[1] must be >= 1e-12. Passed initialPrices[1]=".concat(initialPrices[1]));
                if (BN(initialPrices[1]).gt(1e12))
                    throw Error("initialPrices[1] must be <= 1e12. Passed initialPrices[1]=".concat(initialPrices[1]));
                _A = parseUnits(A, 0);
                _gamma = parseUnits(gamma);
                _midFee = parseUnits(midFee, 8);
                _outFee = parseUnits(outFee, 8);
                _allowedExtraProfit = parseUnits(allowedExtraProfit);
                _feeGamma = parseUnits(feeGamma);
                _adjustmentStep = parseUnits(adjustmentStep);
                _emaTime = parseUnits(Math.floor(emaTime / Math.log(2)), 0);
                _initialPrices = [parseUnits(initialPrices[0]), parseUnits(initialPrices[1])];
                contract = curve.contracts[curve.constants.ALIASES.tricrypto_factory].contract;
                return [4 /*yield*/, contract.deploy_pool.estimateGas(name, symbol, coins, curve.constants.ZERO_ADDRESS, tricryptoDeployImplementations[curve.chainId].implementationIdx, _A, _gamma, _midFee, _outFee, _feeGamma, _allowedExtraProfit, _adjustmentStep, _emaTime, _initialPrices, curve.constantOptions)];
            case 1:
                gas = _a.sent();
                if (estimateGas)
                    return [2 /*return*/, smartNumber(gas)];
                gasLimit = mulBy1_3(DIGas(gas));
                return [4 /*yield*/, curve.updateFeeData()];
            case 2:
                _a.sent();
                return [4 /*yield*/, contract.deploy_pool(name, symbol, coins, curve.constants.NATIVE_TOKEN.wrappedAddress, tricryptoDeployImplementations[curve.chainId].implementationIdx, _A, _gamma, _midFee, _outFee, _feeGamma, _allowedExtraProfit, _adjustmentStep, _emaTime, _initialPrices, __assign(__assign({}, curve.options), { gasLimit: gasLimit }))];
            case 3: return [2 /*return*/, _a.sent()];
        }
    });
}); };
export var deployTricryptoPoolEstimateGas = function (name, symbol, coins, A, gamma, midFee, // %
outFee, // %
allowedExtraProfit, feeGamma, adjustmentStep, emaTime, // Seconds
initialPrices) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, _deployTricryptoPool(name, symbol, coins, A, gamma, midFee, outFee, allowedExtraProfit, feeGamma, adjustmentStep, emaTime, initialPrices, true)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
export var deployTricryptoPool = function (name, symbol, coins, A, gamma, midFee, // %
outFee, // %
allowedExtraProfit, feeGamma, adjustmentStep, emaTime, // Seconds
initialPrices) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, _deployTricryptoPool(name, symbol, coins, A, gamma, midFee, outFee, allowedExtraProfit, feeGamma, adjustmentStep, emaTime, initialPrices, false)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
export var getDeployedTricryptoPoolAddress = function (tx) { return __awaiter(void 0, void 0, void 0, function () {
    var txInfo, i;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, tx.wait()];
            case 1:
                txInfo = _a.sent();
                if (!txInfo)
                    throw Error("Can't get tx info");
                for (i = txInfo.logs.length - 1; i > -1; i--) {
                    if ("args" in txInfo.logs[i]) {
                        // @ts-ignore
                        return [2 /*return*/, txInfo.logs[i].args[0]];
                    }
                }
                throw Error("Can't get deployed tricrypto pool address");
        }
    });
}); };
// ------- GAUGE -------
var _deployGauge = function (pool, factory, estimateGas) { return __awaiter(void 0, void 0, void 0, function () {
    var contract, gas, gasLimit;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (curve.chainId !== 1)
                    throw Error("There is no deployGauge method on sidechain network");
                contract = curve.contracts[factory].contract;
                return [4 /*yield*/, contract.deploy_gauge.estimateGas(pool, curve.constantOptions)];
            case 1:
                gas = _a.sent();
                if (estimateGas)
                    return [2 /*return*/, smartNumber(gas)];
                gasLimit = mulBy1_3(DIGas(gas));
                return [4 /*yield*/, curve.updateFeeData()];
            case 2:
                _a.sent();
                return [4 /*yield*/, contract.deploy_gauge(pool, __assign(__assign({}, curve.options), { gasLimit: gasLimit }))];
            case 3: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var _deployGaugeSidechain = function (pool, salt, estimateGas) { return __awaiter(void 0, void 0, void 0, function () {
    var contract, _salt, gas, gasLimit;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (curve.chainId === 1)
                    throw Error("There is no deployGaugeSidechain method on ethereum network");
                contract = curve.contracts[curve.constants.ALIASES.gauge_factory].contract;
                _salt = ethers.encodeBytes32String(salt);
                return [4 /*yield*/, contract.deploy_gauge.estimateGas(pool, Typed.bytes32(_salt), curve.signerAddress, curve.constantOptions)];
            case 1:
                gas = _a.sent();
                if (estimateGas)
                    return [2 /*return*/, smartNumber(gas)];
                gasLimit = mulBy1_3(DIGas(gas));
                return [4 /*yield*/, curve.updateFeeData()];
            case 2:
                _a.sent();
                return [4 /*yield*/, contract.deploy_gauge(pool, Typed.bytes32(_salt), curve.signerAddress, __assign(__assign({}, curve.options), { gasLimit: gasLimit }))];
            case 3: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var _deployGaugeMirror = function (chainId, salt, estimateGas) { return __awaiter(void 0, void 0, void 0, function () {
    var contract, _salt, gas, gasLimit;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (curve.chainId !== 1)
                    throw Error("There is no deployGaugeMirror method on sidechain network");
                contract = chainId === 252 ? curve.contracts[curve.constants.ALIASES.gauge_factory_fraxtal].contract : curve.contracts[curve.constants.ALIASES.gauge_factory].contract;
                _salt = ethers.encodeBytes32String(salt);
                return [4 /*yield*/, contract.deploy_gauge.estimateGas(chainId, Typed.bytes32(_salt), curve.constantOptions)];
            case 1:
                gas = _a.sent();
                if (estimateGas)
                    return [2 /*return*/, smartNumber(gas)];
                gasLimit = mulBy1_3(DIGas(gas));
                return [4 /*yield*/, curve.updateFeeData()];
            case 2:
                _a.sent();
                return [4 /*yield*/, contract.deploy_gauge(chainId, Typed.bytes32(_salt), __assign(__assign({}, curve.options), { gasLimit: gasLimit }))];
            case 3: return [2 /*return*/, _a.sent()];
        }
    });
}); };
export var deployGaugeEstimateGas = function (pool, factory) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, _deployGauge(pool, factory, true)];
        case 1: return [2 /*return*/, _a.sent()];
    }
}); }); };
export var deployGauge = function (pool, factory) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, _deployGauge(pool, factory, false)];
        case 1: return [2 /*return*/, _a.sent()];
    }
}); }); };
export var deployGaugeSidechainEstimateGas = function (pool, salt) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, _deployGaugeSidechain(pool, salt, true)];
        case 1: return [2 /*return*/, _a.sent()];
    }
}); }); };
export var deployGaugeSidechain = function (pool, salt) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, _deployGaugeSidechain(pool, salt, false)];
        case 1: return [2 /*return*/, _a.sent()];
    }
}); }); };
export var deployGaugeMirrorEstimateGas = function (chainId, salt) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, _deployGaugeMirror(chainId, salt, true)];
        case 1: return [2 /*return*/, _a.sent()];
    }
}); }); };
export var deployGaugeMirror = function (chainId, salt) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, _deployGaugeMirror(chainId, salt, false)];
        case 1: return [2 /*return*/, _a.sent()];
    }
}); }); };
export var getDeployedGaugeAddress = function (tx) { return __awaiter(void 0, void 0, void 0, function () {
    var txInfo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, tx.wait()];
            case 1:
                txInfo = _a.sent();
                if (!txInfo)
                    throw Error("Can't get tx info");
                // @ts-ignore
                return [2 /*return*/, txInfo.logs[0].args[txInfo.logs[0].args.length - 1].toLowerCase()];
        }
    });
}); };
export var getDeployedGaugeMirrorAddressByTx = function (tx) { return __awaiter(void 0, void 0, void 0, function () {
    var txInfo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (curve.chainId !== 1)
                    throw Error("There is no getDeployedGaugeMirrorAddressByTx method on sidechain network");
                return [4 /*yield*/, tx.wait()];
            case 1:
                txInfo = _a.sent();
                if (!txInfo)
                    throw Error("Can't get tx info");
                // @ts-ignore
                return [2 /*return*/, txInfo.logs[1].args[txInfo.logs[1].args.length - 1].toLowerCase()];
        }
    });
}); };
export var getDeployedGaugeMirrorAddress = function (chainId) { return __awaiter(void 0, void 0, void 0, function () {
    var contract, gaugeCount, currentIndex;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (curve.chainId !== 1)
                    throw Error("There is no getDeployedGaugeMirrorAddress method on sidechain network");
                contract = curve.contracts[curve.constants.ALIASES.gauge_factory].contract;
                return [4 /*yield*/, contract.get_gauge_count(chainId)];
            case 1:
                gaugeCount = _a.sent();
                currentIndex = Number(gaugeCount) - 1;
                return [4 /*yield*/, contract.get_gauge(chainId, currentIndex)];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
