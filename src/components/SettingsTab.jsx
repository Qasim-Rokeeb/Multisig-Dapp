import { AlertTriangle } from 'lucide-react';

const SettingsTab = ({ requiredSignatures, owners, currentUser, formatAddress }) => (
  <div>
    <h2 className="text-2xl font-bold text-gray-900 mb-6">Wallet Settings</h2>
    <div className="space-y-6">
      <div className="p-4 border border-gray-200 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Security Settings</h3>
        <div className="space-y-2">
          <p>
            <span className="font-medium">Required Signatures:</span> {requiredSignatures} of {owners.length}
          </p>
          <p>
            <span className="font-medium">Total Owners:</span> {owners.length}
          </p>
          <p>
            <span className="font-medium">Your Address:</span> {formatAddress(currentUser)}
          </p>
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
);

export default SettingsTab;
