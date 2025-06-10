import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, TrendingUp, Target, Download, Trash2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { useRankCalculatorData } from '@/hooks/useRankCalculatorData';
import HistoricalProgress from '@/components/HistoricalProgress';
import GameModeStats from '@/components/GameModeStats';
import FFApiIntegration from '@/components/FFApiIntegration';

const RankCalculator = () => {
  const [currentRank, setCurrentRank] = useState('');
  const [currentRP, setCurrentRP] = useState('');
  const [targetRank, setTargetRank] = useState('');
  const [avgRPPerGame, setAvgRPPerGame] = useState('');
  const [selectedGameMode, setSelectedGameMode] = useState('Battle Royale');
  const [selectedSeason, setSelectedSeason] = useState('');
  const [result, setResult] = useState<{
    rpNeeded: number;
    gamesNeeded: number;
    daysNeeded: number;
  } | null>(null);

  const { toast } = useToast();
  const {
    progressHistory,
    gameModeStats,
    seasons,
    saveProgress,
    updateGameModeStats,
    exportData,
    clearAllData,
  } = useRankCalculatorData();

  // Game modes with different RP multipliers
  const gameModes = [
    { name: 'Battle Royale', multiplier: 1.0, avgRP: 25 },
    { name: 'Clash Squad', multiplier: 0.8, avgRP: 20 },
    { name: 'Lone Wolf', multiplier: 1.2, avgRP: 30 },
  ];

  // Free Fire rank system
  const ranks = [
    { name: 'Bronze I', rp: 0 },
    { name: 'Bronze II', rp: 1000 },
    { name: 'Bronze III', rp: 1200 },
    { name: 'Silver I', rp: 1400 },
    { name: 'Silver II', rp: 1700 },
    { name: 'Silver III', rp: 2000 },
    { name: 'Gold I', rp: 2300 },
    { name: 'Gold II', rp: 2700 },
    { name: 'Gold III', rp: 3200 },
    { name: 'Platinum I', rp: 3800 },
    { name: 'Platinum II', rp: 4500 },
    { name: 'Platinum III', rp: 5300 },
    { name: 'Diamond I', rp: 6200 },
    { name: 'Diamond II', rp: 7200 },
    { name: 'Diamond III', rp: 8300 },
    { name: 'Heroic', rp: 9500 },
    { name: 'Grand Master', rp: 11000 },
  ];

  const calculateRankProgress = () => {
    const currentRankData = ranks.find(r => r.name === currentRank);
    const targetRankData = ranks.find(r => r.name === targetRank);
    const currentRPValue = parseInt(currentRP);
    const avgRP = parseInt(avgRPPerGame);
    const gameMode = gameModes.find(m => m.name === selectedGameMode);

    if (currentRankData && targetRankData && currentRPValue && avgRP && gameMode) {
      const totalCurrentRP = currentRankData.rp + currentRPValue;
      const rpNeeded = targetRankData.rp - totalCurrentRP;
      const adjustedAvgRP = avgRP * gameMode.multiplier;
      const gamesNeeded = Math.ceil(rpNeeded / adjustedAvgRP);
      const daysNeeded = Math.ceil(gamesNeeded / 10); // Assuming 10 games per day

      const calculatedResult = {
        rpNeeded: Math.max(0, rpNeeded),
        gamesNeeded: Math.max(0, gamesNeeded),
        daysNeeded: Math.max(0, daysNeeded)
      };

      setResult(calculatedResult);

      // Save progress to history
      const activeSeason = seasons.find(s => s.isActive);
      saveProgress({
        currentRank,
        currentRP: currentRPValue,
        totalRP: totalCurrentRP,
        gameMode: selectedGameMode,
        season: activeSeason?.name || 'Unknown Season',
      });

      toast({
        title: "Calculation Complete",
        description: `You need ${calculatedResult.rpNeeded} RP (${calculatedResult.gamesNeeded} games)`,
      });
    }
  };

  const resetCalculator = () => {
    setCurrentRank('');
    setCurrentRP('');
    setTargetRank('');
    setAvgRPPerGame('');
    setResult(null);
  };

  const handleApiDataUpdate = (apiData: any) => {
    setCurrentRank(apiData.currentRank);
    setCurrentRP(apiData.currentRP.toString());
    
    // Update game mode stats based on API data
    updateGameModeStats('Battle Royale', {
      gamesPlayed: apiData.stats.brGames,
      winRate: apiData.stats.brWinRate,
      avgRP: 25,
    });
    
    updateGameModeStats('Clash Squad', {
      gamesPlayed: apiData.stats.csGames,
      winRate: apiData.stats.csWinRate,
      avgRP: 20,
    });
  };

  const getCurrentRankRP = () => {
    const rankData = ranks.find(r => r.name === currentRank);
    return rankData ? rankData.rp : 0;
  };

  const getTargetRankRP = () => {
    const rankData = ranks.find(r => r.name === targetRank);
    return rankData ? rankData.rp : 0;
  };

  const getProgressPercentage = () => {
    if (!currentRank || !targetRank || !currentRP) return 0;
    
    const currentTotal = getCurrentRankRP() + parseInt(currentRP || '0');
    const targetTotal = getTargetRankRP();
    const startRP = getCurrentRankRP();
    
    return Math.min(100, Math.max(0, ((currentTotal - startRP) / (targetTotal - startRP)) * 100));
  };

  return (
    <div className="container py-8 max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-orbitron font-bold ff-gradient-text mb-4">
          Advanced Rank Calculator
        </h1>
        <p className="text-muted-foreground">
          Comprehensive rank tracking with historical data, game modes, and API integration
        </p>
      </div>

      <Tabs defaultValue="calculator" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="calculator">Calculator</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="stats">Game Stats</TabsTrigger>
          <TabsTrigger value="api">API Connect</TabsTrigger>
          <TabsTrigger value="ranks">Rank System</TabsTrigger>
          <TabsTrigger value="tips">Tips</TabsTrigger>
        </TabsList>

        <TabsContent value="calculator">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="glow-effect">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5" />
                    Enhanced Rank Calculator
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Current Status</h3>
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor="currentRank">Current Rank</Label>
                          <Select value={currentRank} onValueChange={setCurrentRank}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select current rank" />
                            </SelectTrigger>
                            <SelectContent>
                              {ranks.map((rank) => (
                                <SelectItem key={rank.name} value={rank.name}>
                                  {rank.name} ({rank.rp} RP)
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="currentRP">Current RP in Rank</Label>
                          <Input
                            id="currentRP"
                            type="number"
                            placeholder="e.g., 500"
                            value={currentRP}
                            onChange={(e) => setCurrentRP(e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="gameMode">Game Mode</Label>
                          <Select value={selectedGameMode} onValueChange={setSelectedGameMode}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select game mode" />
                            </SelectTrigger>
                            <SelectContent>
                              {gameModes.map((mode) => (
                                <SelectItem key={mode.name} value={mode.name}>
                                  {mode.name} (x{mode.multiplier} RP)
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Target & Performance</h3>
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor="targetRank">Target Rank</Label>
                          <Select value={targetRank} onValueChange={setTargetRank}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select target rank" />
                            </SelectTrigger>
                            <SelectContent>
                              {ranks.map((rank) => (
                                <SelectItem key={rank.name} value={rank.name}>
                                  {rank.name} ({rank.rp} RP)
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="avgRP">Average RP per Game</Label>
                          <Input
                            id="avgRP"
                            type="number"
                            placeholder="e.g., 25"
                            value={avgRPPerGame}
                            onChange={(e) => setAvgRPPerGame(e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="season">Season</Label>
                          <Select value={selectedSeason} onValueChange={setSelectedSeason}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select season" />
                            </SelectTrigger>
                            <SelectContent>
                              {seasons.map((season) => (
                                <SelectItem key={season.id} value={season.id}>
                                  {season.name} {season.isActive && '(Active)'}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {currentRank && targetRank && currentRP && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress to {targetRank}</span>
                        <span>{Math.round(getProgressPercentage())}%</span>
                      </div>
                      <Progress value={getProgressPercentage()} className="h-3" />
                    </div>
                  )}

                  <div className="flex gap-4">
                    <Button 
                      onClick={calculateRankProgress}
                      className="ff-gradient hover:opacity-90 text-black font-semibold flex-1"
                      disabled={!currentRank || !currentRP || !targetRank || !avgRPPerGame}
                    >
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Calculate Progress
                    </Button>
                    <Button variant="outline" onClick={resetCalculator}>
                      Reset
                    </Button>
                  </div>

                  {result !== null && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="ff-gradient p-4">
                        <div className="text-center text-black">
                          <h3 className="font-semibold mb-1">RP Needed</h3>
                          <p className="text-2xl font-bold">{result.rpNeeded}</p>
                        </div>
                      </Card>
                      <Card className="ff-gradient p-4">
                        <div className="text-center text-black">
                          <h3 className="font-semibold mb-1">Games Needed</h3>
                          <p className="text-2xl font-bold">{result.gamesNeeded}</p>
                        </div>
                      </Card>
                      <Card className="ff-gradient p-4">
                        <div className="text-center text-black">
                          <h3 className="font-semibold mb-1">Days Needed</h3>
                          <p className="text-2xl font-bold">{result.daysNeeded}</p>
                          <p className="text-xs mt-1">~10 games/day</p>
                        </div>
                      </Card>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Data Management</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button onClick={exportData} variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Export Data
                  </Button>
                  <Button 
                    onClick={clearAllData} 
                    variant="destructive" 
                    className="w-full"
                    onClick={() => {
                      if (confirm('Are you sure you want to clear all data?')) {
                        clearAllData();
                        toast({
                          title: "Data Cleared",
                          description: "All historical data has been cleared",
                        });
                      }
                    }}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear All Data
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="history">
          <HistoricalProgress progressHistory={progressHistory} />
        </TabsContent>

        <TabsContent value="stats">
          <GameModeStats gameModeStats={gameModeStats} />
        </TabsContent>

        <TabsContent value="api">
          <FFApiIntegration onDataUpdate={handleApiDataUpdate} />
        </TabsContent>

        <TabsContent value="ranks">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ranks.map((rank, index) => (
              <Card key={rank.name} className="p-4 hover:glow-effect transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 ff-gradient rounded-full flex items-center justify-center text-black font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold">{rank.name}</h3>
                    <p className="text-sm text-muted-foreground">{rank.rp} RP</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tips">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Advanced Ranking Tips</h3>
            <div className="space-y-4 text-muted-foreground">
              <p>• <strong>Game Mode Strategy:</strong> Battle Royale for steady RP, Clash Squad for quick matches</p>
              <p>• <strong>Season Planning:</strong> Focus on early season climbing when competition is lower</p>
              <p>• <strong>Track Performance:</strong> Use historical data to identify improvement patterns</p>
              <p>• <strong>API Integration:</strong> Connect your account for automatic progress tracking</p>
              <p>• <strong>Consistency Wins:</strong> Regular play sessions are better than marathon gaming</p>
              <p>• <strong>Meta Adaptation:</strong> Adjust strategies based on current game updates</p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RankCalculator;
