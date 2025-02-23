import React from 'react';
import { Flame } from 'lucide-react';
import { useStore } from '../store';

export const UserProgress: React.FC = () => {
  const { userStats } = useStore();

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center space-x-2">
        <Flame className="h-6 w-6 text-orange-500" />
        <span className="text-lg font-semibold">{userStats.streak} Day Streak</span>
      </div>
      <div className="mt-2 text-sm text-gray-600">
        Cards Learned: {userStats.cardsLearned}
      </div>
    </div>
  );
};