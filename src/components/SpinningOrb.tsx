
import React, { useEffect, useRef } from 'react';

interface SpinningOrbProps {
  isLoading: boolean;
}

const SpinningOrb: React.FC<SpinningOrbProps> = ({ isLoading }) => {
  const orbRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (isLoading && orbRef.current) {
      orbRef.current.style.animationDuration = '3s';
    } else if (orbRef.current) {
      orbRef.current.style.animationDuration = '10s';
    }
  }, [isLoading]);

  return (
    <div className="h-full flex items-center justify-center">
      <div className="relative">
        <div 
          ref={orbRef}
          className={`w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-b from-cyan-900 to-blue-950 orb-glow animate-spin-slow relative overflow-hidden
            ${isLoading ? 'animate-pulse-slow' : ''}`}
        >
          {/* The glowing line across the middle */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-cyanglow transform -translate-y-1/2 orb-ring"></div>
          
          {/* Overlay to create the spherical effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-30 rounded-full"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-black opacity-30 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default SpinningOrb;
