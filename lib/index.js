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
import { PoolTemplate, getPool } from "./pools/index.js";
import { getUserPoolListByLiquidity, getUserPoolListByClaimable, getUserPoolList, getUserLiquidityUSD, getUserClaimable, } from "./pools/utils.js";
import { yodlGetBestRouteAndOutput, yodlSwapPriceImpact, } from './yodl.js';
import { getBestRouteAndOutput, getArgs, swapExpected, swapRequired, swapPriceImpact, swapIsApproved, swapApproveEstimateGas, swapApprove, swapEstimateGas, swap, getSwappedAmount, } from "./router.js";
import { curve as _curve } from "./curve.js";
import { getCrv, getLockedAmountAndUnlockTime, getVeCrv, getVeCrvPct, calcUnlockTime, createLockEstimateGas, createLock, isApproved, approveEstimateGas, approve, increaseAmountEstimateGas, increaseAmount, increaseUnlockTimeEstimateGas, increaseUnlockTime, withdrawLockedCrvEstimateGas, withdrawLockedCrv, claimableFees, claimFeesEstimateGas, claimFees, lastEthBlock, getAnycallBalance, topUpAnycall, topUpAnycallEstimateGas, lastBlockSent, blockToSend, sendBlockhash, sendBlockhashEstimateGas, submitProof, submitProofEstimateGas, claimFeesCrvUSDEstimateGas, claimableFeesCrvUSD, claimFeesCrvUSD, } from "./boosting.js";
import { getBalances, getAllowance, hasAllowance, ensureAllowanceEstimateGas, ensureAllowance, getUsdRate, getGasPriceFromL1, getGasPriceFromL2, getGasInfoForL2, getTVL, getCoinsData, getVolume, hasDepositAndStake, hasRouter, getBasePools, getGasPrice, } from "./utils.js";
import { deployStablePlainPool, deployStablePlainPoolEstimateGas, getDeployedStablePlainPoolAddress, setOracle, setOracleEstimateGas, deployStableMetaPool, deployStableMetaPoolEstimateGas, getDeployedStableMetaPoolAddress, deployCryptoPool, deployCryptoPoolEstimateGas, getDeployedCryptoPoolAddress, deployTricryptoPool, deployTricryptoPoolEstimateGas, getDeployedTricryptoPoolAddress, deployGauge, deployGaugeEstimateGas, getDeployedGaugeAddress, deployGaugeSidechain, deployGaugeSidechainEstimateGas, deployGaugeMirror, deployGaugeMirrorEstimateGas, getDeployedGaugeMirrorAddress, getDeployedGaugeMirrorAddressByTx, deployStableNgPlainPool, deployStableNgPlainPoolEstimateGas, deployStableNgMetaPool, deployStableNgMetaPoolEstimateGas, deployTwocryptoPool, deployTwocryptoPoolEstimateGas, getDeployedTwocryptoPoolAddress, } from './factory/deploy.js';
import { crvSupplyStats, userCrv, userVeCrv, crvLockIsApproved, crvLockApproveEstimateGas, crvLockApprove, calcCrvUnlockTime, createCrvLockEstimateGas, createCrvLock, increaseCrvLockedAmountEstimateGas, increaseCrvLockedAmount, increaseCrvUnlockTimeEstimateGas, increaseCrvUnlockTime, withdrawLockedCrvEstimateGas as daoWithdrawLockedCrvEstimateGas, withdrawLockedCrv as daoWithdrawLockedCrv, claimableFees as daoClaimableFees, claimFeesEstimateGas as daoClaimFeesEstimateGas, claimFees as daoClaimFees, getVotingGaugeList, userGaugeVotes, voteForGaugeNextTime, voteForGaugeEstimateGas, voteForGauge, getProposalList, getProposal, userProposalVotes, voteForProposalEstimateGas, voteForProposal, executeVote, executeVoteEstimateGas, isCanVoteExecute, } from "./dao.js";
function init(providerType, providerSettings, options) {
    if (options === void 0) { options = {}; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, _curve.init(providerType, providerSettings, options)];
                case 1:
                    _a.sent();
                    // @ts-ignore
                    this.signerAddress = _curve.signerAddress;
                    // @ts-ignore
                    this.chainId = _curve.chainId;
                    return [2 /*return*/];
            }
        });
    });
}
function setCustomFeeData(customFeeData) {
    _curve.setCustomFeeData(customFeeData);
}
var curve = {
    init: init,
    chainId: 0,
    signerAddress: '',
    setCustomFeeData: setCustomFeeData,
    getPoolList: _curve.getPoolList,
    getMainPoolList: _curve.getMainPoolList,
    getUserPoolListByLiquidity: getUserPoolListByLiquidity,
    getUserPoolListByClaimable: getUserPoolListByClaimable,
    getUserPoolList: getUserPoolList,
    getUserLiquidityUSD: getUserLiquidityUSD,
    getUserClaimable: getUserClaimable,
    PoolTemplate: PoolTemplate,
    getBasePools: getBasePools,
    getPool: getPool,
    getUsdRate: getUsdRate,
    getGasPriceFromL1: getGasPriceFromL1,
    getGasPriceFromL2: getGasPriceFromL2,
    getGasInfoForL2: getGasInfoForL2,
    getGasPrice: getGasPrice,
    getTVL: getTVL,
    getBalances: getBalances,
    getAllowance: getAllowance,
    hasAllowance: hasAllowance,
    ensureAllowance: ensureAllowance,
    getCoinsData: getCoinsData,
    getVolume: getVolume,
    hasDepositAndStake: hasDepositAndStake,
    hasRouter: hasRouter,
    factory: {
        fetchPools: _curve.fetchFactoryPools,
        fetchNewPools: _curve.fetchNewFactoryPools,
        getPoolList: _curve.getFactoryPoolList,
        deployPlainPool: deployStablePlainPool,
        setOracle: setOracle,
        deployMetaPool: deployStableMetaPool,
        deployGauge: function (poolAddress) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, deployGauge(poolAddress, _curve.constants.ALIASES.factory)];
        }); }); },
        deployGaugeSidechain: function (poolAddress, salt) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, deployGaugeSidechain(poolAddress, salt)];
        }); }); },
        deployGaugeMirror: function (chainId, salt) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, deployGaugeMirror(chainId, salt)];
        }); }); },
        getDeployedPlainPoolAddress: getDeployedStablePlainPoolAddress,
        getDeployedMetaPoolAddress: getDeployedStableMetaPoolAddress,
        getDeployedGaugeAddress: getDeployedGaugeAddress,
        getDeployedGaugeMirrorAddress: getDeployedGaugeMirrorAddress,
        getDeployedGaugeMirrorAddressByTx: getDeployedGaugeMirrorAddressByTx,
        fetchRecentlyDeployedPool: _curve.fetchRecentlyDeployedFactoryPool,
        gaugeImplementation: function () { return _curve.getGaugeImplementation("factory"); },
        estimateGas: {
            deployPlainPool: deployStablePlainPoolEstimateGas,
            setOracle: setOracleEstimateGas,
            deployMetaPool: deployStableMetaPoolEstimateGas,
            deployGauge: function (poolAddress) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, deployGaugeEstimateGas(poolAddress, _curve.constants.ALIASES.factory)];
            }); }); },
            deployGaugeSidechain: function (poolAddress, salt) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, deployGaugeSidechainEstimateGas(poolAddress, salt)];
            }); }); },
            deployGaugeMirror: function (chainId, salt) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, deployGaugeMirrorEstimateGas(chainId, salt)];
            }); }); },
        },
    },
    crvUSDFactory: {
        fetchPools: _curve.fetchCrvusdFactoryPools,
        getPoolList: _curve.getCrvusdFactoryPoolList,
    },
    EYWAFactory: {
        fetchPools: _curve.fetchEywaFactoryPools,
        getPoolList: _curve.getEywaFactoryPoolList,
    },
    stableNgFactory: {
        fetchPools: _curve.fetchStableNgFactoryPools,
        fetchNewPools: _curve.fetchNewStableNgFactoryPools,
        getPoolList: _curve.getStableNgFactoryPoolList,
        deployPlainPool: deployStableNgPlainPool,
        deployMetaPool: deployStableNgMetaPool,
        deployGauge: function (poolAddress) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, deployGauge(poolAddress, _curve.constants.ALIASES.stable_ng_factory)];
        }); }); },
        deployGaugeSidechain: function (poolAddress, salt) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, deployGaugeSidechain(poolAddress, salt)];
        }); }); },
        deployGaugeMirror: function (chainId, salt) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, deployGaugeMirror(chainId, salt)];
        }); }); },
        getDeployedPlainPoolAddress: getDeployedStablePlainPoolAddress,
        getDeployedMetaPoolAddress: getDeployedStableMetaPoolAddress,
        getDeployedGaugeAddress: getDeployedGaugeAddress,
        getDeployedGaugeMirrorAddress: getDeployedGaugeMirrorAddress,
        getDeployedGaugeMirrorAddressByTx: getDeployedGaugeMirrorAddressByTx,
        fetchRecentlyDeployedPool: _curve.fetchRecentlyDeployedStableNgFactoryPool,
        estimateGas: {
            deployPlainPool: deployStableNgPlainPoolEstimateGas,
            deployMetaPool: deployStableNgMetaPoolEstimateGas,
        },
    },
    cryptoFactory: {
        fetchPools: _curve.fetchCryptoFactoryPools,
        fetchNewPools: _curve.fetchNewCryptoFactoryPools,
        getPoolList: _curve.getCryptoFactoryPoolList,
        deployPool: deployCryptoPool,
        deployGauge: function (poolAddress) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, deployGauge(poolAddress, _curve.constants.ALIASES.crypto_factory)];
        }); }); },
        deployGaugeSidechain: function (poolAddress, salt) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, deployGaugeSidechain(poolAddress, salt)];
        }); }); },
        deployGaugeMirror: function (chainId, salt) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, deployGaugeMirror(chainId, salt)];
        }); }); },
        getDeployedPoolAddress: getDeployedCryptoPoolAddress,
        getDeployedGaugeAddress: getDeployedGaugeAddress,
        getDeployedGaugeMirrorAddress: getDeployedGaugeMirrorAddress,
        getDeployedGaugeMirrorAddressByTx: getDeployedGaugeMirrorAddressByTx,
        fetchRecentlyDeployedPool: _curve.fetchRecentlyDeployedCryptoFactoryPool,
        gaugeImplementation: function () { return _curve.getGaugeImplementation("factory-crypto"); },
        estimateGas: {
            deployPool: deployCryptoPoolEstimateGas,
            deployGauge: function (poolAddress) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, deployGaugeEstimateGas(poolAddress, _curve.constants.ALIASES.crypto_factory)];
            }); }); },
            deployGaugeSidechain: function (poolAddress, salt) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, deployGaugeSidechainEstimateGas(poolAddress, salt)];
            }); }); },
            deployGaugeMirror: function (chainId, salt) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, deployGaugeMirrorEstimateGas(chainId, salt)];
            }); }); },
        },
    },
    twocryptoFactory: {
        fetchPools: _curve.fetchTworyptoFactoryPools,
        fetchNewPools: _curve.fetchNewTwocryptoFactoryPools,
        getPoolList: _curve.getTworyptoFactoryPoolList,
        deployPool: deployTwocryptoPool,
        deployGauge: function (poolAddress) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, deployGauge(poolAddress, _curve.constants.ALIASES.twocrypto_factory)];
        }); }); },
        deployGaugeSidechain: function (poolAddress, salt) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, deployGaugeSidechain(poolAddress, salt)];
        }); }); },
        deployGaugeMirror: function (chainId, salt) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, deployGaugeMirror(chainId, salt)];
        }); }); },
        getDeployedPoolAddress: getDeployedTwocryptoPoolAddress,
        getDeployedGaugeAddress: getDeployedGaugeAddress,
        getDeployedGaugeMirrorAddress: getDeployedGaugeMirrorAddress,
        getDeployedGaugeMirrorAddressByTx: getDeployedGaugeMirrorAddressByTx,
        fetchRecentlyDeployedPool: _curve.fetchRecentlyDeployedTwocryptoFactoryPool,
        gaugeImplementation: function () { return _curve.getGaugeImplementation("factory-twocrypto"); },
        estimateGas: {
            deployPool: deployTwocryptoPoolEstimateGas,
            deployGauge: function (poolAddress) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, deployGaugeEstimateGas(poolAddress, _curve.constants.ALIASES.twocrypto_factory)];
            }); }); },
            deployGaugeSidechain: function (poolAddress, salt) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, deployGaugeSidechainEstimateGas(poolAddress, salt)];
            }); }); },
            deployGaugeMirror: function (chainId, salt) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, deployGaugeMirrorEstimateGas(chainId, salt)];
            }); }); },
        },
    },
    tricryptoFactory: {
        fetchPools: _curve.fetchTricryptoFactoryPools,
        fetchNewPools: _curve.fetchNewTricryptoFactoryPools,
        getPoolList: _curve.getTricryptoFactoryPoolList,
        deployPool: deployTricryptoPool,
        deployGauge: function (poolAddress) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, deployGauge(poolAddress, _curve.constants.ALIASES.tricrypto_factory)];
        }); }); },
        deployGaugeSidechain: function (poolAddress, salt) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, deployGaugeSidechain(poolAddress, salt)];
        }); }); },
        deployGaugeMirror: function (chainId, salt) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, deployGaugeMirror(chainId, salt)];
        }); }); },
        getDeployedPoolAddress: getDeployedTricryptoPoolAddress,
        getDeployedGaugeAddress: getDeployedGaugeAddress,
        getDeployedGaugeMirrorAddress: getDeployedGaugeMirrorAddress,
        getDeployedGaugeMirrorAddressByTx: getDeployedGaugeMirrorAddressByTx,
        fetchRecentlyDeployedPool: _curve.fetchRecentlyDeployedTricryptoFactoryPool,
        gaugeImplementation: function () { return _curve.getGaugeImplementation("factory-tricrypto"); },
        estimateGas: {
            deployPool: deployTricryptoPoolEstimateGas,
            deployGauge: function (poolAddress) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, deployGaugeEstimateGas(poolAddress, _curve.constants.ALIASES.tricrypto_factory)];
            }); }); },
            deployGaugeSidechain: function (poolAddress, salt) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, deployGaugeSidechainEstimateGas(poolAddress, salt)];
            }); }); },
            deployGaugeMirror: function (chainId, salt) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, deployGaugeMirrorEstimateGas(chainId, salt)];
            }); }); },
        },
    },
    estimateGas: {
        ensureAllowance: ensureAllowanceEstimateGas,
    },
    boosting: {
        getCrv: getCrv,
        getLockedAmountAndUnlockTime: getLockedAmountAndUnlockTime,
        getVeCrv: getVeCrv,
        getVeCrvPct: getVeCrvPct,
        calcUnlockTime: calcUnlockTime,
        isApproved: isApproved,
        approve: approve,
        createLock: createLock,
        increaseAmount: increaseAmount,
        increaseUnlockTime: increaseUnlockTime,
        withdrawLockedCrv: withdrawLockedCrv,
        claimableFees: claimableFees,
        claimFees: claimFees,
        claimableFeesCrvUSD: claimableFeesCrvUSD,
        claimFeesCrvUSD: claimFeesCrvUSD,
        estimateGas: {
            approve: approveEstimateGas,
            createLock: createLockEstimateGas,
            increaseAmount: increaseAmountEstimateGas,
            increaseUnlockTime: increaseUnlockTimeEstimateGas,
            withdrawLockedCrv: withdrawLockedCrvEstimateGas,
            claimFees: claimFeesEstimateGas,
            claimFeesCrvUSD: claimFeesCrvUSDEstimateGas,
        },
        sidechain: {
            lastEthBlock: lastEthBlock,
            getAnycallBalance: getAnycallBalance,
            topUpAnycall: topUpAnycall,
            lastBlockSent: lastBlockSent,
            blockToSend: blockToSend,
            sendBlockhash: sendBlockhash,
            submitProof: submitProof,
            estimateGas: {
                topUpAnycall: topUpAnycallEstimateGas,
                sendBlockhash: sendBlockhashEstimateGas,
                submitProof: submitProofEstimateGas,
            },
        },
    },
    router: {
        getBestRouteAndOutput: getBestRouteAndOutput,
        yodlGetBestRouteAndOutput: yodlGetBestRouteAndOutput,
        getArgs: getArgs,
        expected: swapExpected,
        required: swapRequired,
        priceImpact: swapPriceImpact,
        yodlSwapPriceImpact: yodlSwapPriceImpact,
        isApproved: swapIsApproved,
        approve: swapApprove,
        swap: swap,
        getSwappedAmount: getSwappedAmount,
        estimateGas: {
            approve: swapApproveEstimateGas,
            swap: swapEstimateGas,
        },
    },
    dao: {
        // --- CRV lock ---
        // View methods
        crvSupplyStats: crvSupplyStats,
        userCrv: userCrv,
        userVeCrv: userVeCrv,
        crvLockIsApproved: crvLockIsApproved,
        calcCrvUnlockTime: calcCrvUnlockTime,
        claimableFees: daoClaimableFees,
        // Transaction methods
        crvLockApprove: crvLockApprove,
        createCrvLock: createCrvLock,
        increaseCrvLockedAmount: increaseCrvLockedAmount,
        increaseCrvUnlockTime: increaseCrvUnlockTime,
        withdrawLockedCrv: daoWithdrawLockedCrv,
        claimFees: daoClaimFees,
        // --- Gauge voting ---
        // View methods
        getVotingGaugeList: getVotingGaugeList,
        userGaugeVotes: userGaugeVotes,
        voteForGaugeNextTime: voteForGaugeNextTime,
        // Transaction methods
        voteForGauge: voteForGauge,
        // --- Proposal voting ---
        // View methods
        getProposalList: getProposalList,
        getProposal: getProposal,
        userProposalVotes: userProposalVotes,
        // Transaction methods
        voteForProposal: voteForProposal,
        executeVote: executeVote,
        isCanVoteExecute: isCanVoteExecute,
        estimateGas: {
            // --- CRV lock ---
            crvLockApprove: crvLockApproveEstimateGas,
            createCrvLock: createCrvLockEstimateGas,
            increaseCrvLockedAmount: increaseCrvLockedAmountEstimateGas,
            increaseCrvUnlockTime: increaseCrvUnlockTimeEstimateGas,
            withdrawLockedCrv: daoWithdrawLockedCrvEstimateGas,
            claimFees: daoClaimFeesEstimateGas,
            // --- Gauge voting ---
            voteForGauge: voteForGaugeEstimateGas,
            // --- Proposal voting ---
            voteForProposal: voteForProposalEstimateGas,
            executeVote: executeVoteEstimateGas,
        },
    },
};
export default curve;
