import { CheckCircle, Copy, Send, Clock } from 'lucide-react';

const TransactionCard = ({
  tx,
  walletData,
  currentUser,
  copyToClipboard,
  handleSignTransaction,
  handleExecuteTransaction,
  canExecute,
  isOwner,
  hasUserSigned,
  formatAddress
}) => {
  const getTransactionStatus = () => {
    if (tx.executed) {
      return { status: 'Executed', color: 'text-green-600', icon: CheckCircle };
    }
    if (canExecute(tx)) {
      return { status: 'Ready to Execute', color: 'text-blue-600', icon: CheckCircle };
    }
    return { status: 'Pending Signatures', color: 'text-yellow-600', icon: Clock };
  };

  const statusInfo = getTransactionStatus();
  const StatusIcon = statusInfo.icon;

  return (
    <div className="border border-gray-200 rounded-lg p-6">
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
};

export default TransactionCard;
