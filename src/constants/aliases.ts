import { lowerCaseValues } from "./utils.js";


export const ALIASES_ETHEREUM = lowerCaseValues({
    "crv": "0xD533a949740bb3306d119CC777fa900bA034cd52", // <--- CHANGE
    "minter": "0xd061D61a4d941c39E5453435B6345Dc261C2fcE0", // <--- CHANGE
    "voting_escrow": "0x5f3b5DfEb7B28CDbD7FAba78963EE202a494e2A2",
    "fee_distributor": "0xA464e6DCda8AC41e03616F95f4BC98a13b8922Dc",
    "gauge_controller": "0x2F50D538606Fa9EDD2B11E2446BEb18C9D5846bB",
    "address_provider": "0x0000000022d53366457f9d5e68ec105046fc4383",
    "router": "0xfA9a30350048B2BF66865ee20363067c66f67e58",
    "deposit_and_stake": "0x271fbE8aB7f1fB262f81C77Ea5303F03DA9d3d6A", // <--- CHANGE
    "stable_calc": "0xCA8d0747B5573D69653C3aC22242e6341C36e4b4", // <-- CHANGED
    "crypto_calc": '0xA72C85C258A81761433B4e8da60505Fe3Dd551CC', // <--- NEW
    "factory": '0xb9fc157394af804a3578134a6585c0dc9cc990d4', // <--- CHANGE
    "crvusd_factory": '0x4F8846Ae9380B90d2E71D5e3D042dff3E7ebb40d', // <--- CHANGE
    "eywa_factory": '0x37F22A0B028f2152e6CAcef210e0C4d3b875f367', // <--- DUMMY
    "crypto_factory": '0xF18056Bbd320E96A48e3Fbf8bC061322531aac99', // <--- CHANGE
    "tricrypto_factory": '0x0c0e5f2fF0ff18a3be9b835635039256dC4B4963', // <--- CHANGE
    "registry_exchange": "",
    "factory_admin": "",
});

export const ALIASES_POLYGON = lowerCaseValues({
    "crv": "0x172370d5cd63279efa6d502dab29171933a610af",
    "minter": "0xabC000d88f23Bb45525E447528DBF656A9D55bf5",
    "voting_escrow": "0xb5acc710aede048600e10eedcefdf98d4abf4b1e",
    "fee_distributor": "0xA464e6DCda8AC41e03616F95f4BC98a13b8922Dc", // <-- DUMMY
    "gauge_controller": "0x2F50D538606Fa9EDD2B11E2446BEb18C9D5846bB",
    "address_provider": "0x0000000022d53366457f9d5e68ec105046fc4383",
    "router": "0xfA9a30350048B2BF66865ee20363067c66f67e58",
    "deposit_and_stake": "0xB7De33440B7171159a9718CBE748086cecDd9685",
    "stable_calc": "0xCA8d0747B5573D69653C3aC22242e6341C36e4b4", // <-- CHANGED
    "crypto_calc": '0xA72C85C258A81761433B4e8da60505Fe3Dd551CC', // <--- NEW
    "factory": '0x722272d36ef0da72ff51c5a65db7b870e2e8d4ee',
    "crvusd_factory": '0x4F8846Ae9380B90d2E71D5e3D042dff3E7ebb40d', // <-- DUMMY
    "eywa_factory": '0x37F22A0B028f2152e6CAcef210e0C4d3b875f367', // <--- DUMMY
    "crypto_factory": "0xE5De15A9C9bBedb4F5EC13B131E61245f2983A69",
    "tricrypto_factory": '0x0c0e5f2fF0ff18a3be9b835635039256dC4B4963', // <--- TODO CHANGE
    "registry_exchange": "",
    "factory_admin": "",
});

