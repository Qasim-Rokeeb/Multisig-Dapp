# Basic Multisig Wallet dApp

A secure 2-of-3 multisignature wallet implementation built with Solidity and React, deployed on Base Sepolia testnet. This dApp allows multiple owners to collectively manage funds with enhanced security through required multi-party approval for transactions.

## 🎯 Project Overview

The Basic Multisig Wallet is designed to provide secure fund management for teams, organizations, or individuals who want to add extra security layers to their cryptocurrency holdings. It requires 2 out of 3 owners to approve any transaction before execution.

### Key Features

- **Multi-Owner Security**: 3 wallet owners with 2-signature requirement
- **Transaction Proposals**: Any owner can propose new transactions
- **Signature Collection**: Owners can sign pending transactions
- **Automatic Execution**: Transactions execute when threshold is met
- **Real-time Updates**: Live transaction status and signature tracking
- **Owner Management**: View and manage wallet owners
- **Transaction History**: Complete audit trail of all transactions

## 🛠 Technical Stack

### Smart Contract
- **Solidity ^0.8.19**: Contract development language
- **OpenZeppelin**: Security standards and utilities
- **Hardhat/Foundry**: Development framework
- **Base Sepolia**: Testnet deployment

### Frontend
- **React 18+**: Frontend framework
- **Tailwind CSS**: Utility-first styling
- **Lucide React**: Icon library
- **ethers.js/viem**: Blockchain interaction
- **wagmi**: React hooks for Ethereum

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn
- MetaMask or compatible wallet
- Base Sepolia testnet ETH (from faucet)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/basic-multisig-wallet
cd basic-multisig-wallet
```

2. **Install dependencies**
```bash
# Install contract dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
```

3. **Environment Setup**
```bash
# Copy environment template
cp .env.example .env

# Add your configuration
PRIVATE_KEY=your_private_key_here
BASE_SEPOLIA_RPC_URL=https://sepolia.base.org
ETHERSCAN_API_KEY=your_etherscan_api_key
```

4. **Deploy Smart Contract**
```bash
# Compile contracts
npx hardhat compile

# Deploy to Base Sepolia
npx hardhat run scripts/deploy.js --network baseSepolia

# Verify contract
npx hardhat verify --network baseSepolia DEPLOYED_CONTRACT_ADDRESS "owner1" "owner2" "owner3"
```

5. **Start Frontend**
```bash
cd frontend
npm start
```

## 📋 Smart Contract Architecture

### MultisigWallet.sol

The core contract implementing multisignature functionality:

```solidity
contract MultisigWallet {
    address[] public owners;
    uint256 public requiredSignatures;
    
    struct Transaction {
        address to;
        uint256 value;
        bytes data;
        bool executed;
        uint256 signatureCount;
    }
    
    mapping(uint256 => Transaction) public transactions;
    mapping(uint256 => mapping(address => bool)) public signatures;
    
    modifier onlyOwner() {
        require(isOwner(msg.sender), "Not an owner");
        _;
    }
    
    function submitTransaction(address _to, uint256 _value, bytes memory _data) 
        external onlyOwner returns (uint256) {
        // Implementation
    }
    
    function signTransaction(uint256 _transactionId) external onlyOwner {
        // Implementation
    }
    
    function executeTransaction(uint256 _transactionId) external {
        // Implementation
    }
}
```

### Key Functions

- **submitTransaction()**: Propose new transaction
- **signTransaction()**: Add signature to pending transaction
- **executeTransaction()**: Execute transaction when threshold met
- **isOwner()**: Check if address is wallet owner
- **getTransactionDetails()**: Retrieve transaction information

## 🎮 How to Use

### For Wallet Owners

1. **Connect Wallet**
   - Connect MetaMask to Base Sepolia
   - Ensure you're one of the 3 wallet owners

2. **Create Transaction**
   - Click "New Transaction" button
   - Enter recipient address and amount
   - Add description for reference
   - Submit to create pending transaction

3. **Sign Transactions**
   - View pending transactions in main interface
   - Click "Sign Transaction" for transactions you approve
   - Monitor signature progress (2/3 required)

4. **Execute Transactions**
   - Once 2 signatures collected, click "Execute"
   - Transaction will be processed on-chain
   - Wallet balance will update automatically

### Navigation

- **Transactions Tab**: View all transactions, create new ones
- **Owners Tab**: See all wallet owners and their addresses
- **Settings Tab**: View wallet configuration and security info

## 🔒 Security Features

### Multi-Signature Protection
- Requires 2 out of 3 owner signatures
- Prevents single point of failure
- Each owner has equal voting power

### Access Control
- Only owners can propose transactions
- Only owners can sign transactions
- Anyone can execute fully-signed transactions

### Transparency
- All transactions recorded on-chain
- Complete audit trail available
- Signature status visible to all owners

### Best Practices
- Input validation on all functions
- Reentrancy protection
- Event logging for all actions
- Gas optimization techniques

## 🧪 Testing

### Contract Tests
```bash
# Run Hardhat tests
npx hardhat test

