import UpgradeBanner from '../UpgradeBanner';

export default function UpgradeBannerExample() {
  const handleUpgrade = () => {
    console.log('Upgrade button clicked');
    alert('Upgrade functionality would be triggered here!');
  };

  return (
    <div className="p-4 max-w-2xl">
      <UpgradeBanner onUpgrade={handleUpgrade} />
    </div>
  );
}