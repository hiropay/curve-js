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
import axios from "axios";
import memoize from "memoizee";
export var _getPoolsFromApi = memoize(function (network, poolType) { return __awaiter(void 0, void 0, void 0, function () {
    var url, response;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                url = "https://api.curve.fi/api/getPools/".concat(network, "/").concat(poolType);
                return [4 /*yield*/, axios.get(url, { validateStatus: function () { return true; } })];
            case 1:
                response = _b.sent();
                return [2 /*return*/, (_a = response.data.data) !== null && _a !== void 0 ? _a : { poolData: [], tvl: 0, tvlAll: 0 }];
        }
    });
}); }, {
    promise: true,
    maxAge: 5 * 60 * 1000, // 5m
});
export var _getAllPoolsFromApi = function (network) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Promise.all([
                    _getPoolsFromApi(network, "main"),
                    _getPoolsFromApi(network, "crypto"),
                    _getPoolsFromApi(network, "factory"),
                    _getPoolsFromApi(network, "factory-crvusd"),
                    _getPoolsFromApi(network, "factory-eywa"),
                    _getPoolsFromApi(network, "factory-crypto"),
                    _getPoolsFromApi(network, "factory-twocrypto"),
                    _getPoolsFromApi(network, "factory-tricrypto"),
                    _getPoolsFromApi(network, "factory-stable-ng"),
                ])];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
