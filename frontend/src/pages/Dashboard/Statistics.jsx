import React, { useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import Loading from '../../components/Loading';
import { MdOutlinePendingActions, MdOutlineList, MdOutlinePriceCheck } from 'react-icons/md';
import { GrFormSchedule } from 'react-icons/gr';
import { ImCross } from 'react-icons/im';
import StatItem from '../../components/StatItem';
import StatsInfo from '../../components/StatsInfo';
import { BiCurrentLocation } from "react-icons/bi";


const Statistics = () => {
  const { stats, showStats, isLoading } = useAppContext();

  useEffect(() => {
    showStats();
  }, []);

  if (isLoading) {
    return <Loading center />;
  }

  const defaultStats = [
    {
      title: 'Viewed',
      count: stats?.pending?.count || 0,
      icon: <MdOutlinePendingActions className="text-4xl text-yellow-500" />,
      color: 'text-yellow-500',
      bcg: 'bg-yellow-100',
      animation: {
        initial: { opacity: 0, x: -100 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.5 },
      },
    },
    {
      title: 'Meetings scheduled',
      count: stats?.meeting?.count || 0,
      icon: <GrFormSchedule className="text-4xl text-blue-500" />,
      color: 'text-blue-500',
      bcg: 'bg-blue-100',
      animation: {
        initial: { opacity: 0, y: -100 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
      },
    },
    {
      title: 'Declined',
      count: stats?.declined?.count || 0,
      icon: <ImCross className="text-4xl text-red-500" />,
      color: 'text-red-500',
      bcg: 'bg-red-100',
      animation: {
        initial: { opacity: 0, x: 100 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.5 },
      },
    },
    {
      title: 'Total Listings',
      count: stats?.propertiesCount || 0,
      icon: <MdOutlineList className="text-4xl text-green-500" />,
      color: 'text-green-500',
      bcg: 'bg-green-100',
      animation: {
        initial: { opacity: 0, x: -100 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.5 },
      },
    },
    {
      title: 'Active Listings',
      count: stats?.propertiesCount || 0,
      icon: <BiCurrentLocation className="text-4xl text-teal-500" />,
      color: 'text-teal-500',
      bcg: 'bg-teal-100',
      animation: {
        initial: { opacity: 0, y: -100 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
      },
    },
    {
      title: 'Average Price',
      count: `₹ ${stats?.averagePrice || 0}`,
      icon: <MdOutlinePriceCheck className="text-4xl text-indigo-500" />,
      color: 'text-indigo-500',
      bcg: 'bg-indigo-100',
      animation: {
        initial: { opacity: 0, x: 100 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.5 },
      },
    },
  ];


  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {defaultStats.map((item, index) => (
          <StatItem key={index} {...item} />
        ))}
      </div>
      <StatsInfo />
    </div>
  );
};

export default Statistics;
