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
import { PoolTemplate } from "../PoolTemplate.js";
import { curve } from "../../curve.js";
import { fromBN, toBN } from "../../utils.js";
export function _calcExpectedAmounts(_lpTokenAmount) {
    return __awaiter(this, void 0, void 0, function () {
        var coinBalancesBN, i, _balance, totalSupplyBN, _a, expectedAmountsBN, _i, coinBalancesBN_1, coinBalance;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    coinBalancesBN = [];
                    i = 0;
                    _b.label = 1;
                case 1:
                    if (!(i < this.wrappedCoinAddresses.length)) return [3 /*break*/, 4];
                    return [4 /*yield*/, curve.contracts[this.address].contract.balances(i, curve.constantOptions)];
                case 2:
                    _balance = _b.sent();
                    coinBalancesBN.push(toBN(_balance, this.wrappedDecimals[i]));
                    _b.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4:
                    _a = toBN;
                    return [4 /*yield*/, curve.contracts[this.lpToken].contract.totalSupply(curve.constantOptions)];
                case 5:
                    totalSupplyBN = _a.apply(void 0, [_b.sent()]);
                    expectedAmountsBN = [];
                    for (_i = 0, coinBalancesBN_1 = coinBalancesBN; _i < coinBalancesBN_1.length; _i++) {
                        coinBalance = coinBalancesBN_1[_i];
                        expectedAmountsBN.push(coinBalance.times(toBN(_lpTokenAmount)).div(totalSupplyBN));
                    }
                    return [2 /*return*/, expectedAmountsBN.map(function (amount, i) { return fromBN(amount, _this.wrappedDecimals[i]); })];
            }
        });
    });
}
export function _calcExpectedUnderlyingAmountsMeta(_lpTokenAmount) {
    return __awaiter(this, void 0, void 0, function () {
        var _expectedWrappedAmounts, _expectedMetaCoinAmount, _expectedUnderlyingAmounts, basePool, _basePoolExpectedAmounts, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, _calcExpectedAmounts.call(this, _lpTokenAmount)];
                case 1:
                    _expectedWrappedAmounts = _b.sent();
                    _expectedMetaCoinAmount = _expectedWrappedAmounts.splice(this.metaCoinIdx, 1)[0];
                    _expectedUnderlyingAmounts = _expectedWrappedAmounts;
                    basePool = new PoolTemplate(this.basePool);
                    if (!basePool.isMeta) return [3 /*break*/, 3];
                    return [4 /*yield*/, _calcExpectedUnderlyingAmountsMeta.call(basePool, _expectedMetaCoinAmount)];
                case 2:
                    _a = _b.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, _calcExpectedAmounts.call(basePool, _expectedMetaCoinAmount)];
                case 4:
                    _a = _b.sent();
                    _b.label = 5;
                case 5:
                    _basePoolExpectedAmounts = _a;
                    _expectedUnderlyingAmounts.splice.apply(_expectedUnderlyingAmounts, __spreadArray([this.metaCoinIdx, 0], _basePoolExpectedAmounts, false));
                    return [2 /*return*/, _expectedUnderlyingAmounts];
            }
        });
    });
}
