import React from 'react';
import { motion } from 'framer-motion';

const informationData = [
  {
    title: 'Tips for Renting',
    content: 'Look for properties in safe neighborhoods, compare rental prices, and check for essential amenities.',
    color: 'bg-blue-100',
    icon: '🏠',
  },
  {
    title: 'Tips for Buying',
    content: 'Consider the location, inspect the property thoroughly, and ensure the price is within your budget.',
    color: 'bg-green-100',
    icon: '🏡',
  },
];

const StatsInfo = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {informationData.map((info, index) => (
        <motion.div
          key={index}
          className={`p-4 rounded-lg shadow-lg ${info.color}`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
        >
          <header className="flex items-center mb-4">
            <span className="text-4xl mr-2">{info.icon}</span>
            <h3 className="text-xl font-semibold">{info.title}</h3>
          </header>
          <p>{info.content}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsInfo;