# Run with coverage
npx hardhat coverage

# Run specific test file
npx hardhat test test/MultisigWallet.test.js
```

### Frontend Tests
```bash
cd frontend
npm test
```

### Test Scenarios Covered
- Transaction creation and signing
- Signature threshold enforcement
- Owner validation
- Balance tracking
- Edge cases and error conditions

## 📊 Gas Optimization

### Estimated Gas Costs (Base Sepolia)
- Deploy contract: ~2,500,000 gas
- Submit transaction: ~80,000 gas
- Sign transaction: ~45,000 gas
- Execute transaction: ~65,000 gas

### Optimization Techniques
- Packed structs for storage efficiency
- Minimal external calls
- Batch operations where possible
- Event-based frontend updates

## 🌐 Network Configuration

### Base Sepolia Testnet
- **Chain ID**: 84532
- **RPC URL**: https://sepolia.base.org
- **Explorer**: https://sepolia.basescan.org
- **Faucet**: Bridge from Ethereum Sepolia

### Contract Addresses
```
MultisigWallet: 0x[DEPLOYED_ADDRESS]
```

## 🔧 Customization

### Modify Signature Requirements
To change from 2-of-3 to different requirements:

1. Update contract constructor parameters
2. Adjust frontend validation logic
3. Update UI to reflect new thresholds
4. Redeploy contract with new settings

### Add Features
Potential enhancements:
- Daily spending limits
- Time-locked transactions
- Owner addition/removal via consensus
- Integration with hardware wallets
- Multi-token support

## 🐛 Troubleshooting

### Common Issues

**Transaction fails to execute**
- Check if enough signatures collected
- Verify wallet has sufficient balance
- Ensure transaction hasn't been executed already

**Can't sign transaction**
- Confirm you're one of the wallet owners
- Check if you've already signed this transaction
- Verify wallet connection to correct network

**Frontend not updating**
- Refresh page to reload latest state
- Check network connection
- Verify contract address configuration

## 📚 Resources

### Documentation
- [OpenZeppelin Multisig](https://docs.openzeppelin.com/contracts/4.x/api/security#multisig)
- [Base Sepolia Docs](https://docs.base.org/docs/network-information)
- [Hardhat Documentation](https://hardhat.org/docs)

### Tutorials
- [Multisig Wallet Tutorial](https://docs.soliditylang.org/en/v0.8.19/)
- [React Web3 Integration](https://wagmi.sh/)

### Security Audits
- Consider professional audit before mainnet
- Use tools like Slither for static analysis
- Test thoroughly on testnet first

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Development Guidelines
- Follow Solidity style guide
- Add tests for new features
- Update documentation
- Use semantic commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## ⚠️ Disclaimer

This is educational software for testnet use only. Do not use with real funds without proper security audits and testing. The developers are not responsible for any losses incurred through use of this software.

## 🙋‍♂️ Support

For questions and support:
- Open an issue on GitHub
- Join our Discord community
- Check the documentation wiki

---