export const ALIASES_FANTOM = lowerCaseValues({
    "crv": "0x1E4F97b9f9F913c46F1632781732927B9019C68b",
    "minter": "0xabC000d88f23Bb45525E447528DBF656A9D55bf5",
    "voting_escrow": "0xb75dca485e21a77e1b433ecacb74475fc67e259c",
    "fee_distributor": "0xA464e6DCda8AC41e03616F95f4BC98a13b8922Dc", // <-- DUMMY
    "gauge_controller": "0x2F50D538606Fa9EDD2B11E2446BEb18C9D5846bB",
    "address_provider": "0x0000000022d53366457f9d5e68ec105046fc4383",
    "router": "0xfA9a30350048B2BF66865ee20363067c66f67e58",
    "deposit_and_stake": "0xB7De33440B7171159a9718CBE748086cecDd9685",
    "stable_calc": "0xCA8d0747B5573D69653C3aC22242e6341C36e4b4", // <-- CHANGED
    "crypto_calc": '0xA72C85C258A81761433B4e8da60505Fe3Dd551CC', // <--- NEW
    "factory": "0x686d67265703d1f124c45e33d47d794c566889ba",
    "crvusd_factory": '0x4F8846Ae9380B90d2E71D5e3D042dff3E7ebb40d', // <-- DUMMY
    "eywa_factory": '0x37F22A0B028f2152e6CAcef210e0C4d3b875f367',
    "crypto_factory": "0xE5De15A9C9bBedb4F5EC13B131E61245f2983A69",
    "tricrypto_factory": '0x0c0e5f2fF0ff18a3be9b835635039256dC4B4963', // <--- TODO CHANGE
    "registry_exchange": "",
    "factory_admin": "",
});

export const ALIASES_AVALANCHE = lowerCaseValues({
    "crv": "0x47536F17F4fF30e64A96a7555826b8f9e66ec468",
    "minter": "0xabC000d88f23Bb45525E447528DBF656A9D55bf5",
    "voting_escrow": "0xc55837710bc500f1e3c7bb9dd1d51f7c5647e657",
    "fee_distributor": "0xA464e6DCda8AC41e03616F95f4BC98a13b8922Dc", // <-- DUMMY
    "gauge_controller": "0x2F50D538606Fa9EDD2B11E2446BEb18C9D5846bB",
    "address_provider": "0x0000000022d53366457f9d5e68ec105046fc4383",
    "router": "0xfA9a30350048B2BF66865ee20363067c66f67e58",
    "deposit_and_stake": "0xB7De33440B7171159a9718CBE748086cecDd9685",
    "stable_calc": "0xCA8d0747B5573D69653C3aC22242e6341C36e4b4", // <-- CHANGED
    "crypto_calc": '0xA72C85C258A81761433B4e8da60505Fe3Dd551CC', // <--- NEW
    "factory": '0xb17b674D9c5CB2e441F8e196a2f048A81355d031',
    "crvusd_factory": '0x4F8846Ae9380B90d2E71D5e3D042dff3E7ebb40d', // <-- DUMMY
    "eywa_factory": '0x37F22A0B028f2152e6CAcef210e0C4d3b875f367', // <--- DUMMY
    "crypto_factory": '0xF18056Bbd320E96A48e3Fbf8bC061322531aac99', // <--- TODO CHANGE
    "tricrypto_factory": '0x0c0e5f2fF0ff18a3be9b835635039256dC4B4963', // <--- TODO CHANGE
    "registry_exchange": "",
    "factory_admin": "",
});

