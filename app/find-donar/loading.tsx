import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative w-24 h-24">
        {/* Background circle */}
        <div className="absolute inset-0 rounded-full shadow-[inset_0_0_10px_2px_rgba(0,0,0,0.3)]"></div>
        {/* Rotating circle */}
        <div className="absolute inset-0 rounded-full shadow-[inset_0_2px_0_#FF3D00] animate-spin"></div>
      </div>
    </div>
  );
};

export default Loading;
