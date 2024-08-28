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
import { curve } from "./curve.js";
import { Contract } from "ethers";
import { _getAllGauges, _getDaoProposalList, _getDaoProposal } from './external-api.js';
import { _getAddress, DIGas, ensureAllowance, ensureAllowanceEstimateGas, hasAllowance, mulBy1_3, parseUnits, smartNumber, toBN, BN, } from './utils.js';
import feeDistributorViewABI from "./constants/abis/fee_distributor_view.json" assert { type: 'json' };
// ----------------- Refactored boosting stuff -----------------
export var crvSupplyStats = function () { return __awaiter(void 0, void 0, void 0, function () {
    var crvContract, veContract, csContract, _a, _circulating, _locked, _veCrv;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (curve.chainId !== 1)
                    throw Error("Ethereum-only method");
                crvContract = curve.contracts[curve.constants.ALIASES.crv].multicallContract;
                veContract = curve.contracts[curve.constants.ALIASES.voting_escrow].multicallContract;
                csContract = curve.contracts[curve.constants.ALIASES.circulating_supply].multicallContract;
                return [4 /*yield*/, curve.multicallProvider.all([
                        csContract.circulating_supply(),
                        crvContract.balanceOf(curve.constants.ALIASES.voting_escrow),
                        veContract.totalSupply(),
                    ])];
            case 1:
                _a = _b.sent(), _circulating = _a[0], _locked = _a[1], _veCrv = _a[2];
                return [2 /*return*/, {
                        circulating: curve.formatUnits(_circulating),
                        locked: curve.formatUnits(_locked),
                        total: curve.formatUnits(_circulating + _locked),
                        veCrv: curve.formatUnits(_veCrv),
                        averageLockTime: toBN(_veCrv).div(toBN(_locked)).times(4).toFixed(4), // years
                    }];
        }
    });
}); };
export var userCrv = function (address) {
    if (address === void 0) { address = ""; }
    return __awaiter(void 0, void 0, void 0, function () {
        var _balance;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (curve.chainId !== 1)
                        throw Error("Ethereum-only method");
                    address = _getAddress(address);
                    return [4 /*yield*/, curve.contracts[curve.constants.ALIASES.crv].contract.balanceOf(address)];
                case 1:
                    _balance = _a.sent();
                    return [2 /*return*/, curve.formatUnits(_balance)];
            }
        });
    });
};
export var userVeCrv = function (address) {
    if (address === void 0) { address = ""; }
    return __awaiter(void 0, void 0, void 0, function () {
        var contract, _a, _veCrv, _veCrvTotal, _locked, _lockedCrv, _unlockTime;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (curve.chainId !== 1)
                        throw Error("Ethereum-only method");
                    address = _getAddress(address);
                    contract = curve.contracts[curve.constants.ALIASES.voting_escrow].multicallContract;
                    return [4 /*yield*/, curve.multicallProvider.all([
                            contract.balanceOf(address),
                            contract.totalSupply(),
                            contract.locked(address),
                        ])];
                case 1:
                    _a = _b.sent(), _veCrv = _a[0], _veCrvTotal = _a[1], _locked = _a[2];
                    _lockedCrv = _locked[0];
                    _unlockTime = _locked[1];
                    return [2 /*return*/, {
                            veCrv: curve.formatUnits(_veCrv),
                            veCrvPct: toBN(_veCrv).div(toBN(_veCrvTotal)).times(100).toString(),
                            lockedCrv: curve.formatUnits(_lockedCrv),
                            unlockTime: Number(curve.formatUnits(_unlockTime, 0)) * 1000,
                        }];
            }
        });
    });
};
export var crvLockIsApproved = function (amount) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (curve.chainId !== 1)
                    throw Error("Ethereum-only method");
                return [4 /*yield*/, hasAllowance([curve.constants.ALIASES.crv], [amount], curve.signerAddress, curve.constants.ALIASES.voting_escrow)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
export var crvLockApproveEstimateGas = function (amount) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (curve.chainId !== 1)
                    throw Error("Ethereum-only method");
                return [4 /*yield*/, ensureAllowanceEstimateGas([curve.constants.ALIASES.crv], [amount], curve.constants.ALIASES.voting_escrow, false)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
export var crvLockApprove = function (amount) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (curve.chainId !== 1)
                    throw Error("Ethereum-only method");
                return [4 /*yield*/, ensureAllowance([curve.constants.ALIASES.crv], [amount], curve.constants.ALIASES.voting_escrow, false)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
export var calcCrvUnlockTime = function (days, start) {
    if (start === void 0) { start = Date.now(); }
    var week = 86400 * 7;
    var now = Number(start) / 1000;
    var unlockTime = now + (86400 * Number(days));
    return Math.floor(unlockTime / week) * week * 1000;
};
var _createCrvLock = function (amount, days, estimateGas) { return __awaiter(void 0, void 0, void 0, function () {
    var crvBalance, _amount, unlockTime, contract, gas, gasLimit;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (curve.chainId !== 1)
                    throw Error("Ethereum-only method");
                return [4 /*yield*/, userCrv()];
            case 1:
                crvBalance = _a.sent();
                if (BN(crvBalance).lt(amount))
                    throw Error("Not enough CRV. Wallet balance: ".concat(crvBalance, ", required: ").concat(amount));
                return [4 /*yield*/, crvLockIsApproved(amount)];
            case 2:
                if (!(_a.sent()))
                    throw Error("Token allowance is needed to estimate gas");
                _amount = parseUnits(amount);
                unlockTime = Math.floor(Date.now() / 1000) + (days * 86400);
                contract = curve.contracts[curve.constants.ALIASES.voting_escrow].contract;
                return [4 /*yield*/, contract.create_lock.estimateGas(_amount, unlockTime, curve.constantOptions)];
            case 3:
                gas = _a.sent();
                if (estimateGas)
                    return [2 /*return*/, smartNumber(gas)];
                return [4 /*yield*/, curve.updateFeeData()];
            case 4:
                _a.sent();
                gasLimit = mulBy1_3(DIGas(gas));
                return [4 /*yield*/, contract.create_lock(_amount, unlockTime, __assign(__assign({}, curve.options), { gasLimit: gasLimit }))];
            case 5: return [2 /*return*/, (_a.sent()).hash];
        }
    });
}); };
export var createCrvLockEstimateGas = function (amount, days) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, _createCrvLock(amount, Number(days), true)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
export var createCrvLock = function (amount, days) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, _createCrvLock(amount, Number(days), false)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var _increaseCrvLockedAmount = function (amount, estimateGas) { return __awaiter(void 0, void 0, void 0, function () {
    var crvBalance, _amount, contract, gas, gasLimit;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (curve.chainId !== 1)
                    throw Error("Ethereum-only method");
                return [4 /*yield*/, userCrv()];
            case 1:
                crvBalance = _a.sent();
                if (BN(crvBalance).lt(amount))
                    throw Error("Not enough CRV. Wallet balance: ".concat(crvBalance, ", required: ").concat(amount));
                return [4 /*yield*/, crvLockIsApproved(amount)];
            case 2:
                if (!(_a.sent()))
                    throw Error("Token allowance is needed to estimate gas");
                _amount = parseUnits(amount);
                contract = curve.contracts[curve.constants.ALIASES.voting_escrow].contract;
                return [4 /*yield*/, contract.increase_amount.estimateGas(_amount, curve.constantOptions)];
            case 3:
                gas = _a.sent();
                if (estimateGas)
                    return [2 /*return*/, smartNumber(gas)];
                return [4 /*yield*/, curve.updateFeeData()];
            case 4:
                _a.sent();
                gasLimit = mulBy1_3(DIGas(gas));
                return [4 /*yield*/, contract.increase_amount(_amount, __assign(__assign({}, curve.options), { gasLimit: gasLimit }))];
            case 5: return [2 /*return*/, (_a.sent()).hash];
        }
    });
}); };
export var increaseCrvLockedAmountEstimateGas = function (amount) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, _increaseCrvLockedAmount(amount, true)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
export var increaseCrvLockedAmount = function (amount) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, _increaseCrvLockedAmount(amount, false)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var _increaseCrvUnlockTime = function (days, estimateGas) { return __awaiter(void 0, void 0, void 0, function () {
    var unlockTime, newUnlockTime, contract, gas, gasLimit;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (curve.chainId !== 1)
                    throw Error("Ethereum-only method");
                return [4 /*yield*/, userVeCrv()];
            case 1:
                unlockTime = (_a.sent()).unlockTime;
                newUnlockTime = Math.floor(unlockTime / 1000) + (days * 86400);
                contract = curve.contracts[curve.constants.ALIASES.voting_escrow].contract;
                return [4 /*yield*/, contract.increase_unlock_time.estimateGas(newUnlockTime, curve.constantOptions)];
            case 2:
                gas = _a.sent();
                if (estimateGas)
                    return [2 /*return*/, smartNumber(gas)];
                return [4 /*yield*/, curve.updateFeeData()];
            case 3:
                _a.sent();
                gasLimit = mulBy1_3(DIGas(gas));
                return [4 /*yield*/, contract.increase_unlock_time(newUnlockTime, __assign(__assign({}, curve.options), { gasLimit: gasLimit }))];
            case 4: return [2 /*return*/, (_a.sent()).hash];
        }
    });
}); };
export var increaseCrvUnlockTimeEstimateGas = function (days) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, _increaseCrvUnlockTime(Number(days), true)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
export var increaseCrvUnlockTime = function (days) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, _increaseCrvUnlockTime(Number(days), false)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var _withdrawLockedCrv = function (estimateGas) { return __awaiter(void 0, void 0, void 0, function () {
    var unlockTime, contract, gas, gasLimit;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (curve.chainId !== 1)
                    throw Error("Ethereum-only method");
                return [4 /*yield*/, userVeCrv()];
            case 1:
                unlockTime = (_a.sent()).unlockTime;
                if (unlockTime > Date.now())
                    throw Error("The lock haven't expired yet");
                contract = curve.contracts[curve.constants.ALIASES.voting_escrow].contract;
                return [4 /*yield*/, contract.withdraw.estimateGas(curve.constantOptions)];
            case 2:
                gas = _a.sent();
                if (estimateGas)
                    return [2 /*return*/, smartNumber(gas)];
                return [4 /*yield*/, curve.updateFeeData()];
            case 3:
                _a.sent();
                gasLimit = mulBy1_3(DIGas(gas));
                return [4 /*yield*/, contract.withdraw(__assign(__assign({}, curve.options), { gasLimit: gasLimit }))];
            case 4: return [2 /*return*/, (_a.sent()).hash];
        }
    });
}); };
export var withdrawLockedCrvEstimateGas = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, _withdrawLockedCrv(true)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
export var withdrawLockedCrv = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, _withdrawLockedCrv(false)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
export var claimableFees = function (address) {
    if (address === void 0) { address = ""; }
    return __awaiter(void 0, void 0, void 0, function () {
        var contract, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    address = _getAddress(address);
                    contract = new Contract(curve.constants.ALIASES.fee_distributor, feeDistributorViewABI, curve.provider);
                    _b = (_a = curve).formatUnits;
                    return [4 /*yield*/, contract.claim(address, curve.constantOptions)];
                case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
            }
        });
    });
};
var _claimFees = function (address, estimateGas) { return __awaiter(void 0, void 0, void 0, function () {
    var contract, gas, gasLimit;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                address = _getAddress(address);
                contract = curve.contracts[curve.constants.ALIASES.fee_distributor].contract;
                return [4 /*yield*/, contract.claim.estimateGas(address, curve.constantOptions)];
            case 1:
                gas = _a.sent();
                if (estimateGas)
                    return [2 /*return*/, smartNumber(gas)];
                return [4 /*yield*/, curve.updateFeeData()];
            case 2:
                _a.sent();
                gasLimit = mulBy1_3(DIGas(gas));
                return [4 /*yield*/, contract.claim(address, __assign(__assign({}, curve.options), { gasLimit: gasLimit }))];
            case 3: return [2 /*return*/, (_a.sent()).hash];
        }
    });
}); };
export var claimFeesEstimateGas = function (address) {
    if (address === void 0) { address = ""; }
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, _claimFees(address, true)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
};
export var claimFees = function (address) {
    if (address === void 0) { address = ""; }
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, _claimFees(address, false)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
};
// ----------------- Gauge weights -----------------
var _extractNetworkFromPoolUrl = function (poolUrl) {
    if (!poolUrl)
        return "unknown";
    return poolUrl.split("/")[4];
};
export var getVotingGaugeList = function () { return __awaiter(void 0, void 0, void 0, function () {
    var gaugeData, _a, _b, res, i;
    var _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                if (curve.chainId !== 1)
                    throw Error("Ethereum-only method");
                _b = (_a = Object).values;
                return [4 /*yield*/, _getAllGauges()];
            case 1:
                gaugeData = _b.apply(_a, [_d.sent()]);
                res = [];
                for (i = 0; i < gaugeData.length; i++) {
                    if ((gaugeData[i].is_killed || gaugeData[i].hasNoCrv) && Number(gaugeData[i].gauge_controller.gauge_relative_weight) === 0)
                        continue;
                    res.push({
                        poolUrl: gaugeData[i].poolUrls.swap[0],
                        network: _extractNetworkFromPoolUrl(gaugeData[i].poolUrls.swap[0]),
                        gaugeAddress: gaugeData[i].gauge,
                        poolAddress: gaugeData[i].swap,
                        lpTokenAddress: gaugeData[i].swap_token,
                        poolName: gaugeData[i].shortName,
                        totalVeCrv: curve.formatUnits(gaugeData[i].gauge_controller.get_gauge_weight, 18),
                        relativeWeight: curve.formatUnits(gaugeData[i].gauge_controller.gauge_relative_weight, 16),
                        isKilled: (_c = gaugeData[i].is_killed) !== null && _c !== void 0 ? _c : false,
                    });
                }
                return [2 /*return*/, res];
        }
    });
}); };
export var userGaugeVotes = function (address) {
    if (address === void 0) { address = ""; }
    return __awaiter(void 0, void 0, void 0, function () {
        var gcMulticallContract, veMulticallContract, gaugeData, _a, _b, calls, _i, gaugeData_1, d, _c, veCrvBalance, votes, res, powerUsed, veCrvUsed, i, dt;
        var _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    if (curve.chainId !== 1)
                        throw Error("Ethereum-only method");
                    address = _getAddress(address);
                    gcMulticallContract = curve.contracts[curve.constants.ALIASES.gauge_controller].multicallContract;
                    veMulticallContract = curve.contracts[curve.constants.ALIASES.voting_escrow].multicallContract;
                    _b = (_a = Object).values;
                    return [4 /*yield*/, _getAllGauges()];
                case 1:
                    gaugeData = _b.apply(_a, [_e.sent()]);
                    calls = [veMulticallContract.balanceOf(address)];
                    for (_i = 0, gaugeData_1 = gaugeData; _i < gaugeData_1.length; _i++) {
                        d = gaugeData_1[_i];
                        calls.push(gcMulticallContract.vote_user_slopes(address, d.gauge));
                    }
                    return [4 /*yield*/, curve.multicallProvider.all(calls)];
                case 2:
                    _c = _e.sent(), veCrvBalance = _c[0], votes = _c.slice(1);
                    res = { gauges: [], powerUsed: "0.0", veCrvUsed: "0.0" };
                    powerUsed = BigInt(0);
                    veCrvUsed = BigInt(0);
                    for (i = 0; i < votes.length; i++) {
                        if (votes[i][1] === BigInt(0))
                            continue;
                        dt = votes[i][2] - BigInt(Math.floor(Date.now() / 1000));
                        if (dt < BigInt(0))
                            dt = BigInt(0);
                        res.gauges.push({
                            userPower: curve.formatUnits(votes[i][1], 2),
                            userVeCrv: curve.formatUnits(votes[i][0] * dt, 18),
                            userFutureVeCrv: curve.formatUnits(veCrvBalance * votes[i][1] / BigInt(10000), 18),
                            expired: dt === BigInt(0),
                            gaugeData: {
                                poolUrl: gaugeData[i].poolUrls.swap[0],
                                network: _extractNetworkFromPoolUrl(gaugeData[i].poolUrls.swap[0]),
                                gaugeAddress: gaugeData[i].gauge,
                                poolAddress: gaugeData[i].swap,
                                lpTokenAddress: gaugeData[i].swap_token,
                                poolName: gaugeData[i].shortName,
                                totalVeCrv: curve.formatUnits(gaugeData[i].gauge_controller.get_gauge_weight, 18),
                                relativeWeight: curve.formatUnits(gaugeData[i].gauge_controller.gauge_relative_weight, 16),
                                isKilled: (_d = gaugeData[i].is_killed) !== null && _d !== void 0 ? _d : false,
                            },
                        });
                        powerUsed += votes[i][1];
                        veCrvUsed += votes[i][0] * dt;
                    }
                    res.powerUsed = curve.formatUnits(powerUsed, 2);
                    res.veCrvUsed = curve.formatUnits(veCrvUsed.toString(), 18);
                    return [2 /*return*/, res];
            }
        });
    });
};
export var voteForGaugeNextTime = function (gauge) { return __awaiter(void 0, void 0, void 0, function () {
    var _lastVote;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (curve.chainId !== 1)
                    throw Error("Ethereum-only method");
                return [4 /*yield*/, curve.contracts[curve.constants.ALIASES.gauge_controller].contract.last_user_vote(curve.signerAddress, gauge, curve.constantOptions)];
            case 1:
                _lastVote = _a.sent();
                return [2 /*return*/, (Number(_lastVote) + (10 * 86400)) * 1000];
        }
    });
}); };
var _voteForGauge = function (gauge, power, estimateGas) { return __awaiter(void 0, void 0, void 0, function () {
    var gcContract, gcMulticallContract, _power, _a, _powerUsed, _vote_slopes, _freePower, nextVoteTime, gas, gasLimit;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (curve.chainId !== 1)
                    throw Error("Ethereum-only method");
                gcContract = curve.contracts[curve.constants.ALIASES.gauge_controller].contract;
                gcMulticallContract = curve.contracts[curve.constants.ALIASES.gauge_controller].multicallContract;
                _power = parseUnits(power, 2);
                return [4 /*yield*/, curve.multicallProvider.all([
                        gcMulticallContract.vote_user_power(curve.signerAddress),
                        gcMulticallContract.vote_user_slopes(curve.signerAddress, gauge),
                    ])];
            case 1:
                _a = _b.sent(), _powerUsed = _a[0], _vote_slopes = _a[1];
                _freePower = BigInt(10000) - _powerUsed;
                if (_power > _freePower + _vote_slopes[1])
                    throw Error("User have only ".concat(curve.formatUnits(_freePower, 2), " % free power. Trying to use ").concat(curve.formatUnits(_power, 2)));
                return [4 /*yield*/, voteForGaugeNextTime(gauge)];
            case 2:
                nextVoteTime = _b.sent();
                if (Date.now() < nextVoteTime)
                    throw Error("User can't change vote for this gauge earlier than ".concat(new Date(nextVoteTime)));
                return [4 /*yield*/, gcContract.vote_for_gauge_weights.estimateGas(gauge, _power, curve.constantOptions)];
            case 3:
                gas = _b.sent();
                if (estimateGas)
                    return [2 /*return*/, smartNumber(gas)];
                return [4 /*yield*/, curve.updateFeeData()];
            case 4:
                _b.sent();
                gasLimit = mulBy1_3(DIGas(gas));
                return [4 /*yield*/, gcContract.vote_for_gauge_weights(gauge, _power, __assign(__assign({}, curve.options), { gasLimit: gasLimit }))];
            case 5: return [2 /*return*/, (_b.sent()).hash];
        }
    });
}); };
export var voteForGaugeEstimateGas = function (gauge, power) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, _voteForGauge(gauge, power, true)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
export var voteForGauge = function (gauge, power) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, _voteForGauge(gauge, power, false)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
// ----------------- Proposals -----------------
export var getProposalList = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, _getDaoProposalList()];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
export var getProposal = function (type, id) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, _getDaoProposal(type, id)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
export var userProposalVotes = function (address) {
    if (address === void 0) { address = ""; }
    return __awaiter(void 0, void 0, void 0, function () {
        var proposalList, calls, _i, proposalList_1, proposal, userState, userProposalList, voteEnum, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (curve.chainId !== 1)
                        throw Error("Ethereum-only method");
                    address = _getAddress(address);
                    return [4 /*yield*/, _getDaoProposalList()];
                case 1:
                    proposalList = _a.sent();
                    calls = [];
                    for (_i = 0, proposalList_1 = proposalList; _i < proposalList_1.length; _i++) {
                        proposal = proposalList_1[_i];
                        if (proposal.voteType == "PARAMETER") {
                            calls.push(curve.contracts[curve.constants.ALIASES.voting_parameter].multicallContract.getVoterState(proposal.voteId, address));
                        }
                        else {
                            calls.push(curve.contracts[curve.constants.ALIASES.voting_ownership].multicallContract.getVoterState(proposal.voteId, address));
                        }
                    }
                    return [4 /*yield*/, curve.multicallProvider.all(calls)];
                case 2:
                    userState = (_a.sent()).map(Number);
                    userProposalList = [];
                    voteEnum = {
                        1: "yes",
                        2: "no",
                        3: "even",
                    };
                    for (i = 0; i < proposalList.length; i++) {
                        if (userState[i] > 0)
                            userProposalList.push(__assign(__assign({}, proposalList[i]), { userVote: voteEnum[userState[i]] }));
                    }
                    return [2 /*return*/, userProposalList];
            }
        });
    });
};
var _voteForProposal = function (type, id, support, estimateGas) { return __awaiter(void 0, void 0, void 0, function () {
    var contractAddress, contract, yesPct, noPct, gas, gasLimit;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (curve.chainId !== 1)
                    throw Error("Ethereum-only method");
                contractAddress = type === "PARAMETER" ? curve.constants.ALIASES.voting_parameter : curve.constants.ALIASES.voting_ownership;
                contract = curve.contracts[contractAddress].contract;
                yesPct = support ? BigInt(Math.pow(10, 18)) : BigInt(0);
                noPct = BigInt(Math.pow(10, 18)) - yesPct;
                return [4 /*yield*/, contract.votePct.estimateGas(id, yesPct, noPct, true, curve.constantOptions)];
            case 1:
                gas = _a.sent();
                if (estimateGas)
                    return [2 /*return*/, smartNumber(gas)];
                return [4 /*yield*/, curve.updateFeeData()];
            case 2:
                _a.sent();
                gasLimit = mulBy1_3(DIGas(gas));
                return [4 /*yield*/, contract.votePct(id, yesPct, noPct, false, __assign(__assign({}, curve.options), { gasLimit: gasLimit }))];
            case 3: return [2 /*return*/, (_a.sent()).hash];
        }
    });
}); };
export var voteForProposalEstimateGas = function (type, id, support) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, _voteForProposal(type, id, support, true)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
export var voteForProposal = function (type, id, support) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, _voteForProposal(type, id, support, false)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var _executeVote = function (type, id, estimateGas) {
    if (estimateGas === void 0) { estimateGas = false; }
    return __awaiter(void 0, void 0, void 0, function () {
        var contractAddress, contract, gas, gasLimit;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (curve.chainId !== 1)
                        throw Error("Ethereum-only method");
                    contractAddress = type === "PARAMETER" ? curve.constants.ALIASES.voting_parameter : curve.constants.ALIASES.voting_ownership;
                    contract = curve.contracts[contractAddress].contract;
                    return [4 /*yield*/, contract.executeVote.estimateGas(id, curve.constantOptions)];
                case 1:
                    gas = _a.sent();
                    if (estimateGas)
                        return [2 /*return*/, smartNumber(gas)];
                    return [4 /*yield*/, curve.updateFeeData()];
                case 2:
                    _a.sent();
                    gasLimit = mulBy1_3(DIGas(gas));
                    return [4 /*yield*/, contract.executeVote(id, __assign(__assign({}, curve.options), { gasLimit: gasLimit }))];
                case 3: return [2 /*return*/, (_a.sent()).hash];
            }
        });
    });
};
export var executeVoteEstimateGas = function (type, id) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, _executeVote(type, id, true)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
export var executeVote = function (type, id) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, _executeVote(type, id, false)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
export var isCanVoteExecute = function (type, id) { return __awaiter(void 0, void 0, void 0, function () {
    var contractAddress, contract;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (curve.chainId !== 1)
                    throw Error("Ethereum-only method");
                contractAddress = type === "PARAMETER" ? curve.constants.ALIASES.voting_parameter : curve.constants.ALIASES.voting_ownership;
                contract = curve.contracts[contractAddress].contract;
                return [4 /*yield*/, contract.canExecute(id, __assign({}, curve.options))];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
