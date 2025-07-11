import { X } from 'lucide-react';
import React from 'react';

interface TagListProps {
  items: string[];
  onRemove?: (item: string) => void;
  icon?: React.ReactNode;
}

const TagList: React.FC<TagListProps> = ({ items, onRemove, icon }) => (
  <div className="flex flex-wrap gap-2">
    {items?.map((item, index) => (
      <span
        key={index}
        className="px-3 py-1 text-sm font-medium text-blue-700 shadow-sm hover:shadow-md transition-shadow bg-blue-100 rounded-full flex items-center gap-2"
      >
        {icon && <span className="text-blue-600">{icon}</span>}
        {item}
        {onRemove && (
          <button
            type="button"
            onClick={() => onRemove(item)}
            className="text-blue-500 hover:text-black text-sm font-bold"
            aria-label={`Remove ${item}`}
          >
            <X size={15} />
          </button>
        )}
      </span>
    ))}
  </div>
);

export default TagList;