export var _getSubgraphData = memoize(function (network) { return __awaiter(void 0, void 0, void 0, function () {
    var url, response, poolsData;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                url = "https://api.curve.fi/api/getSubgraphData/".concat(network);
                return [4 /*yield*/, axios.get(url, { validateStatus: function () { return true; } })];
            case 1:
                response = _d.sent();
                poolsData = response.data.data.poolList.map(function (item) {
                    return {
                        address: item.address,
                        volumeUSD: item.volumeUSD,
                        day: item.latestDailyApy,
                        week: item.latestWeeklyApy,
                    };
                });
                return [2 /*return*/, {
                        poolsData: poolsData !== null && poolsData !== void 0 ? poolsData : [],
                        totalVolume: (_a = response.data.data.totalVolume) !== null && _a !== void 0 ? _a : 0,
                        cryptoVolume: (_b = response.data.data.cryptoVolume) !== null && _b !== void 0 ? _b : 0,
                        cryptoShare: (_c = response.data.data.cryptoShare) !== null && _c !== void 0 ? _c : 0,
                    }];
        }
    });
}); }, {
    promise: true,
    maxAge: 5 * 60 * 1000, // 5m
});
export var _getVolumes = memoize(function (network) { return __awaiter(void 0, void 0, void 0, function () {
    var url, response, poolsData;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                url = "https://api.curve.fi/api/getVolumes/".concat(network);
                return [4 /*yield*/, axios.get(url, { validateStatus: function () { return true; } })];
            case 1:
                response = _d.sent();
                poolsData = response.data.data.pools.map(function (item) {
                    return {
                        address: item.address,
                        volumeUSD: item.volumeUSD,
                        day: item.latestDailyApyPcent,
                        week: item.latestWeeklyApyPcent,
                    };
                });
                return [2 /*return*/, {
                        poolsData: poolsData !== null && poolsData !== void 0 ? poolsData : [],
                        totalVolume: (_a = response.data.data.totalVolumes.totalVolume) !== null && _a !== void 0 ? _a : 0,
                        cryptoVolume: (_b = response.data.data.totalVolumes.totalCryptoVolume) !== null && _b !== void 0 ? _b : 0,
                        cryptoShare: (_c = response.data.data.totalVolumes.cryptoVolumeSharePcent) !== null && _c !== void 0 ? _c : 0,
                    }];
        }
    });
}); }, {
    promise: true,
    maxAge: 5 * 60 * 1000, // 5m
});
export var _getFactoryAPYs = memoize(function (network) { return __awaiter(void 0, void 0, void 0, function () {
    var urlStable, urlCrypto, response, stableVolume, cryptoVolume, poolsData;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                urlStable = "https://api.curve.fi/api/getFactoryAPYs/".concat(network, "/stable");
                urlCrypto = "https://api.curve.fi/api/getFactoryAPYs/".concat(network, "/crypto");
                return [4 /*yield*/, Promise.all([
                        axios.get(urlStable, { validateStatus: function () { return true; } }),
                        axios.get(urlCrypto, { validateStatus: function () { return true; } }),
                    ])];
            case 1:
                response = _b.sent();
                stableVolume = response[0].data.data.totalVolumeUsd || response[0].data.data.totalVolume || 0;
                cryptoVolume = response[1].data.data.totalVolumeUsd || response[1].data.data.totalVolume || 0;
                poolsData = __spreadArray(__spreadArray([], response[0].data.data.poolDetails, true), response[1].data.data.poolDetails, true).map(function (item) {
                    var _a, _b, _c;
                    return {
                        address: item.poolAddress,
                        volumeUSD: (_a = item.totalVolumeUsd) !== null && _a !== void 0 ? _a : 0,
                        day: (_b = item.apy) !== null && _b !== void 0 ? _b : 0,
                        week: (_c = item.apy * 7) !== null && _c !== void 0 ? _c : 0, //Because api does not return week apy
                    };
                });
                return [2 /*return*/, {
                        poolsData: poolsData !== null && poolsData !== void 0 ? poolsData : [],
                        totalVolume: (_a = stableVolume + cryptoVolume) !== null && _a !== void 0 ? _a : 0,
                        cryptoVolume: cryptoVolume !== null && cryptoVolume !== void 0 ? cryptoVolume : 0,
                        cryptoShare: 100 * cryptoVolume / (stableVolume + cryptoVolume) || 0,
                    }];
        }
    });
}); }, {
    promise: true,
    maxAge: 5 * 60 * 1000, // 5m
});
//4
export var _getTotalVolumes = memoize(function (network) { return __awaiter(void 0, void 0, void 0, function () {
    var url, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (network === "aurora")
                    return [2 /*return*/, {
                            totalVolume: 0,
                            cryptoVolume: 0,
                            cryptoShare: 0,
                        }]; // Exclude Aurora
                url = "https://api.curve.fi/api/getSubgraphData/".concat(network);
                return [4 /*yield*/, axios.get(url, { validateStatus: function () { return true; } })];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data.data];
        }
    });
}); }, {
    promise: true,
    maxAge: 5 * 60 * 1000, // 5m
});
export var _getAllGauges = memoize(function () { return __awaiter(void 0, void 0, void 0, function () {
    var url, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = "https://api.curve.fi/api/getAllGauges";
                return [4 /*yield*/, axios.get(url, { validateStatus: function () { return true; } })];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data.data];
        }
    });
}); }, {
    promise: true,
    maxAge: 5 * 60 * 1000, // 5m
});
export var _getAllGaugesFormatted = memoize(function () { return __awaiter(void 0, void 0, void 0, function () {
    var url, response, gaugesDict;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = "https://api.curve.fi/api/getAllGauges";
                return [4 /*yield*/, axios.get(url, { validateStatus: function () { return true; } })];
            case 1:
                response = _a.sent();
                gaugesDict = {};
                Object.values(response.data.data).forEach(function (d) {
                    var _a, _b;
                    gaugesDict[d.gauge.toLowerCase()] = {
                        is_killed: (_a = d.is_killed) !== null && _a !== void 0 ? _a : false,
                        gaugeStatus: (_b = d.gaugeStatus) !== null && _b !== void 0 ? _b : null,
                    };
                });
                return [2 /*return*/, gaugesDict];
        }
    });
}); }, {
    promise: true,
    maxAge: 60 * 60 * 1000, // 60m
});
export var _getHiddenPools = memoize(function () { return __awaiter(void 0, void 0, void 0, function () {
    var url, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = "https://api.curve.fi/api/getHiddenPools";
                return [4 /*yield*/, axios.get(url, { validateStatus: function () { return true; } })];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data.data];
        }
    });
}); }, {
    promise: true,
    maxAge: 5 * 60 * 1000, // 5m
});
export var _generateBoostingProof = memoize(function (block, address) { return __awaiter(void 0, void 0, void 0, function () {
    var url, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = "https://prices.curve.fi/v1/general/get_merkle_proof?block=".concat(block, "&account_address=").concat(address);
                return [4 /*yield*/, axios.get(url, { validateStatus: function () { return true; } })];
            case 1:
                response = _a.sent();
                return [2 /*return*/, { block_header_rlp: response.data.block_header_rlp, proof_rlp: response.data.proof_rlp }];
        }
    });
}); }, {
    promise: true,
    maxAge: 5 * 60 * 1000, // 5m
});
// --- DAO ---
export var _getDaoProposalList = memoize(function () { return __awaiter(void 0, void 0, void 0, function () {
    var url, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = "https://api-py.llama.airforce/curve/v1/dao/proposals";
                return [4 /*yield*/, axios.get(url, { validateStatus: function () { return true; } })];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data.proposals];
        }
    });
}); }, {
    promise: true,
    maxAge: 5 * 60 * 1000, // 5m
});
export var _getDaoProposal = memoize(function (type, id) { return __awaiter(void 0, void 0, void 0, function () {
    var url, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = "https://api-py.llama.airforce/curve/v1/dao/proposals/".concat(type.toLowerCase(), "/").concat(id);
                return [4 /*yield*/, axios.get(url, { validateStatus: function () { return true; } })];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.data];
        }
    });
}); }, {
    promise: true,
    maxAge: 5 * 60 * 1000, // 5m
});