export const ALIASES_ARBITRUM = lowerCaseValues({
    "crv": "0x11cDb42B0EB46D95f990BeDD4695A6e3fA034978",
    "minter": "0xabC000d88f23Bb45525E447528DBF656A9D55bf5",
    "voting_escrow": "0x98c80fa823759b642c3e02f40533c164f40727ae",
    "fee_distributor": "0xA464e6DCda8AC41e03616F95f4BC98a13b8922Dc", // <-- DUMMY
    "gauge_controller": "0x2F50D538606Fa9EDD2B11E2446BEb18C9D5846bB",
    "address_provider": "0x0000000022d53366457f9d5e68ec105046fc4383",
    "router": "0xfA9a30350048B2BF66865ee20363067c66f67e58",
    "deposit_and_stake": "0xB7De33440B7171159a9718CBE748086cecDd9685",
    "stable_calc": "0xCA8d0747B5573D69653C3aC22242e6341C36e4b4", // <-- CHANGED
    "crypto_calc": '0xA72C85C258A81761433B4e8da60505Fe3Dd551CC', // <--- NEW
    "factory": '0xb17b674D9c5CB2e441F8e196a2f048A81355d031',
    "crvusd_factory": '0x4F8846Ae9380B90d2E71D5e3D042dff3E7ebb40d', // <-- DUMMY
    "eywa_factory": '0x37F22A0B028f2152e6CAcef210e0C4d3b875f367', // <--- DUMMY
    "crypto_factory": '0xF18056Bbd320E96A48e3Fbf8bC061322531aac99', // <--- TODO CHANGE
    "tricrypto_factory": '0xbC0797015fcFc47d9C1856639CaE50D0e69FbEE8',
    "registry_exchange": "",
    "factory_admin": "",
});

export const ALIASES_OPTIMISM = lowerCaseValues({
    "crv": "0x0994206dfE8De6Ec6920FF4D779B0d950605Fb53",
    "minter": "0xabC000d88f23Bb45525E447528DBF656A9D55bf5",
    "voting_escrow": "0x65a0b01756e837e6670634816e4f5b3a3ff21107",
    "fee_distributor": "0xA464e6DCda8AC41e03616F95f4BC98a13b8922Dc", // <-- DUMMY
    "gauge_controller": "0x2F50D538606Fa9EDD2B11E2446BEb18C9D5846bB",
    "address_provider": "0x0000000022d53366457f9d5e68ec105046fc4383",
    "router": "0xfA9a30350048B2BF66865ee20363067c66f67e58",
    "deposit_and_stake": "0xB7De33440B7171159a9718CBE748086cecDd9685",
    "stable_calc": "0xCA8d0747B5573D69653C3aC22242e6341C36e4b4", // <-- CHANGED
    "crypto_calc": '0xA72C85C258A81761433B4e8da60505Fe3Dd551CC', // <--- NEW
    "factory": '0x2db0E83599a91b508Ac268a6197b8B14F5e72840',
    "crvusd_factory": '0x4F8846Ae9380B90d2E71D5e3D042dff3E7ebb40d', // <-- DUMMY
    "eywa_factory": '0x37F22A0B028f2152e6CAcef210e0C4d3b875f367', // <--- DUMMY
    "crypto_factory": '0xF18056Bbd320E96A48e3Fbf8bC061322531aac99', // <--- TODO CHANGE
    "tricrypto_factory": '0x0c0e5f2fF0ff18a3be9b835635039256dC4B4963', // <--- TODO CHANGE
    "registry_exchange": "",
    "factory_admin": "",
});

export const ALIASES_XDAI = lowerCaseValues({
    "crv": "0x712b3d230f3c1c19db860d80619288b1f0bdd0bd",
    "minter": "0xabC000d88f23Bb45525E447528DBF656A9D55bf5",
    "voting_escrow": "0xefde221f306152971d8e9f181bfe998447975810",
    "fee_distributor": "0xA464e6DCda8AC41e03616F95f4BC98a13b8922Dc", // <-- DUMMY
    "gauge_controller": "0x2F50D538606Fa9EDD2B11E2446BEb18C9D5846bB",
    "address_provider": "0x0000000022d53366457f9d5e68ec105046fc4383",
    "router": "0xfA9a30350048B2BF66865ee20363067c66f67e58",
    "deposit_and_stake": "0xB7De33440B7171159a9718CBE748086cecDd9685",
    "stable_calc": "0xCA8d0747B5573D69653C3aC22242e6341C36e4b4", // <-- CHANGED
    "crypto_calc": '0xA72C85C258A81761433B4e8da60505Fe3Dd551CC', // <--- NEW
    "factory": '0xD19Baeadc667Cf2015e395f2B08668Ef120f41F5',
    "crvusd_factory": '0x4F8846Ae9380B90d2E71D5e3D042dff3E7ebb40d', // <-- DUMMY
    "eywa_factory": '0x37F22A0B028f2152e6CAcef210e0C4d3b875f367', // <--- DUMMY
    "crypto_factory": '0xF18056Bbd320E96A48e3Fbf8bC061322531aac99', // <--- TODO CHANGE
    "tricrypto_factory": '0x0c0e5f2fF0ff18a3be9b835635039256dC4B4963', // <--- TODO CHANGE
    "registry_exchange": "",
    "factory_admin": "",
});

