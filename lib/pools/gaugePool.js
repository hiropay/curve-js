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
import { curve } from "../curve.js";
import { DIGas, ensureAllowance, ensureAllowanceEstimateGas, getCoinsData, hasAllowance, mulBy1_3, parseUnits, smartNumber, } from "../utils.js";
var GaugePool = /** @class */ (function () {
    function GaugePool(address, poolName) {
        this.address = address;
        this.poolName = poolName;
        this.estimateGas = {
            addReward: this.addRewardEstimateGas.bind(this),
            depositRewardApprove: this.depositRewardApproveEstimateGas.bind(this),
            depositReward: this.depositRewardEstimateGas.bind(this),
        };
    }
    GaugePool.prototype.gaugeManager = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(!this.address || this.address === curve.constants.ZERO_ADDRESS)) return [3 /*break*/, 1];
                        return [2 /*return*/, curve.constants.ZERO_ADDRESS];
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, curve.contracts[this.address].contract.manager()];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        e_1 = _a.sent();
                        return [2 /*return*/, curve.constants.ZERO_ADDRESS];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GaugePool.prototype.gaugeDistributors = function () {
        return __awaiter(this, void 0, void 0, function () {
            var gaugeContract, gaugeMulticallContract, rewardCount, _a, _b, _c, calls, i, rewardTokens, i, rewardData, gaugeDistributors, i;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, curve.contracts[this.address].contract];
                    case 1:
                        gaugeContract = _d.sent();
                        return [4 /*yield*/, curve.contracts[this.address].multicallContract];
                    case 2:
                        gaugeMulticallContract = _d.sent();
                        _a = Number;
                        _c = (_b = curve).formatUnits;
                        return [4 /*yield*/, gaugeContract.reward_count(curve.constantOptions)];
                    case 3:
                        rewardCount = _a.apply(void 0, [_c.apply(_b, [_d.sent(), 0])]);
                        calls = [];
                        for (i = 0; i < rewardCount; i++) {
                            calls.push(gaugeMulticallContract.reward_tokens(i));
                        }
                        return [4 /*yield*/, curve.multicallProvider.all(calls)];
                    case 4:
                        rewardTokens = _d.sent();
                        calls = [];
                        for (i = 0; i < rewardCount; i++) {
                            calls.push(gaugeMulticallContract.reward_data(rewardTokens[i]));
                        }
                        return [4 /*yield*/, curve.multicallProvider.all(calls)];
                    case 5:
                        rewardData = _d.sent();
                        gaugeDistributors = {};
                        for (i = 0; i < rewardCount; i++) {
                            gaugeDistributors[rewardTokens[i]] = rewardData[i].distributor;
                        }
                        return [2 /*return*/, gaugeDistributors];
                }
            });
        });
    };
    GaugePool.prototype.gaugeVersion = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(!this.address || this.address === curve.constants.ZERO_ADDRESS)) return [3 /*break*/, 1];
                        return [2 /*return*/, null];
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, curve.contracts[this.address].contract.version()];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        e_2 = _a.sent();
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    GaugePool.prototype._addReward = function (_reward_token, _distributor, estimateGas) {
        if (estimateGas === void 0) { estimateGas = false; }
        return __awaiter(this, void 0, void 0, function () {
            var gas, gasLimit;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.address !== curve.constants.ZERO_ADDRESS && this.address)) return [3 /*break*/, 3];
                        return [4 /*yield*/, curve.contracts[this.address].contract.add_reward.estimateGas(_reward_token, _distributor, __assign({}, curve.constantOptions))];
                    case 1:
                        gas = _a.sent();
                        if (estimateGas)
                            return [2 /*return*/, smartNumber(gas)];
                        gasLimit = mulBy1_3(DIGas(gas));
                        return [4 /*yield*/, curve.contracts[this.address].contract.add_reward(_reward_token, _distributor, __assign(__assign({}, curve.options), { gasLimit: gasLimit }))];
                    case 2: return [2 /*return*/, (_a.sent()).hash];
                    case 3: throw Error("Pool ".concat(this.poolName, " does not have gauge"));
                }
            });
        });
    };
    GaugePool.prototype.addRewardEstimateGas = function (rewardToken, distributor) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._addReward(rewardToken, distributor, true)];
                    case 1: 
                    // @ts-ignore
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    GaugePool.prototype.addReward = function (rewardToken, distributor) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._addReward(rewardToken, distributor)];
                    case 1: 
                    // @ts-ignore
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    GaugePool.prototype.isDepositRewardAvailable = function () {
        return __awaiter(this, void 0, void 0, function () {
            var versionsWithDepositReward, version;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        versionsWithDepositReward = ['v6.1.0'];
                        return [4 /*yield*/, this.gaugeVersion()];
                    case 1:
                        version = _a.sent();
                        return [2 /*return*/, version ? versionsWithDepositReward.includes(version) : Boolean(version)];
                }
            });
        });
    };
    GaugePool.prototype.depositRewardIsApproved = function (rewardToken, amount) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, hasAllowance([rewardToken], [amount], curve.signerAddress, this.address)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    GaugePool.prototype.depositRewardApproveEstimateGas = function (rewardToken, amount) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ensureAllowanceEstimateGas([rewardToken], [amount], this.address)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    GaugePool.prototype.depositRewardApprove = function (rewardToken, amount) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ensureAllowance([rewardToken], [amount], this.address)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    GaugePool.prototype._depositReward = function (rewardToken, amount, epoch, estimateGas) {
        if (estimateGas === void 0) { estimateGas = false; }
        return __awaiter(this, void 0, void 0, function () {
            var contract, decimals, _amount, gas, gasLimit;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!estimateGas) return [3 /*break*/, 2];
                        return [4 /*yield*/, ensureAllowance([rewardToken], [amount], this.address)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        contract = curve.contracts[this.address].contract;
                        return [4 /*yield*/, getCoinsData(rewardToken)];
                    case 3:
                        decimals = (_a.sent())[0].decimals;
                        _amount = parseUnits(amount, decimals);
                        return [4 /*yield*/, contract.deposit_reward_token.estimateGas(rewardToken, _amount, epoch, __assign({}, curve.constantOptions))];
                    case 4:
                        gas = _a.sent();
                        if (estimateGas)
                            return [2 /*return*/, smartNumber(gas)];
                        gasLimit = mulBy1_3(DIGas(gas));
                        return [4 /*yield*/, contract.deposit_reward_token(rewardToken, _amount, epoch, __assign(__assign({}, curve.options), { gasLimit: gasLimit }))];
                    case 5: return [2 /*return*/, (_a.sent()).hash];
                }
            });
        });
    };
    GaugePool.prototype.depositRewardEstimateGas = function (rewardToken, amount, epoch) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._depositReward(rewardToken, amount, epoch, true)];
                    case 1: 
                    // @ts-ignore
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    GaugePool.prototype.depositReward = function (rewardToken, amount, epoch) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._depositReward(rewardToken, amount, epoch)];
                    case 1: 
                    // @ts-ignore
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return GaugePool;
}());
export { GaugePool };
