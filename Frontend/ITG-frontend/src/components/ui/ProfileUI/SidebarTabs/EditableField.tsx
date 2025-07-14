import React, { forwardRef } from 'react';

interface EditableFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    title?: string;
    isEditing: boolean;
}

// ⚠️ Forward ref is required by React Hook Form
const EditableField = forwardRef<HTMLInputElement, EditableFieldProps>(
    ({ title, isEditing, ...inputProps }, ref) => {
        return (
            <div className="flex flex-col gap-1">
                <h2 className="text-sm">{title}</h2>
                {isEditing ? (
                    <input
                        ref={ref}
                        className="border rounded-sm px-2 py-1 w-full focus-visible:outline-none"
                        {...inputProps}
                    />
                ) : (
                    <p className="text-[18px]">{inputProps.value || '-----'}</p>
                )}
            </div>
        );
    }
);

EditableField.displayName = 'EditableField';

export default EditableField;
