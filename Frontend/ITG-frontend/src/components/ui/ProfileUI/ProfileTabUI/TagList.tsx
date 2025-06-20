import React from 'react';

interface TagListProps {
    items: string[];
    onRemove?: (item: string) => void;
}

const TagList: React.FC<TagListProps> = ({ items, onRemove }) => (
    <div className="flex flex-wrap gap-2">
        {items.map((item, index) => (
            <span
                key={index}
                className="px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-full flex items-center gap-2"
            >
                {item}
                {onRemove && (
                    <button
                        type="button"
                        onClick={() => onRemove(item)}
                        className="text-blue-500 hover:text-red-500 text-sm font-bold"
                        aria-label={`Remove ${item}`}
                    >
                        ×
                    </button>
                )}
            </span>
        ))}
    </div>
);

export default TagList;
