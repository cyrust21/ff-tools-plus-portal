
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GameModeStats as GameModeStatsType } from '@/hooks/useRankCalculatorData';
import { Target, Trophy, TrendingUp } from 'lucide-react';

interface GameModeStatsProps {
  gameModeStats: GameModeStatsType[];
}

const GameModeStats = ({ gameModeStats }: GameModeStatsProps) => {
  const getWinRateColor = (winRate: number) => {
    if (winRate >= 70) return 'text-green-500';
    if (winRate >= 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5" />
          Game Mode Statistics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {gameModeStats.map((stat) => (
            <div key={stat.mode} className="p-4 border rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{stat.mode}</h3>
                <Badge variant="outline">{stat.gamesPlayed} games</Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    Avg RP
                  </span>
                  <span className="font-medium">{stat.avgRP}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Trophy className="w-3 h-3" />
                    Win Rate
                  </span>
                  <span className={`font-medium ${getWinRateColor(stat.winRate)}`}>
                    {stat.winRate.toFixed(1)}%
                  </span>
                </div>
              </div>
              
              <div className="w-full bg-secondary rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all ${
                    stat.winRate >= 70 ? 'bg-green-500' : 
                    stat.winRate >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${Math.min(stat.winRate, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default GameModeStats;
