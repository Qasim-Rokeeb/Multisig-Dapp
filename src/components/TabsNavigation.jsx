const TabsNavigation = ({ activeTab, setActiveTab }) => {
  const tabs = ['transactions', 'owners', 'settings'];
  return (
    <nav className="flex space-x-8 px-6 border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
            activeTab === tab
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          {tab}
        </button>
      ))}
    </nav>
  );
};

export default TabsNavigation;
