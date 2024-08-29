'use client';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const GitHubContributionGraph = dynamic(
  () => import('./components/habit-tracker'),
  { ssr: false }
);

export default function Home() {
  const [contributions, setContributions] = useState<Contribution[]>([]);

  const handleAddContribution = (duration: string) => {
    const today = new Date().toISOString().slice(0, 10);
    const newContributions = contributions.filter(c => c.date !== today);
    
    newContributions.push({ date: today, count: getDurationValue(duration) });

    setContributions(newContributions);
  };

  const getDurationValue = (duration: string): number => {
    switch (duration) {
      case '15min': return 1;
      case '1hour': return 4;
      case '2hours+': return 8;
      default: return 0;
    }
  };

  return (
    <div>
      <h1>GitHub-style Habit Tracker</h1>
      <GitHubContributionGraph 
        contributions={contributions}
        onAddContribution={handleAddContribution}
      />
    </div>
  );
}
