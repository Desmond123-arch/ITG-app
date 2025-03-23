import React from 'react'
import { Button } from '../../button'

interface Props{
    title: string
    description: string
    actionLabel: string
    actionVariant: "default" | "link" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined
}

const ActionItem: React.FC<Props> = ({ title, description, actionLabel, actionVariant }) => (
    <div>
        <h1 className="font-semibold">{title}</h1>
        <div className="flex justify-between gap-5 items-start">
            <p className="text-gray-700">{description}</p>
            <Button variant={actionVariant}>{actionLabel}</Button>
        </div>
    </div>
);

export default ActionItem