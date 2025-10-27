const DashboardCard = ({ icon, mainText, subText }) => {
  return (
    <div className="flex h-[150px] flex-col items-center justify-center gap-1 rounded-xl bg-white">
      <div className="flex items-center gap-2">
        {icon}
        <p className="text-brand-dark-blue text-2xl font-semibold">
          {mainText}
        </p>
      </div>
      <div className="text-brand-dark-blue text-sm">{subText}</div>
    </div>
  );
};

export default DashboardCard;
