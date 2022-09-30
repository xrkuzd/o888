export const DeployedContract: string =
  '0x74365d4A5ba778adDA40AD244DA28F8eC980A71a'

export const OsirisV2Contract: string =
  '0x79C15688e88240dC81CdC4d6F3d4C22BDb84B632'

interface TokenStake {
  [k: string]: any
}

export const TokensNeeded: TokenStake = {
  '0.001': '15k',
  '0.005': '30k',
  '0.01': '50k',
  '0.05': '100K',
  '0.1': '200k',
}

// ABI EVENT SYNC WORKING FORMATS FOR MORALIS SYNC EVENT CREATION VIA UI
/* {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "roomId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "roomName",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "betSize",
        "type": "uint256"
      }
    ],
    "name": "RoomCreated",
    "type": "event"
  } */

/* {
  "anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "internalType": "uint256",
      "name": "roomId",
      "type": "uint256"
    },
    {
      "indexed": true,
      "internalType": "address",
      "name": "owner",
      "type": "address"
    },
    {
      "indexed": true,
      "internalType": "address",
      "name": "challenger",
      "type": "address"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "betSize",
      "type": "uint256"
    }
  ],
  "name": "GameStarted",
  "type": "event"
} */

/* {
  "anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "internalType": "uint256",
      "name": "roomId",
      "type": "uint256"
    },
    {
      "indexed": true,
      "internalType": "address",
      "name": "winner",
      "type": "address"
    },
    {
      "indexed": true,
      "internalType": "uint8",
      "name": "winnerIdx",
      "type": "uint8"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "netWinnings",
      "type": "uint256"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "fee",
      "type": "uint256"
    }
  ],
  "name": "GameResult",
  "type": "event"
} */

/* {
  "anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "internalType": "uint256",
      "name": "roomId",
      "type": "uint256"
    },
    {
      "indexed": false,
      "internalType": "enum HighLow.CardSuit",
      "name": "playerASuit",
      "type": "uint8"
    },
    {
      "indexed": false,
      "internalType": "uint8",
      "name": "playerACard",
      "type": "uint8"
    },
    {
      "indexed": false,
      "internalType": "enum HighLow.CardSuit",
      "name": "playerBSuit",
      "type": "uint8"
    },
    {
      "indexed": false,
      "internalType": "uint8",
      "name": "playerBCard",
      "type": "uint8"
    }
  ],
  "name": "Draw",
  "type": "event"
} */

/* {
  "anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "internalType": "uint256",
      "name": "roomId",
      "type": "uint256"
    },
    {
      "indexed": true,
      "internalType": "address",
      "name": "owner",
      "type": "address"
    },
    {
      "indexed": true,
      "internalType": "address",
      "name": "challenger",
      "type": "address"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "betSize",
      "type": "uint256"
    }
  ],
  "name": "GameStarted",
  "type": "event"
} */

/* {
  "anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "internalType": "uint256",
      "name": "roomId",
      "type": "uint256"
    },
    {
      "indexed": true,
      "internalType": "address",
      "name": "challenger",
      "type": "address"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
    }
  ],
  "name": "EmergencyWithdraw",
  "type": "event"
} */

/* {
  "anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "internalType": "uint256",
      "name": "roomId",
      "type": "uint256"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
    }
  ],
  "name": "WithdrawPot",
  "type": "event"
} */

/* {
  "anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "internalType": "uint256",
      "name": "roomId",
      "type": "uint256"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
    }
  ],
  "name": "DepositPot",
  "type": "event"
} */
