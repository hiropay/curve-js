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
import memoize from "memoizee";
import { _getAllGaugesFormatted, _getPoolsFromApi } from '../external-api.js';
import { _getCoinAddresses, _getBalances, _prepareAddresses, _ensureAllowance, _getUsdRate, hasAllowance, ensureAllowance, ensureAllowanceEstimateGas, BN, toBN, toStringFromBN, parseUnits, getEthIndex, fromBN, _cutZeros, _setContracts, _get_small_x, _get_price_impact, checkNumber, _getCrvApyFromApi, _getRewardsFromApi, mulBy1_3, smartNumber, DIGas, _getAddress, isMethodExist, getVolumeApiController, } from '../utils.js';
import { curve } from "../curve.js";
import ERC20Abi from '../constants/abis/ERC20.json' assert { type: 'json' };
import { GaugePool } from "./gaugePool.js";
var DAY = 86400;
var WEEK = 7 * DAY;
var MONTH = 30 * DAY;
var YEAR = 365 * DAY;
var PoolTemplate = /** @class */ (function () {
    function PoolTemplate(id) {
        var _this = this;
        var _c, _d;
        this.statsParameters = function () { return __awaiter(_this, void 0, void 0, function () {
            var multicallContract, lpMulticallContract, calls, i, additionalCalls, _virtualPrice, _fee, _prices, _adminFee, _A, _lpTokenSupply, _gamma, e_1, _c, virtualPrice, fee, adminFee, A, lpTokenSupply, gamma, priceOracle, priceScale, prices, i, A_PRECISION, _d, _future_A, _initial_A, _future_A_time, _initial_A_time, _e, future_A, initial_A, future_A_time, initial_A_time;
            var _f, _g, _h;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        multicallContract = curve.contracts[this.address].multicallContract;
                        lpMulticallContract = curve.contracts[this.lpToken].multicallContract;
                        calls = [
                            multicallContract.get_virtual_price(),
                            multicallContract.fee(),
                            "admin_fee" in multicallContract ? multicallContract.admin_fee() : multicallContract.ADMIN_FEE(),
                            multicallContract.A(),
                            lpMulticallContract.totalSupply(),
                        ];
                        if (this.isCrypto) {
                            calls.push(multicallContract.gamma());
                            if (this.wrappedCoins.length === 2) {
                                calls.push(multicallContract.price_oracle());
                                calls.push(multicallContract.price_scale());
                            }
                            else {
                                for (i = 0; i < this.wrappedCoins.length - 1; i++) {
                                    calls.push(multicallContract.price_oracle(i));
                                    calls.push(multicallContract.price_scale(i));
                                }
                            }
                        }
                        additionalCalls = this.isCrypto ? [] : [multicallContract.future_A()];
                        if ('initial_A' in multicallContract) {
                            additionalCalls.push(multicallContract.initial_A(), multicallContract.future_A_time(), multicallContract.initial_A_time());
                        }
                        _virtualPrice = curve.parseUnits("0");
                        _fee = curve.parseUnits("0");
                        _j.label = 1;
                    case 1:
                        _j.trys.push([1, 3, , 8]);
                        return [4 /*yield*/, curve.multicallProvider.all(calls)];
                    case 2:
                        _f = (_j.sent()), _virtualPrice = _f[0], _fee = _f[1], _adminFee = _f[2], _A = _f[3], _lpTokenSupply = _f[4], _gamma = _f[5], _prices = _f.slice(6);
                        return [3 /*break*/, 8];
                    case 3:
                        e_1 = _j.sent();
                        calls.shift();
                        if (!this.isCrypto) return [3 /*break*/, 5];
                        calls.shift();
                        return [4 /*yield*/, curve.multicallProvider.all(calls)];
                    case 4:
                        _g = (_j.sent()), _adminFee = _g[0], _A = _g[1], _lpTokenSupply = _g[2], _gamma = _g[3], _prices = _g.slice(4);
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, curve.multicallProvider.all(calls)];
                    case 6:
                        _h = (_j.sent()), _fee = _h[0], _adminFee = _h[1], _A = _h[2], _lpTokenSupply = _h[3], _gamma = _h[4], _prices = _h.slice(5);
                        _j.label = 7;
                    case 7: return [3 /*break*/, 8];
                    case 8:
                        _c = [
                            curve.formatUnits(_virtualPrice),
                            curve.formatUnits(_fee, 8),
                            curve.formatUnits(_adminFee * _fee),
                            curve.formatUnits(_A, 0),
                            curve.formatUnits(_lpTokenSupply),
                            _gamma ? curve.formatUnits(_gamma) : undefined,
                        ], virtualPrice = _c[0], fee = _c[1], adminFee = _c[2], A = _c[3], lpTokenSupply = _c[4], gamma = _c[5];
                        if (this.isCrypto) {
                            prices = _prices.map(function (_p) { return curve.formatUnits(_p); });
                            priceOracle = [];
                            priceScale = [];
                            for (i = 0; i < this.wrappedCoins.length - 1; i++) {
                                priceOracle.push(prices.shift());
                                priceScale.push(prices.shift());
                            }
                        }
                        A_PRECISION = curve.chainId === 1 && ['compound', 'usdt', 'y', 'busd', 'susd', 'pax', 'ren', 'sbtc', 'hbtc', '3pool'].includes(this.id) ? 1 : 100;
                        return [4 /*yield*/, curve.multicallProvider.all(additionalCalls)];
                    case 9:
                        _d = _j.sent(), _future_A = _d[0], _initial_A = _d[1], _future_A_time = _d[2], _initial_A_time = _d[3];
                        _e = [
                            _future_A ? String(Number(curve.formatUnits(_future_A, 0)) / A_PRECISION) : undefined,
                            _initial_A ? String(Number(curve.formatUnits(_initial_A, 0)) / A_PRECISION) : undefined,
                            _future_A_time ? Number(curve.formatUnits(_future_A_time, 0)) * 1000 : undefined,
                            _initial_A_time ? Number(curve.formatUnits(_initial_A_time, 0)) * 1000 : undefined,
                        ], future_A = _e[0], initial_A = _e[1], future_A_time = _e[2], initial_A_time = _e[3];
                        return [2 /*return*/, { lpTokenSupply: lpTokenSupply, virtualPrice: virtualPrice, fee: fee, adminFee: adminFee, A: A, future_A: future_A, initial_A: initial_A, future_A_time: future_A_time, initial_A_time: initial_A_time, gamma: gamma, priceOracle: priceOracle, priceScale: priceScale }];
                }
            });
        }); };
        this.statsTotalLiquidity = function (useApi) {
            if (useApi === void 0) { useApi = true; }
            return __awaiter(_this, void 0, void 0, function () {
                var stablecoinContract, collateralContract, ammContract, _c, _balance_x, _fee_x, _balance_y, _fee_y, collateralRate, stablecoinTvlBN, collateralTvlBN, network, poolType, poolsData, totalLiquidity_1, balances, promises, _i, _d, addr, prices, totalLiquidity;
                var _this = this;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            if (curve.chainId === 1 && this.id === "crveth")
                                return [2 /*return*/, "0"];
                            if (!this.isLlamma) return [3 /*break*/, 3];
                            stablecoinContract = curve.contracts[this.underlyingCoinAddresses[0]].multicallContract;
                            collateralContract = curve.contracts[this.underlyingCoinAddresses[1]].multicallContract;
                            ammContract = curve.contracts[this.address].multicallContract;
                            return [4 /*yield*/, curve.multicallProvider.all([
                                    stablecoinContract.balanceOf(this.address),
                                    ammContract.admin_fees_x(),
                                    collateralContract.balanceOf(this.address),
                                    ammContract.admin_fees_y(),
                                ])];
                        case 1:
                            _c = _e.sent(), _balance_x = _c[0], _fee_x = _c[1], _balance_y = _c[2], _fee_y = _c[3];
                            return [4 /*yield*/, _getUsdRate(this.underlyingCoinAddresses[1])];
                        case 2:
                            collateralRate = _e.sent();
                            stablecoinTvlBN = toBN(_balance_x).minus(toBN(_fee_x));
                            collateralTvlBN = toBN(_balance_y).minus(toBN(_fee_y)).times(collateralRate);
                            return [2 /*return*/, stablecoinTvlBN.plus(collateralTvlBN).toString()];
                        case 3:
                            if (!useApi) return [3 /*break*/, 5];
                            network = curve.constants.NETWORK_NAME;
                            poolType = this.isCrypto ? "crypto" : "main";
                            if (this.id.startsWith("factory")) {
                                poolType = this.id.replace(/-\d+$/, '');
                                poolType = poolType.replace(/-v2$/, '');
                            }
                            return [4 /*yield*/, _getPoolsFromApi(network, poolType)];
                        case 4:
                            poolsData = (_e.sent()).poolData;
                            try {
                                totalLiquidity_1 = poolsData.filter(function (data) { return data.address.toLowerCase() === _this.address.toLowerCase(); })[0].usdTotal;
                                return [2 /*return*/, String(totalLiquidity_1)];
                            }
                            catch (err) {
                                console.log(this.id, err.message);
                            }
                            _e.label = 5;
                        case 5: return [4 /*yield*/, this.statsUnderlyingBalances()];
                        case 6:
                            balances = _e.sent();
                            promises = [];
                            for (_i = 0, _d = this.underlyingCoinAddresses; _i < _d.length; _i++) {
                                addr = _d[_i];
                                promises.push(_getUsdRate(addr));
                            }
                            return [4 /*yield*/, Promise.all(promises)];
                        case 7:
                            prices = _e.sent();
                            totalLiquidity = balances.reduce(function (liquidity, b, i) { return liquidity + (Number(b) * prices[i]); }, 0);
                            return [2 /*return*/, totalLiquidity.toFixed(8)];
                    }
                });
            });
        };
        this.statsVolume = function () { return __awaiter(_this, void 0, void 0, function () {
            var network, poolsData, poolData;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        network = curve.constants.NETWORK_NAME;
                        return [4 /*yield*/, getVolumeApiController(network)];
                    case 1:
                        poolsData = (_c.sent()).poolsData;
                        poolData = poolsData.find(function (d) { return d.address.toLowerCase() === _this.address; });
                        if (poolData) {
                            return [2 /*return*/, poolData.volumeUSD.toString()];
                        }
                        throw Error("Can't get Volume for ".concat(this.name, " (id: ").concat(this.id, ")"));
                }
            });
        }); };
        this.statsBaseApy = function () { return __awaiter(_this, void 0, void 0, function () {
            var network, poolsData, poolData;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        network = curve.constants.NETWORK_NAME;
                        return [4 /*yield*/, getVolumeApiController(network)];
                    case 1:
                        poolsData = (_c.sent()).poolsData;
                        poolData = poolsData.find(function (d) { return d.address.toLowerCase() === _this.address; });
                        if (poolData) {
                            return [2 /*return*/, {
                                    day: poolData.day.toString(),
                                    week: poolData.week.toString(),
                                }];
                        }
                        throw Error("Can't get base APY for ".concat(this.name, " (id: ").concat(this.id, ")"));
                }
            });
        }); };
        this._calcTokenApy = function (futureWorkingSupplyBN) {
            if (futureWorkingSupplyBN === void 0) { futureWorkingSupplyBN = null; }
            return __awaiter(_this, void 0, void 0, function () {
                var totalLiquidityUSD, inflationRateBN, workingSupplyBN, totalSupplyBN, gaugeContract, lpTokenContract, crvContract, currentWeek, _c, gaugeContract, lpTokenContract, gaugeControllerContract, weightBN, rateBN, crvPrice, baseApyBN, boostedApyBN;
                var _d, _e;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0: return [4 /*yield*/, this.statsTotalLiquidity()];
                        case 1:
                            totalLiquidityUSD = _f.sent();
                            if (Number(totalLiquidityUSD) === 0)
                                return [2 /*return*/, [0, 0]];
                            if (!(curve.chainId !== 1)) return [3 /*break*/, 5];
                            gaugeContract = curve.contracts[this.gauge.address].multicallContract;
                            lpTokenContract = curve.contracts[this.lpToken].multicallContract;
                            crvContract = curve.contracts[curve.constants.ALIASES.crv].contract;
                            currentWeek = Math.floor(Date.now() / 1000 / WEEK);
                            return [4 /*yield*/, curve.multicallProvider.all([
                                    gaugeContract.inflation_rate(currentWeek),
                                    gaugeContract.working_supply(),
                                    lpTokenContract.totalSupply(),
                                ])];
                        case 2:
                            _d = (_f.sent()).map(function (value) { return toBN(value); }), inflationRateBN = _d[0], workingSupplyBN = _d[1], totalSupplyBN = _d[2];
                            if (!inflationRateBN.eq(0)) return [3 /*break*/, 4];
                            _c = toBN;
                            return [4 /*yield*/, crvContract.balanceOf(this.gauge.address, curve.constantOptions)];
                        case 3:
                            inflationRateBN = _c.apply(void 0, [_f.sent()]).div(WEEK);
                            _f.label = 4;
                        case 4: return [3 /*break*/, 7];
                        case 5:
                            gaugeContract = curve.contracts[this.gauge.address].multicallContract;
                            lpTokenContract = curve.contracts[this.lpToken].multicallContract;
                            gaugeControllerContract = curve.contracts[curve.constants.ALIASES.gauge_controller].multicallContract;
                            weightBN = void 0;
                            return [4 /*yield*/, curve.multicallProvider.all([
                                    gaugeContract.inflation_rate(),
                                    gaugeControllerContract.gauge_relative_weight(this.gauge.address),
                                    gaugeContract.working_supply(),
                                    lpTokenContract.totalSupply(),
                                ])];
                        case 6:
                            _e = (_f.sent()).map(function (value) { return toBN(value); }), inflationRateBN = _e[0], weightBN = _e[1], workingSupplyBN = _e[2], totalSupplyBN = _e[3];
                            inflationRateBN = inflationRateBN.times(weightBN);
                            _f.label = 7;
                        case 7:
                            if (inflationRateBN.eq(0))
                                return [2 /*return*/, [0, 0]];
                            if (futureWorkingSupplyBN !== null)
                                workingSupplyBN = futureWorkingSupplyBN;
                            rateBN = inflationRateBN.times(31536000).div(workingSupplyBN).times(totalSupplyBN).div(Number(totalLiquidityUSD)).times(0.4);
                            return [4 /*yield*/, _getUsdRate(curve.constants.ALIASES.crv)];
                        case 8:
                            crvPrice = _f.sent();
                            baseApyBN = rateBN.times(crvPrice);
                            boostedApyBN = baseApyBN.times(2.5);
                            return [2 /*return*/, [baseApyBN.times(100).toNumber(), boostedApyBN.times(100).toNumber()]];
                    }
                });
            });
        };
        this.statsTokenApy = function (useApi) {
            if (useApi === void 0) { useApi = true; }
            return __awaiter(_this, void 0, void 0, function () {
                var isDisabledChain, crvAPYs, poolCrvApy;
                var _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            if (this.rewardsOnly())
                                throw Error("".concat(this.name, " has Rewards-Only Gauge. Use stats.rewardsApy instead"));
                            isDisabledChain = [1313161554].includes(curve.chainId);
                            if (!(useApi && !isDisabledChain)) return [3 /*break*/, 2];
                            return [4 /*yield*/, _getCrvApyFromApi()];
                        case 1:
                            crvAPYs = _d.sent();
                            poolCrvApy = (_c = crvAPYs[this.gauge.address]) !== null && _c !== void 0 ? _c : [0, 0];
                            return [2 /*return*/, [poolCrvApy[0], poolCrvApy[1]]];
                        case 2: return [4 /*yield*/, this._calcTokenApy()];
                        case 3: return [2 /*return*/, _d.sent()];
                    }
                });
            });
        };
        this.statsRewardsApy = function (useApi) {
            if (useApi === void 0) { useApi = true; }
            return __awaiter(_this, void 0, void 0, function () {
                var isDisabledChain, rewards, apy, rewardTokens, _i, rewardTokens_1, rewardToken, gaugeContract, lpTokenContract, rewardContract, totalLiquidityUSD, rewardRate, _c, rewardData, _stakedSupply, _totalSupply, stakedSupplyBN, totalSupplyBN, inflationBN, periodFinish, baseApy;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            if (this.gauge.address === curve.constants.ZERO_ADDRESS)
                                return [2 /*return*/, []];
                            isDisabledChain = [1313161554].includes(curve.chainId);
                            if (!(useApi && !isDisabledChain)) return [3 /*break*/, 2];
                            return [4 /*yield*/, _getRewardsFromApi()];
                        case 1:
                            rewards = _d.sent();
                            if (!rewards[this.gauge.address])
                                return [2 /*return*/, []];
                            return [2 /*return*/, rewards[this.gauge.address].map(function (r) { return ({ gaugeAddress: r.gaugeAddress, tokenAddress: r.tokenAddress, symbol: r.symbol, apy: r.apy }); })];
                        case 2:
                            apy = [];
                            return [4 /*yield*/, this.rewardTokens(false)];
                        case 3:
                            rewardTokens = _d.sent();
                            _i = 0, rewardTokens_1 = rewardTokens;
                            _d.label = 4;
                        case 4:
                            if (!(_i < rewardTokens_1.length)) return [3 /*break*/, 9];
                            rewardToken = rewardTokens_1[_i];
                            gaugeContract = curve.contracts[this.gauge.address].multicallContract;
                            lpTokenContract = curve.contracts[this.lpToken].multicallContract;
                            rewardContract = curve.contracts[this.sRewardContract || this.gauge.address].multicallContract;
                            return [4 /*yield*/, this.statsTotalLiquidity()];
                        case 5:
                            totalLiquidityUSD = _d.sent();
                            return [4 /*yield*/, _getUsdRate(rewardToken.token)];
                        case 6:
                            rewardRate = _d.sent();
                            return [4 /*yield*/, curve.multicallProvider.all([
                                    rewardContract.reward_data(rewardToken.token),
                                    gaugeContract.totalSupply(),
                                    lpTokenContract.totalSupply(),
                                ])];
                        case 7:
                            _c = _d.sent(), rewardData = _c[0], _stakedSupply = _c[1], _totalSupply = _c[2];
                            stakedSupplyBN = toBN(_stakedSupply);
                            totalSupplyBN = toBN(_totalSupply);
                            inflationBN = toBN(rewardData.rate, rewardToken.decimals);
                            periodFinish = Number(curve.formatUnits(rewardData.period_finish, 0)) * 1000;
                            baseApy = periodFinish > Date.now() ?
                                inflationBN.times(31536000).times(rewardRate).div(stakedSupplyBN).times(totalSupplyBN).div(Number(totalLiquidityUSD)) :
                                BN(0);
                            apy.push({
                                gaugeAddress: this.gauge.address,
                                tokenAddress: rewardToken.token,
                                symbol: rewardToken.symbol,
                                apy: baseApy.times(100).toNumber(),
                            });
                            _d.label = 8;
                        case 8:
                            _i++;
                            return [3 /*break*/, 4];
                        case 9: return [2 /*return*/, apy];
                    }
                });
            });
        };
        this._calcLpTokenAmount = memoize(function (_amounts, isDeposit, useUnderlying) {
            if (isDeposit === void 0) { isDeposit = true; }
            if (useUnderlying === void 0) { useUnderlying = true; }
            return __awaiter(_this, void 0, void 0, function () {
                var e_2, lpContract, _lpTotalSupply, decimals_1, amounts, seedAmounts_1, contract, basePool, e_3, lpContract, _lpTotalSupply, decimals_2, amounts_1, seedAmounts_2, _amounts18Decimals;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (!this.isCrypto) return [3 /*break*/, 6];
                            _c.label = 1;
                        case 1:
                            _c.trys.push([1, 3, , 6]);
                            return [4 /*yield*/, this._pureCalcLpTokenAmount(_amounts, isDeposit, useUnderlying)];
                        case 2: return [2 /*return*/, _c.sent()];
                        case 3:
                            e_2 = _c.sent();
                            lpContract = curve.contracts[this.lpToken].contract;
                            return [4 /*yield*/, lpContract.totalSupply(curve.constantOptions)];
                        case 4:
                            _lpTotalSupply = _c.sent();
                            if (_lpTotalSupply > curve.parseUnits("0"))
                                throw e_2; // Already seeded
                            if (this.isMeta && useUnderlying)
                                throw Error("Initial deposit for crypto meta pools must be in wrapped coins");
                            decimals_1 = useUnderlying ? this.underlyingDecimals : this.wrappedDecimals;
                            amounts = _amounts.map(function (_a, i) { return curve.formatUnits(_a, decimals_1[i]); });
                            return [4 /*yield*/, this.cryptoSeedAmounts(amounts[0])];
                        case 5:
                            seedAmounts_1 = _c.sent();
                            amounts.forEach(function (a, i) {
                                if (!BN(a).eq(BN(seedAmounts_1[i])))
                                    throw Error("Amounts must be = ".concat(seedAmounts_1));
                            });
                            return [2 /*return*/, parseUnits(Math.pow(amounts.map(Number).reduce(function (a, b) { return a * b; }), 1 / amounts.length))];
                        case 6:
                            _c.trys.push([6, 13, , 15]);
                            contract = curve.contracts[curve.constants.ALIASES.stable_calc].contract;
                            if (!(curve.constants.ALIASES.stable_calc === curve.constants.ZERO_ADDRESS || this.id.startsWith("factory-stable-ng"))) return [3 /*break*/, 8];
                            return [4 /*yield*/, this._pureCalcLpTokenAmount(_amounts, isDeposit, useUnderlying)];
                        case 7: return [2 /*return*/, _c.sent()];
                        case 8:
                            if (!this.isMeta) return [3 /*break*/, 10];
                            basePool = new PoolTemplate(this.basePool);
                            return [4 /*yield*/, contract.calc_token_amount_meta(this.address, this.lpToken, _amounts.concat(Array(10 - _amounts.length).fill(curve.parseUnits("0"))), _amounts.length, basePool.address, basePool.lpToken, isDeposit, useUnderlying)];
                        case 9: return [2 /*return*/, _c.sent()];
                        case 10: return [4 /*yield*/, contract.calc_token_amount(this.address, this.lpToken, _amounts.concat(Array(10 - _amounts.length).fill(curve.parseUnits("0"))), _amounts.length, isDeposit, useUnderlying && this.isLending)];
                        case 11: return [2 /*return*/, _c.sent()];
                        case 12: return [3 /*break*/, 15];
                        case 13:
                            e_3 = _c.sent();
                            if (!isDeposit)
                                throw e_3; // Seeding is only for deposit
                            lpContract = curve.contracts[this.lpToken].contract;
                            return [4 /*yield*/, lpContract.totalSupply(curve.constantOptions)];
                        case 14:
                            _lpTotalSupply = _c.sent();
                            if (_lpTotalSupply > curve.parseUnits("0"))
                                throw e_3; // Already seeded
                            decimals_2 = useUnderlying ? this.underlyingDecimals : this.wrappedDecimals;
                            amounts_1 = _amounts.map(function (_a, i) { return curve.formatUnits(_a, decimals_2[i]); });
                            if (this.isMeta && useUnderlying) {
                                seedAmounts_2 = this.metaUnderlyingSeedAmounts(amounts_1[0]);
                                amounts_1.forEach(function (a, i) {
                                    if (!BN(a).eq(BN(seedAmounts_2[i])))
                                        throw Error("Amounts must be = ".concat(seedAmounts_2));
                                });
                            }
                            else {
                                if (_amounts[0] <= curve.parseUnits("0"))
                                    throw Error("Initial deposit amounts must be > 0");
                                amounts_1.forEach(function (a) {
                                    if (a !== amounts_1[0])
                                        throw Error("Initial deposit amounts must be equal");
                                });
                            }
                            _amounts18Decimals = amounts_1.map(function (a) { return parseUnits(a); });
                            return [2 /*return*/, _amounts18Decimals.reduce(function (_a, _b) { return _a + _b; })];
                        case 15: return [2 /*return*/];
                    }
                });
            });
        }, {
            primitive: true,
            promise: true,
            maxAge: 30 * 1000,
            length: 3,
        });
        // ---------------- CRV PROFIT, CLAIM, BOOSTING ----------------
        this.crvProfit = function (address) {
            if (address === void 0) { address = ""; }
            return __awaiter(_this, void 0, void 0, function () {
                var inflationRateBN, workingSupplyBN, workingBalanceBN, gaugeContract, crvContract, currentWeek, _c, gaugeContract, gaugeControllerContract, weightBN, crvPrice, dailyIncome, weeklyIncome, monthlyIncome, annualIncome;
                var _d, _e;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            if (this.rewardsOnly())
                                throw Error("".concat(this.name, " has Rewards-Only Gauge. Use rewardsProfit instead"));
                            address = address || curve.signerAddress;
                            if (!address)
                                throw Error("Need to connect wallet or pass address into args");
                            if (!(curve.chainId !== 1)) return [3 /*break*/, 4];
                            gaugeContract = curve.contracts[this.gauge.address].multicallContract;
                            crvContract = curve.contracts[curve.constants.ALIASES.crv].contract;
                            currentWeek = Math.floor(Date.now() / 1000 / WEEK);
                            return [4 /*yield*/, curve.multicallProvider.all([
                                    gaugeContract.inflation_rate(currentWeek),
                                    gaugeContract.working_balances(address),
                                    gaugeContract.working_supply(),
                                ])];
                        case 1:
                            _d = (_f.sent()).map(function (value) { return toBN(value); }), inflationRateBN = _d[0], workingBalanceBN = _d[1], workingSupplyBN = _d[2];
                            if (!inflationRateBN.eq(0)) return [3 /*break*/, 3];
                            _c = toBN;
                            return [4 /*yield*/, crvContract.balanceOf(this.gauge.address, curve.constantOptions)];
                        case 2:
                            inflationRateBN = _c.apply(void 0, [_f.sent()]).div(WEEK);
                            _f.label = 3;
                        case 3: return [3 /*break*/, 6];
                        case 4:
                            gaugeContract = curve.contracts[this.gauge.address].multicallContract;
                            gaugeControllerContract = curve.contracts[curve.constants.ALIASES.gauge_controller].multicallContract;
                            weightBN = void 0;
                            return [4 /*yield*/, curve.multicallProvider.all([
                                    gaugeContract.inflation_rate(),
                                    gaugeControllerContract.gauge_relative_weight(this.gauge.address),
                                    gaugeContract.working_balances(address),
                                    gaugeContract.working_supply(),
                                ])];
                        case 5:
                            _e = (_f.sent()).map(function (value) { return toBN(value); }), inflationRateBN = _e[0], weightBN = _e[1], workingBalanceBN = _e[2], workingSupplyBN = _e[3];
                            inflationRateBN = inflationRateBN.times(weightBN);
                            _f.label = 6;
                        case 6: return [4 /*yield*/, _getUsdRate('CRV')];
                        case 7:
                            crvPrice = _f.sent();
                            if (workingSupplyBN.eq(0))
                                return [2 /*return*/, {
                                        day: "0.0",
                                        week: "0.0",
                                        month: "0.0",
                                        year: "0.0",
                                        token: curve.constants.ALIASES.crv,
                                        symbol: 'CRV',
                                        price: crvPrice,
                                    }];
                            dailyIncome = inflationRateBN.times(DAY).times(workingBalanceBN).div(workingSupplyBN);
                            weeklyIncome = inflationRateBN.times(WEEK).times(workingBalanceBN).div(workingSupplyBN);
                            monthlyIncome = inflationRateBN.times(MONTH).times(workingBalanceBN).div(workingSupplyBN);
                            annualIncome = inflationRateBN.times(YEAR).times(workingBalanceBN).div(workingSupplyBN);
                            return [2 /*return*/, {
                                    day: dailyIncome.toString(),
                                    week: weeklyIncome.toString(),
                                    month: monthlyIncome.toString(),
                                    year: annualIncome.toString(),
                                    token: curve.constants.ALIASES.crv,
                                    symbol: 'CRV',
                                    price: crvPrice,
                                }];
                    }
                });
            });
        };
        this.userBoost = function (address) {
            if (address === void 0) { address = ""; }
            return __awaiter(_this, void 0, void 0, function () {
                var gaugeContract, _c, workingBalanceBN, balanceBN, boostBN;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            if (this.gauge.address === curve.constants.ZERO_ADDRESS)
                                throw Error("".concat(this.name, " doesn't have gauge"));
                            if (this.rewardsOnly())
                                throw Error("".concat(this.name, " has Rewards-Only Gauge. Use stats.rewardsApy instead"));
                            address = _getAddress(address);
                            gaugeContract = curve.contracts[this.gauge.address].multicallContract;
                            return [4 /*yield*/, curve.multicallProvider.all([
                                    gaugeContract.working_balances(address),
                                    gaugeContract.balanceOf(address),
                                ])];
                        case 1:
                            _c = (_d.sent()).map(function (value) { return toBN(value); }), workingBalanceBN = _c[0], balanceBN = _c[1];
                            boostBN = workingBalanceBN.div(0.4).div(balanceBN);
                            if (boostBN.lt(1))
                                return [2 /*return*/, '1.0'];
                            if (boostBN.gt(2.5))
                                return [2 /*return*/, '2.5'];
                            return [2 /*return*/, boostBN.toFixed(4).replace(/([0-9])0+$/, '$1')];
                    }
                });
            });
        };
        this._userFutureBoostAndWorkingSupply = function (address) { return __awaiter(_this, void 0, void 0, function () {
            var veContractMulticall, gaugeContractMulticall, calls, _c, _votingBalance, _votingTotal, _gaugeBalance, _gaugeTotal, _workingBalance, _workingSupply, _futureWorkingBalance, _futureWorkingSupply, futureWorkingBalanceBN, balanceBN, boostBN;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        veContractMulticall = curve.contracts[curve.constants.ALIASES.voting_escrow].multicallContract;
                        gaugeContractMulticall = curve.contracts[this.gauge.address].multicallContract;
                        calls = [
                            veContractMulticall.balanceOf(address),
                            veContractMulticall.totalSupply(),
                            gaugeContractMulticall.balanceOf(address),
                            gaugeContractMulticall.totalSupply(),
                            gaugeContractMulticall.working_balances(address),
                            gaugeContractMulticall.working_supply(),
                        ];
                        return [4 /*yield*/, curve.multicallProvider.all(calls)];
                    case 1:
                        _c = _d.sent(), _votingBalance = _c[0], _votingTotal = _c[1], _gaugeBalance = _c[2], _gaugeTotal = _c[3], _workingBalance = _c[4], _workingSupply = _c[5];
                        _futureWorkingBalance = _gaugeBalance * BigInt(40) / BigInt(100);
                        if (_votingTotal > BigInt(0)) {
                            _futureWorkingBalance += _gaugeTotal * _votingBalance / _votingTotal * BigInt(60) / BigInt(100);
                        }
                        if (_futureWorkingBalance > _gaugeBalance)
                            _futureWorkingBalance = _gaugeBalance;
                        _futureWorkingSupply = _workingSupply - _workingBalance + _futureWorkingBalance;
                        futureWorkingBalanceBN = toBN(_futureWorkingBalance);
                        balanceBN = toBN(_gaugeBalance);
                        boostBN = futureWorkingBalanceBN.div(0.4).div(balanceBN);
                        return [2 /*return*/, [boostBN, toBN(_futureWorkingSupply)]];
                }
            });
        }); };
        this.userFutureBoost = function (address) {
            if (address === void 0) { address = ""; }
            return __awaiter(_this, void 0, void 0, function () {
                var boostBN;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (this.rewardsOnly())
                                throw Error("".concat(this.name, " has Rewards-Only Gauge. Use stats.rewardsApy instead"));
                            address = _getAddress(address);
                            return [4 /*yield*/, this._userFutureBoostAndWorkingSupply(address)];
                        case 1:
                            boostBN = (_c.sent())[0];
                            if (boostBN.lt(1))
                                return [2 /*return*/, '1.0'];
                            if (boostBN.gt(2.5))
                                return [2 /*return*/, '2.5'];
                            return [2 /*return*/, boostBN.toFixed(4).replace(/([0-9])0+$/, '$1')];
                    }
                });
            });
        };
        this.userCrvApy = function (address) {
            if (address === void 0) { address = ""; }
            return __awaiter(_this, void 0, void 0, function () {
                var _c, minApy, maxApy, boost;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            if (this.rewardsOnly())
                                throw Error("".concat(this.name, " has Rewards-Only Gauge. Use stats.rewardsApy instead"));
                            address = _getAddress(address);
                            return [4 /*yield*/, this.statsTokenApy()];
                        case 1:
                            _c = _d.sent(), minApy = _c[0], maxApy = _c[1];
                            return [4 /*yield*/, this.userBoost(address)];
                        case 2:
                            boost = _d.sent();
                            if (boost == "2.5")
                                return [2 /*return*/, maxApy];
                            if (boost === "NaN")
                                return [2 /*return*/, NaN];
                            return [2 /*return*/, BN(minApy).times(BN(boost)).toNumber()];
                    }
                });
            });
        };
        this.userFutureCrvApy = function (address) {
            if (address === void 0) { address = ""; }
            return __awaiter(_this, void 0, void 0, function () {
                var _c, boostBN, futureWorkingSupplyBN, _d, minApy, maxApy;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            if (this.rewardsOnly())
                                throw Error("".concat(this.name, " has Rewards-Only Gauge. Use stats.rewardsApy instead"));
                            address = _getAddress(address);
                            return [4 /*yield*/, this._userFutureBoostAndWorkingSupply(address)];
                        case 1:
                            _c = _e.sent(), boostBN = _c[0], futureWorkingSupplyBN = _c[1];
                            return [4 /*yield*/, this._calcTokenApy(futureWorkingSupplyBN)];
                        case 2:
                            _d = _e.sent(), minApy = _d[0], maxApy = _d[1];
                            if (boostBN.lt(1))
                                return [2 /*return*/, minApy];
                            if (boostBN.gt(2.5))
                                return [2 /*return*/, maxApy];
                            return [2 /*return*/, BN(minApy).times(boostBN).toNumber()];
                    }
                });
            });
        };
        this.maxBoostedStake = function () {
            var addresses = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                addresses[_i] = arguments[_i];
            }
            return __awaiter(_this, void 0, void 0, function () {
                var votingEscrowContract, gaugeContract, contractCalls, _response, responseBN, _c, veTotalSupplyBN, gaugeTotalSupplyBN, resultBN, result, _d, _e, entry;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            if (this.gauge.address === curve.constants.ZERO_ADDRESS)
                                throw Error("".concat(this.name, " doesn't have gauge"));
                            if (addresses.length == 1 && Array.isArray(addresses[0]))
                                addresses = addresses[0];
                            if (addresses.length === 0 && curve.signerAddress !== '')
                                addresses = [curve.signerAddress];
                            if (addresses.length === 0)
                                throw Error("Need to connect wallet or pass addresses into args");
                            votingEscrowContract = curve.contracts[curve.constants.ALIASES.voting_escrow].multicallContract;
                            gaugeContract = curve.contracts[this.gauge.address].multicallContract;
                            contractCalls = [votingEscrowContract.totalSupply(), gaugeContract.totalSupply()];
                            addresses.forEach(function (account) {
                                contractCalls.push(votingEscrowContract.balanceOf(account));
                            });
                            return [4 /*yield*/, curve.multicallProvider.all(contractCalls)];
                        case 1:
                            _response = _f.sent();
                            responseBN = _response.map(function (value) { return toBN(value); });
                            _c = responseBN.splice(0, 2), veTotalSupplyBN = _c[0], gaugeTotalSupplyBN = _c[1];
                            resultBN = {};
                            addresses.forEach(function (acct, i) {
                                resultBN[acct] = responseBN[i].div(veTotalSupplyBN).times(gaugeTotalSupplyBN);
                            });
                            result = {};
                            for (_d = 0, _e = Object.entries(resultBN); _d < _e.length; _d++) {
                                entry = _e[_d];
                                result[entry[0]] = toStringFromBN(entry[1]);
                            }
                            return [2 /*return*/, addresses.length === 1 ? result[addresses[0]] : result];
                    }
                });
            });
        };
        // ---------------- REWARDS PROFIT, CLAIM ----------------
        this.rewardTokens = memoize(function (useApi) {
            if (useApi === void 0) { useApi = true; }
            return __awaiter(_this, void 0, void 0, function () {
                var rewards, gaugeContract, gaugeMulticallContract, rewardCount, _c, _d, _e, tokenCalls, i, tokens, tokenInfoCalls, _i, tokens_1, token, tokenMulticallContract, tokenInfo_1, i, rewardContract, method, token, tokenMulticallContract, res, symbol, decimals;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            if (this.gauge.address === curve.constants.ZERO_ADDRESS)
                                return [2 /*return*/, []];
                            if (!useApi) return [3 /*break*/, 2];
                            return [4 /*yield*/, _getRewardsFromApi()];
                        case 1:
                            rewards = _f.sent();
                            if (!rewards[this.gauge.address])
                                return [2 /*return*/, []];
                            rewards[this.gauge.address].forEach(function (r) { return _setContracts(r.tokenAddress, ERC20Abi); });
                            return [2 /*return*/, rewards[this.gauge.address].map(function (r) { return ({ token: r.tokenAddress, symbol: r.symbol, decimals: Number(r.decimals) }); })];
                        case 2:
                            gaugeContract = curve.contracts[this.gauge.address].contract;
                            gaugeMulticallContract = curve.contracts[this.gauge.address].multicallContract;
                            if (!("reward_tokens(uint256)" in gaugeContract)) return [3 /*break*/, 7];
                            rewardCount = 8;
                            if (!("reward_count()" in gaugeContract)) return [3 /*break*/, 4];
                            _c = Number;
                            _e = (_d = curve).formatUnits;
                            return [4 /*yield*/, gaugeContract.reward_count(curve.constantOptions)];
                        case 3:
                            rewardCount = _c.apply(void 0, [_e.apply(_d, [_f.sent(), 0])]);
                            _f.label = 4;
                        case 4:
                            tokenCalls = [];
                            for (i = 0; i < rewardCount; i++) {
                                tokenCalls.push(gaugeMulticallContract.reward_tokens(i));
                            }
                            return [4 /*yield*/, curve.multicallProvider.all(tokenCalls)];
                        case 5:
                            tokens = (_f.sent())
                                .filter(function (addr) { return addr !== curve.constants.ZERO_ADDRESS; })
                                .map(function (addr) { return addr.toLowerCase(); })
                                .filter(function (addr) { return curve.chainId === 1 || addr !== curve.constants.COINS.crv; });
                            tokenInfoCalls = [];
                            for (_i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
                                token = tokens_1[_i];
                                _setContracts(token, ERC20Abi);
                                tokenMulticallContract = curve.contracts[token].multicallContract;
                                tokenInfoCalls.push(tokenMulticallContract.symbol(), tokenMulticallContract.decimals());
                            }
                            return [4 /*yield*/, curve.multicallProvider.all(tokenInfoCalls)];
                        case 6:
                            tokenInfo_1 = _f.sent();
                            for (i = 0; i < tokens.length; i++) {
                                curve.constants.DECIMALS[tokens[i]] = tokenInfo_1[(i * 2) + 1];
                            }
                            return [2 /*return*/, tokens.map(function (token, i) { return ({ token: token, symbol: tokenInfo_1[i * 2], decimals: tokenInfo_1[(i * 2) + 1] }); })];
                        case 7:
                            if (!('claimable_reward(address)' in gaugeContract)) return [3 /*break*/, 10];
                            rewardContract = curve.contracts[this.sRewardContract].contract;
                            method = "snx()" in rewardContract ? "snx" : "rewardsToken" // susd, tbtc : dusd, musd, rsv, sbtc
                            ;
                            return [4 /*yield*/, rewardContract[method](curve.constantOptions)];
                        case 8:
                            token = (_f.sent()).toLowerCase();
                            _setContracts(token, ERC20Abi);
                            tokenMulticallContract = curve.contracts[token].multicallContract;
                            return [4 /*yield*/, curve.multicallProvider.all([
                                    tokenMulticallContract.symbol(),
                                    tokenMulticallContract.decimals(),
                                ])];
                        case 9:
                            res = _f.sent();
                            symbol = res[0];
                            decimals = res[1];
                            return [2 /*return*/, [{ token: token, symbol: symbol, decimals: decimals }]];
                        case 10: return [2 /*return*/, []]; // gauge
                    }
                });
            });
        }, {
            promise: true,
            maxAge: 30 * 60 * 1000, // 30m
        });
        this.rewardsProfit = function (address) {
            if (address === void 0) { address = ""; }
            return __awaiter(_this, void 0, void 0, function () {
                var rewardTokens, gaugeContract, result, calls, _i, rewardTokens_2, rewardToken, res, balanceBN, totalSupplyBN, _c, rewardTokens_3, rewardToken, _rewardData, periodFinish, inflationRateBN, tokenPrice, rewardToken, sRewardContract, _d, _inflationRate, _periodFinish, _balance, _totalSupply, periodFinish, inflationRateBN, balanceBN, totalSupplyBN, tokenPrice, _e, rewardTokens_4, rewardToken, tokenPrice;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            if (this.gauge.address === curve.constants.ZERO_ADDRESS)
                                throw Error("".concat(this.name, " doesn't have gauge"));
                            address = address || curve.signerAddress;
                            if (!address)
                                throw Error("Need to connect wallet or pass address into args");
                            return [4 /*yield*/, this.rewardTokens()];
                        case 1:
                            rewardTokens = _f.sent();
                            gaugeContract = curve.contracts[this.gauge.address].multicallContract;
                            result = [];
                            if (!('reward_data(address)' in curve.contracts[this.gauge.address].contract)) return [3 /*break*/, 7];
                            calls = [gaugeContract.balanceOf(address), gaugeContract.totalSupply()];
                            for (_i = 0, rewardTokens_2 = rewardTokens; _i < rewardTokens_2.length; _i++) {
                                rewardToken = rewardTokens_2[_i];
                                calls.push(gaugeContract.reward_data(rewardToken.token));
                            }
                            return [4 /*yield*/, curve.multicallProvider.all(calls)];
                        case 2:
                            res = _f.sent();
                            balanceBN = toBN(res.shift());
                            totalSupplyBN = toBN(res.shift());
                            _c = 0, rewardTokens_3 = rewardTokens;
                            _f.label = 3;
                        case 3:
                            if (!(_c < rewardTokens_3.length)) return [3 /*break*/, 6];
                            rewardToken = rewardTokens_3[_c];
                            _rewardData = res.shift();
                            periodFinish = Number(curve.formatUnits(_rewardData.period_finish, 0)) * 1000;
                            inflationRateBN = periodFinish > Date.now() ? toBN(_rewardData.rate, rewardToken.decimals) : BN(0);
                            return [4 /*yield*/, _getUsdRate(rewardToken.token)];
                        case 4:
                            tokenPrice = _f.sent();
                            result.push({
                                day: inflationRateBN.times(DAY).times(balanceBN).div(totalSupplyBN).toString(),
                                week: inflationRateBN.times(WEEK).times(balanceBN).div(totalSupplyBN).toString(),
                                month: inflationRateBN.times(MONTH).times(balanceBN).div(totalSupplyBN).toString(),
                                year: inflationRateBN.times(YEAR).times(balanceBN).div(totalSupplyBN).toString(),
                                token: rewardToken.token,
                                symbol: rewardToken.symbol,
                                price: tokenPrice,
                            });
                            _f.label = 5;
                        case 5:
                            _c++;
                            return [3 /*break*/, 3];
                        case 6: return [3 /*break*/, 14];
                        case 7:
                            if (!(this.sRewardContract && "rewardRate()" in curve.contracts[this.sRewardContract].contract && "periodFinish()" && rewardTokens.length === 1)) return [3 /*break*/, 10];
                            rewardToken = rewardTokens[0];
                            sRewardContract = curve.contracts[this.sRewardContract].multicallContract;
                            return [4 /*yield*/, curve.multicallProvider.all([
                                    sRewardContract.rewardRate(),
                                    sRewardContract.periodFinish(),
                                    gaugeContract.balanceOf(address),
                                    gaugeContract.totalSupply(),
                                ])];
                        case 8:
                            _d = _f.sent(), _inflationRate = _d[0], _periodFinish = _d[1], _balance = _d[2], _totalSupply = _d[3];
                            periodFinish = Number(_periodFinish) * 1000;
                            inflationRateBN = periodFinish > Date.now() ? toBN(_inflationRate, rewardToken.decimals) : BN(0);
                            balanceBN = toBN(_balance);
                            totalSupplyBN = toBN(_totalSupply);
                            return [4 /*yield*/, _getUsdRate(rewardToken.token)];
                        case 9:
                            tokenPrice = _f.sent();
                            result.push({
                                day: inflationRateBN.times(DAY).times(balanceBN).div(totalSupplyBN).toString(),
                                week: inflationRateBN.times(WEEK).times(balanceBN).div(totalSupplyBN).toString(),
                                month: inflationRateBN.times(MONTH).times(balanceBN).div(totalSupplyBN).toString(),
                                year: inflationRateBN.times(YEAR).times(balanceBN).div(totalSupplyBN).toString(),
                                token: rewardToken.token,
                                symbol: rewardToken.symbol,
                                price: tokenPrice,
                            });
                            return [3 /*break*/, 14];
                        case 10:
                            if (!['aave', 'saave', 'ankreth'].includes(this.id)) return [3 /*break*/, 14];
                            _e = 0, rewardTokens_4 = rewardTokens;
                            _f.label = 11;
                        case 11:
                            if (!(_e < rewardTokens_4.length)) return [3 /*break*/, 14];
                            rewardToken = rewardTokens_4[_e];
                            return [4 /*yield*/, _getUsdRate(rewardToken.token)];
                        case 12:
                            tokenPrice = _f.sent();
                            result.push({
                                day: "0",
                                week: "0",
                                month: "0",
                                year: "0",
                                token: rewardToken.token,
                                symbol: rewardToken.symbol,
                                price: tokenPrice,
                            });
                            _f.label = 13;
                        case 13:
                            _e++;
                            return [3 /*break*/, 11];
                        case 14: return [2 /*return*/, result];
                    }
                });
            });
        };
        // ---------------- ... ----------------
        this.gaugeOptimalDeposits = function () {
            var accounts = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                accounts[_i] = arguments[_i];
            }
            return __awaiter(_this, void 0, void 0, function () {
                var votingEscrowContract, lpTokenContract, gaugeContract, contractCalls, _response, response, _c, veTotalSupply, gaugeTotalSupply, votingPower, totalBalance, _d, accounts_1, acct, totalPower, optimalBN, _e, accounts_2, acct, amount, _f, accounts_3, acct, optimal, _g, _h, entry;
                return __generator(this, function (_j) {
                    switch (_j.label) {
                        case 0:
                            if (this.gauge.address === curve.constants.ZERO_ADDRESS)
                                throw Error("".concat(this.name, " doesn't have gauge"));
                            if (accounts.length == 1 && Array.isArray(accounts[0]))
                                accounts = accounts[0];
                            votingEscrowContract = curve.contracts[curve.constants.ALIASES.voting_escrow].multicallContract;
                            lpTokenContract = curve.contracts[this.lpToken].multicallContract;
                            gaugeContract = curve.contracts[this.gauge.address].multicallContract;
                            contractCalls = [votingEscrowContract.totalSupply(), gaugeContract.totalSupply()];
                            accounts.forEach(function (account) {
                                contractCalls.push(votingEscrowContract.balanceOf(account), lpTokenContract.balanceOf(account), gaugeContract.balanceOf(account));
                            });
                            return [4 /*yield*/, curve.multicallProvider.all(contractCalls)];
                        case 1:
                            _response = _j.sent();
                            response = _response.map(function (value) { return toBN(value); });
                            _c = response.splice(0, 2), veTotalSupply = _c[0], gaugeTotalSupply = _c[1];
                            votingPower = {};
                            totalBalance = BN(0);
                            for (_d = 0, accounts_1 = accounts; _d < accounts_1.length; _d++) {
                                acct = accounts_1[_d];
                                votingPower[acct] = response[0];
                                totalBalance = totalBalance.plus(response[1]).plus(response[2]);
                                response.splice(0, 3);
                            }
                            totalPower = Object.values(votingPower).reduce(function (sum, item) { return sum.plus(item); });
                            optimalBN = Object.fromEntries(accounts.map(function (acc) { return [acc, BN(0)]; }));
                            if (totalBalance.lt(gaugeTotalSupply.times(totalPower).div(veTotalSupply))) {
                                for (_e = 0, accounts_2 = accounts; _e < accounts_2.length; _e++) {
                                    acct = accounts_2[_e];
                                    amount = gaugeTotalSupply.times(votingPower[acct]).div(veTotalSupply).lt(totalBalance) ?
                                        gaugeTotalSupply.times(votingPower[acct]).div(veTotalSupply) : totalBalance;
                                    optimalBN[acct] = amount;
                                    totalBalance = totalBalance.minus(amount);
                                    if (totalBalance.lte(0)) {
                                        break;
                                    }
                                }
                            }
                            else {
                                if (totalPower.lt(0)) {
                                    for (_f = 0, accounts_3 = accounts; _f < accounts_3.length; _f++) {
                                        acct = accounts_3[_f];
                                        optimalBN[acct] = totalBalance.times(votingPower[acct]).div(totalPower);
                                    }
                                }
                                optimalBN[accounts[0]] = optimalBN[accounts[0]].plus(totalBalance.minus(Object.values(optimalBN).reduce(function (sum, item) { return sum.plus(item); })));
                            }
                            optimal = {};
                            for (_g = 0, _h = Object.entries(optimalBN); _g < _h.length; _g++) {
                                entry = _h[_g];
                                optimal[entry[0]] = toStringFromBN(entry[1]);
                            }
                            return [2 /*return*/, optimal];
                    }
                });
            });
        };
        this._getCoinIdx = function (coin, useUnderlying) {
            if (useUnderlying === void 0) { useUnderlying = true; }
            if (typeof coin === 'number') {
                var coins_N = useUnderlying ? _this.underlyingCoins.length : _this.wrappedCoins.length;
                var idx_1 = coin;
                if (!Number.isInteger(idx_1)) {
                    throw Error('Index must be integer');
                }
                if (idx_1 < 0) {
                    throw Error('Index must be >= 0');
                }
                if (idx_1 > coins_N - 1) {
                    throw Error("Index must be < ".concat(coins_N));
                }
                return idx_1;
            }
            var coinAddress = _getCoinAddresses(coin)[0];
            var lowerCaseCoinAddresses = useUnderlying ?
                _this.underlyingCoinAddresses.map(function (c) { return c.toLowerCase(); }) :
                _this.wrappedCoinAddresses.map(function (c) { return c.toLowerCase(); });
            var idx = lowerCaseCoinAddresses.indexOf(coinAddress.toLowerCase());
            if (idx === -1) {
                throw Error("There is no ".concat(coin, " among ").concat(_this.name, " pool ").concat(useUnderlying ? 'underlying' : 'wrapped', " coins"));
            }
            return idx;
        };
        // Used by mixins
        this._getRates = function () { return __awaiter(_this, void 0, void 0, function () {
            var _rates, i, addr, _c, _d, _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        _rates = [];
                        i = 0;
                        _g.label = 1;
                    case 1:
                        if (!(i < this.wrappedCoinAddresses.length)) return [3 /*break*/, 9];
                        addr = this.wrappedCoinAddresses[i];
                        if (!this.useLending[i]) return [3 /*break*/, 7];
                        if (!['compound', 'usdt', 'ib'].includes(this.id)) return [3 /*break*/, 3];
                        _d = (_c = _rates).push;
                        return [4 /*yield*/, curve.contracts[addr].contract.exchangeRateStored()];
                    case 2:
                        _d.apply(_c, [_g.sent()]);
                        return [3 /*break*/, 6];
                    case 3:
                        if (!['y', 'busd', 'pax'].includes(this.id)) return [3 /*break*/, 5];
                        _f = (_e = _rates).push;
                        return [4 /*yield*/, curve.contracts[addr].contract.getPricePerFullShare()];
                    case 4:
                        _f.apply(_e, [_g.sent()]);
                        return [3 /*break*/, 6];
                    case 5:
                        _rates.push(curve.parseUnits(String(Math.pow(10, 18)), 0)); // Aave ratio 1:1
                        _g.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        _rates.push(curve.parseUnits(String(Math.pow(10, 18)), 0));
                        _g.label = 8;
                    case 8:
                        i++;
                        return [3 /*break*/, 1];
                    case 9: return [2 /*return*/, _rates];
                }
            });
        }); };
        this._balances = function (rawCoinNames, rawCoinAddresses) {
            var addresses = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                addresses[_i - 2] = arguments[_i];
            }
            return __awaiter(_this, void 0, void 0, function () {
                var coinNames, coinAddresses, i, rawBalances, balances, _c, addresses_1, address, _d, coinNames_1, coinName;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            coinNames = [];
                            coinAddresses = [];
                            // removing duplicates
                            for (i = 0; i < rawCoinAddresses.length; i++) {
                                if (!coinAddresses.includes(rawCoinAddresses[i])) {
                                    coinNames.push(rawCoinNames[i]);
                                    coinAddresses.push(rawCoinAddresses[i]);
                                }
                            }
                            addresses = _prepareAddresses(addresses);
                            return [4 /*yield*/, _getBalances(coinAddresses, addresses)];
                        case 1:
                            rawBalances = _e.sent();
                            balances = {};
                            for (_c = 0, addresses_1 = addresses; _c < addresses_1.length; _c++) {
                                address = addresses_1[_c];
                                balances[address] = {};
                                for (_d = 0, coinNames_1 = coinNames; _d < coinNames_1.length; _d++) {
                                    coinName = coinNames_1[_d];
                                    balances[address][coinName] = rawBalances[address].shift();
                                }
                            }
                            return [2 /*return*/, addresses.length === 1 ? balances[addresses[0]] : balances];
                    }
                });
            });
        };
        this._stored_rates = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, curve.contracts[this.address].contract.stored_rates()];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        }); };
        this._underlyingPrices = function () { return __awaiter(_this, void 0, void 0, function () {
            var promises, _i, _c, addr;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        promises = [];
                        for (_i = 0, _c = this.underlyingCoinAddresses; _i < _c.length; _i++) {
                            addr = _c[_i];
                            promises.push(_getUsdRate(addr));
                        }
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1: return [2 /*return*/, _d.sent()];
                }
            });
        }); };
        // NOTE! It may crash!
        this._wrappedPrices = function () { return __awaiter(_this, void 0, void 0, function () {
            var promises, _i, _c, addr;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        promises = [];
                        for (_i = 0, _c = this.wrappedCoinAddresses; _i < _c.length; _i++) {
                            addr = _c[_i];
                            promises.push(_getUsdRate(addr));
                        }
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1: return [2 /*return*/, _d.sent()];
                }
            });
        }); };
        var poolData = curve.getPoolsData()[id];
        this.id = id;
        this.name = poolData.name;
        this.fullName = poolData.full_name;
        this.symbol = poolData.symbol;
        this.referenceAsset = poolData.reference_asset;
        this.address = poolData.swap_address;
        this.lpToken = poolData.token_address;
        this.gauge = new GaugePool(poolData.gauge_address, poolData.name);
        this.zap = poolData.deposit_address || null;
        this.sRewardContract = poolData.sCurveRewards_address || null;
        this.rewardContract = poolData.reward_contract || null;
        this.implementation = poolData.implementation_address || null;
        this.isPlain = poolData.is_plain || false;
        this.isLending = poolData.is_lending || false;
        this.isMeta = poolData.is_meta || false;
        this.isCrypto = poolData.is_crypto || false;
        this.isFake = poolData.is_fake || false;
        this.isFactory = poolData.is_factory || false;
        this.isMetaFactory = (this.isMeta && this.isFactory) || this.zap === '0xa79828df1850e8a3a3064576f380d90aecdd3359';
        this.isNg = poolData.is_ng || false;
        this.isLlamma = poolData.is_llamma || false;
        this.basePool = poolData.base_pool || '';
        this.metaCoinIdx = this.isMeta ? (_c = poolData.meta_coin_idx) !== null && _c !== void 0 ? _c : poolData.wrapped_coins.length - 1 : -1;
        this.underlyingCoins = poolData.underlying_coins;
        this.wrappedCoins = poolData.wrapped_coins;
        this.underlyingCoinAddresses = poolData.underlying_coin_addresses;
        this.wrappedCoinAddresses = poolData.wrapped_coin_addresses;
        this.underlyingDecimals = poolData.underlying_decimals;
        this.wrappedDecimals = poolData.wrapped_decimals;
        this.useLending = poolData.use_lending || poolData.underlying_coin_addresses.map(function () { return false; });
        this.inApi = (_d = poolData.in_api) !== null && _d !== void 0 ? _d : false;
        this.isGaugeKilled = this.getIsGaugeKilled.bind(this);
        this.gaugeStatus = this.getGaugeStatus.bind(this);
        this.estimateGas = {
            depositApprove: this.depositApproveEstimateGas.bind(this),
            deposit: this.depositEstimateGas.bind(this),
            depositWrappedApprove: this.depositWrappedApproveEstimateGas.bind(this),
            depositWrapped: this.depositWrappedEstimateGas.bind(this),
            stakeApprove: this.stakeApproveEstimateGas.bind(this),
            stake: this.stakeEstimateGas.bind(this),
            unstake: this.unstakeEstimateGas.bind(this),
            claimCrv: this.claimCrvEstimateGas.bind(this),
            claimRewards: this.claimRewardsEstimateGas.bind(this),
            depositAndStakeApprove: this.depositAndStakeApproveEstimateGas.bind(this),
            depositAndStake: this.depositAndStakeEstimateGas.bind(this),
            depositAndStakeWrappedApprove: this.depositAndStakeWrappedApproveEstimateGas.bind(this),
            depositAndStakeWrapped: this.depositAndStakeWrappedEstimateGas.bind(this),
            withdrawApprove: this.withdrawApproveEstimateGas.bind(this),
            withdraw: this.withdrawEstimateGas.bind(this),
            withdrawWrapped: this.withdrawWrappedEstimateGas.bind(this),
            withdrawImbalanceApprove: this.withdrawImbalanceApproveEstimateGas.bind(this),
            withdrawImbalance: this.withdrawImbalanceEstimateGas.bind(this),
            withdrawImbalanceWrapped: this.withdrawImbalanceWrappedEstimateGas.bind(this),
            withdrawOneCoinApprove: this.withdrawOneCoinApproveEstimateGas.bind(this),
            withdrawOneCoin: this.withdrawOneCoinEstimateGas.bind(this),
            withdrawOneCoinWrapped: this.withdrawOneCoinWrappedEstimateGas.bind(this),
            swapApprove: this.swapApproveEstimateGas.bind(this),
            swap: this.swapEstimateGas.bind(this),
            swapWrappedApprove: this.swapWrappedApproveEstimateGas.bind(this),
            swapWrapped: this.swapWrappedEstimateGas.bind(this),
        };
        this.stats = {
            parameters: this.statsParameters.bind(this),
            underlyingBalances: this.statsUnderlyingBalances.bind(this),
            wrappedBalances: this.statsWrappedBalances.bind(this),
            totalLiquidity: this.statsTotalLiquidity.bind(this),
            volume: this.statsVolume.bind(this),
            baseApy: this.statsBaseApy.bind(this),
            tokenApy: this.statsTokenApy.bind(this),
            rewardsApy: this.statsRewardsApy.bind(this),
        };
        this.wallet = {
            balances: this.walletBalances.bind(this),
            lpTokenBalances: this.walletLpTokenBalances.bind(this),
            underlyingCoinBalances: this.walletUnderlyingCoinBalances.bind(this),
            wrappedCoinBalances: this.walletWrappedCoinBalances.bind(this),
            allCoinBalances: this.walletAllCoinBalances.bind(this),
        };
    }
    PoolTemplate.prototype.hasVyperVulnerability = function () {
        var _c, _d;
        if (curve.chainId === 1 && this.id === "crveth")
            return true;
        if (curve.chainId === 42161 && this.id === "tricrypto")
            return true;
        // @ts-ignore
        var vulnerable_implementations = (_c = {
            1: [
                "0x6326DEbBAa15bCFE603d831e7D75f4fc10d9B43E",
                "0x8c1aB78601c259E1B43F19816923609dC7d7de9B",
                "0x88855cdF2b0A8413D470B86952E726684de915be",
            ].map(function (a) { return a.toLowerCase(); }),
            137: [
                "0xAe00f57663F4C85FC948B13963cd4627dAF01061",
                "0xA9134FaE98F92217f457918505375Ae91fdc5e3c",
                "0xf31bcdf0B9a5eCD7AB463eB905551fBc32e51856",
            ].map(function (a) { return a.toLowerCase(); }),
            250: [
                "0xE6358f6a45B502477e83CC1CDa759f540E4459ee",
                "0x5d58Eb45e97B43e471AF05cD2b11CeB4106E1b1a",
                "0xb11Dc44A9f981fAF1669dca6DD40c3cc2554A2ce",
            ].map(function (a) { return a.toLowerCase(); }),
            42161: [
                "0x7DA64233Fefb352f8F501B357c018158ED8aA455",
                "0xAAe75FAebCae43b9d541Fd875622BE48D9B4f5D0",
                "0x89287c32c2CAC1C76227F6d300B2DBbab6b75C08",
            ].map(function (a) { return a.toLowerCase(); }),
            43114: [
                "0x64448B78561690B70E17CBE8029a3e5c1bB7136e",
                "0xF1f85a74AD6c64315F85af52d3d46bF715236ADc",
                "0x0eb0F1FaF5F509Ac53fA224477509EAD167cf410",
            ].map(function (a) { return a.toLowerCase(); }),
        }[curve.chainId]) !== null && _c !== void 0 ? _c : [];
        return vulnerable_implementations.includes((_d = this.implementation) !== null && _d !== void 0 ? _d : "");
    };
    PoolTemplate.prototype.rewardsOnly = function () {
        if (curve.chainId === 2222 || curve.chainId === 324)
            return true; // TODO remove this for Kava and ZkSync
        if (this.gauge.address === curve.constants.ZERO_ADDRESS)
            throw Error("".concat(this.name, " doesn't have gauge"));
        var gaugeContract = curve.contracts[this.gauge.address].contract;
        return !('inflation_rate()' in gaugeContract || 'inflation_rate(uint256)' in gaugeContract);
    };
    PoolTemplate.prototype.statsWrappedBalances = function () {
        return __awaiter(this, void 0, void 0, function () {
            var contract, calls, i, _wrappedBalances;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        contract = curve.contracts[this.address].multicallContract;
                        calls = [];
                        for (i = 0; i < this.wrappedCoins.length; i++)
                            calls.push(contract.balances(i));
                        return [4 /*yield*/, curve.multicallProvider.all(calls)];
                    case 1:
                        _wrappedBalances = _c.sent();
                        return [2 /*return*/, _wrappedBalances.map(function (_b, i) { return curve.formatUnits(_b, _this.wrappedDecimals[i]); })];
                }
            });
        });
    };
    // OVERRIDE
    PoolTemplate.prototype.statsUnderlyingBalances = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.statsWrappedBalances()];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    PoolTemplate.prototype._pureCalcLpTokenAmount = function (_amounts, isDeposit, useUnderlying) {
        if (isDeposit === void 0) { isDeposit = true; }
        if (useUnderlying === void 0) { useUnderlying = true; }
        return __awaiter(this, void 0, void 0, function () {
            var calcContractAddress, N_coins, contract;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        calcContractAddress = this.isMeta && useUnderlying ? this.zap : this.address;
                        N_coins = useUnderlying ? this.underlyingCoins.length : this.wrappedCoins.length;
                        contract = curve.contracts[calcContractAddress].contract;
                        if (!(this.isMetaFactory && useUnderlying)) return [3 /*break*/, 4];
                        if (!("calc_token_amount(address,uint256[".concat(N_coins, "],bool)") in contract)) return [3 /*break*/, 2];
                        return [4 /*yield*/, contract.calc_token_amount(this.address, _amounts, isDeposit, curve.constantOptions)];
                    case 1: return [2 /*return*/, _c.sent()];
                    case 2: return [4 /*yield*/, contract.calc_token_amount(this.address, _amounts, curve.constantOptions)];
                    case 3: return [2 /*return*/, _c.sent()];
                    case 4:
                        if (!("calc_token_amount(uint256[".concat(N_coins, "],bool)") in contract)) return [3 /*break*/, 6];
                        return [4 /*yield*/, contract.calc_token_amount(_amounts, isDeposit, curve.constantOptions)];
                    case 5: return [2 /*return*/, _c.sent()];
                    case 6: return [4 /*yield*/, contract.calc_token_amount(_amounts, curve.constantOptions)];
                    case 7: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    PoolTemplate.prototype.calcLpTokenAmount = function (amounts, isDeposit) {
        if (isDeposit === void 0) { isDeposit = true; }
        return __awaiter(this, void 0, void 0, function () {
            var _underlyingAmounts, _expected;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (amounts.length !== this.underlyingCoinAddresses.length) {
                            throw Error("".concat(this.name, " pool has ").concat(this.underlyingCoinAddresses.length, " coins (amounts provided for ").concat(amounts.length, ")"));
                        }
                        _underlyingAmounts = amounts.map(function (amount, i) { return parseUnits(amount, _this.underlyingDecimals[i]); });
                        return [4 /*yield*/, this._calcLpTokenAmount(_underlyingAmounts, isDeposit, true)];
                    case 1:
                        _expected = _c.sent();
                        return [2 /*return*/, curve.formatUnits(_expected)];
                }
            });
        });
    };
    PoolTemplate.prototype.calcLpTokenAmountWrapped = function (amounts, isDeposit) {
        if (isDeposit === void 0) { isDeposit = true; }
        return __awaiter(this, void 0, void 0, function () {
            var _amounts, _expected;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (amounts.length !== this.wrappedCoinAddresses.length) {
                            throw Error("".concat(this.name, " pool has ").concat(this.wrappedCoinAddresses.length, " coins (amounts provided for ").concat(amounts.length, ")"));
                        }
                        if (this.isFake) {
                            throw Error("".concat(this.name, " pool doesn't have this method"));
                        }
                        _amounts = amounts.map(function (amount, i) { return parseUnits(amount, _this.wrappedDecimals[i]); });
                        return [4 /*yield*/, this._calcLpTokenAmount(_amounts, isDeposit, false)];
                    case 1:
                        _expected = _c.sent();
                        return [2 /*return*/, curve.formatUnits(_expected)];
                }
            });
        });
    };
    // ---------------- DEPOSIT ----------------
    PoolTemplate.prototype.metaUnderlyingSeedAmounts = function (amount1) {
        if (this.isCrypto)
            throw Error("Use cryptoSeedAmounts method for ".concat(this.name, " pool"));
        if (!this.isMeta)
            throw Error("metaUnderlyingSeedAmounts method exists only for meta stable pools");
        var amount1BN = BN(amount1);
        if (amount1BN.lte(0))
            throw Error("Initial deposit amounts must be > 0");
        var amounts = [_cutZeros(amount1BN.toFixed(this.underlyingDecimals[0]))];
        for (var i = 1; i < this.underlyingDecimals.length; i++) {
            amounts.push(amount1BN.div(this.underlyingDecimals.length - 1).toFixed(this.underlyingDecimals[i]));
        }
        return amounts;
    };
    PoolTemplate.prototype.cryptoSeedAmounts = function (amount1) {
        return __awaiter(this, void 0, void 0, function () {
            var decimals, amount1BN, priceScaleBN, _c, priceScaleBN;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!this.isCrypto)
                            throw Error("cryptoSeedAmounts method doesn't exist for stable pools");
                        decimals = this.isMeta ? this.wrappedDecimals : this.underlyingDecimals;
                        amount1BN = BN(amount1);
                        if (amount1BN.lte(0))
                            throw Error("Initial deposit amounts must be > 0");
                        if (!(decimals.length === 2)) return [3 /*break*/, 2];
                        _c = toBN;
                        return [4 /*yield*/, curve.contracts[this.address].contract.price_scale(curve.constantOptions)];
                    case 1:
                        priceScaleBN = _c.apply(void 0, [_d.sent()]);
                        return [2 /*return*/, [_cutZeros(amount1BN.toFixed(decimals[0])), _cutZeros(amount1BN.div(priceScaleBN).toFixed(decimals[1]))]];
                    case 2:
                        if (!(decimals.length === 3)) return [3 /*break*/, 4];
                        return [4 /*yield*/, curve.multicallProvider.all([
                                curve.contracts[this.address].multicallContract.price_scale(0),
                                curve.contracts[this.address].multicallContract.price_scale(1),
                            ])];
                    case 3:
                        priceScaleBN = (_d.sent()).map(function (_p) { return toBN(_p); });
                        return [2 /*return*/, [
                                _cutZeros(amount1BN.toFixed(decimals[0])),
                                _cutZeros(amount1BN.div(priceScaleBN[0]).toFixed(decimals[1])),
                                _cutZeros(amount1BN.div(priceScaleBN[1]).toFixed(decimals[2])),
                            ]];
                    case 4: throw Error("cryptoSeedAmounts method doesn't exist for pools with N coins > 3");
                }
            });
        });
    };
    // OVERRIDE
    PoolTemplate.prototype.depositBalancedAmounts = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                throw Error("depositBalancedAmounts method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
            });
        });
    };
    PoolTemplate.prototype.depositExpected = function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.calcLpTokenAmount(amounts)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    // | balanced[i] / sum(balanced[j]) = balance[i] / sum(balance[j]) |
    // | sum(pj * balanced[j]) = sum(aj * pj)                          |
    //
    // --- Answer ---
    // balanced[i] = sum(aj * pj) / sum(rj * pj / ri)
    //
    // totalValueBN = sum(aj * pj)
    // totalBalanceBN = sum(balance[j])
    // ratiosBN[i] = balancesBN[i] / totalBalanceBN = ri = balance[i] / sum(balance[j])
    // denominatorBN = sum(rj * pj / ri)
    PoolTemplate.prototype._balancedAmountsWithSameValue = function (amountsBN, pricesBN, balancesBN) {
        var valuesBN = amountsBN.map(function (aBN, i) { return aBN.times(pricesBN[i]); });
        var totalValueBN = valuesBN.reduce(function (v1BN, v2BN) { return v1BN.plus(v2BN); });
        var totalBalanceBN = balancesBN.reduce(function (b1BN, b2BN) { return b1BN.plus(b2BN); });
        var ratiosBN = balancesBN.map(function (bBN) { return bBN.div(totalBalanceBN); });
        var balancedAmountsBN = [];
        var _loop_1 = function (i) {
            var denominatorBN = ratiosBN.map(function (rBN, j) { return rBN.times(pricesBN[j])
                .div(ratiosBN[i]); }).reduce(function (xBN, yBN) { return xBN.plus(yBN); });
            balancedAmountsBN.push(totalValueBN.div(denominatorBN));
        };
        for (var i = 0; i < amountsBN.length; i++) {
            _loop_1(i);
        }
        return balancedAmountsBN.map(String);
    };
    PoolTemplate.prototype.depositBonus = function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            var amountsBN, prices, isUseStoredRates, result, pricesBN, balancesBN, balancedAmounts, expectedBN, _c, balancedExpectedBN, _d;
            var _this = this;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        amountsBN = amounts.map(BN);
                        prices = [];
                        isUseStoredRates = isMethodExist(curve.contracts[this.address].contract, 'stored_rates') && this.isPlain;
                        if (!(this.isCrypto || this.id === 'wsteth')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._underlyingPrices()];
                    case 1:
                        prices = _e.sent();
                        return [3 /*break*/, 5];
                    case 2:
                        if (!isUseStoredRates) return [3 /*break*/, 4];
                        return [4 /*yield*/, this._stored_rates()];
                    case 3:
                        result = _e.sent();
                        result.forEach(function (item, index) {
                            prices.push(Number(item) / (Math.pow(10, (36 - _this.underlyingDecimals[index]))));
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        prices = this.underlyingCoins.map(function () { return 1; });
                        _e.label = 5;
                    case 5:
                        pricesBN = prices.map(BN);
                        return [4 /*yield*/, this.stats.underlyingBalances()];
                    case 6:
                        balancesBN = (_e.sent()).map(BN);
                        balancedAmounts = this._balancedAmountsWithSameValue(amountsBN, pricesBN, balancesBN);
                        _c = BN;
                        return [4 /*yield*/, this.depositExpected(amounts)];
                    case 7:
                        expectedBN = _c.apply(void 0, [_e.sent()]);
                        _d = BN;
                        return [4 /*yield*/, this.depositExpected(balancedAmounts)];
                    case 8:
                        balancedExpectedBN = _d.apply(void 0, [_e.sent()]);
                        return [2 /*return*/, String(expectedBN.minus(balancedExpectedBN).div(balancedExpectedBN).times(100))];
                }
            });
        });
    };
    PoolTemplate.prototype.depositIsApproved = function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, hasAllowance(this.underlyingCoinAddresses, amounts, curve.signerAddress, this.zap || this.address)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    PoolTemplate.prototype.depositApproveEstimateGas = function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, ensureAllowanceEstimateGas(this.underlyingCoinAddresses, amounts, this.zap || this.address)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    PoolTemplate.prototype.depositApprove = function (amounts, isMax) {
        if (isMax === void 0) { isMax = true; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, ensureAllowance(this.underlyingCoinAddresses, amounts, this.zap || this.address, isMax)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    // OVERRIDE
    PoolTemplate.prototype.depositEstimateGas = function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                throw Error("depositEstimateGas method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
            });
        });
    };
    // OVERRIDE
    PoolTemplate.prototype.deposit = function (amounts, slippage) {
        if (slippage === void 0) { slippage = 0.5; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                throw Error("deposit method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
            });
        });
    };
    // ---------------- DEPOSIT WRAPPED ----------------
    PoolTemplate.prototype.depositWrappedBalancedAmounts = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                throw Error("depositWrappedBalancedAmounts method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
            });
        });
    };
    PoolTemplate.prototype.depositWrappedExpected = function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.isFake) {
                            throw Error("depositWrappedExpected method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
                        }
                        return [4 /*yield*/, this.calcLpTokenAmountWrapped(amounts)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    PoolTemplate.prototype.depositWrappedBonus = function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            var amountsBN, pricesBN, balancesBN, balancedAmounts, expectedBN, _c, balancedExpectedBN, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        amountsBN = amounts.map(BN);
                        return [4 /*yield*/, this._wrappedPrices()];
                    case 1:
                        pricesBN = (_e.sent()).map(BN);
                        return [4 /*yield*/, this.stats.wrappedBalances()];
                    case 2:
                        balancesBN = (_e.sent()).map(BN);
                        balancedAmounts = this._balancedAmountsWithSameValue(amountsBN, pricesBN, balancesBN);
                        _c = BN;
                        return [4 /*yield*/, this.depositWrappedExpected(amounts)];
                    case 3:
                        expectedBN = _c.apply(void 0, [_e.sent()]);
                        _d = BN;
                        return [4 /*yield*/, this.depositWrappedExpected(balancedAmounts)];
                    case 4:
                        balancedExpectedBN = _d.apply(void 0, [_e.sent()]);
                        return [2 /*return*/, String(expectedBN.minus(balancedExpectedBN).div(balancedExpectedBN).times(100))];
                }
            });
        });
    };
    PoolTemplate.prototype.depositWrappedIsApproved = function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.isFake) {
                            throw Error("depositWrappedIsApproved method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
                        }
                        return [4 /*yield*/, hasAllowance(this.wrappedCoinAddresses, amounts, curve.signerAddress, this.address)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    PoolTemplate.prototype.depositWrappedApproveEstimateGas = function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.isFake) {
                            throw Error("depositWrappedApprove method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
                        }
                        return [4 /*yield*/, ensureAllowanceEstimateGas(this.wrappedCoinAddresses, amounts, this.address)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    PoolTemplate.prototype.depositWrappedApprove = function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.isFake) {
                            throw Error("depositWrappedApprove method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
                        }
                        return [4 /*yield*/, ensureAllowance(this.wrappedCoinAddresses, amounts, this.address)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    // OVERRIDE
    PoolTemplate.prototype.depositWrappedEstimateGas = function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                throw Error("depositWrapped method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
            });
        });
    };
    // OVERRIDE
    PoolTemplate.prototype.depositWrapped = function (amounts, slippage) {
        if (slippage === void 0) { slippage = 0.5; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                throw Error("depositWrapped method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
            });
        });
    };
    // ---------------- STAKING ----------------
    PoolTemplate.prototype.stakeIsApproved = function (lpTokenAmount) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.gauge.address === curve.constants.ZERO_ADDRESS) {
                            throw Error("stakeIsApproved method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, "). There is no gauge"));
                        }
                        return [4 /*yield*/, hasAllowance([this.lpToken], [lpTokenAmount], curve.signerAddress, this.gauge.address)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    PoolTemplate.prototype.stakeApproveEstimateGas = function (lpTokenAmount) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.gauge.address === curve.constants.ZERO_ADDRESS) {
                            throw Error("stakeApproveEstimateGas method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, "). There is no gauge"));
                        }
                        return [4 /*yield*/, ensureAllowanceEstimateGas([this.lpToken], [lpTokenAmount], this.gauge.address)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    PoolTemplate.prototype.stakeApprove = function (lpTokenAmount) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.gauge.address === curve.constants.ZERO_ADDRESS) {
                            throw Error("stakeApprove method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, "). There is no gauge"));
                        }
                        return [4 /*yield*/, ensureAllowance([this.lpToken], [lpTokenAmount], this.gauge.address)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    PoolTemplate.prototype.stakeEstimateGas = function (lpTokenAmount) {
        return __awaiter(this, void 0, void 0, function () {
            var _lpTokenAmount, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (this.gauge.address === curve.constants.ZERO_ADDRESS) {
                            throw Error("stakeEstimateGas method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, "). There is no gauge"));
                        }
                        _lpTokenAmount = parseUnits(lpTokenAmount);
                        _c = smartNumber;
                        return [4 /*yield*/, curve.contracts[this.gauge.address].contract.deposit.estimateGas(_lpTokenAmount, curve.constantOptions)];
                    case 1: return [2 /*return*/, _c.apply(void 0, [_d.sent()])];
                }
            });
        });
    };
    PoolTemplate.prototype.stake = function (lpTokenAmount) {
        return __awaiter(this, void 0, void 0, function () {
            var _lpTokenAmount, gasLimit, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (this.gauge.address === curve.constants.ZERO_ADDRESS) {
                            throw Error("stake method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, "). There is no gauge"));
                        }
                        _lpTokenAmount = parseUnits(lpTokenAmount);
                        return [4 /*yield*/, _ensureAllowance([this.lpToken], [_lpTokenAmount], this.gauge.address)];
                    case 1:
                        _e.sent();
                        return [4 /*yield*/, curve.updateFeeData()];
                    case 2:
                        _e.sent();
                        _c = mulBy1_3;
                        _d = DIGas;
                        return [4 /*yield*/, curve.contracts[this.gauge.address].contract.deposit.estimateGas(_lpTokenAmount, curve.constantOptions)];
                    case 3:
                        gasLimit = _c.apply(void 0, [_d.apply(void 0, [_e.sent()])]);
                        return [4 /*yield*/, curve.contracts[this.gauge.address].contract.deposit(_lpTokenAmount, __assign(__assign({}, curve.options), { gasLimit: gasLimit }))];
                    case 4: return [2 /*return*/, (_e.sent()).hash];
                }
            });
        });
    };
    PoolTemplate.prototype.unstakeEstimateGas = function (lpTokenAmount) {
        return __awaiter(this, void 0, void 0, function () {
            var _lpTokenAmount, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (this.gauge.address === curve.constants.ZERO_ADDRESS) {
                            throw Error("unstakeEstimateGas method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, "). There is no gauge"));
                        }
                        _lpTokenAmount = parseUnits(lpTokenAmount);
                        _c = smartNumber;
                        return [4 /*yield*/, curve.contracts[this.gauge.address].contract.withdraw.estimateGas(_lpTokenAmount, curve.constantOptions)];
                    case 1: return [2 /*return*/, _c.apply(void 0, [_d.sent()])];
                }
            });
        });
    };
    PoolTemplate.prototype.unstake = function (lpTokenAmount) {
        return __awaiter(this, void 0, void 0, function () {
            var _lpTokenAmount, gasLimit, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (this.gauge.address === curve.constants.ZERO_ADDRESS) {
                            throw Error("unstake method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, "). There is no gauge"));
                        }
                        _lpTokenAmount = parseUnits(lpTokenAmount);
                        return [4 /*yield*/, curve.updateFeeData()];
                    case 1:
                        _d.sent();
                        _c = DIGas;
                        return [4 /*yield*/, curve.contracts[this.gauge.address].contract.withdraw.estimateGas(_lpTokenAmount, curve.constantOptions)];
                    case 2:
                        gasLimit = _c.apply(void 0, [(_d.sent())]) * curve.parseUnits("200", 0) / curve.parseUnits("100", 0);
                        return [4 /*yield*/, curve.contracts[this.gauge.address].contract.withdraw(_lpTokenAmount, __assign(__assign({}, curve.options), { gasLimit: gasLimit }))];
                    case 3: return [2 /*return*/, (_d.sent()).hash];
                }
            });
        });
    };
    PoolTemplate.prototype.claimableCrv = function (address) {
        if (address === void 0) { address = ""; }
        return __awaiter(this, void 0, void 0, function () {
            var _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (this.rewardsOnly())
                            throw Error("".concat(this.name, " has Rewards-Only Gauge. Use claimableRewards instead"));
                        address = address || curve.signerAddress;
                        if (!address)
                            throw Error("Need to connect wallet or pass address into args");
                        _d = (_c = curve).formatUnits;
                        return [4 /*yield*/, curve.contracts[this.gauge.address].contract.claimable_tokens(address, curve.constantOptions)];
                    case 1: return [2 /*return*/, _d.apply(_c, [_e.sent()])];
                }
            });
        });
    };
    PoolTemplate.prototype.claimCrvEstimateGas = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (this.rewardsOnly())
                            throw Error("".concat(this.name, " has Rewards-Only Gauge. Use claimRewards instead"));
                        if (!(curve.chainId === 1)) return [3 /*break*/, 2];
                        _c = Number;
                        return [4 /*yield*/, curve.contracts[curve.constants.ALIASES.minter].contract.mint.estimateGas(this.gauge.address, curve.constantOptions)];
                    case 1: return [2 /*return*/, _c.apply(void 0, [_e.sent()])];
                    case 2:
                        _d = smartNumber;
                        return [4 /*yield*/, curve.contracts[curve.constants.ALIASES.gauge_factory].contract.mint.estimateGas(this.gauge.address, curve.constantOptions)];
                    case 3: return [2 /*return*/, _d.apply(void 0, [_e.sent()])];
                }
            });
        });
    };
    PoolTemplate.prototype.claimCrv = function () {
        return __awaiter(this, void 0, void 0, function () {
            var contract, gasLimit, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (this.rewardsOnly())
                            throw Error("".concat(this.name, " has Rewards-Only Gauge. Use claimRewards instead"));
                        contract = curve.chainId === 1 ? curve.contracts[curve.constants.ALIASES.minter].contract : curve.contracts[curve.constants.ALIASES.gauge_factory].contract;
                        return [4 /*yield*/, curve.updateFeeData()];
                    case 1:
                        _e.sent();
                        _c = mulBy1_3;
                        _d = DIGas;
                        return [4 /*yield*/, contract.mint.estimateGas(this.gauge.address, curve.constantOptions)];
                    case 2:
                        gasLimit = _c.apply(void 0, [_d.apply(void 0, [_e.sent()])]);
                        return [4 /*yield*/, contract.mint(this.gauge.address, __assign(__assign({}, curve.options), { gasLimit: gasLimit }))];
                    case 3: return [2 /*return*/, (_e.sent()).hash];
                }
            });
        });
    };
    // TODO 1. Fix aave and saave error
    PoolTemplate.prototype.claimableRewards = function (address) {
        if (address === void 0) { address = ""; }
        return __awaiter(this, void 0, void 0, function () {
            var gaugeContract, rewardTokens, rewards, _i, rewardTokens_5, rewardToken, _amount, rewardToken, _totalAmount, _claimedAmount;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.gauge.address === curve.constants.ZERO_ADDRESS) {
                            throw Error("claimableRewards method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, "). There is no gauge"));
                        }
                        address = address || curve.signerAddress;
                        if (!address)
                            throw Error("Need to connect wallet or pass address into args");
                        gaugeContract = curve.contracts[this.gauge.address].contract;
                        return [4 /*yield*/, this.rewardTokens()];
                    case 1:
                        rewardTokens = _c.sent();
                        rewards = [];
                        if (!('claimable_reward(address,address)' in gaugeContract)) return [3 /*break*/, 6];
                        _i = 0, rewardTokens_5 = rewardTokens;
                        _c.label = 2;
                    case 2:
                        if (!(_i < rewardTokens_5.length)) return [3 /*break*/, 5];
                        rewardToken = rewardTokens_5[_i];
                        return [4 /*yield*/, gaugeContract.claimable_reward(address, rewardToken.token, curve.constantOptions)];
                    case 3:
                        _amount = _c.sent();
                        rewards.push({
                            token: rewardToken.token,
                            symbol: rewardToken.symbol,
                            amount: curve.formatUnits(_amount, rewardToken.decimals),
                        });
                        _c.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 9];
                    case 6:
                        if (!('claimable_reward(address)' in gaugeContract && rewardTokens.length > 0)) return [3 /*break*/, 9];
                        rewardToken = rewardTokens[0];
                        return [4 /*yield*/, gaugeContract.claimable_reward(address, curve.constantOptions)];
                    case 7:
                        _totalAmount = _c.sent();
                        return [4 /*yield*/, gaugeContract.claimed_rewards_for(address, curve.constantOptions)];
                    case 8:
                        _claimedAmount = _c.sent();
                        rewards.push({
                            token: rewardToken.token,
                            symbol: rewardToken.symbol,
                            amount: curve.formatUnits(_totalAmount.sub(_claimedAmount), rewardToken.decimals),
                        });
                        _c.label = 9;
                    case 9: return [2 /*return*/, rewards];
                }
            });
        });
    };
    PoolTemplate.prototype.claimRewardsEstimateGas = function () {
        return __awaiter(this, void 0, void 0, function () {
            var gaugeContract, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (this.gauge.address === curve.constants.ZERO_ADDRESS) {
                            throw Error("claimRewards method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, "). There is no gauge"));
                        }
                        gaugeContract = curve.contracts[this.gauge.address].contract;
                        if (!("claim_rewards()" in gaugeContract))
                            throw Error("".concat(this.name, " pool doesn't have such method"));
                        _c = smartNumber;
                        return [4 /*yield*/, gaugeContract.claim_rewards.estimateGas(curve.constantOptions)];
                    case 1: return [2 /*return*/, _c.apply(void 0, [_d.sent()])];
                }
            });
        });
    };
    PoolTemplate.prototype.claimRewards = function () {
        return __awaiter(this, void 0, void 0, function () {
            var gaugeContract, gasLimit, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (this.gauge.address === curve.constants.ZERO_ADDRESS) {
                            throw Error("claimRewards method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, "). There is no gauge"));
                        }
                        gaugeContract = curve.contracts[this.gauge.address].contract;
                        if (!("claim_rewards()" in gaugeContract))
                            throw Error("".concat(this.name, " pool doesn't have such method"));
                        return [4 /*yield*/, curve.updateFeeData()];
                    case 1:
                        _e.sent();
                        _c = mulBy1_3;
                        _d = DIGas;
                        return [4 /*yield*/, gaugeContract.claim_rewards.estimateGas(curve.constantOptions)];
                    case 2:
                        gasLimit = _c.apply(void 0, [_d.apply(void 0, [_e.sent()])]);
                        return [4 /*yield*/, gaugeContract.claim_rewards(__assign(__assign({}, curve.options), { gasLimit: gasLimit }))];
                    case 3: return [2 /*return*/, (_e.sent()).hash];
                }
            });
        });
    };
    // ---------------- DEPOSIT & STAKE ----------------
    PoolTemplate.prototype.depositAndStakeExpected = function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.gauge.address === curve.constants.ZERO_ADDRESS) {
                            throw Error("depositAndStakeExpected method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, "). There is no gauge"));
                        }
                        return [4 /*yield*/, this.depositExpected(amounts)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    PoolTemplate.prototype.depositAndStakeBonus = function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.gauge.address === curve.constants.ZERO_ADDRESS) {
                            throw Error("depositAndStakeBonus method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, "). There is no gauge"));
                        }
                        return [4 /*yield*/, this.depositBonus(amounts)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    PoolTemplate.prototype.depositAndStakeIsApproved = function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            var coinsAllowance, gaugeContract, gaugeAllowance;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.gauge.address === curve.constants.ZERO_ADDRESS) {
                            throw Error("depositAndStakeIsApproved method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, "). There is no gauge"));
                        }
                        return [4 /*yield*/, hasAllowance(this.underlyingCoinAddresses, amounts, curve.signerAddress, curve.constants.ALIASES.deposit_and_stake)];
                    case 1:
                        coinsAllowance = _c.sent();
                        gaugeContract = curve.contracts[this.gauge.address].contract;
                        if (!('approved_to_deposit' in gaugeContract)) return [3 /*break*/, 3];
                        return [4 /*yield*/, gaugeContract.approved_to_deposit(curve.constants.ALIASES.deposit_and_stake, curve.signerAddress, curve.constantOptions)];
                    case 2:
                        gaugeAllowance = _c.sent();
                        return [2 /*return*/, coinsAllowance && gaugeAllowance];
                    case 3: return [2 /*return*/, coinsAllowance];
                }
            });
        });
    };
    PoolTemplate.prototype.depositAndStakeApproveEstimateGas = function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            var approveCoinsGas, gaugeContract, gaugeAllowance, approveGaugeGas, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (this.gauge.address === curve.constants.ZERO_ADDRESS) {
                            throw Error("depositAndStakeApprove method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, "). There is no gauge"));
                        }
                        return [4 /*yield*/, ensureAllowanceEstimateGas(this.underlyingCoinAddresses, amounts, curve.constants.ALIASES.deposit_and_stake)];
                    case 1:
                        approveCoinsGas = _d.sent();
                        gaugeContract = curve.contracts[this.gauge.address].contract;
                        if (!('approved_to_deposit' in gaugeContract)) return [3 /*break*/, 4];
                        return [4 /*yield*/, gaugeContract.approved_to_deposit(curve.constants.ALIASES.deposit_and_stake, curve.signerAddress, curve.constantOptions)];
                    case 2:
                        gaugeAllowance = _d.sent();
                        if (!!gaugeAllowance) return [3 /*break*/, 4];
                        _c = smartNumber;
                        return [4 /*yield*/, gaugeContract.set_approve_deposit.estimateGas(curve.constants.ALIASES.deposit_and_stake, true, curve.constantOptions)];
                    case 3:
                        approveGaugeGas = _c.apply(void 0, [_d.sent()]);
                        if (Array.isArray(approveCoinsGas) && Array.isArray(approveGaugeGas)) {
                            return [2 /*return*/, [approveCoinsGas[0] + approveGaugeGas[0], approveCoinsGas[1] + approveGaugeGas[1]]];
                        }
                        if (!Array.isArray(approveCoinsGas) && !Array.isArray(approveGaugeGas)) {
                            return [2 /*return*/, approveCoinsGas + approveGaugeGas];
                        }
                        _d.label = 4;
                    case 4: return [2 /*return*/, approveCoinsGas];
                }
            });
        });
    };
    PoolTemplate.prototype.depositAndStakeApprove = function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            var approveCoinsTx, gaugeContract, gaugeAllowance, gasLimit, _c, approveGaugeTx;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (this.gauge.address === curve.constants.ZERO_ADDRESS) {
                            throw Error("depositAndStakeApprove method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, "). There is no gauge"));
                        }
                        return [4 /*yield*/, ensureAllowance(this.underlyingCoinAddresses, amounts, curve.constants.ALIASES.deposit_and_stake)];
                    case 1:
                        approveCoinsTx = _d.sent();
                        gaugeContract = curve.contracts[this.gauge.address].contract;
                        if (!('approved_to_deposit' in gaugeContract)) return [3 /*break*/, 5];
                        return [4 /*yield*/, gaugeContract.approved_to_deposit(curve.constants.ALIASES.deposit_and_stake, curve.signerAddress, curve.constantOptions)];
                    case 2:
                        gaugeAllowance = _d.sent();
                        if (!!gaugeAllowance) return [3 /*break*/, 5];
                        _c = mulBy1_3;
                        return [4 /*yield*/, gaugeContract.set_approve_deposit.estimateGas(curve.constants.ALIASES.deposit_and_stake, true, curve.constantOptions)];
                    case 3:
                        gasLimit = _c.apply(void 0, [_d.sent()]);
                        return [4 /*yield*/, gaugeContract.set_approve_deposit(curve.constants.ALIASES.deposit_and_stake, true, __assign(__assign({}, curve.options), { gasLimit: gasLimit }))];
                    case 4:
                        approveGaugeTx = (_d.sent()).hash;
                        return [2 /*return*/, __spreadArray(__spreadArray([], approveCoinsTx, true), [approveGaugeTx], false)];
                    case 5: return [2 /*return*/, approveCoinsTx];
                }
            });
        });
    };
    PoolTemplate.prototype.depositAndStakeEstimateGas = function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.gauge.address === curve.constants.ZERO_ADDRESS) {
                            throw Error("depositAndStake method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, "). There is no gauge"));
                        }
                        return [4 /*yield*/, this._depositAndStake(amounts, 1, true, true)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    PoolTemplate.prototype.depositAndStake = function (amounts, slippage) {
        if (slippage === void 0) { slippage = 0.1; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.gauge.address === curve.constants.ZERO_ADDRESS) {
                            throw Error("depositAndStake method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, "). There is no gauge"));
                        }
                        return [4 /*yield*/, this._depositAndStake(amounts, slippage, true, false)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    // ---------------- DEPOSIT & STAKE WRAPPED ----------------
    PoolTemplate.prototype.depositAndStakeWrappedExpected = function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.gauge.address === curve.constants.ZERO_ADDRESS) {
                            throw Error("depositAndStakeWrappedExpected method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, "). There is no gauge"));
                        }
                        if (this.isPlain || this.isFake)
                            throw Error("depositAndStakeWrappedExpected method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
                        return [4 /*yield*/, this.depositWrappedExpected(amounts)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    PoolTemplate.prototype.depositAndStakeWrappedBonus = function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.gauge.address === curve.constants.ZERO_ADDRESS) {
                            throw Error("depositAndStakeWrappedBonus method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, "). There is no gauge"));
                        }
                        if (this.isPlain || this.isFake)
                            throw Error("depositAndStakeWrappedBonus method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
                        return [4 /*yield*/, this.depositWrappedBonus(amounts)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    PoolTemplate.prototype.depositAndStakeWrappedIsApproved = function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            var coinsAllowance, gaugeContract, gaugeAllowance;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.gauge.address === curve.constants.ZERO_ADDRESS) {
                            throw Error("depositAndStakeWrappedIsApproved method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, "). There is no gauge"));
                        }
                        if (this.isPlain || this.isFake)
                            throw Error("depositAndStakeWrappedIsApproved method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
                        return [4 /*yield*/, hasAllowance(this.wrappedCoinAddresses, amounts, curve.signerAddress, curve.constants.ALIASES.deposit_and_stake)];
                    case 1:
                        coinsAllowance = _c.sent();
                        gaugeContract = curve.contracts[this.gauge.address].contract;
                        if (!('approved_to_deposit' in gaugeContract)) return [3 /*break*/, 3];
                        return [4 /*yield*/, gaugeContract.approved_to_deposit(curve.constants.ALIASES.deposit_and_stake, curve.signerAddress, curve.constantOptions)];
                    case 2:
                        gaugeAllowance = _c.sent();
                        return [2 /*return*/, coinsAllowance && gaugeAllowance];
                    case 3: return [2 /*return*/, coinsAllowance];
                }
            });
        });
    };
    PoolTemplate.prototype.depositAndStakeWrappedApproveEstimateGas = function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            var approveCoinsGas, gaugeContract, gaugeAllowance, approveGaugeGas, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (this.gauge.address === curve.constants.ZERO_ADDRESS) {
                            throw Error("depositAndStakeWrappedApprove method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, "). There is no gauge"));
                        }
                        if (this.isPlain || this.isFake)
                            throw Error("depositAndStakeWrappedApprove method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
                        return [4 /*yield*/, ensureAllowanceEstimateGas(this.wrappedCoinAddresses, amounts, curve.constants.ALIASES.deposit_and_stake)];
                    case 1:
                        approveCoinsGas = _d.sent();
                        gaugeContract = curve.contracts[this.gauge.address].contract;
                        if (!('approved_to_deposit' in gaugeContract)) return [3 /*break*/, 4];
                        return [4 /*yield*/, gaugeContract.approved_to_deposit(curve.constants.ALIASES.deposit_and_stake, curve.signerAddress, curve.constantOptions)];
                    case 2:
                        gaugeAllowance = _d.sent();
                        if (!!gaugeAllowance) return [3 /*break*/, 4];
                        _c = Number;
                        return [4 /*yield*/, gaugeContract.set_approve_deposit.estimateGas(curve.constants.ALIASES.deposit_and_stake, true, curve.constantOptions)];
                    case 3:
                        approveGaugeGas = _c.apply(void 0, [_d.sent()]);
                        if (Array.isArray(approveCoinsGas) && Array.isArray(approveGaugeGas)) {
                            return [2 /*return*/, [approveCoinsGas[0] + approveGaugeGas[0], approveCoinsGas[1] + approveGaugeGas[1]]];
                        }
                        if (!Array.isArray(approveCoinsGas) && !Array.isArray(approveGaugeGas)) {
                            return [2 /*return*/, approveCoinsGas + approveGaugeGas];
                        }
                        _d.label = 4;
                    case 4: return [2 /*return*/, approveCoinsGas];
                }
            });
        });
    };
    PoolTemplate.prototype.depositAndStakeWrappedApprove = function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            var approveCoinsTx, gaugeContract, gaugeAllowance, gasLimit, _c, approveGaugeTx;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (this.gauge.address === curve.constants.ZERO_ADDRESS) {
                            throw Error("depositAndStakeWrappedApprove method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, "). There is no gauge"));
                        }
                        if (this.isPlain || this.isFake)
                            throw Error("depositAndStakeWrappedApprove method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
                        return [4 /*yield*/, ensureAllowance(this.wrappedCoinAddresses, amounts, curve.constants.ALIASES.deposit_and_stake)];
                    case 1:
                        approveCoinsTx = _d.sent();
                        gaugeContract = curve.contracts[this.gauge.address].contract;
                        if (!('approved_to_deposit' in gaugeContract)) return [3 /*break*/, 5];
                        return [4 /*yield*/, gaugeContract.approved_to_deposit(curve.constants.ALIASES.deposit_and_stake, curve.signerAddress, curve.constantOptions)];
                    case 2:
                        gaugeAllowance = _d.sent();
                        if (!!gaugeAllowance) return [3 /*break*/, 5];
                        _c = mulBy1_3;
                        return [4 /*yield*/, gaugeContract.set_approve_deposit.estimateGas(curve.constants.ALIASES.deposit_and_stake, true, curve.constantOptions)];
                    case 3:
                        gasLimit = _c.apply(void 0, [_d.sent()]);
                        return [4 /*yield*/, gaugeContract.set_approve_deposit(curve.constants.ALIASES.deposit_and_stake, true, __assign(__assign({}, curve.options), { gasLimit: gasLimit }))];
                    case 4:
                        approveGaugeTx = (_d.sent()).hash;
                        return [2 /*return*/, __spreadArray(__spreadArray([], approveCoinsTx, true), [approveGaugeTx], false)];
                    case 5: return [2 /*return*/, approveCoinsTx];
                }
            });
        });
    };
    PoolTemplate.prototype.depositAndStakeWrappedEstimateGas = function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.gauge.address === curve.constants.ZERO_ADDRESS) {
                            throw Error("depositAndStakeWrapped method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, "). There is no gauge"));
                        }
                        if (this.isPlain || this.isFake)
                            throw Error("depositAndStakeWrapped method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
                        return [4 /*yield*/, this._depositAndStake(amounts, 1, false, true)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    PoolTemplate.prototype.depositAndStakeWrapped = function (amounts, slippage) {
        if (slippage === void 0) { slippage = 0.1; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.gauge.address === curve.constants.ZERO_ADDRESS) {
                            throw Error("depositAndStakeWrapped method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, "). There is no gauge"));
                        }
                        if (this.isPlain || this.isFake)
                            throw Error("depositAndStakeWrapped method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
                        return [4 /*yield*/, this._depositAndStake(amounts, slippage, false, false)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    PoolTemplate.prototype._depositAndStake = function (amounts, slippage, isUnderlying, estimateGas) {
        return __awaiter(this, void 0, void 0, function () {
            var coinAddresses, coins, decimals, depositAddress, balances, _c, _d, _e, _f, _g, i, allowance, _h, _amounts, contract, useUnderlying, _expectedLpTokenAmount, _j, _k, _l, _m, _o, minAmountBN, _minMintAmount, ethIndex, value, _gas, gasLimit;
            return __generator(this, function (_q) {
                switch (_q.label) {
                    case 0:
                        coinAddresses = isUnderlying ? __spreadArray([], this.underlyingCoinAddresses, true) : __spreadArray([], this.wrappedCoinAddresses, true);
                        coins = isUnderlying ? this.underlyingCoins : this.wrappedCoinAddresses;
                        decimals = isUnderlying ? this.underlyingDecimals : this.wrappedDecimals;
                        depositAddress = isUnderlying ? this.zap || this.address : this.address;
                        if (amounts.length !== coinAddresses.length) {
                            throw Error("".concat(this.name, " pool has ").concat(coinAddresses.length, " coins (amounts provided for ").concat(amounts.length, ")"));
                        }
                        if (!isUnderlying) return [3 /*break*/, 2];
                        _e = (_d = Object).values;
                        return [4 /*yield*/, this.walletUnderlyingCoinBalances()];
                    case 1:
                        _c = _e.apply(_d, [_q.sent()]);
                        return [3 /*break*/, 4];
                    case 2:
                        _g = (_f = Object).values;
                        return [4 /*yield*/, this.walletWrappedCoinBalances()];
                    case 3:
                        _c = _g.apply(_f, [_q.sent()]);
                        _q.label = 4;
                    case 4:
                        balances = _c;
                        for (i = 0; i < balances.length; i++) {
                            if (Number(balances[i]) < Number(amounts[i])) {
                                throw Error("Not enough ".concat(coins[i], ". Actual: ").concat(balances[i], ", required: ").concat(amounts[i]));
                            }
                        }
                        if (!isUnderlying) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.depositAndStakeIsApproved(amounts)];
                    case 5:
                        _h = _q.sent();
                        return [3 /*break*/, 8];
                    case 6: return [4 /*yield*/, this.depositAndStakeWrappedIsApproved(amounts)];
                    case 7:
                        _h = _q.sent();
                        _q.label = 8;
                    case 8:
                        allowance = _h;
                        if (estimateGas && !allowance) {
                            throw Error("Token allowance is needed to estimate gas");
                        }
                        if (!!estimateGas) return [3 /*break*/, 12];
                        if (!isUnderlying) return [3 /*break*/, 10];
                        return [4 /*yield*/, this.depositAndStakeApprove(amounts)];
                    case 9:
                        _q.sent();
                        return [3 /*break*/, 12];
                    case 10: return [4 /*yield*/, this.depositAndStakeWrappedApprove(amounts)];
                    case 11:
                        _q.sent();
                        _q.label = 12;
                    case 12:
                        _amounts = amounts.map(function (amount, i) { return parseUnits(amount, decimals[i]); });
                        contract = curve.contracts[curve.constants.ALIASES.deposit_and_stake].contract;
                        useUnderlying = isUnderlying && (this.isLending || (this.isCrypto && !this.isPlain)) && (!this.zap || this.id == 'avaxcrypto');
                        if (!isUnderlying) return [3 /*break*/, 14];
                        _l = (_k = curve).parseUnits;
                        return [4 /*yield*/, this.depositAndStakeExpected(amounts)];
                    case 13:
                        _j = _l.apply(_k, [_q.sent()]);
                        return [3 /*break*/, 16];
                    case 14:
                        _o = (_m = curve).parseUnits;
                        return [4 /*yield*/, this.depositAndStakeWrappedExpected(amounts)];
                    case 15:
                        _j = _o.apply(_m, [_q.sent()]);
                        _q.label = 16;
                    case 16:
                        _expectedLpTokenAmount = _j;
                        minAmountBN = toBN(_expectedLpTokenAmount).times(100 - slippage).div(100);
                        _minMintAmount = fromBN(minAmountBN);
                        ethIndex = getEthIndex(coinAddresses);
                        value = _amounts[ethIndex] || curve.parseUnits("0");
                        return [4 /*yield*/, contract.deposit_and_stake.estimateGas(depositAddress, this.lpToken, this.gauge.address, coins.length, coinAddresses, _amounts, _minMintAmount, useUnderlying, (!this.isCrypto && this.isNg && this.isPlain) || (isUnderlying && this.isMeta && (new PoolTemplate(this.basePool)).isNg), this.isMetaFactory && isUnderlying ? this.address : curve.constants.ZERO_ADDRESS, __assign(__assign({}, curve.constantOptions), { value: value }))];
                    case 17:
                        _gas = (_q.sent());
                        if (estimateGas)
                            return [2 /*return*/, smartNumber(_gas)];
                        return [4 /*yield*/, curve.updateFeeData()];
                    case 18:
                        _q.sent();
                        gasLimit = DIGas(_gas) * curve.parseUnits("200", 0) / curve.parseUnits("100", 0);
                        return [4 /*yield*/, contract.deposit_and_stake(depositAddress, this.lpToken, this.gauge.address, coins.length, coinAddresses, _amounts, _minMintAmount, useUnderlying, (!this.isCrypto && this.isNg && this.isPlain) || (isUnderlying && this.isMeta && (new PoolTemplate(this.basePool)).isNg), this.isMetaFactory && isUnderlying ? this.address : curve.constants.ZERO_ADDRESS, __assign(__assign({}, curve.options), { gasLimit: gasLimit, value: value }))];
                    case 19: return [2 /*return*/, (_q.sent()).hash];
                }
            });
        });
    };
    // ---------------- WITHDRAW ----------------
    // OVERRIDE
    PoolTemplate.prototype.withdrawExpected = function (lpTokenAmount) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                throw Error("withdrawExpected method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
            });
        });
    };
    PoolTemplate.prototype.withdrawIsApproved = function (lpTokenAmount) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.zap)
                            return [2 /*return*/, true];
                        return [4 /*yield*/, hasAllowance([this.lpToken], [lpTokenAmount], curve.signerAddress, this.zap)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    PoolTemplate.prototype.withdrawApproveEstimateGas = function (lpTokenAmount) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.zap)
                            return [2 /*return*/, 0];
                        return [4 /*yield*/, ensureAllowanceEstimateGas([this.lpToken], [lpTokenAmount], this.zap)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    PoolTemplate.prototype.withdrawApprove = function (lpTokenAmount) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.zap)
                            return [2 /*return*/, []];
                        return [4 /*yield*/, ensureAllowance([this.lpToken], [lpTokenAmount], this.zap)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    // OVERRIDE
    PoolTemplate.prototype.withdrawEstimateGas = function (lpTokenAmount) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                throw Error("withdraw method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
            });
        });
    };
    // OVERRIDE
    PoolTemplate.prototype.withdraw = function (lpTokenAmount, slippage) {
        if (slippage === void 0) { slippage = 0.5; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                throw Error("withdraw method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
            });
        });
    };
    // ---------------- WITHDRAW WRAPPED ----------------
    // OVERRIDE
    PoolTemplate.prototype.withdrawWrappedExpected = function (lpTokenAmount) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                throw Error("withdrawWrappedExpected method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
            });
        });
    };
    // OVERRIDE
    PoolTemplate.prototype.withdrawWrappedEstimateGas = function (lpTokenAmount) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                throw Error("withdrawWrapped method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
            });
        });
    };
    // OVERRIDE
    PoolTemplate.prototype.withdrawWrapped = function (lpTokenAmount, slippage) {
        if (slippage === void 0) { slippage = 0.5; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                throw Error("withdrawWrapped method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
            });
        });
    };
    // ---------------- WITHDRAW IMBALANCE ----------------
    PoolTemplate.prototype.withdrawImbalanceExpected = function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.isCrypto)
                            throw Error("withdrawImbalanceExpected method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
                        return [4 /*yield*/, this.calcLpTokenAmount(amounts, false)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    PoolTemplate.prototype.withdrawImbalanceBonus = function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            var prices, isUseStoredRates, result, value, lpTokenAmount, balancedAmounts, balancedValue;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        prices = [];
                        isUseStoredRates = isMethodExist(curve.contracts[this.address].contract, 'stored_rates') && this.isPlain;
                        if (!(this.isCrypto || this.id === 'wsteth')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._underlyingPrices()];
                    case 1:
                        prices = _c.sent();
                        return [3 /*break*/, 5];
                    case 2:
                        if (!isUseStoredRates) return [3 /*break*/, 4];
                        return [4 /*yield*/, this._stored_rates()];
                    case 3:
                        result = _c.sent();
                        result.forEach(function (item, index) {
                            prices.push(Number(item) / (Math.pow(10, (36 - _this.underlyingDecimals[index]))));
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        prices = this.underlyingCoins.map(function () { return 1; });
                        _c.label = 5;
                    case 5:
                        value = amounts.map(checkNumber).map(Number).reduce(function (s, a, i) { return s + (a * prices[i]); }, 0);
                        return [4 /*yield*/, this.withdrawImbalanceExpected(amounts)];
                    case 6:
                        lpTokenAmount = _c.sent();
                        return [4 /*yield*/, this.withdrawExpected(lpTokenAmount)];
                    case 7:
                        balancedAmounts = _c.sent();
                        balancedValue = balancedAmounts.map(Number).reduce(function (s, a, i) { return s + (a * prices[i]); }, 0);
                        return [2 /*return*/, String((value - balancedValue) / balancedValue * 100)];
                }
            });
        });
    };
    PoolTemplate.prototype.withdrawImbalanceIsApproved = function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            var _amounts, _maxBurnAmount;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.isCrypto)
                            throw Error("withdrawImbalanceIsApproved method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
                        if (!this.zap) return [3 /*break*/, 3];
                        _amounts = amounts.map(function (amount, i) { return parseUnits(amount, _this.underlyingDecimals[i]); });
                        return [4 /*yield*/, this._calcLpTokenAmount(_amounts, false)];
                    case 1:
                        _maxBurnAmount = (_c.sent()) * curve.parseUnits("101", 0) / curve.parseUnits("100", 0);
                        return [4 /*yield*/, hasAllowance([this.lpToken], [curve.formatUnits(_maxBurnAmount, 18)], curve.signerAddress, this.zap)];
                    case 2: return [2 /*return*/, _c.sent()];
                    case 3: return [2 /*return*/, true];
                }
            });
        });
    };
    PoolTemplate.prototype.withdrawImbalanceApproveEstimateGas = function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            var _amounts, _maxBurnAmount;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.isCrypto)
                            throw Error("withdrawImbalanceApprove method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
                        if (!this.zap) return [3 /*break*/, 3];
                        _amounts = amounts.map(function (amount, i) { return parseUnits(amount, _this.underlyingDecimals[i]); });
                        return [4 /*yield*/, this._calcLpTokenAmount(_amounts, false)];
                    case 1:
                        _maxBurnAmount = (_c.sent()) * curve.parseUnits("101", 0) / curve.parseUnits("100", 0);
                        return [4 /*yield*/, ensureAllowanceEstimateGas([this.lpToken], [curve.formatUnits(_maxBurnAmount, 18)], this.zap)];
                    case 2: return [2 /*return*/, _c.sent()];
                    case 3: return [2 /*return*/, 0];
                }
            });
        });
    };
    PoolTemplate.prototype.withdrawImbalanceApprove = function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            var _amounts, _maxBurnAmount;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.isCrypto)
                            throw Error("withdrawImbalanceApprove method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
                        if (!this.zap) return [3 /*break*/, 3];
                        _amounts = amounts.map(function (amount, i) { return parseUnits(amount, _this.underlyingDecimals[i]); });
                        return [4 /*yield*/, this._calcLpTokenAmount(_amounts, false)];
                    case 1:
                        _maxBurnAmount = (_c.sent()) * curve.parseUnits("101", 0) / curve.parseUnits("100", 0);
                        return [4 /*yield*/, ensureAllowance([this.lpToken], [curve.formatUnits(_maxBurnAmount, 18)], this.zap)];
                    case 2: return [2 /*return*/, _c.sent()];
                    case 3: return [2 /*return*/, []];
                }
            });
        });
    };
    // OVERRIDE
    PoolTemplate.prototype.withdrawImbalanceEstimateGas = function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                throw Error("withdrawImbalance method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
            });
        });
    };
    // OVERRIDE
    PoolTemplate.prototype.withdrawImbalance = function (amounts, slippage) {
        if (slippage === void 0) { slippage = 0.5; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                throw Error("withdrawImbalance method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
            });
        });
    };
    // ---------------- WITHDRAW IMBALANCE WRAPPED ----------------
    PoolTemplate.prototype.withdrawImbalanceWrappedExpected = function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (this.isCrypto || this.isPlain || this.isFake)
                            throw Error("withdrawImbalanceWrappedExpected method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
                        return [4 /*yield*/, this.calcLpTokenAmountWrapped(amounts, false)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    PoolTemplate.prototype.withdrawImbalanceWrappedBonus = function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            var prices, value, lpTokenAmount, _c, balancedAmounts, balancedValue;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this._wrappedPrices()];
                    case 1:
                        prices = _d.sent();
                        value = amounts.map(checkNumber).map(Number).reduce(function (s, a, i) { return s + (a * prices[i]); }, 0);
                        _c = Number;
                        return [4 /*yield*/, this.withdrawImbalanceWrappedExpected(amounts)];
                    case 2:
                        lpTokenAmount = _c.apply(void 0, [_d.sent()]);
                        return [4 /*yield*/, this.withdrawWrappedExpected(lpTokenAmount)];
                    case 3:
                        balancedAmounts = _d.sent();
                        balancedValue = balancedAmounts.map(Number).reduce(function (s, a, i) { return s + (a * prices[i]); }, 0);
                        return [2 /*return*/, String((value - balancedValue) / balancedValue * 100)];
                }
            });
        });
    };
    // OVERRIDE
    PoolTemplate.prototype.withdrawImbalanceWrappedEstimateGas = function (amounts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                throw Error("withdrawImbalanceWrapped method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
            });
        });
    };
    // OVERRIDE
    PoolTemplate.prototype.withdrawImbalanceWrapped = function (amounts, slippage) {
        if (slippage === void 0) { slippage = 0.5; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                throw Error("withdrawImbalanceWrapped method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
            });
        });
    };
    // ---------------- WITHDRAW ONE COIN ----------------
    // OVERRIDE
    PoolTemplate.prototype._withdrawOneCoinExpected = function (_lpTokenAmount, i) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                throw Error("withdrawOneCoinExpected method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
            });
        });
    };
    PoolTemplate.prototype.withdrawOneCoinExpected = function (lpTokenAmount, coin) {
        return __awaiter(this, void 0, void 0, function () {
            var i, _lpTokenAmount, _expected;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        i = this._getCoinIdx(coin);
                        _lpTokenAmount = parseUnits(lpTokenAmount);
                        return [4 /*yield*/, this._withdrawOneCoinExpected(_lpTokenAmount, i)];
                    case 1:
                        _expected = _c.sent();
                        return [2 /*return*/, curve.formatUnits(_expected, this.underlyingDecimals[i])];
                }
            });
        });
    };
    PoolTemplate.prototype.withdrawOneCoinBonus = function (lpTokenAmount, coin) {
        return __awaiter(this, void 0, void 0, function () {
            var prices, isUseStoredRates, result, coinPrice, amount, _c, value, balancedAmounts, balancedValue;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        prices = [];
                        isUseStoredRates = isMethodExist(curve.contracts[this.address].contract, 'stored_rates') && this.isPlain;
                        if (!(this.isCrypto || this.id === 'wsteth')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._underlyingPrices()];
                    case 1:
                        prices = _d.sent();
                        return [3 /*break*/, 5];
                    case 2:
                        if (!isUseStoredRates) return [3 /*break*/, 4];
                        return [4 /*yield*/, this._stored_rates()];
                    case 3:
                        result = _d.sent();
                        result.forEach(function (item, index) {
                            prices.push(Number(item) / (Math.pow(10, (36 - _this.underlyingDecimals[index]))));
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        prices = this.underlyingCoins.map(function () { return 1; });
                        _d.label = 5;
                    case 5:
                        coinPrice = prices[this._getCoinIdx(coin)];
                        _c = Number;
                        return [4 /*yield*/, this.withdrawOneCoinExpected(lpTokenAmount, coin)];
                    case 6:
                        amount = _c.apply(void 0, [_d.sent()]);
                        value = amount * coinPrice;
                        return [4 /*yield*/, this.withdrawExpected(lpTokenAmount)];
                    case 7:
                        balancedAmounts = _d.sent();
                        balancedValue = balancedAmounts.map(Number).reduce(function (s, a, i) { return s + (a * prices[i]); }, 0);
                        return [2 /*return*/, String((value - balancedValue) / balancedValue * 100)];
                }
            });
        });
    };
    PoolTemplate.prototype.withdrawOneCoinIsApproved = function (lpTokenAmount) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.zap)
                            return [2 /*return*/, true];
                        return [4 /*yield*/, hasAllowance([this.lpToken], [lpTokenAmount], curve.signerAddress, this.zap)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    PoolTemplate.prototype.withdrawOneCoinApproveEstimateGas = function (lpTokenAmount) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.zap)
                            return [2 /*return*/, 0];
                        return [4 /*yield*/, ensureAllowanceEstimateGas([this.lpToken], [lpTokenAmount], this.zap)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    PoolTemplate.prototype.withdrawOneCoinApprove = function (lpTokenAmount) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.zap)
                            return [2 /*return*/, []];
                        return [4 /*yield*/, ensureAllowance([this.lpToken], [lpTokenAmount], this.zap)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    // OVERRIDE
    PoolTemplate.prototype.withdrawOneCoinEstimateGas = function (lpTokenAmount, coin) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                throw Error("withdrawOneCoin method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
            });
        });
    };
    // OVERRIDE
    PoolTemplate.prototype.withdrawOneCoin = function (lpTokenAmount, coin, slippage) {
        if (slippage === void 0) { slippage = 0.5; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                throw Error("withdrawOneCoin method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
            });
        });
    };
    // ---------------- WITHDRAW ONE COIN WRAPPED ----------------
    // OVERRIDE
    PoolTemplate.prototype._withdrawOneCoinWrappedExpected = function (_lpTokenAmount, i) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                throw Error("withdrawOneCoinWrappedExpected method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
            });
        });
    };
    PoolTemplate.prototype.withdrawOneCoinWrappedExpected = function (lpTokenAmount, coin) {
        return __awaiter(this, void 0, void 0, function () {
            var i, _lpTokenAmount, _expected;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        i = this._getCoinIdx(coin, false);
                        _lpTokenAmount = parseUnits(lpTokenAmount);
                        return [4 /*yield*/, this._withdrawOneCoinWrappedExpected(_lpTokenAmount, i)];
                    case 1:
                        _expected = _c.sent();
                        return [2 /*return*/, curve.formatUnits(_expected, this.wrappedDecimals[i])];
                }
            });
        });
    };
    PoolTemplate.prototype.withdrawOneCoinWrappedBonus = function (lpTokenAmount, coin) {
        return __awaiter(this, void 0, void 0, function () {
            var prices, coinPrice, amount, _c, value, balancedAmounts, balancedValue;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this._wrappedPrices()];
                    case 1:
                        prices = _d.sent();
                        coinPrice = prices[this._getCoinIdx(coin, false)];
                        _c = Number;
                        return [4 /*yield*/, this.withdrawOneCoinWrappedExpected(lpTokenAmount, coin)];
                    case 2:
                        amount = _c.apply(void 0, [_d.sent()]);
                        value = amount * coinPrice;
                        return [4 /*yield*/, this.withdrawWrappedExpected(lpTokenAmount)];
                    case 3:
                        balancedAmounts = _d.sent();
                        balancedValue = balancedAmounts.map(Number).reduce(function (s, a, i) { return s + (a * prices[i]); }, 0);
                        return [2 /*return*/, String((value - balancedValue) / balancedValue * 100)];
                }
            });
        });
    };
    // OVERRIDE
    PoolTemplate.prototype.withdrawOneCoinWrappedEstimateGas = function (lpTokenAmount, coin) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                throw Error("withdrawOneCoinWrapped method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
            });
        });
    };
    // OVERRIDE
    PoolTemplate.prototype.withdrawOneCoinWrapped = function (lpTokenAmount, coin, slippage) {
        if (slippage === void 0) { slippage = 0.5; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                throw Error("withdrawOneCoinWrapped method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
            });
        });
    };
    // ---------------- WALLET BALANCES ----------------
    PoolTemplate.prototype.walletBalances = function () {
        var addresses = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            addresses[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!(this.gauge.address === curve.constants.ZERO_ADDRESS)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._balances.apply(this, __spreadArray([__spreadArray(__spreadArray(['lpToken'], this.underlyingCoinAddresses, true), this.wrappedCoinAddresses, true), __spreadArray(__spreadArray([this.lpToken], this.underlyingCoinAddresses, true), this.wrappedCoinAddresses, true)], addresses, false))];
                    case 1: return [2 /*return*/, _c.sent()];
                    case 2: return [4 /*yield*/, this._balances.apply(this, __spreadArray([__spreadArray(__spreadArray(['lpToken', 'gauge'], this.underlyingCoinAddresses, true), this.wrappedCoinAddresses, true), __spreadArray(__spreadArray([this.lpToken, this.gauge.address], this.underlyingCoinAddresses, true), this.wrappedCoinAddresses, true)], addresses, false))];
                    case 3: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    PoolTemplate.prototype.walletLpTokenBalances = function () {
        var addresses = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            addresses[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!(this.gauge.address === curve.constants.ZERO_ADDRESS)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._balances.apply(this, __spreadArray([['lpToken'], [this.lpToken]], addresses, false))];
                    case 1: return [2 /*return*/, _c.sent()];
                    case 2: return [4 /*yield*/, this._balances.apply(this, __spreadArray([['lpToken', 'gauge'], [this.lpToken, this.gauge.address]], addresses, false))];
                    case 3: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    PoolTemplate.prototype.walletUnderlyingCoinBalances = function () {
        var addresses = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            addresses[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this._balances.apply(this, __spreadArray([this.underlyingCoinAddresses, this.underlyingCoinAddresses], addresses, false))];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    PoolTemplate.prototype.walletWrappedCoinBalances = function () {
        var addresses = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            addresses[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this._balances.apply(this, __spreadArray([this.wrappedCoinAddresses, this.wrappedCoinAddresses], addresses, false))];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    PoolTemplate.prototype.walletAllCoinBalances = function () {
        var addresses = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            addresses[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this._balances.apply(this, __spreadArray([__spreadArray(__spreadArray([], this.underlyingCoinAddresses, true), this.wrappedCoinAddresses, true), __spreadArray(__spreadArray([], this.underlyingCoinAddresses, true), this.wrappedCoinAddresses, true)], addresses, false))];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    // ---------------- USER BALANCES, BASE PROFIT AND SHARE ----------------
    PoolTemplate.prototype._userLpTotalBalance = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var lpBalances, lpTotalBalanceBN;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.walletLpTokenBalances(address)];
                    case 1:
                        lpBalances = _c.sent();
                        lpTotalBalanceBN = BN(lpBalances.lpToken);
                        if ('gauge' in lpBalances)
                            lpTotalBalanceBN = lpTotalBalanceBN.plus(BN(lpBalances.gauge));
                        return [2 /*return*/, lpTotalBalanceBN];
                }
            });
        });
    };
    PoolTemplate.prototype.userBalances = function (address) {
        if (address === void 0) { address = ""; }
        return __awaiter(this, void 0, void 0, function () {
            var lpTotalBalanceBN;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        address = address || curve.signerAddress;
                        if (!address)
                            throw Error("Need to connect wallet or pass address into args");
                        return [4 /*yield*/, this._userLpTotalBalance(address)];
                    case 1:
                        lpTotalBalanceBN = _c.sent();
                        if (lpTotalBalanceBN.eq(0))
                            return [2 /*return*/, this.underlyingCoins.map(function () { return "0"; })];
                        return [4 /*yield*/, this.withdrawExpected(lpTotalBalanceBN.toFixed(18))];
                    case 2: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    PoolTemplate.prototype.userWrappedBalances = function (address) {
        if (address === void 0) { address = ""; }
        return __awaiter(this, void 0, void 0, function () {
            var lpTotalBalanceBN;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        address = address || curve.signerAddress;
                        if (!address)
                            throw Error("Need to connect wallet or pass address into args");
                        return [4 /*yield*/, this._userLpTotalBalance(address)];
                    case 1:
                        lpTotalBalanceBN = _c.sent();
                        if (lpTotalBalanceBN.eq(0))
                            return [2 /*return*/, this.wrappedCoins.map(function () { return "0"; })];
                        return [4 /*yield*/, this.withdrawWrappedExpected(lpTotalBalanceBN.toFixed(18))];
                    case 2: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    PoolTemplate.prototype.userLiquidityUSD = function (address) {
        if (address === void 0) { address = ""; }
        return __awaiter(this, void 0, void 0, function () {
            var lpBalanceBN, lpPrice;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this._userLpTotalBalance(address)];
                    case 1:
                        lpBalanceBN = _c.sent();
                        return [4 /*yield*/, _getUsdRate(this.lpToken)];
                    case 2:
                        lpPrice = _c.sent();
                        return [2 /*return*/, lpBalanceBN.times(lpPrice).toFixed(8)];
                }
            });
        });
    };
    PoolTemplate.prototype.baseProfit = function (address) {
        if (address === void 0) { address = ""; }
        return __awaiter(this, void 0, void 0, function () {
            var apyData, apyBN, totalLiquidityBN, _c, annualProfitBN, monthlyProfitBN, weeklyProfitBN, dailyProfitBN;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.statsBaseApy()];
                    case 1:
                        apyData = _d.sent();
                        if (!('week' in apyData))
                            return [2 /*return*/, { day: "0", week: "0", month: "0", year: "0" }];
                        apyBN = BN(apyData.week).div(100);
                        _c = BN;
                        return [4 /*yield*/, this.userLiquidityUSD(address)];
                    case 2:
                        totalLiquidityBN = _c.apply(void 0, [_d.sent()]);
                        annualProfitBN = apyBN.times(totalLiquidityBN);
                        monthlyProfitBN = annualProfitBN.div(12);
                        weeklyProfitBN = annualProfitBN.div(52);
                        dailyProfitBN = annualProfitBN.div(365);
                        return [2 /*return*/, {
                                day: dailyProfitBN.toString(),
                                week: weeklyProfitBN.toString(),
                                month: monthlyProfitBN.toString(),
                                year: annualProfitBN.toString(),
                            }];
                }
            });
        });
    };
    PoolTemplate.prototype.userShare = function (address) {
        if (address === void 0) { address = ""; }
        return __awaiter(this, void 0, void 0, function () {
            var withGauge, userLpBalance, userLpTotalBalanceBN, totalLp, gaugeLp, _c, _d;
            var _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        withGauge = this.gauge.address !== curve.constants.ZERO_ADDRESS;
                        address = address || curve.signerAddress;
                        if (!address)
                            throw Error("Need to connect wallet or pass address into args");
                        return [4 /*yield*/, this.walletLpTokenBalances(address)];
                    case 1:
                        userLpBalance = _f.sent();
                        userLpTotalBalanceBN = BN(userLpBalance.lpToken);
                        if (withGauge)
                            userLpTotalBalanceBN = userLpTotalBalanceBN.plus(BN(userLpBalance.gauge));
                        if (!withGauge) return [3 /*break*/, 3];
                        return [4 /*yield*/, curve.multicallProvider.all([
                                curve.contracts[this.lpToken].multicallContract.totalSupply(),
                                curve.contracts[this.gauge.address].multicallContract.totalSupply(),
                            ])];
                    case 2:
                        _e = (_f.sent()).map(function (_supply) { return curve.formatUnits(_supply); }), totalLp = _e[0], gaugeLp = _e[1];
                        return [3 /*break*/, 5];
                    case 3:
                        _d = (_c = curve).formatUnits;
                        return [4 /*yield*/, curve.contracts[this.lpToken].contract.totalSupply(curve.constantOptions)];
                    case 4:
                        totalLp = _d.apply(_c, [_f.sent()]);
                        _f.label = 5;
                    case 5: return [2 /*return*/, {
                            lpUser: userLpTotalBalanceBN.toString(),
                            lpTotal: totalLp,
                            lpShare: BN(totalLp).gt(0) ? userLpTotalBalanceBN.div(totalLp).times(100).toString() : '0',
                            gaugeUser: userLpBalance.gauge,
                            gaugeTotal: gaugeLp,
                            gaugeShare: !withGauge ? undefined : BN(gaugeLp).gt(0) ? BN(userLpBalance.gauge).div(gaugeLp).times(100).toString() : '0',
                        }];
                }
            });
        });
    };
    // ---------------- SWAP ----------------
    PoolTemplate.prototype._swapExpected = function (i, j, _amount) {
        return __awaiter(this, void 0, void 0, function () {
            var contractAddress, contract;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        contractAddress = this.isCrypto && this.isMeta ? this.zap : this.address;
                        contract = curve.contracts[contractAddress].contract;
                        if (!('get_dy_underlying' in contract)) return [3 /*break*/, 2];
                        return [4 /*yield*/, contract.get_dy_underlying(i, j, _amount, curve.constantOptions)];
                    case 1: return [2 /*return*/, _c.sent()];
                    case 2:
                        if (!('get_dy(address,uint256,uint256,uint256)' in contract)) return [3 /*break*/, 4];
                        return [4 /*yield*/, contract.get_dy(this.address, i, j, _amount, curve.constantOptions)];
                    case 3: // atricrypto3 based metapools
                    return [2 /*return*/, _c.sent()];
                    case 4: return [4 /*yield*/, contract.get_dy(i, j, _amount, curve.constantOptions)];
                    case 5: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    PoolTemplate.prototype.swapExpected = function (inputCoin, outputCoin, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var i, j, _amount, _expected;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        i = this._getCoinIdx(inputCoin);
                        j = this._getCoinIdx(outputCoin);
                        _amount = parseUnits(amount, this.underlyingDecimals[i]);
                        return [4 /*yield*/, this._swapExpected(i, j, _amount)];
                    case 1:
                        _expected = _c.sent();
                        return [2 /*return*/, curve.formatUnits(_expected, this.underlyingDecimals[j])];
                }
            });
        });
    };
    PoolTemplate.prototype._swapRequired = function (i, j, _amount, isUnderlying) {
        return __awaiter(this, void 0, void 0, function () {
            var contract, basePool, secondPool, contract_1, contract, basePool;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.isCrypto) return [3 /*break*/, 11];
                        if (!this.isNg) return [3 /*break*/, 2];
                        return [4 /*yield*/, curve.contracts[this.address].contract.get_dx(i, j, _amount, curve.constantOptions)];
                    case 1: return [2 /*return*/, _c.sent()];
                    case 2:
                        contract = curve.contracts[curve.constants.ALIASES.crypto_calc].contract;
                        if (!(this.isMeta && isUnderlying)) return [3 /*break*/, 8];
                        basePool = new PoolTemplate(this.basePool);
                        if (!(this.wrappedCoins.length === 3)) return [3 /*break*/, 4];
                        return [4 /*yield*/, contract.get_dx_tricrypto_meta_underlying(this.address, i, j, _amount, this.wrappedCoins.length, basePool.address, basePool.lpToken, curve.constantOptions)];
                    case 3: return [2 /*return*/, _c.sent()];
                    case 4:
                        if (!basePool.isFake) return [3 /*break*/, 6];
                        secondPool = new PoolTemplate(basePool.basePool);
                        return [4 /*yield*/, contract.get_dx_double_meta_underlying(this.address, i, j, _amount, basePool.address, basePool.zap, secondPool.address, secondPool.lpToken, curve.constantOptions)];
                    case 5: return [2 /*return*/, _c.sent()];
                    case 6: return [4 /*yield*/, contract.get_dx_meta_underlying(this.address, i, j, _amount, this.underlyingCoins.length, basePool.address, basePool.lpToken, curve.constantOptions)];
                    case 7: return [2 /*return*/, _c.sent()];
                    case 8: return [4 /*yield*/, contract.get_dx(this.address, i, j, _amount, this.wrappedCoins.length, curve.constantOptions)];
                    case 9: return [2 /*return*/, _c.sent()];
                    case 10: return [3 /*break*/, 27];
                    case 11:
                        if (!this.isNg) return [3 /*break*/, 18];
                        contract_1 = curve.contracts[this.address].contract;
                        if (!this.isMeta) return [3 /*break*/, 16];
                        if (!isUnderlying) return [3 /*break*/, 13];
                        return [4 /*yield*/, contract_1.get_dx_underlying(i, j, _amount, curve.constantOptions)];
                    case 12: return [2 /*return*/, _c.sent()];
                    case 13: return [4 /*yield*/, contract_1.get_dx(i, j, _amount, curve.constantOptions)];
                    case 14: return [2 /*return*/, _c.sent()];
                    case 15: return [3 /*break*/, 18];
                    case 16: return [4 /*yield*/, contract_1.get_dx(i, j, _amount, curve.constantOptions)];
                    case 17: return [2 /*return*/, _c.sent()];
                    case 18:
                        contract = curve.contracts[curve.constants.ALIASES.stable_calc].contract;
                        if (!this.isMeta) return [3 /*break*/, 23];
                        basePool = new PoolTemplate(this.basePool);
                        if (!isUnderlying) return [3 /*break*/, 20];
                        return [4 /*yield*/, contract.get_dx_meta_underlying(this.address, i, j, _amount, this.underlyingCoins.length, basePool.address, basePool.lpToken, curve.constantOptions)];
                    case 19: return [2 /*return*/, _c.sent()];
                    case 20: return [4 /*yield*/, contract.get_dx_meta(this.address, i, j, _amount, this.wrappedCoins.length, basePool.address, curve.constantOptions)];
                    case 21: return [2 /*return*/, _c.sent()];
                    case 22: return [3 /*break*/, 27];
                    case 23:
                        if (!(isUnderlying && this.isLending)) return [3 /*break*/, 25];
                        return [4 /*yield*/, contract.get_dx_underlying(this.address, i, j, _amount, this.underlyingCoins.length, curve.constantOptions)];
                    case 24: return [2 /*return*/, _c.sent()];
                    case 25: return [4 /*yield*/, contract.get_dx(this.address, i, j, _amount, this.wrappedCoins.length, curve.constantOptions)];
                    case 26: return [2 /*return*/, _c.sent()];
                    case 27: return [2 /*return*/];
                }
            });
        });
    };
    PoolTemplate.prototype.swapRequired = function (inputCoin, outputCoin, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var i, j, _amount, _required;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        i = this._getCoinIdx(inputCoin);
                        j = this._getCoinIdx(outputCoin);
                        _amount = parseUnits(amount, this.underlyingDecimals[j]);
                        return [4 /*yield*/, this._swapRequired(i, j, _amount, true)];
                    case 1:
                        _required = _c.sent();
                        return [2 /*return*/, curve.formatUnits(_required, this.underlyingDecimals[i])];
                }
            });
        });
    };
    // OVERRIDE
    PoolTemplate.prototype.swapWrappedRequired = function (inputCoin, outputCoin, amount) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                throw Error("swapWrappedRequired method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
            });
        });
    };
    PoolTemplate.prototype.swapPriceImpact = function (inputCoin, outputCoin, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var i, j, _c, inputCoinDecimals, outputCoinDecimals, _amount, _output, smallAmountIntBN, amountIntBN, _smallAmount, _smallOutput, priceImpactBN;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        i = this._getCoinIdx(inputCoin);
                        j = this._getCoinIdx(outputCoin);
                        _c = [this.underlyingDecimals[i], this.underlyingDecimals[j]], inputCoinDecimals = _c[0], outputCoinDecimals = _c[1];
                        _amount = parseUnits(amount, inputCoinDecimals);
                        return [4 /*yield*/, this._swapExpected(i, j, _amount)];
                    case 1:
                        _output = _d.sent();
                        smallAmountIntBN = _get_small_x(_amount, _output, inputCoinDecimals, outputCoinDecimals);
                        amountIntBN = toBN(_amount, 0);
                        if (smallAmountIntBN.gte(amountIntBN))
                            return [2 /*return*/, 0];
                        _smallAmount = fromBN(smallAmountIntBN.div(Math.pow(10, inputCoinDecimals)), inputCoinDecimals);
                        return [4 /*yield*/, this._swapExpected(i, j, _smallAmount)];
                    case 2:
                        _smallOutput = _d.sent();
                        priceImpactBN = _get_price_impact(_amount, _output, _smallAmount, _smallOutput, inputCoinDecimals, outputCoinDecimals);
                        return [2 /*return*/, Number(_cutZeros(priceImpactBN.toFixed(4)))];
                }
            });
        });
    };
    PoolTemplate.prototype._swapContractAddress = function () {
        return (this.isCrypto && this.isMeta) || (this.isMetaFactory && (new PoolTemplate(this.basePool).isLending)) ? this.zap : this.address;
    };
    PoolTemplate.prototype.swapIsApproved = function (inputCoin, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var contractAddress, i;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        contractAddress = this._swapContractAddress();
                        i = this._getCoinIdx(inputCoin);
                        return [4 /*yield*/, hasAllowance([this.underlyingCoinAddresses[i]], [amount], curve.signerAddress, contractAddress)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    PoolTemplate.prototype.swapApproveEstimateGas = function (inputCoin, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var contractAddress, i;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        contractAddress = this._swapContractAddress();
                        i = this._getCoinIdx(inputCoin);
                        return [4 /*yield*/, ensureAllowanceEstimateGas([this.underlyingCoinAddresses[i]], [amount], contractAddress)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    PoolTemplate.prototype.swapApprove = function (inputCoin, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var contractAddress, i;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        contractAddress = this._swapContractAddress();
                        i = this._getCoinIdx(inputCoin);
                        return [4 /*yield*/, ensureAllowance([this.underlyingCoinAddresses[i]], [amount], contractAddress)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    // OVERRIDE
    PoolTemplate.prototype.swapEstimateGas = function (inputCoin, outputCoin, amount) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                throw Error("swap method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
            });
        });
    };
    // OVERRIDE
    PoolTemplate.prototype.swap = function (inputCoin, outputCoin, amount, slippage) {
        if (slippage === void 0) { slippage = 0.5; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                throw Error("swap method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
            });
        });
    };
    // ---------------- SWAP WRAPPED ----------------
    PoolTemplate.prototype._swapWrappedExpected = function (i, j, _amount) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, curve.contracts[this.address].contract.get_dy(i, j, _amount, curve.constantOptions)];
                    case 1: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    // OVERRIDE
    PoolTemplate.prototype.swapWrappedExpected = function (inputCoin, outputCoin, amount) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                throw Error("swapWrappedExpected method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
            });
        });
    };
    PoolTemplate.prototype.swapWrappedPriceImpact = function (inputCoin, outputCoin, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var i, j, _c, inputCoinDecimals, outputCoinDecimals, _amount, _output, smallAmountIntBN, amountIntBN, _smallAmount, _smallOutput, priceImpactBN;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (this.isPlain || this.isFake) {
                            throw Error("swapWrappedPriceImpact method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
                        }
                        i = this._getCoinIdx(inputCoin, false);
                        j = this._getCoinIdx(outputCoin, false);
                        _c = [this.wrappedDecimals[i], this.wrappedDecimals[j]], inputCoinDecimals = _c[0], outputCoinDecimals = _c[1];
                        _amount = parseUnits(amount, inputCoinDecimals);
                        return [4 /*yield*/, this._swapWrappedExpected(i, j, _amount)];
                    case 1:
                        _output = _d.sent();
                        smallAmountIntBN = _get_small_x(_amount, _output, inputCoinDecimals, outputCoinDecimals);
                        amountIntBN = toBN(_amount, 0);
                        if (smallAmountIntBN.gte(amountIntBN))
                            return [2 /*return*/, 0];
                        _smallAmount = fromBN(smallAmountIntBN.div(Math.pow(10, inputCoinDecimals)), inputCoinDecimals);
                        return [4 /*yield*/, this._swapWrappedExpected(i, j, _smallAmount)];
                    case 2:
                        _smallOutput = _d.sent();
                        priceImpactBN = _get_price_impact(_amount, _output, _smallAmount, _smallOutput, inputCoinDecimals, outputCoinDecimals);
                        return [2 /*return*/, Number(_cutZeros(priceImpactBN.toFixed(4)))];
                }
            });
        });
    };
    // OVERRIDE
    PoolTemplate.prototype.swapWrappedIsApproved = function (inputCoin, amount) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                throw Error("swapWrappedIsApproved method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
            });
        });
    };
    // OVERRIDE
    PoolTemplate.prototype.swapWrappedApproveEstimateGas = function (inputCoin, amount) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                throw Error("swapWrappedApprove method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
            });
        });
    };
    // OVERRIDE
    PoolTemplate.prototype.swapWrappedApprove = function (inputCoin, amount) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                throw Error("swapWrappedApprove method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
            });
        });
    };
    // OVERRIDE
    PoolTemplate.prototype.swapWrappedEstimateGas = function (inputCoin, outputCoin, amount) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                throw Error("swapWrapped method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
            });
        });
    };
    // OVERRIDE
    PoolTemplate.prototype.swapWrapped = function (inputCoin, outputCoin, amount, slippage) {
        if (slippage === void 0) { slippage = 0.5; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                throw Error("swapWrapped method doesn't exist for pool ".concat(this.name, " (id: ").concat(this.name, ")"));
            });
        });
    };
    PoolTemplate.prototype.getGaugeStatus = function () {
        return __awaiter(this, void 0, void 0, function () {
            var gaugeData;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, _getAllGaugesFormatted()];
                    case 1:
                        gaugeData = _c.sent();
                        return [2 /*return*/, gaugeData[this.gauge.address] ? gaugeData[this.gauge.address].gaugeStatus : null];
                }
            });
        });
    };
    PoolTemplate.prototype.getIsGaugeKilled = function () {
        return __awaiter(this, void 0, void 0, function () {
            var gaugeData;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, _getAllGaugesFormatted()];
                    case 1:
                        gaugeData = _c.sent();
                        return [2 /*return*/, gaugeData[this.gauge.address] ? gaugeData[this.gauge.address].is_killed : false];
                }
            });
        });
    };
    return PoolTemplate;
}());
export { PoolTemplate };
