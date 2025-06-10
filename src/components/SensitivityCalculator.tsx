
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, Settings, Target } from 'lucide-react';

const SensitivityCalculator = () => {
  const [currentDPI, setCurrentDPI] = useState('');
  const [currentSens, setCurrentSens] = useState('');
  const [newDPI, setNewDPI] = useState('');
  const [device, setDevice] = useState('');
  const [result, setResult] = useState<number | null>(null);

  // Common DPI presets
  const dpiPresets = [
    { name: 'Low Gaming Mouse', dpi: 800 },
    { name: 'Medium Gaming Mouse', dpi: 1600 },
    { name: 'High Gaming Mouse', dpi: 3200 },
    { name: 'Ultra High Gaming Mouse', dpi: 6400 },
  ];

  // Device presets with recommended settings
  const devicePresets = [
    { name: 'iPhone 13/14/15', dpi: 326, recommendedSens: 100 },
    { name: 'Samsung Galaxy S23', dpi: 393, recommendedSens: 95 },
    { name: 'iPad Pro', dpi: 264, recommendedSens: 110 },
    { name: 'Gaming Tablet', dpi: 300, recommendedSens: 105 },
  ];

  const calculateSensitivity = () => {
    const oldDPI = parseFloat(currentDPI);
    const oldSens = parseFloat(currentSens);
    const targetDPI = parseFloat(newDPI);

    if (oldDPI && oldSens && targetDPI) {
      // Formula: New Sensitivity = (Old DPI × Old Sensitivity) ÷ New DPI
      const newSensitivity = (oldDPI * oldSens) / targetDPI;
      setResult(Math.round(newSensitivity * 100) / 100);
    }
  };

  const resetCalculator = () => {
    setCurrentDPI('');
    setCurrentSens('');
    setNewDPI('');
    setDevice('');
    setResult(null);
  };

  const applyDevicePreset = (deviceName: string) => {
    const preset = devicePresets.find(d => d.name === deviceName);
    if (preset) {
      setNewDPI(preset.dpi.toString());
    }
  };

  return (
    <div className="container py-8 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-orbitron font-bold ff-gradient-text mb-4">
          Sensitivity Calculator
        </h1>
        <p className="text-muted-foreground">
          Hitung sensitivity yang perfect untuk device kamu dengan akurat
        </p>
      </div>

      <Tabs defaultValue="calculator" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="calculator">Calculator</TabsTrigger>
          <TabsTrigger value="presets">Device Presets</TabsTrigger>
          <TabsTrigger value="guide">Guide</TabsTrigger>
        </TabsList>

        <TabsContent value="calculator">
          <Card className="glow-effect">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Sensitivity Converter
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Current Settings</h3>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="currentDPI">Current DPI</Label>
                      <Input
                        id="currentDPI"
                        type="number"
                        placeholder="e.g., 800"
                        value={currentDPI}
                        onChange={(e) => setCurrentDPI(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="currentSens">Current Sensitivity</Label>
                      <Input
                        id="currentSens"
                        type="number"
                        placeholder="e.g., 100"
                        value={currentSens}
                        onChange={(e) => setCurrentSens(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Target Settings</h3>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="newDPI">New DPI</Label>
                      <Input
                        id="newDPI"
                        type="number"
                        placeholder="e.g., 1600"
                        value={newDPI}
                        onChange={(e) => setNewDPI(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="device">Device Type</Label>
                      <Select value={device} onValueChange={(value) => {
                        setDevice(value);
                        applyDevicePreset(value);
                      }}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select device" />
                        </SelectTrigger>
                        <SelectContent>
                          {devicePresets.map((preset) => (
                            <SelectItem key={preset.name} value={preset.name}>
                              {preset.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button 
                  onClick={calculateSensitivity}
                  className="ff-gradient hover:opacity-90 text-black font-semibold"
                  disabled={!currentDPI || !currentSens || !newDPI}
                >
                  <Target className="w-4 h-4 mr-2" />
                  Calculate
                </Button>
                <Button variant="outline" onClick={resetCalculator}>
                  Reset
                </Button>
              </div>

              {result !== null && (
                <Card className="ff-gradient p-6">
                  <div className="text-center text-black">
                    <h3 className="text-2xl font-bold mb-2">New Sensitivity</h3>
                    <p className="text-4xl font-orbitron font-black">{result}</p>
                    <p className="mt-2 text-sm">
                      Perfect sensitivity untuk DPI {newDPI}
                    </p>
                  </div>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="presets">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {devicePresets.map((preset) => (
              <Card key={preset.name} className="p-4 hover:glow-effect transition-all cursor-pointer"
                    onClick={() => applyDevicePreset(preset.name)}>
                <h3 className="font-semibold">{preset.name}</h3>
                <p className="text-sm text-muted-foreground">DPI: {preset.dpi}</p>
                <p className="text-sm text-muted-foreground">Recommended Sens: {preset.recommendedSens}</p>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="guide">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">How to Use</h3>
            <div className="space-y-4 text-muted-foreground">
              <p>1. Masukkan DPI dan sensitivity yang sedang kamu gunakan</p>
              <p>2. Pilih DPI baru atau device yang ingin kamu gunakan</p>
              <p>3. Klik Calculate untuk mendapatkan sensitivity yang setara</p>
              <p>4. Gunakan hasil sensitivity di Free Fire untuk feeling yang sama</p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SensitivityCalculator;
