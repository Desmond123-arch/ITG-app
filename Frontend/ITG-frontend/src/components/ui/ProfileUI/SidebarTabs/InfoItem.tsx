import React from 'react'

interface Props{
    title: string
    value: string
    isHidden?: boolean
}

const InfoItem: React.FC<Props> = ({ title, value, isHidden }) => (
    <div className="flex flex-col">
        <h2 className="text-sm">{title}</h2>
        <h1 className="text-[18px] text-black">
            {
                isHidden ? "*".repeat(value.length) : value
            }
        </h1>
    </div>
);

export default InfoItem