import { lowerCaseValues } from "../utils.js";
import { IDict } from "../../interfaces.js";


export const COINS_BASE: IDict<string> = lowerCaseValues({
    crv: '0x8Ee73c484A26e0A5df2Ee2a4960B789967dd0415',

    // --- ETH ---
    eth: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",  // ETH
    weth: '0x4200000000000000000000000000000000000006',
    usdm: "0x59D9356E565Ab3A36dD77763Fc0d87fEaf85508C", // USDM
    wudsm: "0x57F5E098CaD7A3D1Eed53991D4d66C45C9AF7812", // wUSDM
    
});

export const cTokensBase = []; //.map((a) => a.toLowerCase());
export const yTokensBase = []; //.map((a) => a.toLowerCase());
export const ycTokensBase = []; //.map((a) => a.toLowerCase());
export const aTokensBase = []; //.map((a) => a.toLowerCase());
