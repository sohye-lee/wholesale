import React from 'react';

export default function Loading() {
  return (
    <div className="w-screen h-screen fixed top-0 left-0 bg-white flex items-center z-[1000] justify-center">
      <div className="w-12 h-12 border border-3 border-amber-800 border-r-transparent animate-spin"></div>
    </div>
  );
}
