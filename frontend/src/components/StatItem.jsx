import React from 'react';
import { motion } from 'framer-motion';

const StatItem = ({ count, title, icon, color, bcg, animation }) => {
    console.log("In statItem")
  return (
    <motion.div
      className={`p-4 rounded-lg shadow-lg ${bcg}`}
      initial={animation.initial}
      animate={animation.animate}
      transition={animation.transition}
    >
      <header className="flex justify-between items-center mb-4">
        <span className={`text-5xl font-bold ${color}`}>{count}</span>
        <span className="icon">{icon}</span>
      </header>
      <h5 className={`text-xl font-semibold ${color}`}>{title}</h5>
    </motion.div>
  );
};

export default StatItem;
