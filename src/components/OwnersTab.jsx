import { Users, Copy } from 'lucide-react';

const OwnersTab = ({ owners, currentUser, copyToClipboard }) => (
  <div>
    <h2 className="text-2xl font-bold text-gray-900 mb-6">Wallet Owners</h2>
    <div className="space-y-4">
      {owners.map((owner, index) => (
        <div
          key={owner}
          className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
        >
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
);

export default OwnersTab;
