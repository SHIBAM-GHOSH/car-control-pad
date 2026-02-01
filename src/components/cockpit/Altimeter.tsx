import React from 'react';

interface AltimeterProps {
  altitude: number; // meters from starting point
  maxAltitude?: number;
}

const Altimeter: React.FC<AltimeterProps> = ({ altitude, maxAltitude = 100 }) => {
  // Needle rotation: 0m = -135deg, maxAltitude = 135deg (270deg sweep)
  const normalizedAlt = Math.min(Math.max(altitude, -maxAltitude), maxAltitude);
  const needleRotation = (normalizedAlt / maxAltitude) * 135;

  return (
    <div className="relative w-full aspect-square max-w-[280px]">
      {/* Outer bezel */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-secondary to-card border-4 border-border glow-primary">
        {/* Inner face */}
        <div className="absolute inset-3 rounded-full bg-gradient-radial border border-border/50">
          {/* Scale markings */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            {/* Major tick marks */}
            {[-100, -75, -50, -25, 0, 25, 50, 75, 100].map((value, i) => {
              const angle = ((value / 100) * 135) - 90;
              const radians = (angle * Math.PI) / 180;
              const innerR = 38;
              const outerR = 44;
              const x1 = 50 + innerR * Math.cos(radians);
              const y1 = 50 + innerR * Math.sin(radians);
              const x2 = 50 + outerR * Math.cos(radians);
              const y2 = 50 + outerR * Math.sin(radians);
              const labelR = 32;
              const labelX = 50 + labelR * Math.cos(radians);
              const labelY = 50 + labelR * Math.sin(radians);
              
              return (
                <g key={i}>
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="hsl(var(--foreground))"
                    strokeWidth="2"
                  />
                  <text
                    x={labelX}
                    y={labelY}
                    fill="hsl(var(--foreground))"
                    fontSize="6"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="font-mono"
                  >
                    {value}
                  </text>
                </g>
              );
            })}
            
            {/* Minor tick marks */}
            {Array.from({ length: 41 }, (_, i) => {
              const value = -100 + i * 5;
              if (value % 25 === 0) return null;
              const angle = ((value / 100) * 135) - 90;
              const radians = (angle * Math.PI) / 180;
              const innerR = 40;
              const outerR = 44;
              const x1 = 50 + innerR * Math.cos(radians);
              const y1 = 50 + innerR * Math.sin(radians);
              const x2 = 50 + outerR * Math.cos(radians);
              const y2 = 50 + outerR * Math.sin(radians);
              
              return (
                <line
                  key={`minor-${i}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth="1"
                />
              );
            })}
            
            {/* Center decoration */}
            <circle cx="50" cy="50" r="8" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" />
            <circle cx="50" cy="50" r="4" fill="hsl(var(--primary))" className="drop-shadow-[0_0_8px_hsl(var(--primary))]" />
          </svg>
          
          {/* Needle */}
          <div 
            className="absolute inset-0 transition-transform duration-300 ease-out"
            style={{ transform: `rotate(${needleRotation}deg)` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full w-1 h-[35%] origin-bottom">
              <div className="w-full h-full bg-gradient-to-t from-primary to-primary-foreground clip-needle drop-shadow-[0_0_10px_hsl(var(--primary))]" 
                style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }} 
              />
            </div>
          </div>
          
          {/* Digital readout */}
          <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 bg-background/80 border border-border rounded px-3 py-1">
            <span className="font-mono text-lg font-bold text-primary">
              {altitude.toFixed(1)}
            </span>
            <span className="text-xs text-muted-foreground ml-1">m</span>
          </div>
          
          {/* Label */}
          <div className="absolute top-[25%] left-1/2 -translate-x-1/2 text-center">
            <span className="text-xs text-muted-foreground font-medium tracking-wider">ALTITUDE</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Altimeter;
