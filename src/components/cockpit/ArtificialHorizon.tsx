import React from 'react';

interface ArtificialHorizonProps {
  pitch: number; // -90 to 90 degrees
  roll: number; // -180 to 180 degrees
}

const ArtificialHorizon: React.FC<ArtificialHorizonProps> = ({ pitch, roll }) => {
  // Clamp pitch for display (each degree = 2 pixels of offset)
  const pitchOffset = Math.min(Math.max(pitch, -30), 30) * 2;

  return (
    <div className="relative w-full aspect-square max-w-[280px]">
      {/* Outer bezel */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-secondary to-card border-4 border-border glow-primary overflow-hidden">
        {/* Rotating horizon */}
        <div 
          className="absolute inset-3 rounded-full overflow-hidden"
          style={{ transform: `rotate(${-roll}deg)` }}
        >
          {/* Sky */}
          <div 
            className="absolute inset-0 bg-gradient-to-b from-[hsl(210,80%,35%)] to-[hsl(200,70%,50%)] transition-transform duration-100"
            style={{ transform: `translateY(${pitchOffset}px)` }}
          >
            {/* Pitch lines - sky side */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {[10, 20, 30].map((deg) => {
                const y = 50 - (deg * 2);
                return (
                  <g key={`sky-${deg}`}>
                    <line x1="35" y1={y} x2="45" y2={y} stroke="white" strokeWidth="1" />
                    <line x1="55" y1={y} x2="65" y2={y} stroke="white" strokeWidth="1" />
                    <text x="32" y={y + 1} fill="white" fontSize="4" textAnchor="end">{deg}</text>
                    <text x="68" y={y + 1} fill="white" fontSize="4" textAnchor="start">{deg}</text>
                  </g>
                );
              })}
            </svg>
          </div>
          
          {/* Ground */}
          <div 
            className="absolute inset-0 bg-gradient-to-b from-[hsl(30,50%,35%)] to-[hsl(25,45%,25%)] transition-transform duration-100"
            style={{ 
              transform: `translateY(${pitchOffset}px)`,
              clipPath: 'inset(50% 0 0 0)'
            }}
          >
            {/* Pitch lines - ground side */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {[-10, -20, -30].map((deg) => {
                const y = 50 - (deg * 2);
                return (
                  <g key={`ground-${deg}`}>
                    <line x1="35" y1={y} x2="45" y2={y} stroke="white" strokeWidth="1" />
                    <line x1="55" y1={y} x2="65" y2={y} stroke="white" strokeWidth="1" />
                    <text x="32" y={y + 1} fill="white" fontSize="4" textAnchor="end">{deg}</text>
                    <text x="68" y={y + 1} fill="white" fontSize="4" textAnchor="start">{deg}</text>
                  </g>
                );
              })}
            </svg>
          </div>
          
          {/* Horizon line */}
          <div 
            className="absolute left-0 right-0 h-[2px] bg-white top-1/2 -translate-y-1/2 transition-transform duration-100"
            style={{ transform: `translateY(${pitchOffset}px)` }}
          />
        </div>
        
        {/* Fixed aircraft reference (wings) */}
        <div className="absolute inset-0 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {/* Center dot */}
            <circle cx="50" cy="50" r="2" fill="hsl(var(--warning))" />
            
            {/* Left wing */}
            <path
              d="M20 50 L35 50 L40 55"
              stroke="hsl(var(--warning))"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            
            {/* Right wing */}
            <path
              d="M80 50 L65 50 L60 55"
              stroke="hsl(var(--warning))"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        
        {/* Roll indicator at top */}
        <div className="absolute inset-3 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {/* Roll scale arc */}
            {[-60, -45, -30, -20, -10, 0, 10, 20, 30, 45, 60].map((angle) => {
              const radians = ((angle - 90) * Math.PI) / 180;
              const innerR = 42;
              const outerR = 46;
              const x1 = 50 + innerR * Math.cos(radians);
              const y1 = 50 + innerR * Math.sin(radians);
              const x2 = 50 + outerR * Math.cos(radians);
              const y2 = 50 + outerR * Math.sin(radians);
              const isMajor = angle % 30 === 0;
              
              return (
                <line
                  key={angle}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="white"
                  strokeWidth={isMajor ? "2" : "1"}
                />
              );
            })}
            
            {/* Roll pointer triangle */}
            <polygon
              points="50,8 47,14 53,14"
              fill="white"
            />
          </svg>
        </div>
        
        {/* Digital readouts */}
        <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 flex gap-4">
          <div className="bg-background/80 border border-border rounded px-2 py-0.5 text-center">
            <span className="text-[10px] text-muted-foreground block">PITCH</span>
            <span className="font-mono text-sm font-bold text-primary">{pitch.toFixed(1)}°</span>
          </div>
          <div className="bg-background/80 border border-border rounded px-2 py-0.5 text-center">
            <span className="text-[10px] text-muted-foreground block">ROLL</span>
            <span className="font-mono text-sm font-bold text-primary">{roll.toFixed(1)}°</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtificialHorizon;
