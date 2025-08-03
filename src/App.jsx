import React, { useState, useEffect } from 'react';
import { Shield, Users, Send, CheckCircle, XCircle, Clock, AlertTriangle, Copy, ExternalLink } from 'lucide-react';

const BasicMultisig = () => {
  const [walletData, setWalletData] = useState({
    balance: '2.45',
    owners: [
      '0x742d35Cc6634C0532925a3b8D42c71fcaf7c7cc7',
      '0x8ba1f109551bD432803012645Hac136c22C57B97',
      '0x95222290DD7278Aa3Ddd389Cc1E1d165CC4BAfe5'
    ],
    requiredSignatures: 2
  });

  const [transactions, setTransactions] = useState([
    {
      id: 1,
      to: '0x1234567890abcdef1234567890abcdef12345678',
      amount: '0.5',
      data: '0x',
      description: 'Payment to supplier',
      signatures: ['0x742d35Cc6634C0532925a3b8D42c71fcaf7c7cc7'],
      executed: false,
      timestamp: Date.now() - 86400000,
      proposedBy: '0x742d35Cc6634C0532925a3b8D42c71fcaf7c7cc7'
    },
    {
      id: 2,
      to: '0xabcdef1234567890abcdef1234567890abcdef12',
      amount: '1.2',
      data: '0x',
      description: 'Marketing budget allocation',
      signatures: [
        '0x742d35Cc6634C0532925a3b8D42c71fcaf7c7cc7',
        '0x8ba1f109551bD432803012645Hac136c22C57B97'
      ],
      executed: true,
      timestamp: Date.now() - 172800000,
      proposedBy: '0x8ba1f109551bD432803012645Hac136c22C57B97'
    }
  ]);

  const [newTransaction, setNewTransaction] = useState({
    to: '',
    amount: '',
    description: '',
    data: '0x'
  });

  const [activeTab, setActiveTab] = useState('transactions');
  const [currentUser] = useState('0x742d35Cc6634C0532925a3b8D42c71fcaf7c7cc7');
  const [showNewTxForm, setShowNewTxForm] = useState(false);

  const formatAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const isOwner = (address) => {
    return walletData.owners.includes(address);
  };

  const hasUserSigned = (transaction, userAddress) => {
    return transaction.signatures.includes(userAddress);
  };

  const canExecute = (transaction) => {
    return transaction.signatures.length >= walletData.requiredSignatures && !transaction.executed;
  };

  const handleSignTransaction = (transactionId) => {
    setTransactions(prev => prev.map(tx => {
      if (tx.id === transactionId && !hasUserSigned(tx, currentUser)) {
        return {
          ...tx,
          signatures: [...tx.signatures, currentUser]
        };
      }
      return tx;
    }));
  };

  const handleExecuteTransaction = (transactionId) => {
    setTransactions(prev => prev.map(tx => {
      if (tx.id === transactionId && canExecute(tx)) {
        const newBalance = (parseFloat(walletData.balance) - parseFloat(tx.amount)).toFixed(2);
        setWalletData(prevData => ({ ...prevData, balance: newBalance }));
        return { ...tx, executed: true };
      }
      return tx;
    }));
  };

  const handleCreateTransaction = (e) => {
    e.preventDefault();
    if (!newTransaction.to || !newTransaction.amount) return;

    const transaction = {
      id: Date.now(),
      to: newTransaction.to,
      amount: newTransaction.amount,
      data: newTransaction.data || '0x',
      description: newTransaction.description || 'No description',
      signatures: [currentUser],
      executed: false,
      timestamp: Date.now(),
      proposedBy: currentUser
    };

    setTransactions(prev => [transaction, ...prev]);
    setNewTransaction({ to: '', amount: '', description: '', data: '0x' });
    setShowNewTxForm(false);
  };

  const getTransactionStatus = (transaction) => {
    if (transaction.executed) {
      return { status: 'Executed', color: 'text-green-600', icon: CheckCircle };
    }
    if (canExecute(transaction)) {
      return { status: 'Ready to Execute', color: 'text-blue-600', icon: CheckCircle };
    }
    return { status: 'Pending Signatures', color: 'text-yellow-600', icon: Clock };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Basic Multisig Wallet</h1>
          </div>
          <p className="text-gray-600">Secure 2-of-3 multisignature wallet for shared fund management</p>
        </div>

        {/* Wallet Overview */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mx-auto mb-3">
                <DollarSign className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{walletData.balance} ETH</h3>
              <p className="text-gray-600">Wallet Balance</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto mb-3">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{walletData.owners.length}</h3>
              <p className="text-gray-600">Wallet Owners</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mx-auto mb-3">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{walletData.requiredSignatures}/{walletData.owners.length}</h3>
              <p className="text-gray-600">Required Signatures</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {['transactions', 'owners', 'settings'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Transactions Tab */}
            {activeTab === 'transactions' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Transactions</h2>
                  <button
                    onClick={() => setShowNewTxForm(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    New Transaction
                  </button>
                </div>

                {/* New Transaction Form */}
                {showNewTxForm && (
                  <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <h3 className="text-lg font-semibold mb-4">Create New Transaction</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Recipient Address
                          </label>
                          <input
                            type="text"
                            value={newTransaction.to}
                            onChange={(e) => setNewTransaction(prev => ({ ...prev, to: e.target.value }))}
                            placeholder="0x..."
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Amount (ETH)
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            value={newTransaction.amount}
                            onChange={(e) => setNewTransaction(prev => ({ ...prev, amount: e.target.value }))}
                            placeholder="0.0"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description
                        </label>
                        <input
                          type="text"
                          value={newTransaction.description}
                          onChange={(e) => setNewTransaction(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="Payment description..."
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={handleCreateTransaction}
                          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Create Transaction
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowNewTxForm(false)}
                          className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Transaction List */}
                <div className="space-y-4">
                  {transactions.map((tx) => {
                    const statusInfo = getTransactionStatus(tx);
                    const StatusIcon = statusInfo.icon;
                    
                    return (
                      <div key={tx.id} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{tx.description}</h3>
                            <p className="text-gray-600">To: {formatAddress(tx.to)}</p>
                            <p className="text-sm text-gray-500">
                              Proposed by {formatAddress(tx.proposedBy)} • {new Date(tx.timestamp).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-gray-900">{tx.amount} ETH</div>
                            <div className={`flex items-center gap-1 ${statusInfo.color}`}>
                              <StatusIcon className="w-4 h-4" />
                              <span className="text-sm font-medium">{statusInfo.status}</span>
                            </div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">
                              Signatures ({tx.signatures.length}/{walletData.requiredSignatures})
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {walletData.owners.map((owner) => (
                              <div
                                key={owner}
                                className={`px-3 py-1 rounded-full text-sm ${
                                  tx.signatures.includes(owner)
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-gray-100 text-gray-600'
                                }`}
                              >
                                {formatAddress(owner)}
                                {tx.signatures.includes(owner) && (
                                  <CheckCircle className="w-4 h-4 inline ml-1" />
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-3">
                          {!hasUserSigned(tx, currentUser) && !tx.executed && isOwner(currentUser) && (
                            <button
                              onClick={() => handleSignTransaction(tx.id)}
                              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                            >
                              <CheckCircle className="w-4 h-4" />
                              Sign Transaction
                            </button>
                          )}
                          {canExecute(tx) && (
                            <button
                              onClick={() => handleExecuteTransaction(tx.id)}
                              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                            >
                              <Send className="w-4 h-4" />
                              Execute
                            </button>
                          )}
                          <button
                            onClick={() => copyToClipboard(tx.to)}
                            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2"
                          >
                            <Copy className="w-4 h-4" />
                            Copy Address
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Owners Tab */}
            {activeTab === 'owners' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Wallet Owners</h2>
                <div className="space-y-4">
                  {walletData.owners.map((owner, index) => (
                    <div key={owner} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Owner {index + 1}</p>
                          <p className="text-gray-600">{owner}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {owner === currentUser && (
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                            You
                          </span>
                        )}
                        <button
                          onClick={() => copyToClipboard(owner)}
                          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Wallet Settings</h2>
                <div className="space-y-6">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Security Settings</h3>
                    <div className="space-y-2">
                      <p><span className="font-medium">Required Signatures:</span> {walletData.requiredSignatures} of {walletData.owners.length}</p>
                      <p><span className="font-medium">Total Owners:</span> {walletData.owners.length}</p>
                      <p><span className="font-medium">Your Address:</span> {formatAddress(currentUser)}</p>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div>
                        <h3 className="text-lg font-semibold text-yellow-800 mb-2">Important Notes</h3>
                        <ul className="text-yellow-700 space-y-1 text-sm">
                          <li>• Changing owners requires deploying a new multisig contract</li>
                          <li>• Always verify recipient addresses before creating transactions</li>
                          <li>• Keep your private keys secure and backed up</li>
                          <li>• This is a testnet deployment - do not use with real funds</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicMultisig;