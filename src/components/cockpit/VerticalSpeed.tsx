import React from 'react';

interface VerticalSpeedProps {
  rate: number; // meters per second (positive = climb, negative = descent)
  maxRate?: number;
}

const VerticalSpeed: React.FC<VerticalSpeedProps> = ({ rate, maxRate = 5 }) => {
  const clampedRate = Math.min(Math.max(rate, -maxRate), maxRate);
  const fillPercent = (clampedRate / maxRate) * 50; // 50% = full scale in one direction

  return (
    <div className="relative h-full w-16 flex flex-col items-center">
      {/* Label */}
      <span className="text-[10px] text-muted-foreground font-medium tracking-wider mb-2">V/S</span>
      
      {/* Vertical gauge */}
      <div className="relative flex-1 w-10 bg-card border border-border rounded-lg overflow-hidden">
        {/* Scale markings */}
        <div className="absolute inset-0 flex flex-col justify-between py-2">
          {[maxRate, maxRate/2, 0, -maxRate/2, -maxRate].map((val, i) => (
            <div key={i} className="flex items-center gap-1">
              <div className={`w-2 h-0.5 ${val === 0 ? 'bg-foreground' : 'bg-muted-foreground'}`} />
              <span className="text-[8px] text-muted-foreground font-mono">
                {val > 0 ? '+' : ''}{val.toFixed(1)}
              </span>
            </div>
          ))}
        </div>
        
        {/* Zero line */}
        <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-foreground/50" />
        
        {/* Fill bar */}
        <div 
          className="absolute left-1 right-1 transition-all duration-200"
          style={{
            top: fillPercent < 0 ? '50%' : `${50 - fillPercent}%`,
            height: `${Math.abs(fillPercent)}%`,
            background: rate > 0.5 
              ? 'linear-gradient(to top, hsl(var(--success)), hsl(var(--success) / 0.5))'
              : rate < -0.5
              ? 'linear-gradient(to bottom, hsl(var(--destructive)), hsl(var(--destructive) / 0.5))'
              : 'linear-gradient(to top, hsl(var(--primary)), hsl(var(--primary) / 0.5))',
            boxShadow: rate > 0.5 
              ? '0 0 10px hsl(var(--success) / 0.5)'
              : rate < -0.5
              ? '0 0 10px hsl(var(--destructive) / 0.5)'
              : '0 0 10px hsl(var(--primary) / 0.5)'
          }}
        />
        
        {/* Pointer */}
        <div 
          className="absolute left-0 w-3 h-2 bg-primary transition-all duration-200"
          style={{
            top: `calc(50% - ${fillPercent}% - 4px)`,
            clipPath: 'polygon(0 50%, 100% 0, 100% 100%)'
          }}
        />
      </div>
      
      {/* Digital readout */}
      <div className="mt-2 bg-background/80 border border-border rounded px-2 py-0.5">
        <span className={`font-mono text-sm font-bold ${
          rate > 0.5 ? 'text-success' : rate < -0.5 ? 'text-destructive' : 'text-primary'
        }`}>
          {rate > 0 ? '+' : ''}{rate.toFixed(2)}
        </span>
        <span className="text-[8px] text-muted-foreground ml-0.5">m/s</span>
      </div>
    </div>
  );
};

export default VerticalSpeed;
