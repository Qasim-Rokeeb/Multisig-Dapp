const TabsNavigation = ({ activeTab, setActiveTab }) => {
  const tabs = ['transactions', 'owners', 'settings'];

  return (
    <div className="flex gap-4 border-b mb-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`capitalize pb-2 border-b-2 ${
            activeTab === tab ? 'border-blue-600 text-blue-600 font-medium' : 'border-transparent text-gray-600'
          }`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabsNavigation;
