import React, { useState } from 'react';

function  Sorter({ onApplyFilter }) {
  const [topic, setTopic] = useState('');
  const [cost, setCost] = useState('');

  const handleApplyFilter = () => {
    onApplyFilter({ topic, cost });
  };

  return (
    <div className="filter-container p-4 bg-gray-200 rounded h-80">
      <h2 className="text-xl font-bold mb-4">Search Courses</h2>
      <div className="mb-4">
        <label className="block text-lg font-medium mb-2">Topic:</label>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="p-2 border rounded w-full"
          placeholder="Enter topic"
        />
      </div>
      <div className="mb-4">
        <label className="block text-lg font-medium mb-2">Cost:</label>
        <input
          type="number"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          className="p-2 border rounded w-full"
          placeholder="Enter max cost"
        />
      </div>
      <button
        onClick={handleApplyFilter}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
      >
        Apply Filter
      </button>
    </div>
  );
}

export default Sorter;
