# Problems w/ the curve-js library and how we work around them


## Problem #1 - Global singleton

The Curve-js library has a global singleton. We need to create multiple instances
of the curve client on our server-side. This can be done w/out modifying curve-js.


The following solution comes from
the [Curve frontend](https://github.com/curvefi/curve-frontend/blob/cc47ecc515d2d1c1f580b5957eedf76e2d32077b/apps/loan/src/utils/utilsCurvejs.ts#L11).


```
import cloneDeep from 'lodash/cloneDeep';

const curveClient = cloneDeep(
  (await import('../dist/deps.bundle')).default,
);

await curveClient.init(
  'JsonRpc',
  { url: client.transport.url },
  { chainId: chain.id },
);
```

## Problem #2 - Finding routes for non-preapproved coins

The exported method `getBestRouteAndOutput` and `swapPriceImpact` check the
input and output coins against a whitelist. It is complicated and error-prone to add new coins to curve-js. We
need versions of those methods that skip the whitelist checks.

These are the following methods we have added to this library in order to skip whitelist checks:

```
yodlGetBestRouteAndOutput
yodlSwapPriceImpact
```

## Customizations made to this Library

1. Added two custom methods yodlGetBestRouteAndOutput and yodlSwapPriceImpact to the file `src/yodl.ts`
2. Exported previously private methods in `src/router.ts` used by the custom methods in `src/yodl.ts`
3. Add custom methods to exports in `src/index.ts`
4. Include built files in `./lib` to git source control so this library can be used by a github link rather
   than publish to NPM.