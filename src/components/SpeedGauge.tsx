interface SpeedGaugeProps {
  speed: number; // 0 to 100
  size?: number;
}

const SpeedGauge = ({ speed, size = 160 }: SpeedGaugeProps) => {
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  // Show 270 degrees of the circle (3/4)
  const arcLength = circumference * 0.75;
  const offset = arcLength - (arcLength * speed) / 100;

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Background arc */}
        <svg
          className="absolute inset-0 -rotate-[135deg]"
          width={size}
          height={size}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="hsl(var(--gauge-ring))"
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeLinecap="round"
          />
        </svg>

        {/* Filled arc */}
        <svg
          className="absolute inset-0 -rotate-[135deg]"
          width={size}
          height={size}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-100 ease-out"
            style={{
              filter: speed > 0 ? "drop-shadow(0 0 8px hsl(var(--primary) / 0.6))" : "none",
            }}
          />
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(185 100% 50%)" />
              <stop offset="100%" stopColor="hsl(185 100% 70%)" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="text-3xl font-bold tabular-nums text-foreground"
            style={{
              textShadow: speed > 0 ? "0 0 20px hsl(var(--primary) / 0.5)" : "none",
            }}
          >
            {Math.round(speed)}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
            %
          </span>
        </div>

        {/* Tick marks */}
        {[0, 25, 50, 75, 100].map((tick, i) => {
          const angle = -135 + (tick / 100) * 270;
          const rad = (angle * Math.PI) / 180;
          const x = size / 2 + (radius + 14) * Math.cos(rad);
          const y = size / 2 + (radius + 14) * Math.sin(rad);
          return (
            <span
              key={i}
              className="absolute text-[9px] text-muted-foreground font-medium"
              style={{
                left: x,
                top: y,
                transform: "translate(-50%, -50%)",
              }}
            >
              {tick}
            </span>
          );
        })}
      </div>
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Power
      </span>
    </div>
  );
};

export default SpeedGauge;
