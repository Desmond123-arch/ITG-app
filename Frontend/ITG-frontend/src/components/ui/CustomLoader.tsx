import React from "react";

const CustomLoader: React.FC = () => {
    return (
        <div className="flex h-[calc(100vh-100px)] w-full items-center justify-center bg-gray-100">
            <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-700 font-semibold text-lg">Loading, please wait...</p>
            </div>
        </div>
    );
};

export default CustomLoader;
