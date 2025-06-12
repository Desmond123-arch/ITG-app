import React from 'react'

const TagList: React.FC<{items: Array<string>}> = ({ items }) => (
    <div className="flex flex-wrap gap-2">
        {items.map((item, index) => (
            <span 
                key={index} 
                className="px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-full"
            >
                {item}
            </span>
        ))}
    </div>
);

export default TagList