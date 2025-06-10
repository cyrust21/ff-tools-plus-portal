
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';

interface FFApiIntegrationProps {
  onDataUpdate: (data: any) => void;
}

const FFApiIntegration = ({ onDataUpdate }: FFApiIntegrationProps) => {
  const [playerId, setPlayerId] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [playerData, setPlayerData] = useState<any>(null);
  const { toast } = useToast();

  // Simulate API connection
  const simulateApiCall = async () => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate player data response
    const mockData = {
      playerId: playerId,
      playerName: `Player_${playerId}`,
      currentRank: 'Diamond II',
      currentRP: 650,
      totalRP: 7850,
      season: 'Season 4 2024',
      stats: {
        brGames: 245,
        brWins: 67,
        brWinRate: 27.3,
        csGames: 89,
        csWins: 54,
        csWinRate: 60.7,
        totalKills: 1456,
        avgSurvivalTime: '12:34',
      },
      recentMatches: [
        { mode: 'BR', rp: 28, result: 'Win', date: new Date().toISOString() },
        { mode: 'CS', rp: 22, result: 'Win', date: new Date(Date.now() - 86400000).toISOString() },
        { mode: 'BR', rp: -5, result: 'Loss', date: new Date(Date.now() - 172800000).toISOString() },
      ]
    };
    
    setPlayerData(mockData);
    setIsConnected(true);
    setIsLoading(false);
    
    onDataUpdate(mockData);
    
    toast({
      title: "Connected to Free Fire API",
      description: `Successfully loaded data for ${mockData.playerName}`,
    });
  };

  const disconnect = () => {
    setIsConnected(false);
    setPlayerData(null);
    setPlayerId('');
    toast({
      title: "Disconnected",
      description: "API connection has been closed",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {isConnected ? <Wifi className="w-5 h-5 text-green-500" /> : <WifiOff className="w-5 h-5" />}
          Free Fire API Integration
          {isConnected && <Badge variant="secondary" className="bg-green-100 text-green-800">Connected</Badge>}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isConnected ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="playerId">Player ID</Label>
              <Input
                id="playerId"
                placeholder="Enter your Free Fire Player ID"
                value={playerId}
                onChange={(e) => setPlayerId(e.target.value)}
              />
            </div>
            <Button 
              onClick={simulateApiCall}
              disabled={!playerId || isLoading}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Connecting...
                </>
              ) : (
                'Connect to Free Fire API'
              )}
            </Button>
            <p className="text-xs text-muted-foreground">
              *This is a demo simulation. Real API integration would require official Free Fire API access.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Player Name</p>
                <p className="font-semibold">{playerData?.playerName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Current Rank</p>
                <Badge>{playerData?.currentRank}</Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total RP</p>
                <p className="font-semibold">{playerData?.totalRP}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Season</p>
                <p className="font-semibold">{playerData?.season}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div>
                <p className="text-sm text-muted-foreground">BR Win Rate</p>
                <p className="font-semibold">{playerData?.stats.brWinRate}%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">CS Win Rate</p>
                <p className="font-semibold">{playerData?.stats.csWinRate}%</p>
              </div>
            </div>
            
            <Button variant="outline" onClick={disconnect} className="w-full">
              Disconnect
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FFApiIntegration;
