import { Send } from 'lucide-react';
import TransactionCard from './TransactionCard';
import NewTransactionForm from './NewTransactionForm';

const TransactionsTab = ({
  transactions,
  walletData,
  currentUser,
  showNewTxForm,
  setShowNewTxForm,
  newTransaction,
  setNewTransaction,
  handleCreateTransaction,
  handleSignTransaction,
  handleExecuteTransaction,
  copyToClipboard,
  canExecute,
  isOwner,
  hasUserSigned,
  formatAddress
}) => (
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

    {showNewTxForm && (
      <NewTransactionForm
        newTransaction={newTransaction}
        setNewTransaction={setNewTransaction}
        handleCreateTransaction={handleCreateTransaction}
        setShowNewTxForm={setShowNewTxForm}
      />
    )}

    <div className="space-y-4">
      {transactions.map((tx) => (
        <TransactionCard
          key={tx.id}
          tx={tx}
          walletData={walletData}
          currentUser={currentUser}
          copyToClipboard={copyToClipboard}
          handleSignTransaction={handleSignTransaction}
          handleExecuteTransaction={handleExecuteTransaction}
          canExecute={canExecute}
          isOwner={isOwner}
          hasUserSigned={hasUserSigned}
          formatAddress={formatAddress}
        />
      ))}
    </div>
  </div>
);

export default TransactionsTab;
