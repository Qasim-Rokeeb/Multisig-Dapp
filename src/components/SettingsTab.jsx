const SettingsTab = ({ required, setRequired }) => (
  <div>
    <h2 className="text-lg font-medium mb-2">Wallet Settings</h2>
    <label className="block mb-2 text-sm text-gray-600">Required Confirmations</label>
    <input
      type="number"
      value={required}
      onChange={(e) => setRequired(Number(e.target.value))}
      className="border px-3 py-2 rounded w-24"
      min="1"
      max="3"
    />
  </div>
);

export default SettingsTab;
