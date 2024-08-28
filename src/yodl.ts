import { curve } from "./curve.js";
import {
    IRoute,
} from "./interfaces";
import {
    fromBN,
    toBN,
    parseUnits,
    _cutZeros,
    _get_small_x,
    _get_price_impact,
} from "./utils.js";
import {
    _getBestRoute,
    _getOutputForRoute,
    _routesCache,
    _getExchangeArgs, 
} from './router.js'

export const yodlGetBestRouteAndOutput = async (
    inputCoinAddress: string,
    outputCoinAddress: string,
    inputCoinDecimals: number,
    outputCoinDecimals: number,
    amount: number | string
): Promise<{ route: IRoute; output: string }> => {
    const route = await _getBestRoute(
        inputCoinAddress,
        outputCoinAddress,
        amount
    ); // 5 minutes cache
    if (route.length === 0) return { route, output: "0.0" };

    const _output = await _getOutputForRoute(
        route,
        parseUnits(amount, inputCoinDecimals)
    ); // 15 seconds cache, so we call it to get fresh output estimation
    _routesCache[`${inputCoinAddress}-${outputCoinAddress}-${amount}`] = {
        route,
        output: curve.formatUnits(_output + BigInt(1), outputCoinDecimals),
        timestamp: Date.now(),
    };

    return {
        route,
        output: curve.formatUnits(_output + BigInt(1), outputCoinDecimals),
    };
};


export const yodlSwapPriceImpact = async (
    inputCoinAddress: string,
    outputCoinAddress: string,
    inputCoinDecimals: number,
    outputCoinDecimals: number,
    amount: number | string
): Promise<number> => {
    const { route, output } = await yodlGetBestRouteAndOutput(
        inputCoinAddress,
        outputCoinAddress,
        inputCoinDecimals,
        outputCoinDecimals,
        amount
    );
    const _amount = parseUnits(amount, inputCoinDecimals);
    const _output = parseUnits(output, outputCoinDecimals);

    const smallAmountIntBN = _get_small_x(
        _amount,
        _output,
        inputCoinDecimals,
        outputCoinDecimals
    );
    const amountIntBN = toBN(_amount, 0);
    if (smallAmountIntBN.gte(amountIntBN)) return 0;

    const contract = curve.contracts[curve.constants.ALIASES.router].contract;
    let _smallAmount = fromBN(
        smallAmountIntBN.div(10 ** inputCoinDecimals),
        inputCoinDecimals
    );
    const { _route, _swapParams, _pools } = _getExchangeArgs(route);
    let _smallOutput: bigint;
    try {
        if (_pools) {
            _smallOutput = await contract.get_dy(
                _route,
                _swapParams,
                _smallAmount,
                _pools,
                curve.constantOptions
            );
        } else {
            _smallOutput = await contract.get_dy(
                _route,
                _swapParams,
                _smallAmount,
                curve.constantOptions
            );
        }
    } catch (e) {
        _smallAmount = curve.parseUnits("1", inputCoinDecimals); // Dirty hack
        if (_pools) {
            _smallOutput = await contract.get_dy(
                _route,
                _swapParams,
                _smallAmount,
                _pools,
                curve.constantOptions
            );
        } else {
            _smallOutput = await contract.get_dy(
                _route,
                _swapParams,
                _smallAmount,
                curve.constantOptions
            );
        }
    }
    const priceImpactBN = _get_price_impact(
        _amount,
        _output,
        _smallAmount,
        _smallOutput,
        inputCoinDecimals,
        outputCoinDecimals
    );

    return Number(_cutZeros(priceImpactBN.toFixed(4)));
};