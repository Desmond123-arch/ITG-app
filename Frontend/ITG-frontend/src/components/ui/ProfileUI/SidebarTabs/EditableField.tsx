import React from 'react';

interface EditableFieldProps {
    title: string;
    name: string;
    value: string;
    isEditing: boolean;
    type: 'text' | 'email' | 'number';
    maxLength?: number;
    placeholder?: string;
    minLength?: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EditableField: React.FC<EditableFieldProps> = ({ placeholder, title, name, value, isEditing, onChange, type, maxLength, minLength }) => {
    return (
        <div className="flex flex-col gap-1">
            <h2 className="text-sm">{title}</h2>
            {isEditing ? (
                <input
                    className="border rounded-sm px-2 py-1 w-full focus-visible:outline-none"
                    name={name}
                    value={value}
                    onChange={onChange}
                    type={type}
                    placeholder={placeholder}
                    maxLength={maxLength ? maxLength : 10}
                    minLength={minLength ? minLength : 3}
                />
            ) : (
                <p className="text-[18px]">{value ? value : '-----'}</p>
            )}
        </div>
    );
};

export default EditableField;
