
import { Target, Settings, Trophy, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const handleNavClick = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePremiumClick = () => {
    console.log('Premium clicked');
    // Here you can add premium modal or navigation
    alert('Premium features coming soon!');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 ff-gradient rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-black" />
              </div>
              <span className="font-orbitron font-bold text-xl ff-gradient-text">
                FF ToolsPro+
              </span>
            </div>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <button
              className="transition-colors hover:text-primary text-muted-foreground"
              onClick={() => handleNavClick('tools')}
            >
              Tools
            </button>
            <button
              className="transition-colors hover:text-primary text-muted-foreground"
              onClick={() => console.log('Guides clicked')}
            >
              Guides
            </button>
            <button
              className="transition-colors hover:text-primary text-muted-foreground"
              onClick={() => console.log('Updates clicked')}
            >
              Updates
            </button>
          </nav>
          <Button 
            className="ff-gradient hover:opacity-90 text-black font-semibold"
            onClick={handlePremiumClick}
          >
            Premium
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
