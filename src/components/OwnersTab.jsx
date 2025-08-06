const OwnersTab = ({ owners }) => (
  <div>
    <h2 className="text-lg font-medium mb-2">Wallet Owners</h2>
    <ul className="list-disc ml-6 text-gray-700">
      {owners.map((owner, index) => (
        <li key={index}>{owner}</li>
      ))}
    </ul>
  </div>
);

export default OwnersTab;
