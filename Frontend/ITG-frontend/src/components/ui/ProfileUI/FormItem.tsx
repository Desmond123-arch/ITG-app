import React from 'react'

interface Props{
    label: string
    value: string
    placeholder: string
    type?: string
}

const FormItem: React.FC<Props> = ({ label, value, placeholder, type='text' }) => (
    <div className="flex flex-col gap-1">
        <label id={label} className="text-sm">{label}</label>
        <input className='border rounded-sm px-2 py-1' id={label} type={type} name={label} placeholder={placeholder} value={value}/>
    </div>
);

export default FormItem