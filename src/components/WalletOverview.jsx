const WalletOverview = ({ walletData }) => (
  <div className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
    <div className="bg-white p-4 shadow rounded">
      <p className="text-gray-600 text-sm">Wallet Balance</p>
      <p className="text-xl font-semibold">{walletData?.balance} ETH</p>
    </div>
    <div className="bg-white p-4 shadow rounded">
      <p className="text-gray-600 text-sm">Owners</p>
      <p className="text-xl font-semibold">{walletData?.owners?.length}</p>
    </div>
    <div className="bg-white p-4 shadow rounded">
      <p className="text-gray-600 text-sm">Required Signatures</p>
      <p className="text-xl font-semibold">{walletData?.required}</p>
    </div>
  </div>
);

export default WalletOverview;
