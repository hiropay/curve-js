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
import factoryGaugeABI from "../constants/abis/gauge_factory.json" assert { type: 'json' };
import gaugeChildABI from "../constants/abis/gauge_child.json" assert { type: 'json' };
import ERC20ABI from "../constants/abis/ERC20.json" assert { type: 'json' };
import cryptoFactorySwapABI from "../constants/abis/factory-crypto/factory-crypto-pool-2.json" assert { type: 'json' };
import twocryptoFactorySwapABI from "../constants/abis/factory-twocrypto/factory-twocrypto-pool.json" assert { type: 'json' };
import tricryptoFactorySwapABI from "../constants/abis/factory-tricrypto/factory-tricrypto-pool.json" assert { type: 'json' };
import tricryptoFactoryEthDisabledSwapABI from "../constants/abis/factory-tricrypto/factory-tricrypto-pool-eth-disabled.json" assert { type: 'json' };
import { FACTORY_CONSTANTS } from "./constants.js";
import { CRYPTO_FACTORY_CONSTANTS } from "./constants-crypto.js";
import { getPoolIdByAddress, setFactoryZapContracts } from "./common.js";
import { _getPoolsFromApi } from "../external-api.js";
import { assetTypeNameHandler, getPoolName, isStableNgPool } from "../utils.js";
import { tricryptoDeployImplementations } from "../constants/tricryptoDeployImplementations.js";
export var lowerCasePoolDataAddresses = function (poolsData) {
    var _a;
    for (var _i = 0, poolsData_1 = poolsData; _i < poolsData_1.length; _i++) {
        var poolData = poolsData_1[_i];
        poolData.address = poolData.address.toLowerCase();
        if (poolData.lpTokenAddress)
            poolData.lpTokenAddress = poolData.lpTokenAddress.toLowerCase();
        if (poolData.gaugeAddress)
            poolData.gaugeAddress = poolData.gaugeAddress.toLowerCase();
        if (poolData.implementationAddress)
            poolData.implementationAddress = poolData.implementationAddress.toLowerCase();
        for (var _b = 0, _c = poolData.coins; _b < _c.length; _b++) {
            var coin = _c[_b];
            coin.address = coin.address.toLowerCase();
        }
        for (var _d = 0, _e = (_a = poolData.gaugeRewards) !== null && _a !== void 0 ? _a : []; _d < _e.length; _d++) {
            var reward = _e[_d];
            reward.gaugeAddress = reward.gaugeAddress.toLowerCase();
            reward.tokenAddress = reward.tokenAddress.toLowerCase();
        }
    }
    return poolsData;
};
function setFactorySwapContracts(rawPoolList, factoryType) {
    var _this = this;
    if (factoryType === "factory-crypto") {
        rawPoolList.forEach(function (pool) {
            _this.setContract(pool.address, cryptoFactorySwapABI);
        });
    }
    else if (factoryType === "factory-twocrypto") {
        rawPoolList.forEach(function (pool) {
            _this.setContract(pool.address, twocryptoFactorySwapABI);
        });
    }
    else if (factoryType === "factory-tricrypto") {
        rawPoolList.forEach(function (pool) {
            if (pool.implementationAddress === tricryptoDeployImplementations[curve.chainId].amm_native_transfers_disabled) {
                _this.setContract(pool.address, tricryptoFactoryEthDisabledSwapABI);
            }
            else {
                _this.setContract(pool.address, tricryptoFactorySwapABI);
            }
        });
    }
    else {
        var implementationABIDict_1 = FACTORY_CONSTANTS[this.chainId].implementationABIDict;
        rawPoolList.forEach(function (pool) {
            _this.setContract(pool.address, implementationABIDict_1[pool.implementationAddress]);
        });
    }
}
function setCryptoFactoryTokenContracts(rawPoolList) {
    var _this = this;
    rawPoolList.forEach(function (pool) {
        _this.setContract(pool.lpTokenAddress, ERC20ABI);
    });
}
function setFactoryGaugeContracts(rawPoolList) {
    var _this = this;
    rawPoolList.forEach(function (pool) {
        if (pool.gaugeAddress) {
            _this.setContract(pool.gaugeAddress, _this.chainId === 1 ? factoryGaugeABI : gaugeChildABI);
        }
    });
}
function setFactoryCoinsContracts(rawPoolList) {
    for (var _i = 0, rawPoolList_1 = rawPoolList; _i < rawPoolList_1.length; _i++) {
        var pool = rawPoolList_1[_i];
        for (var _a = 0, _b = pool.coins; _a < _b.length; _a++) {
            var coin = _b[_a];
            if (coin.address in this.contracts)
                continue;
            this.setContract(coin.address, ERC20ABI);
        }
    }
}
var getSwapAbiByFactoryType = function (factoryType, pool) {
    var isETHDisabled = pool.implementationAddress === tricryptoDeployImplementations[curve.chainId].amm_native_transfers_disabled;
    var map = {
        "factory-crypto": cryptoFactorySwapABI,
        "factory-twocrypto": twocryptoFactorySwapABI,
        "facroty-tricrypto": isETHDisabled ? tricryptoFactoryEthDisabledSwapABI : tricryptoFactorySwapABI,
    };
    return map[factoryType];
};
export function getFactoryPoolsDataFromApi(factoryType) {
    return __awaiter(this, void 0, void 0, function () {
        var network, isCrypto, rawPoolList, _a, mainAddresses, FACTORY_POOLS_DATA;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    network = this.constants.NETWORK_NAME;
                    isCrypto = factoryType === "factory-crypto" || factoryType === "factory-twocrypto" || factoryType === "factory-tricrypto";
                    _a = lowerCasePoolDataAddresses;
                    return [4 /*yield*/, _getPoolsFromApi(network, factoryType)];
                case 1:
                    rawPoolList = _a.apply(void 0, [(_b.sent()).poolData]);
                    if (!isCrypto) {
                        rawPoolList = rawPoolList.filter(function (p) { return p.implementationAddress in FACTORY_CONSTANTS[_this.chainId].implementationABIDict; });
                    }
                    mainAddresses = Object.values(this.constants.POOLS_DATA).map(function (pool) { return pool.swap_address; });
                    rawPoolList = rawPoolList.filter(function (p) { return !mainAddresses.includes(p.address); });
                    setFactorySwapContracts.call(this, rawPoolList, factoryType);
                    if (factoryType === "factory-crypto")
                        setCryptoFactoryTokenContracts.call(this, rawPoolList);
                    setFactoryGaugeContracts.call(this, rawPoolList);
                    setFactoryCoinsContracts.call(this, rawPoolList);
                    setFactoryZapContracts.call(this, isCrypto);
                    FACTORY_POOLS_DATA = {};
                    rawPoolList.forEach(function (pool) {
                        var _a, _b, _c;
                        var nativeToken = _this.constants.NATIVE_TOKEN;
                        var coinAddresses = pool.coins.map(function (c) { return c.address; });
                        if (_this.chainId === 137) {
                            coinAddresses = coinAddresses.map(function (a) { return a === "0x0000000000000000000000000000000000001010" ? nativeToken.wrappedAddress : a; });
                        }
                        var coinNames = pool.coins.map(function (c) { return c.symbol; });
                        var coinDecimals = pool.coins.map(function (c) { return Number(c.decimals); });
                        if (isCrypto) {
                            var wrappedCoinNames = pool.coins.map(function (c) { return c.symbol === nativeToken.symbol ? nativeToken.wrappedSymbol : c.symbol; });
                            var underlyingCoinNames = pool.coins.map(function (c) {
                                if (factoryType === 'factory-twocrypto') {
                                    return c.symbol;
                                }
                                else if (factoryType === 'factory-tricrypto') {
                                    var isETHEnabled = pool.implementationAddress === tricryptoDeployImplementations[curve.chainId].amm_native_transfers_enabled;
                                    if (isETHEnabled) {
                                        return c.symbol === nativeToken.wrappedSymbol ? nativeToken.symbol : c.symbol;
                                    }
                                    else {
                                        return c.symbol;
                                    }
                                }
                                else {
                                    return c.symbol === nativeToken.wrappedSymbol ? nativeToken.symbol : c.symbol;
                                }
                            });
                            var underlyingCoinAddresses = coinAddresses.map(function (addr) {
                                if (factoryType === 'factory-twocrypto') {
                                    return addr;
                                }
                                else if (factoryType === 'factory-tricrypto') {
                                    var isETHEnabled = pool.implementationAddress === tricryptoDeployImplementations[curve.chainId].amm_native_transfers_enabled;
                                    if (isETHEnabled) {
                                        return addr === nativeToken.wrappedAddress ? nativeToken.address : addr;
                                    }
                                    else {
                                        return addr;
                                    }
                                }
                                else {
                                    return addr === nativeToken.wrappedAddress ? nativeToken.address : addr;
                                }
                            });
                            var isPlain = underlyingCoinNames.toString() === wrappedCoinNames.toString();
                            var lpTokenBasePoolIdDict = CRYPTO_FACTORY_CONSTANTS[_this.chainId].lpTokenBasePoolIdDict;
                            var basePoolIdZapDict = CRYPTO_FACTORY_CONSTANTS[_this.chainId].basePoolIdZapDict;
                            var basePoolId = lpTokenBasePoolIdDict[coinAddresses[1]];
                            if (factoryType !== "factory-tricrypto" && factoryType !== "factory-twocrypto" && basePoolId) { // isMeta
                                var allPoolsData = __assign(__assign({}, _this.constants.POOLS_DATA), FACTORY_POOLS_DATA);
                                var basePoolCoinNames = __spreadArray([], allPoolsData[basePoolId].underlying_coins, true);
                                var basePoolCoinAddresses = __spreadArray([], allPoolsData[basePoolId].underlying_coin_addresses, true);
                                var basePoolDecimals = __spreadArray([], allPoolsData[basePoolId].underlying_decimals, true);
                                var basePoolZap = basePoolIdZapDict[basePoolId];
                                _this.constants.BASE_POOLS[basePoolId] = _this.constants.BASE_POOLS[basePoolId] ? _this.constants.BASE_POOLS[basePoolId] + 1 : 1;
                                FACTORY_POOLS_DATA[pool.id] = {
                                    name: getPoolName(pool.name),
                                    full_name: pool.name,
                                    symbol: pool.symbol,
                                    reference_asset: "CRYPTO",
                                    swap_address: pool.address,
                                    token_address: pool.lpTokenAddress,
                                    gauge_address: pool.gaugeAddress ? pool.gaugeAddress : curve.constants.ZERO_ADDRESS,
                                    deposit_address: basePoolZap.address,
                                    is_meta: true,
                                    is_crypto: true,
                                    is_factory: true,
                                    base_pool: basePoolId,
                                    underlying_coins: __spreadArray([underlyingCoinNames[0]], basePoolCoinNames, true),
                                    wrapped_coins: wrappedCoinNames,
                                    underlying_coin_addresses: __spreadArray([underlyingCoinAddresses[0]], basePoolCoinAddresses, true),
                                    wrapped_coin_addresses: coinAddresses,
                                    underlying_decimals: __spreadArray([coinDecimals[0]], basePoolDecimals, true),
                                    wrapped_decimals: coinDecimals,
                                    swap_abi: cryptoFactorySwapABI,
                                    gauge_abi: _this.chainId === 1 ? factoryGaugeABI : gaugeChildABI,
                                    deposit_abi: basePoolZap.ABI,
                                    in_api: true,
                                    is_ng: false,
                                };
                            }
                            else {
                                FACTORY_POOLS_DATA[pool.id] = {
                                    name: factoryType === "factory-tricrypto" ? pool.name : getPoolName(pool.name),
                                    full_name: pool.name,
                                    symbol: pool.symbol,
                                    reference_asset: "CRYPTO",
                                    swap_address: pool.address,
                                    token_address: pool.lpTokenAddress,
                                    gauge_address: pool.gaugeAddress ? pool.gaugeAddress : curve.constants.ZERO_ADDRESS,
                                    is_crypto: true,
                                    is_plain: isPlain,
                                    is_factory: true,
                                    underlying_coins: underlyingCoinNames,
                                    wrapped_coins: wrappedCoinNames,
                                    underlying_coin_addresses: underlyingCoinAddresses,
                                    wrapped_coin_addresses: coinAddresses,
                                    underlying_decimals: coinDecimals,
                                    wrapped_decimals: coinDecimals,
                                    swap_abi: getSwapAbiByFactoryType(factoryType, pool),
                                    gauge_abi: _this.chainId === 1 ? factoryGaugeABI : gaugeChildABI,
                                    in_api: true,
                                    is_ng: factoryType === "factory-tricrypto" || factoryType === "factory-twocrypto",
                                };
                            }
                        }
                        else if (pool.isMetaPool) {
                            var implementationABIDict = FACTORY_CONSTANTS[_this.chainId].implementationABIDict;
                            var allPoolsData = __assign(__assign({}, _this.constants.POOLS_DATA), FACTORY_POOLS_DATA);
                            var basePoolId = getPoolIdByAddress(rawPoolList, pool.basePoolAddress);
                            _this.constants.BASE_POOLS[basePoolId] = _this.constants.BASE_POOLS[basePoolId] ? _this.constants.BASE_POOLS[basePoolId] + 1 : 1;
                            var basePoolCoinNames = (_a = allPoolsData[basePoolId]) === null || _a === void 0 ? void 0 : _a.underlying_coins;
                            var basePoolCoinAddresses = (_b = allPoolsData[basePoolId]) === null || _b === void 0 ? void 0 : _b.underlying_coin_addresses;
                            var basePoolDecimals = (_c = allPoolsData[basePoolId]) === null || _c === void 0 ? void 0 : _c.underlying_decimals;
                            var basePoolIdZapDict = FACTORY_CONSTANTS[_this.chainId].basePoolIdZapDict;
                            var basePoolZap = isStableNgPool(basePoolId) ? FACTORY_CONSTANTS[_this.chainId].stableNgBasePoolZap : basePoolIdZapDict[basePoolId];
                            if (isStableNgPool(basePoolId)) {
                                _this.setContract(FACTORY_CONSTANTS[_this.chainId].stableNgBasePoolZap.address, FACTORY_CONSTANTS[_this.chainId].stableNgBasePoolZap.ABI);
                            }
                            FACTORY_POOLS_DATA[pool.id] = {
                                name: getPoolName(pool.name),
                                full_name: pool.name,
                                symbol: pool.symbol,
                                reference_asset: assetTypeNameHandler(pool.assetTypeName),
                                swap_address: pool.address,
                                token_address: pool.address,
                                gauge_address: pool.gaugeAddress ? pool.gaugeAddress : curve.constants.ZERO_ADDRESS,
                                deposit_address: basePoolZap.address,
                                implementation_address: pool.implementationAddress,
                                is_meta: true,
                                is_factory: true,
                                base_pool: basePoolId,
                                underlying_coins: __spreadArray([coinNames[0]], basePoolCoinNames, true),
                                wrapped_coins: coinNames,
                                underlying_coin_addresses: __spreadArray([coinAddresses[0]], basePoolCoinAddresses, true),
                                wrapped_coin_addresses: coinAddresses,
                                underlying_decimals: __spreadArray([coinDecimals[0]], basePoolDecimals, true),
                                wrapped_decimals: coinDecimals,
                                swap_abi: implementationABIDict[pool.implementationAddress],
                                gauge_abi: _this.chainId === 1 ? factoryGaugeABI : gaugeChildABI,
                                deposit_abi: basePoolZap.ABI,
                                in_api: true,
                                is_ng: factoryType === 'factory-stable-ng',
                            };
                        }
                        else {
                            var implementationABIDict = FACTORY_CONSTANTS[_this.chainId].implementationABIDict;
                            FACTORY_POOLS_DATA[pool.id] = {
                                name: getPoolName(pool.name),
                                full_name: pool.name,
                                symbol: pool.symbol,
                                reference_asset: assetTypeNameHandler(pool.assetTypeName),
                                swap_address: pool.address,
                                token_address: pool.address,
                                gauge_address: pool.gaugeAddress ? pool.gaugeAddress : curve.constants.ZERO_ADDRESS,
                                implementation_address: pool.implementationAddress,
                                is_plain: true,
                                is_factory: true,
                                underlying_coins: coinNames,
                                wrapped_coins: coinNames,
                                underlying_coin_addresses: coinAddresses,
                                wrapped_coin_addresses: coinAddresses,
                                underlying_decimals: coinDecimals,
                                wrapped_decimals: coinDecimals,
                                swap_abi: implementationABIDict[pool.implementationAddress],
                                gauge_abi: _this.chainId === 1 ? factoryGaugeABI : gaugeChildABI,
                                in_api: true,
                                is_ng: factoryType === 'factory-stable-ng',
                            };
                        }
                    });
                    return [2 /*return*/, FACTORY_POOLS_DATA];
            }
        });
    });
}
