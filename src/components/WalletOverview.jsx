import { DollarSign, Users, Shield } from 'lucide-react';

const WalletOverview = ({ balance, owners, requiredSignatures }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="text-center">
        <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mx-auto mb-3">
          <DollarSign className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900">{balance} ETH</h3>
        <p className="text-gray-600">Wallet Balance</p>
      </div>
      <div className="text-center">
        <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto mb-3">
          <Users className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900">{owners.length}</h3>
        <p className="text-gray-600">Wallet Owners</p>
      </div>
      <div className="text-center">
        <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mx-auto mb-3">
          <Shield className="w-8 h-8 text-purple-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900">
          {requiredSignatures}/{owners.length}
        </h3>
        <p className="text-gray-600">Required Signatures</p>
      </div>
    </div>
  </div>
);

export default WalletOverview;
