import React from 'react'

const ProfileSection: React.FC<{title: string, children: React.ReactNode}> = ({ title, children }) => (
    <div className="flex flex-col">
        <h2 className="text-sm font-semibold text-gray-600">{title}</h2>
        <div className="mt-2">{children}</div>
    </div>
);

export default ProfileSection