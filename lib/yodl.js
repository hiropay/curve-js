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
import { fromBN, toBN, parseUnits, _cutZeros, _get_small_x, _get_price_impact, } from "./utils.js";
import { _getBestRoute, _getOutputForRoute, _routesCache, _getExchangeArgs, } from './router.js';
export var yodlGetBestRouteAndOutput = function (inputCoinAddress, outputCoinAddress, inputCoinDecimals, outputCoinDecimals, amount) { return __awaiter(void 0, void 0, void 0, function () {
    var route, _output;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, _getBestRoute(inputCoinAddress, outputCoinAddress, amount)];
            case 1:
                route = _a.sent();
                if (route.length === 0)
                    return [2 /*return*/, { route: route, output: "0.0" }];
                return [4 /*yield*/, _getOutputForRoute(route, parseUnits(amount, inputCoinDecimals))];
            case 2:
                _output = _a.sent();
                _routesCache["".concat(inputCoinAddress, "-").concat(outputCoinAddress, "-").concat(amount)] = {
                    route: route,
                    output: curve.formatUnits(_output + BigInt(1), outputCoinDecimals),
                    timestamp: Date.now(),
                };
                return [2 /*return*/, {
                        route: route,
                        output: curve.formatUnits(_output + BigInt(1), outputCoinDecimals),
                    }];
        }
    });
}); };
export var yodlSwapPriceImpact = function (inputCoinAddress, outputCoinAddress, inputCoinDecimals, outputCoinDecimals, amount) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, route, output, _amount, _output, smallAmountIntBN, amountIntBN, contract, _smallAmount, _b, _route, _swapParams, _pools, _smallOutput, e_1, priceImpactBN;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, yodlGetBestRouteAndOutput(inputCoinAddress, outputCoinAddress, inputCoinDecimals, outputCoinDecimals, amount)];
            case 1:
                _a = _c.sent(), route = _a.route, output = _a.output;
                _amount = parseUnits(amount, inputCoinDecimals);
                _output = parseUnits(output, outputCoinDecimals);
                smallAmountIntBN = _get_small_x(_amount, _output, inputCoinDecimals, outputCoinDecimals);
                amountIntBN = toBN(_amount, 0);
                if (smallAmountIntBN.gte(amountIntBN))
                    return [2 /*return*/, 0];
                contract = curve.contracts[curve.constants.ALIASES.router].contract;
                _smallAmount = fromBN(smallAmountIntBN.div(Math.pow(10, inputCoinDecimals)), inputCoinDecimals);
                _b = _getExchangeArgs(route), _route = _b._route, _swapParams = _b._swapParams, _pools = _b._pools;
                _c.label = 2;
            case 2:
                _c.trys.push([2, 7, , 12]);
                if (!_pools) return [3 /*break*/, 4];
                return [4 /*yield*/, contract.get_dy(_route, _swapParams, _smallAmount, _pools, curve.constantOptions)];
            case 3:
                _smallOutput = _c.sent();
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, contract.get_dy(_route, _swapParams, _smallAmount, curve.constantOptions)];
            case 5:
                _smallOutput = _c.sent();
                _c.label = 6;
            case 6: return [3 /*break*/, 12];
            case 7:
                e_1 = _c.sent();
                _smallAmount = curve.parseUnits("1", inputCoinDecimals); // Dirty hack
                if (!_pools) return [3 /*break*/, 9];
                return [4 /*yield*/, contract.get_dy(_route, _swapParams, _smallAmount, _pools, curve.constantOptions)];
            case 8:
                _smallOutput = _c.sent();
                return [3 /*break*/, 11];
            case 9: return [4 /*yield*/, contract.get_dy(_route, _swapParams, _smallAmount, curve.constantOptions)];
            case 10:
                _smallOutput = _c.sent();
                _c.label = 11;
            case 11: return [3 /*break*/, 12];
            case 12:
                priceImpactBN = _get_price_impact(_amount, _output, _smallAmount, _smallOutput, inputCoinDecimals, outputCoinDecimals);
                return [2 /*return*/, Number(_cutZeros(priceImpactBN.toFixed(4)))];
        }
    });
}); };
