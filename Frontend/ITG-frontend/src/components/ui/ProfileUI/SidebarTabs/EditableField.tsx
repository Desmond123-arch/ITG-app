import React from 'react';

interface EditableFieldProps {
    title: string;
    name: string;
    value: string;
    isEditing: boolean;
    type: 'text' | 'email' | 'number';
    maxLength?: number;
    minLength?: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EditableField: React.FC<EditableFieldProps> = ({ title, name, value, isEditing, onChange, type, maxLength, minLength }) => {
    return (
        <div>
            <h2 className="text-sm">{title}</h2>
            {isEditing ? (
                <input
                    className="text-[17px] p-1 pb-0 text-black border-black/50 border-b-[1px] w-fit focus-visible:outline-none"
                    name={name}
                    value={value}
                    onChange={onChange}
                    type={type}
                    maxLength={maxLength ? maxLength : 10}
                    minLength={minLength ? minLength : 3}
                />
            ) : (
                <p className="text-[18px]">{value}</p>
            )}
        </div>
    );
};

export default EditableField;
