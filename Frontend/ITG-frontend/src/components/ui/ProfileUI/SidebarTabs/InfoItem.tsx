const InfoItem = ({ title, value }: { title: string, value: string }) => (
    <div className="flex flex-col">
        <h2 className="text-sm">{title}</h2>
        <h1 className="text-[18px] text-black">{value}</h1>
    </div>
);

export default InfoItem