export const ALIASES_MOONBEAM = lowerCaseValues({
    "crv": "0x7C598c96D02398d89FbCb9d41Eab3DF0C16F227D",
    "minter": "0xabC000d88f23Bb45525E447528DBF656A9D55bf5",
    "voting_escrow": "0x0000000000000000000000000000000000000000",
    "fee_distributor": "0xA464e6DCda8AC41e03616F95f4BC98a13b8922Dc", // <-- DUMMY
    "gauge_controller": "0x2F50D538606Fa9EDD2B11E2446BEb18C9D5846bB",
    "address_provider": "0x0000000022d53366457f9d5e68ec105046fc4383",
    "router": "0xfA9a30350048B2BF66865ee20363067c66f67e58",
    "deposit_and_stake": "0xB7De33440B7171159a9718CBE748086cecDd9685",
    "stable_calc": "0xCA8d0747B5573D69653C3aC22242e6341C36e4b4", // <-- CHANGED
    "crypto_calc": '0xA72C85C258A81761433B4e8da60505Fe3Dd551CC', // <--- NEW
    "factory": '0x4244eB811D6e0Ef302326675207A95113dB4E1F8',
    "crvusd_factory": '0x4F8846Ae9380B90d2E71D5e3D042dff3E7ebb40d', // <-- DUMMY
    "eywa_factory": '0x37F22A0B028f2152e6CAcef210e0C4d3b875f367', // <--- DUMMY
    "crypto_factory": '0xF18056Bbd320E96A48e3Fbf8bC061322531aac99', // <--- TODO CHANGE
    "tricrypto_factory": '0x0c0e5f2fF0ff18a3be9b835635039256dC4B4963', // <--- TODO CHANGE
    "registry_exchange": "",
    "factory_admin": "",
});

export const ALIASES_AURORA = lowerCaseValues({
    "crv": "0x64D5BaF5ac030e2b7c435aDD967f787ae94D0205",
    "minter": "0xabC000d88f23Bb45525E447528DBF656A9D55bf5",
    "voting_escrow": "0x0000000000000000000000000000000000000000", // <-- DUMMY
    "fee_distributor": "0xA464e6DCda8AC41e03616F95f4BC98a13b8922Dc", // <-- DUMMY
    "gauge_controller": "0x2F50D538606Fa9EDD2B11E2446BEb18C9D5846bB",
    "address_provider": "0x0000000022d53366457f9d5e68ec105046fc4383",
    "router": "0xfA9a30350048B2BF66865ee20363067c66f67e58",
    "deposit_and_stake": "0xB7De33440B7171159a9718CBE748086cecDd9685",
    "stable_calc": "0xCA8d0747B5573D69653C3aC22242e6341C36e4b4", // <-- CHANGED
    "crypto_calc": '0xA72C85C258A81761433B4e8da60505Fe3Dd551CC', // <--- NEW
    "factory": '0xb9fc157394af804a3578134a6585c0dc9cc990d4', // <--- TODO CHANGE
    "crvusd_factory": '0x4F8846Ae9380B90d2E71D5e3D042dff3E7ebb40d', // <-- DUMMY
    "eywa_factory": '0x37F22A0B028f2152e6CAcef210e0C4d3b875f367', // <--- DUMMY
    "crypto_factory": '0xF18056Bbd320E96A48e3Fbf8bC061322531aac99', // <--- TODO CHANGE
    "tricrypto_factory": '0x0c0e5f2fF0ff18a3be9b835635039256dC4B4963', // <--- TODO CHANGE
    "registry_exchange": "",
    "factory_admin": "",
});

