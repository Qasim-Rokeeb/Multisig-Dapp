import { Shield } from 'lucide-react';

const Header = () => (
  <div className="text-center mb-8">
    <div className="flex items-center justify-center gap-3 mb-4">
      <Shield className="w-10 h-10 text-blue-600" />
      <h1 className="text-4xl font-bold text-gray-900">Basic Multisig Wallet</h1>
    </div>
    <p className="text-gray-600">
      Secure 2-of-3 multisignature wallet for shared fund management
    </p>
  </div>
);

export default Header;
