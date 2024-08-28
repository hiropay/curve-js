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
import { Contract } from "ethers";
import { curve } from "./curve.js";
import feeDistributorViewABI from "./constants/abis/fee_distributor_view.json" assert { type: 'json' };
import feeDistributorCrvUSDViewABI from "./constants/abis/fee_distributor_crvusd_view.json" assert { type: 'json' };
import { _getBalances, _prepareAddresses, DIGas, ensureAllowance, ensureAllowanceEstimateGas, hasAllowance, mulBy1_3, smartNumber, } from "./utils.js";
import { _ensureAllowance, toBN, toStringFromBN, parseUnits } from './utils.js';
import { _generateBoostingProof } from './external-api.js';
export var getCrv = function () {
    var addresses = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        addresses[_i] = arguments[_i];
    }
    return __awaiter(void 0, void 0, void 0, function () {
        var rawBalances, balances, _a, addresses_1, address;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    addresses = _prepareAddresses(addresses);
                    return [4 /*yield*/, _getBalances([curve.constants.ALIASES.crv], addresses)];
                case 1:
                    rawBalances = (_b.sent());
                    balances = {};
                    for (_a = 0, addresses_1 = addresses; _a < addresses_1.length; _a++) {
                        address = addresses_1[_a];
                        balances[address] = rawBalances[address].shift();
                    }
                    return [2 /*return*/, addresses.length === 1 ? balances[addresses[0]] : balances];
            }
        });
    });
};
export var getLockedAmountAndUnlockTime = function () {
    var addresses = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        addresses[_i] = arguments[_i];
    }
    return __awaiter(void 0, void 0, void 0, function () {
        var veContract, contractCalls, response, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    addresses = _prepareAddresses(addresses);
                    veContract = curve.contracts[curve.constants.ALIASES.voting_escrow].multicallContract;
                    contractCalls = addresses.map(function (address) { return veContract.locked(address); });
                    return [4 /*yield*/, curve.multicallProvider.all(contractCalls)];
                case 1:
                    response = (_a.sent()).map(function (value) { return [curve.formatUnits(value[0]), Number(curve.formatUnits(value[1], 0)) * 1000]; });
                    result = {};
                    addresses.forEach(function (addr, i) {
                        result[addr] = { lockedAmount: response[i][0], unlockTime: response[i][1] };
                    });
                    return [2 /*return*/, addresses.length === 1 ? result[addresses[0]] : result];
            }
        });
    });
};
export var getVeCrv = function () {
    var addresses = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        addresses[_i] = arguments[_i];
    }
    return __awaiter(void 0, void 0, void 0, function () {
        var veContract, contractCalls, response, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    addresses = _prepareAddresses(addresses);
                    veContract = curve.contracts[curve.constants.ALIASES.voting_escrow].multicallContract;
                    contractCalls = addresses.map(function (address) { return veContract.balanceOf(address); });
                    return [4 /*yield*/, curve.multicallProvider.all(contractCalls)];
                case 1:
                    response = (_a.sent()).map(function (value) { return curve.formatUnits(value); });
                    result = {};
                    addresses.forEach(function (addr, i) {
                        result[addr] = response[i];
                    });
                    return [2 /*return*/, addresses.length === 1 ? result[addresses[0]] : result];
            }
        });
    });
};
export var getVeCrvPct = function () {
    var addresses = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        addresses[_i] = arguments[_i];
    }
    return __awaiter(void 0, void 0, void 0, function () {
        var veContract, contractCalls, response, veTotalSupply, resultBN, result, _a, _b, entry;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    addresses = _prepareAddresses(addresses);
                    veContract = curve.contracts[curve.constants.ALIASES.voting_escrow].multicallContract;
                    contractCalls = [veContract.totalSupply()];
                    addresses.forEach(function (address) {
                        contractCalls.push(veContract.balanceOf(address));
                    });
                    return [4 /*yield*/, curve.multicallProvider.all(contractCalls)];
                case 1:
                    response = (_c.sent()).map(function (value) { return toBN(value); });
                    veTotalSupply = response.splice(0, 1)[0];
                    resultBN = {};
                    addresses.forEach(function (acct, i) {
                        resultBN[acct] = response[i].div(veTotalSupply).times(100);
                    });
                    result = {};
                    for (_a = 0, _b = Object.entries(resultBN); _a < _b.length; _a++) {
                        entry = _b[_a];
                        result[entry[0]] = toStringFromBN(entry[1]);
                    }
                    return [2 /*return*/, addresses.length === 1 ? result[addresses[0]] : result];
            }
        });
    });
};
export var isApproved = function (amount) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, hasAllowance([curve.constants.ALIASES.crv], [amount], curve.signerAddress, curve.constants.ALIASES.voting_escrow)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
export var approveEstimateGas = function (amount) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ensureAllowanceEstimateGas([curve.constants.ALIASES.crv], [amount], curve.constants.ALIASES.voting_escrow, false)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
export var approve = function (amount) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ensureAllowance([curve.constants.ALIASES.crv], [amount], curve.constants.ALIASES.voting_escrow, false)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
export var createLockEstimateGas = function (amount, days) { return __awaiter(void 0, void 0, void 0, function () {
    var crvBalance, _amount, unlockTime, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, getCrv()];
            case 1:
                crvBalance = _b.sent();
                if (Number(crvBalance) < Number(amount)) {
                    throw Error("Not enough . Actual: ".concat(crvBalance, ", required: ").concat(amount));
                }
                return [4 /*yield*/, hasAllowance([curve.constants.ALIASES.crv], [amount], curve.signerAddress, curve.constants.ALIASES.voting_escrow)];
            case 2:
                if (!(_b.sent())) {
                    throw Error("Token allowance is needed to estimate gas");
                }
                _amount = parseUnits(amount);
                unlockTime = Math.floor(Date.now() / 1000) + (days * 86400);
                _a = Number;
                return [4 /*yield*/, curve.contracts[curve.constants.ALIASES.voting_escrow].contract.create_lock.estimateGas(_amount, unlockTime, curve.constantOptions)];
            case 3: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
        }
    });
}); };
export var calcUnlockTime = function (days, start) {
    if (start === void 0) { start = Date.now(); }
    var week = 86400 * 7;
    var now = start / 1000;
    var unlockTime = now + (86400 * days);
    return Math.floor(unlockTime / week) * week * 1000;
};
export var createLock = function (amount, days) { return __awaiter(void 0, void 0, void 0, function () {
    var _amount, unlockTime, contract, gasLimit, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _amount = parseUnits(amount);
                unlockTime = Math.floor(Date.now() / 1000) + (86400 * days);
                return [4 /*yield*/, _ensureAllowance([curve.constants.ALIASES.crv], [_amount], curve.constants.ALIASES.voting_escrow, false)];
            case 1:
                _c.sent();
                contract = curve.contracts[curve.constants.ALIASES.voting_escrow].contract;
                return [4 /*yield*/, curve.updateFeeData()];
            case 2:
                _c.sent();
                _a = mulBy1_3;
                _b = DIGas;
                return [4 /*yield*/, contract.create_lock.estimateGas(_amount, unlockTime, curve.constantOptions)];
            case 3:
                gasLimit = _a.apply(void 0, [_b.apply(void 0, [_c.sent()])]);
                return [4 /*yield*/, contract.create_lock(_amount, unlockTime, __assign(__assign({}, curve.options), { gasLimit: gasLimit }))];
            case 4: return [2 /*return*/, (_c.sent()).hash];
        }
    });
}); };
export var increaseAmountEstimateGas = function (amount) { return __awaiter(void 0, void 0, void 0, function () {
    var crvBalance, _amount, contract, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, getCrv()];
            case 1:
                crvBalance = _b.sent();
                if (Number(crvBalance) < Number(amount)) {
                    throw Error("Not enough. Actual: ".concat(crvBalance, ", required: ").concat(amount));
                }
                return [4 /*yield*/, hasAllowance([curve.constants.ALIASES.crv], [amount], curve.signerAddress, curve.constants.ALIASES.voting_escrow)];
            case 2:
                if (!(_b.sent())) {
                    throw Error("Token allowance is needed to estimate gas");
                }
                _amount = parseUnits(amount);
                contract = curve.contracts[curve.constants.ALIASES.voting_escrow].contract;
                _a = Number;
                return [4 /*yield*/, contract.increase_amount.estimateGas(_amount, curve.constantOptions)];
            case 3: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
        }
    });
}); };
export var increaseAmount = function (amount) { return __awaiter(void 0, void 0, void 0, function () {
    var _amount, contract, gasLimit, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _amount = parseUnits(amount);
                return [4 /*yield*/, _ensureAllowance([curve.constants.ALIASES.crv], [_amount], curve.constants.ALIASES.voting_escrow, false)];
            case 1:
                _c.sent();
                contract = curve.contracts[curve.constants.ALIASES.voting_escrow].contract;
                return [4 /*yield*/, curve.updateFeeData()];
            case 2:
                _c.sent();
                _a = mulBy1_3;
                _b = DIGas;
                return [4 /*yield*/, contract.increase_amount.estimateGas(_amount, curve.constantOptions)];
            case 3:
                gasLimit = _a.apply(void 0, [_b.apply(void 0, [_c.sent()])]);
                return [4 /*yield*/, contract.increase_amount(_amount, __assign(__assign({}, curve.options), { gasLimit: gasLimit }))];
            case 4: return [2 /*return*/, (_c.sent()).hash];
        }
    });
}); };
export var increaseUnlockTimeEstimateGas = function (days) { return __awaiter(void 0, void 0, void 0, function () {
    var unlockTime, newUnlockTime, contract, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, getLockedAmountAndUnlockTime()];
            case 1:
                unlockTime = (_c.sent()).unlockTime;
                newUnlockTime = Math.floor(unlockTime / 1000) + (days * 86400);
                contract = curve.contracts[curve.constants.ALIASES.voting_escrow].contract;
                _a = Number;
                _b = DIGas;
                return [4 /*yield*/, contract.increase_unlock_time.estimateGas(newUnlockTime, curve.constantOptions)];
            case 2: return [2 /*return*/, _a.apply(void 0, [_b.apply(void 0, [_c.sent()])])];
        }
    });
}); };
export var increaseUnlockTime = function (days) { return __awaiter(void 0, void 0, void 0, function () {
    var unlockTime, newUnlockTime, contract, gasLimit, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, getLockedAmountAndUnlockTime()];
            case 1:
                unlockTime = (_c.sent()).unlockTime;
                newUnlockTime = Math.floor(unlockTime / 1000) + (days * 86400);
                contract = curve.contracts[curve.constants.ALIASES.voting_escrow].contract;
                return [4 /*yield*/, curve.updateFeeData()];
            case 2:
                _c.sent();
                _a = mulBy1_3;
                _b = DIGas;
                return [4 /*yield*/, contract.increase_unlock_time.estimateGas(newUnlockTime, curve.constantOptions)];
            case 3:
                gasLimit = _a.apply(void 0, [_b.apply(void 0, [_c.sent()])]);
                return [4 /*yield*/, contract.increase_unlock_time(newUnlockTime, __assign(__assign({}, curve.options), { gasLimit: gasLimit }))];
            case 4: return [2 /*return*/, (_c.sent()).hash];
        }
    });
}); };
export var withdrawLockedCrvEstimateGas = function () { return __awaiter(void 0, void 0, void 0, function () {
    var contract, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                contract = curve.contracts[curve.constants.ALIASES.voting_escrow].contract;
                _a = Number;
                _b = DIGas;
                return [4 /*yield*/, contract.withdraw.estimateGas(curve.constantOptions)];
            case 1: return [2 /*return*/, _a.apply(void 0, [_b.apply(void 0, [_c.sent()])])];
        }
    });
}); };
export var withdrawLockedCrv = function () { return __awaiter(void 0, void 0, void 0, function () {
    var contract, gasLimit, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                contract = curve.contracts[curve.constants.ALIASES.voting_escrow].contract;
                return [4 /*yield*/, curve.updateFeeData()];
            case 1:
                _c.sent();
                _a = mulBy1_3;
                _b = DIGas;
                return [4 /*yield*/, contract.withdraw.estimateGas(curve.constantOptions)];
            case 2:
                gasLimit = _a.apply(void 0, [_b.apply(void 0, [_c.sent()])]);
                return [4 /*yield*/, contract.withdraw(__assign(__assign({}, curve.options), { gasLimit: gasLimit }))];
            case 3: return [2 /*return*/, (_c.sent()).hash];
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
                    address = address || curve.signerAddress;
                    contract = new Contract(curve.constants.ALIASES.fee_distributor, feeDistributorViewABI, curve.provider);
                    _b = (_a = curve).formatUnits;
                    return [4 /*yield*/, contract.claim(address, curve.constantOptions)];
                case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
            }
        });
    });
};
export var claimFeesEstimateGas = function (address) {
    if (address === void 0) { address = ""; }
    return __awaiter(void 0, void 0, void 0, function () {
        var contract, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    address = address || curve.signerAddress;
                    contract = curve.contracts[curve.constants.ALIASES.fee_distributor].contract;
                    _a = Number;
                    _b = DIGas;
                    return [4 /*yield*/, contract.claim.estimateGas(address, curve.constantOptions)];
                case 1: return [2 /*return*/, _a.apply(void 0, [_b.apply(void 0, [_c.sent()])])];
            }
        });
    });
};
export var claimFees = function (address) {
    if (address === void 0) { address = ""; }
    return __awaiter(void 0, void 0, void 0, function () {
        var contract, gasLimit, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (curve.chainId !== 1) {
                        throw Error('This method is only available for the network with chainId 1');
                    }
                    address = address || curve.signerAddress;
                    contract = curve.contracts[curve.constants.ALIASES.fee_distributor].contract;
                    return [4 /*yield*/, curve.updateFeeData()];
                case 1:
                    _c.sent();
                    _a = mulBy1_3;
                    _b = DIGas;
                    return [4 /*yield*/, contract.claim.estimateGas(address, curve.constantOptions)];
                case 2:
                    gasLimit = _a.apply(void 0, [_b.apply(void 0, [_c.sent()])]);
                    return [4 /*yield*/, contract.claim(address, __assign(__assign({}, curve.options), { gasLimit: gasLimit }))];
                case 3: return [2 /*return*/, (_c.sent()).hash];
            }
        });
    });
};
export var claimableFeesCrvUSD = function (address) {
    if (address === void 0) { address = ""; }
    return __awaiter(void 0, void 0, void 0, function () {
        var contract, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (curve.chainId !== 1) {
                        throw Error('This method is only available for the network with chainId 1');
                    }
                    address = address || curve.signerAddress;
                    contract = new Contract(curve.constants.ALIASES.fee_distributor_crvusd, feeDistributorCrvUSDViewABI, curve.provider);
                    _b = (_a = curve).formatUnits;
                    return [4 /*yield*/, contract.claim(address, curve.constantOptions)];
                case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
            }
        });
    });
};
export var claimFeesCrvUSDEstimateGas = function (address) {
    if (address === void 0) { address = ""; }
    return __awaiter(void 0, void 0, void 0, function () {
        var contract, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (curve.chainId !== 1) {
                        throw Error('This method is only available for the network with chainId 1');
                    }
                    address = address || curve.signerAddress;
                    contract = curve.contracts[curve.constants.ALIASES.fee_distributor_crvusd].contract;
                    _a = Number;
                    _b = DIGas;
                    return [4 /*yield*/, contract.claim.estimateGas(address, curve.constantOptions)];
                case 1: return [2 /*return*/, _a.apply(void 0, [_b.apply(void 0, [_c.sent()])])];
            }
        });
    });
};
export var claimFeesCrvUSD = function (address) {
    if (address === void 0) { address = ""; }
    return __awaiter(void 0, void 0, void 0, function () {
        var contract, gasLimit, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    address = address || curve.signerAddress;
                    contract = curve.contracts[curve.constants.ALIASES.fee_distributor_crvusd].contract;
                    return [4 /*yield*/, curve.updateFeeData()];
                case 1:
                    _c.sent();
                    _a = mulBy1_3;
                    _b = DIGas;
                    return [4 /*yield*/, contract.claim.estimateGas(address, curve.constantOptions)];
                case 2:
                    gasLimit = _a.apply(void 0, [_b.apply(void 0, [_c.sent()])]);
                    return [4 /*yield*/, contract.claim(address, __assign(__assign({}, curve.options), { gasLimit: gasLimit }))];
                case 3: return [2 /*return*/, (_c.sent()).hash];
            }
        });
    });
};
//  ------------ SIDECHAIN ------------
export var lastEthBlock = function () { return __awaiter(void 0, void 0, void 0, function () {
    var veOracleContract, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (curve.chainId === 1)
                    throw Error("There is no lastBlock method on ethereum network");
                veOracleContract = curve.contracts[curve.constants.ALIASES.voting_escrow_oracle].contract;
                _a = Number;
                return [4 /*yield*/, veOracleContract.last_eth_block_number(curve.constantOptions)];
            case 1: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
        }
    });
}); };
export var getAnycallBalance = function () { return __awaiter(void 0, void 0, void 0, function () {
    var anycallContract, _balance;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (curve.chainId === 1)
                    throw Error("There is no getAnycallBalance method on ethereum network");
                anycallContract = curve.contracts[curve.constants.ALIASES.anycall].contract;
                return [4 /*yield*/, anycallContract.executionBudget(curve.constants.ALIASES.voting_escrow_oracle, curve.constantOptions)];
            case 1:
                _balance = _a.sent();
                return [2 /*return*/, curve.formatUnits(_balance)];
        }
    });
}); };
var DEFAULT_AMOUNT = (curve.chainId === 42161 || curve.chainId === 10) ? 0.00001 : 0.1;
var _topUpAnycall = function (amount, estimateGas) { return __awaiter(void 0, void 0, void 0, function () {
    var anycallContract, value, gas, gasLimit;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (curve.chainId === 1)
                    throw Error("There is no topUpAnycall method on ethereum network");
                anycallContract = curve.contracts[curve.constants.ALIASES.anycall].contract;
                value = curve.parseUnits(String(amount));
                return [4 /*yield*/, anycallContract.deposit.estimateGas(curve.constants.ALIASES.voting_escrow_oracle, __assign(__assign({}, curve.constantOptions), { value: value }))];
            case 1:
                gas = _a.sent();
                if (estimateGas)
                    return [2 /*return*/, smartNumber(gas)];
                return [4 /*yield*/, curve.updateFeeData()];
            case 2:
                _a.sent();
                gasLimit = mulBy1_3(DIGas(gas));
                return [4 /*yield*/, anycallContract.deposit(curve.constants.ALIASES.voting_escrow_oracle, __assign(__assign({}, curve.options), { gasLimit: gasLimit, value: value }))];
            case 3: return [2 /*return*/, (_a.sent()).hash];
        }
    });
}); };
export var topUpAnycallEstimateGas = function (amount) {
    if (amount === void 0) { amount = DEFAULT_AMOUNT; }
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, _topUpAnycall(amount, true)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
};
export var topUpAnycall = function (amount) {
    if (amount === void 0) { amount = DEFAULT_AMOUNT; }
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, _topUpAnycall(amount, false)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
};
export var lastBlockSent = function (chainId) { return __awaiter(void 0, void 0, void 0, function () {
    var veOracleContract, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (curve.chainId !== 1)
                    throw Error("lastBlockNumberSent method is on ethereum network only");
                veOracleContract = curve.contracts[curve.constants.ALIASES.voting_escrow_oracle].contract;
                _a = Number;
                return [4 /*yield*/, veOracleContract.get_last_block_number_sent(chainId, curve.constantOptions)];
            case 1: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
        }
    });
}); };
export var blockToSend = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (curve.chainId !== 1)
                    throw Error("blockToSend method is on ethereum network only");
                return [4 /*yield*/, curve.provider.getBlockNumber()];
            case 1: return [2 /*return*/, (_a.sent()) - 128];
        }
    });
}); };
var _sendBlockhash = function (block, chainId, estimateGas) { return __awaiter(void 0, void 0, void 0, function () {
    var veOracleContract, gas, gasLimit;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (curve.chainId !== 1)
                    throw Error("sendBlockhash method is on ethereum network only");
                veOracleContract = curve.contracts[curve.constants.ALIASES.voting_escrow_oracle].contract;
                return [4 /*yield*/, veOracleContract.send_blockhash.estimateGas(block, chainId, curve.constantOptions)];
            case 1:
                gas = _a.sent();
                if (estimateGas)
                    return [2 /*return*/, smartNumber(gas)];
                return [4 /*yield*/, curve.updateFeeData()];
            case 2:
                _a.sent();
                gasLimit = mulBy1_3(DIGas(gas));
                return [4 /*yield*/, veOracleContract.send_blockhash(block, chainId, __assign(__assign({}, curve.options), { gasLimit: gasLimit }))];
            case 3: return [2 /*return*/, (_a.sent()).hash];
        }
    });
}); };
export var sendBlockhashEstimateGas = function (block, chainId) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, _sendBlockhash(block, chainId, true)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
export var sendBlockhash = function (block, chainId) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, _sendBlockhash(block, chainId, false)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var _submitProof = function (block, address, estimateGas) {
    if (address === void 0) { address = curve.signerAddress; }
    return __awaiter(void 0, void 0, void 0, function () {
        var proof, veOracleContract, gas, gasLimit;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (curve.chainId === 1)
                        throw Error("submitProof method is on ethereum network only");
                    if (address === "")
                        throw Error("Pass address you want to submit proof for");
                    return [4 /*yield*/, _generateBoostingProof(block, address)];
                case 1:
                    proof = _a.sent();
                    veOracleContract = curve.contracts[curve.constants.ALIASES.voting_escrow_oracle].contract;
                    return [4 /*yield*/, veOracleContract.submit_state.estimateGas(address, "0x" + proof.block_header_rlp, "0x" + proof.proof_rlp, curve.constantOptions)];
                case 2:
                    gas = _a.sent();
                    if (estimateGas)
                        return [2 /*return*/, smartNumber(gas)];
                    return [4 /*yield*/, curve.updateFeeData()];
                case 3:
                    _a.sent();
                    gasLimit = mulBy1_3(DIGas(gas));
                    return [4 /*yield*/, veOracleContract.submit_state(address, "0x" + proof.block_header_rlp, "0x" + proof.proof_rlp, __assign(__assign({}, curve.options), { gasLimit: gasLimit }))];
                case 4: return [2 /*return*/, (_a.sent()).hash];
            }
        });
    });
};
export var submitProofEstimateGas = function (block, address) {
    if (address === void 0) { address = curve.signerAddress; }
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, _submitProof(block, address, true)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
};
export var submitProof = function (block, address) {
    if (address === void 0) { address = curve.signerAddress; }
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, _submitProof(block, address, false)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
};