export const ALIASES_KAVA = lowerCaseValues({
    "crv": "0x64D5BaF5ac030e2b7c435aDD967f787ae94D0205", // <--- TODO CHANGE
    "minter": "0xabC000d88f23Bb45525E447528DBF656A9D55bf5",
    "voting_escrow": "0x0000000000000000000000000000000000000000", // <-- DUMMY
    "fee_distributor": "0xA464e6DCda8AC41e03616F95f4BC98a13b8922Dc", // <-- DUMMY
    "gauge_controller": "0x2F50D538606Fa9EDD2B11E2446BEb18C9D5846bB",
    "address_provider": "0x0000000022d53366457f9d5e68ec105046fc4383",
    "router": "0xfA9a30350048B2BF66865ee20363067c66f67e58",
    "deposit_and_stake": "0xB7De33440B7171159a9718CBE748086cecDd9685",
    "stable_calc": "0xCA8d0747B5573D69653C3aC22242e6341C36e4b4", // <-- CHANGED
    "crypto_calc": '0xA72C85C258A81761433B4e8da60505Fe3Dd551CC', // <--- NEW
    "factory": '0x40bc62805471eF53DdD5C5cF99ed3d9e5aa81b48',
    "crvusd_factory": '0x4F8846Ae9380B90d2E71D5e3D042dff3E7ebb40d', // <-- DUMMY
    "eywa_factory": '0x37F22A0B028f2152e6CAcef210e0C4d3b875f367', // <--- DUMMY
    "crypto_factory": '0xF18056Bbd320E96A48e3Fbf8bC061322531aac99', // <--- TODO CHANGE
    "tricrypto_factory": '0x0c0e5f2fF0ff18a3be9b835635039256dC4B4963', // <--- TODO CHANGE
    "registry_exchange": "",
    "factory_admin": "",
});

export const ALIASES_CELO = lowerCaseValues({
    "crv": "0x0a7432cF27F1aE3825c313F3C81e7D3efD7639aB", // <--- TODO CHANGE
    "minter": "0xabC000d88f23Bb45525E447528DBF656A9D55bf5",
    "voting_escrow": "0x0000000000000000000000000000000000000000", // <-- DUMMY
    "fee_distributor": "0xA464e6DCda8AC41e03616F95f4BC98a13b8922Dc", // <-- DUMMY
    "gauge_controller": "0x2F50D538606Fa9EDD2B11E2446BEb18C9D5846bB",
    "address_provider": "0x0000000022d53366457f9d5e68ec105046fc4383",
    "router": "0xfA9a30350048B2BF66865ee20363067c66f67e58",
    "deposit_and_stake": "0xB7De33440B7171159a9718CBE748086cecDd9685",
    "stable_calc": "0xCA8d0747B5573D69653C3aC22242e6341C36e4b4", // <-- CHANGED
    "crypto_calc": '0xA72C85C258A81761433B4e8da60505Fe3Dd551CC', // <--- NEW
    "factory": '0x5277A0226d10392295E8D383E9724D6E416d6e6C',
    "crvusd_factory": '0x4F8846Ae9380B90d2E71D5e3D042dff3E7ebb40d', // <-- DUMMY
    "eywa_factory": '0x37F22A0B028f2152e6CAcef210e0C4d3b875f367', // <--- DUMMY
    "crypto_factory": '0xF18056Bbd320E96A48e3Fbf8bC061322531aac99', // <--- TODO CHANGE
    "tricrypto_factory": '0x0c0e5f2fF0ff18a3be9b835635039256dC4B4963', // <--- TODO CHANGE
    "registry_exchange": "",
    "factory_admin": "",
});

