const config = {
    'copyright': 'powered by walt.id',
    'logo': {
        path: '/favicon.png',
        alt: 'walt.id logo'
    },
    'whiteLogo': {
        path: 'https://i.ibb.co/Vm3CN36/favicon-white.png',
        alt: 'walt.id logo'
    },
    hidePage: {
        credentials: false,
        nfts: false,
        settings: false,
        connections: false
    },
    home: "/Credentials",
    evmDefaultChain: "MUMBAI",
    tezosdefaultChain: "TEZOS",
    evmChains: ["ETHEREUM", "POLYGON", "MUMBAI"],
    tezosChains: ["TEZOS", "GHOSTNET"],
    marketplaces: {
        "POLYGON": "https://opensea.io/assets/matic/",
        "ETHEREUM": "https://opensea.io/assets/ethereum/",
        "TEZOS": "https://rarible.com/token/tezos/",
    },
    walletConnectId: "b2da5835fd997d310c8ea5b541a089f7"
}
export{config}