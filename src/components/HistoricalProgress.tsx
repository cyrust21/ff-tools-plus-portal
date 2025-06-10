
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RankProgress } from '@/hooks/useRankCalculatorData';
import { History, TrendingUp, TrendingDown } from 'lucide-react';

interface HistoricalProgressProps {
  progressHistory: RankProgress[];
}

const HistoricalProgress = ({ progressHistory }: HistoricalProgressProps) => {
  const getTrend = (current: RankProgress, previous: RankProgress) => {
    if (current.totalRP > previous.totalRP) {
      return { icon: TrendingUp, color: 'text-green-500', direction: 'up' };
    } else if (current.totalRP < previous.totalRP) {
      return { icon: TrendingDown, color: 'text-red-500', direction: 'down' };
    }
    return { icon: TrendingUp, color: 'text-gray-500', direction: 'stable' };
  };

  if (progressHistory.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="w-5 h-5" />
            Progress History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            No progress history yet. Start tracking your rank progress!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="w-5 h-5" />
          Progress History ({progressHistory.length} entries)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {progressHistory.map((progress, index) => {
            const previous = progressHistory[index + 1];
            const trend = previous ? getTrend(progress, previous) : null;
            const TrendIcon = trend?.icon;

            return (
              <div key={progress.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="secondary">{progress.currentRank}</Badge>
                    <Badge variant="outline">{progress.gameMode}</Badge>
                    <Badge variant="outline">{progress.season}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {new Date(progress.date).toLocaleDateString()} - {progress.totalRP} RP
                  </p>
                </div>
                {trend && TrendIcon && (
                  <div className="flex items-center gap-1">
                    <TrendIcon className={`w-4 h-4 ${trend.color}`} />
                    <span className={`text-xs ${trend.color}`}>
                      {trend.direction === 'up' ? '+' : trend.direction === 'down' ? '-' : ''}
                      {Math.abs(progress.totalRP - (previous?.totalRP || 0))} RP
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default HistoricalProgress;
