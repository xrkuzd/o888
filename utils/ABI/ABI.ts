const ABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_stakingToken',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'roomId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'DepositPot',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'roomId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'enum HighLow.CardSuit',
        name: 'playerASuit',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'playerACard',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'enum HighLow.CardSuit',
        name: 'playerBSuit',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'playerBCard',
        type: 'uint8',
      },
    ],
    name: 'Draw',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'roomId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'challenger',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'EmergencyWithdraw',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'roomId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'player',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'isOwner',
        type: 'bool',
      },
    ],
    name: 'GameAbandoned',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'roomId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'winner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint8',
        name: 'winnerIdx',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'netWinnings',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'fee',
        type: 'uint256',
      },
    ],
    name: 'GameResult',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'roomId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'challenger',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'betSize',
        type: 'uint256',
      },
    ],
    name: 'GameStarted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'roomId',
        type: 'uint256',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'roomName',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'betSize',
        type: 'uint256',
      },
    ],
    name: 'RoomCreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'roomId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'sealedSeed',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'blockNumber',
        type: 'uint256',
      },
    ],
    name: 'SeedCommitted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'roomId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'revealedSeed',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'r',
        type: 'bytes32',
      },
    ],
    name: 'SeedRevealed',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'roomId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'WithdrawPot',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'betSizeLevels',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'betSizeLevelsArray',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'betSize',
        type: 'uint256',
      },
    ],
    name: 'betSizeToStakeRequired',
    outputs: [
      {
        internalType: 'uint256',
        name: 'stakingRequired',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'betSize',
        type: 'uint256',
      },
    ],
    name: 'createRoom',
    outputs: [
      {
        internalType: 'uint256',
        name: 'createRoomId',
        type: 'uint256',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'roomId',
        type: 'uint256',
      },
    ],
    name: 'depositPot',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'enum HighLow.CardSuit',
        name: 'playerASuit',
        type: 'uint8',
      },
      {
        internalType: 'uint8',
        name: 'playerACard',
        type: 'uint8',
      },
      {
        internalType: 'enum HighLow.CardSuit',
        name: 'playerBSuit',
        type: 'uint8',
      },
      {
        internalType: 'uint8',
        name: 'playerBCard',
        type: 'uint8',
      },
    ],
    name: 'determineWinner',
    outputs: [
      {
        internalType: 'uint8',
        name: 'winningPlayer',
        type: 'uint8',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'seed',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: 'sealedSeedBlockNumber',
        type: 'uint256',
      },
    ],
    name: 'drawCards',
    outputs: [
      {
        internalType: 'bytes32',
        name: 'r',
        type: 'bytes32',
      },
      {
        internalType: 'enum HighLow.CardSuit',
        name: 'playerASuit',
        type: 'uint8',
      },
      {
        internalType: 'uint8',
        name: 'playerACard',
        type: 'uint8',
      },
      {
        internalType: 'enum HighLow.CardSuit',
        name: 'playerBSuit',
        type: 'uint8',
      },
      {
        internalType: 'uint8',
        name: 'playerBCard',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'roomId',
        type: 'uint256',
      },
    ],
    name: 'emergencyWithdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'enterMaintenance',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'exitMaintenance',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'feeDenominator',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'feeNumerator',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'roomId',
        type: 'uint256',
      },
    ],
    name: 'gameRoomInfo',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'address',
            name: 'owner',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'challenger',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'ownerBalance',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'betSize',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'lastGameStartedTime',
            type: 'uint256',
          },
          {
            internalType: 'bytes32',
            name: 'lastSealedSeed',
            type: 'bytes32',
          },
          {
            internalType: 'uint256',
            name: 'lastSealedSeedBlock',
            type: 'uint256',
          },
        ],
        internalType: 'struct HighLow.GameRoom',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'roomId',
        type: 'uint256',
      },
    ],
    name: 'gameRooms',
    outputs: [
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'challenger',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'ownerBalance',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'betSize',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'lastGameStartedTime',
        type: 'uint256',
      },
      {
        internalType: 'bytes32',
        name: 'lastSealedSeed',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: 'lastSealedSeedBlock',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'roomId',
        type: 'uint256',
      },
    ],
    name: 'joinRoom',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'minBetSizeETH',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'nextRoomId',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'operator',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'operatorEscapeHatchTimeout',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'roomId',
        type: 'uint256',
      },
      {
        internalType: 'bytes32',
        name: 'revealedSeed',
        type: 'bytes32',
      },
    ],
    name: 'reveal',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'newFeeDenominator',
        type: 'uint256',
      },
    ],
    name: 'setFeeDenominator',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'newFeeNumerator',
        type: 'uint256',
      },
    ],
    name: 'setFeeNumerator',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newFeeReceiver',
        type: 'address',
      },
    ],
    name: 'setFeeReceiver',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'newMinBetSizeETH',
        type: 'uint256',
      },
    ],
    name: 'setMinBetSizeETH',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOperator',
        type: 'address',
      },
    ],
    name: 'setOperator',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'newTimeLimit',
        type: 'uint256',
      },
    ],
    name: 'setOperatorEscapeHatchTimeout',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'roomId',
        type: 'uint256',
      },
      {
        internalType: 'bytes32',
        name: '_sealedSeed',
        type: 'bytes32',
      },
    ],
    name: 'setSealedSeed',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256[]',
        name: 'newBetSizeLevels',
        type: 'uint256[]',
      },
      {
        internalType: 'uint256[]',
        name: 'newStakingLevels',
        type: 'uint256[]',
      },
    ],
    name: 'setStakeLevels',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newStakingToken',
        type: 'address',
      },
    ],
    name: 'setStakingToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'stakingLevels',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'stakingLevelsArray',
    outputs: [
      {
        internalType: 'uint256[]',
        name: '',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'stakingToken',
    outputs: [
      {
        internalType: 'contract IERC20',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'roomId',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'withdrawPot',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

export default ABI
