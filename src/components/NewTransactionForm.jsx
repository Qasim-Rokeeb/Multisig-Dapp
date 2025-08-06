const NewTransactionForm = ({
  newTransaction,
  setNewTransaction,
  handleCreateTransaction,
  setShowNewTxForm
}) => (
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
);

export default NewTransactionForm;
