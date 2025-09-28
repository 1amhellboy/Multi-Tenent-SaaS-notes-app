import { Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface UpgradeBannerProps {
  onUpgrade?: () => void; // optional
}

export default function UpgradeBanner({ onUpgrade }: UpgradeBannerProps) {
  const isAdmin = Boolean(onUpgrade);

  const handleClick = () => {
    if (isAdmin && onUpgrade) {
      onUpgrade();
    } else {
      alert("Please contact your admin to upgrade."); 
    }
  };

  return (
    <Card className="p-4 bg-chart-3/10 border-chart-3/20" data-testid="banner-upgrade">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Zap className="h-5 w-5 text-chart-3" />
          <div>
            <p className="text-sm font-medium text-foreground">
              {isAdmin
                ? "You're on Free Plan. Upgrade plan for all Users to Pro for unlimited notes."
                : "You're on Free Plan. Contact your admin to upgrade."}
            </p>
            <p className="text-xs text-muted-foreground">Current limit: 3 notes</p>
          </div>
        </div>
        <Button size="sm" className="flex-shrink-0" onClick={handleClick}>
          <Zap className="mr-2 h-4 w-4" />
          Upgrade
        </Button>
      </div>
    </Card>
  );
}