export const ALIASES_ZKSYNC = lowerCaseValues({
    "crv": "0x0a7432cF27F1aE3825c313F3C81e7D3efD7639aB", // <--- TODO CHANGE
    "minter": "0xabC000d88f23Bb45525E447528DBF656A9D55bf5", // <-- DUMMY
    "voting_escrow": "0x0000000000000000000000000000000000000000", // <-- DUMMY
    "fee_distributor": "0xA464e6DCda8AC41e03616F95f4BC98a13b8922Dc", // <-- DUMMY
    "gauge_controller": "0x2F50D538606Fa9EDD2B11E2446BEb18C9D5846bB", // <--- TODO CHANGE
    "address_provider": "0x0000000022d53366457f9d5e68ec105046fc4383", // <--- TODO CHANGE
    "router": "0xfA9a30350048B2BF66865ee20363067c66f67e58", // <--- TODO CHANGE
    "deposit_and_stake": "0xB7De33440B7171159a9718CBE748086cecDd9685", // <--- TODO CHANGE
    "stable_calc": "0x0000000000000000000000000000000000000000",
    "crypto_calc": '0x0000000000000000000000000000000000000000',
    "factory": '0xAF5261eD780fd5b80CF6E206b6BF90CbB97F511B',
    "crvusd_factory": '0x4F8846Ae9380B90d2E71D5e3D042dff3E7ebb40d', // <-- DUMMY
    "eywa_factory": '0x37F22A0B028f2152e6CAcef210e0C4d3b875f367', // <--- DUMMY
    "crypto_factory": '0xF18056Bbd320E96A48e3Fbf8bC061322531aac99', // <--- TODO CHANGE
    "tricrypto_factory": '0x0c0e5f2fF0ff18a3be9b835635039256dC4B4963', // <--- TODO CHANGE
    "registry_exchange": "0x0000000000000000000000000000000000000000",
    "factory_admin": "0x0000000000000000000000000000000000000000",
});

export const ALIASES_BASE = lowerCaseValues({
    "crv": "0x8Ee73c484A26e0A5df2Ee2a4960B789967dd0415", // <--- TODO CHANGE
    "minter": "0xabC000d88f23Bb45525E447528DBF656A9D55bf5",
    "voting_escrow": "0x0000000000000000000000000000000000000000", // <-- DUMMY
    "fee_distributor": "0xA464e6DCda8AC41e03616F95f4BC98a13b8922Dc", // <-- DUMMY
    "gauge_controller": "0x2F50D538606Fa9EDD2B11E2446BEb18C9D5846bB", // <--- TODO CHANGE
    "address_provider": "0x0000000022d53366457f9d5e68ec105046fc4383", // <--- TODO CHANGE
    "router": "0xfA9a30350048B2BF66865ee20363067c66f67e58", // <--- TODO CHANGE
    "deposit_and_stake": "0xB7De33440B7171159a9718CBE748086cecDd9685", // <--- TODO CHANGE
    "stable_calc": "0x0000000000000000000000000000000000000000",
    "crypto_calc": '0x0000000000000000000000000000000000000000',
    "factory": '0x3093f9B57A428F3EB6285a589cb35bEA6e78c336',
    "crvusd_factory": '0x4F8846Ae9380B90d2E71D5e3D042dff3E7ebb40d', // <-- DUMMY
    "eywa_factory": '0x37F22A0B028f2152e6CAcef210e0C4d3b875f367', // <--- DUMMY
    "crypto_factory": '0x5EF72230578b3e399E6C6F4F6360edF95e83BBfd',
    "tricrypto_factory": '0xA5961898870943c68037F6848d2D866Ed2016bcB',
    "registry_exchange": "0x0000000000000000000000000000000000000000",
    "factory_admin": "0x0000000000000000000000000000000000000000",
});
