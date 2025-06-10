
import { useState, useEffect } from 'react';

export interface RankProgress {
  id: string;
  date: string;
  currentRank: string;
  currentRP: number;
  totalRP: number;
  gameMode: string;
  season: string;
}

export interface GameModeStats {
  mode: string;
  avgRP: number;
  gamesPlayed: number;
  winRate: number;
}

export interface SeasonData {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export const useRankCalculatorData = () => {
  const [progressHistory, setProgressHistory] = useState<RankProgress[]>([]);
  const [gameModeStats, setGameModeStats] = useState<GameModeStats[]>([]);
  const [seasons, setSeasons] = useState<SeasonData[]>([]);

  useEffect(() => {
    // Load data from localStorage
    const savedHistory = localStorage.getItem('ff-rank-history');
    const savedStats = localStorage.getItem('ff-gamemode-stats');
    const savedSeasons = localStorage.getItem('ff-seasons');

    if (savedHistory) {
      setProgressHistory(JSON.parse(savedHistory));
    }
    
    if (savedStats) {
      setGameModeStats(JSON.parse(savedStats));
    } else {
      // Initialize with default game mode stats
      const defaultStats: GameModeStats[] = [
        { mode: 'Battle Royale', avgRP: 25, gamesPlayed: 0, winRate: 0 },
        { mode: 'Clash Squad', avgRP: 20, gamesPlayed: 0, winRate: 0 },
        { mode: 'Lone Wolf', avgRP: 30, gamesPlayed: 0, winRate: 0 },
      ];
      setGameModeStats(defaultStats);
    }

    if (savedSeasons) {
      setSeasons(JSON.parse(savedSeasons));
    } else {
      // Initialize with default seasons
      const defaultSeasons: SeasonData[] = [
        { id: 's1', name: 'Season 1 2024', startDate: '2024-01-01', endDate: '2024-03-31', isActive: false },
        { id: 's2', name: 'Season 2 2024', startDate: '2024-04-01', endDate: '2024-06-30', isActive: false },
        { id: 's3', name: 'Season 3 2024', startDate: '2024-07-01', endDate: '2024-09-30', isActive: false },
        { id: 's4', name: 'Season 4 2024', startDate: '2024-10-01', endDate: '2024-12-31', isActive: true },
      ];
      setSeasons(defaultSeasons);
    }
  }, []);

  const saveProgress = (progress: Omit<RankProgress, 'id' | 'date'>) => {
    const newProgress: RankProgress = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      ...progress,
    };
    
    const updatedHistory = [newProgress, ...progressHistory].slice(0, 50); // Keep last 50 entries
    setProgressHistory(updatedHistory);
    localStorage.setItem('ff-rank-history', JSON.stringify(updatedHistory));
  };

  const updateGameModeStats = (mode: string, stats: Partial<GameModeStats>) => {
    const updatedStats = gameModeStats.map(stat => 
      stat.mode === mode ? { ...stat, ...stats } : stat
    );
    setGameModeStats(updatedStats);
    localStorage.setItem('ff-gamemode-stats', JSON.stringify(updatedStats));
  };

  const exportData = () => {
    const data = {
      progressHistory,
      gameModeStats,
      seasons,
      exportDate: new Date().toISOString(),
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ff-rank-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearAllData = () => {
    setProgressHistory([]);
    setGameModeStats([]);
    localStorage.removeItem('ff-rank-history');
    localStorage.removeItem('ff-gamemode-stats');
  };

  return {
    progressHistory,
    gameModeStats,
    seasons,
    saveProgress,
    updateGameModeStats,
    exportData,
    clearAllData,
  };
};
