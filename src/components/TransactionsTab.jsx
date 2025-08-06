const TransactionsTab = ({ transactions }) => (
  <div>
    <h2 className="text-lg font-medium mb-2">Transactions</h2>
    {transactions.length === 0 ? (
      <p className="text-gray-500">No transactions yet.</p>
    ) : (
      <ul className="space-y-2">
        {transactions.map((tx, idx) => (
          <li key={idx} className="bg-gray-50 p-4 rounded shadow">
            <p><strong>To:</strong> {tx.to}</p>
            <p><strong>Amount:</strong> {tx.amount} ETH</p>
            <p><strong>Confirmations:</strong> {tx.confirmations.length}</p>
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default TransactionsTab;
