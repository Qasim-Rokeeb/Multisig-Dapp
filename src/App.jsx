import React, { useState } from 'react';
import Header from './components/Header';
import WalletOverview from './components/WalletOverview';
import TabsNavigation from './components/TabsNavigation';
import TransactionsTab from './components/TransactionsTab';
import OwnersTab from './components/OwnersTab';
import SettingsTab from './components/SettingsTab';

const App = () => {
  const [walletData, setWalletData] = useState({
    balance: '2.35',
    owners: ['0x123...', '0x456...', '0x789...'],
    required: 2,
  });

  const [transactions, setTransactions] = useState([
    { to: '0xabc...', amount: '0.5', confirmations: ['0x123...'] },
    { to: '0xdef...', amount: '1.2', confirmations: ['0x123...', '0x456...'] },
  ]);

  const [activeTab, setActiveTab] = useState('transactions');

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Header />
      <WalletOverview walletData={walletData} />
      <TabsNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="mt-4">
        {activeTab === 'transactions' && <TransactionsTab transactions={transactions} />}
        {activeTab === 'owners' && <OwnersTab owners={walletData.owners} />}
        {activeTab === 'settings' && (
          <SettingsTab
            required={walletData.required}
            setRequired={(val) => setWalletData({ ...walletData, required: val })}
          />
        )}
      </div>
    </div>
  );
};

export default App;
