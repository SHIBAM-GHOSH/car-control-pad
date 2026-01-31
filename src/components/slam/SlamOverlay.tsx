interface SlamOverlayProps {
  distanceTraveled: number;
  trackingStatus: "Tracking" | "Loop Closure" | "Lost";
}

const SlamOverlay = ({ distanceTraveled, trackingStatus }: SlamOverlayProps) => {
  const statusColors = {
    Tracking: "text-success",
    "Loop Closure": "text-primary",
    Lost: "text-destructive",
  };

  const statusBgColors = {
    Tracking: "bg-success/10 border-success/30",
    "Loop Closure": "bg-primary/10 border-primary/30",
    Lost: "bg-destructive/10 border-destructive/30",
  };

  return (
    <>
      {/* Top-left: Distance traveled */}
      <div className="absolute top-3 left-3 z-10">
        <div className="bg-background/80 backdrop-blur-sm border border-border rounded px-3 py-2">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">
            Distance
          </div>
          <div className="text-xl font-mono font-bold text-foreground tabular-nums">
            {distanceTraveled.toFixed(1)}
            <span className="text-xs text-muted-foreground ml-1">m</span>
          </div>
        </div>
      </div>

      {/* Top-right: SLAM Status */}
      <div className="absolute top-3 right-3 z-10">
        <div className={`border rounded px-3 py-2 ${statusBgColors[trackingStatus]}`}>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-0.5">
            SLAM Status
          </div>
          <div className={`text-sm font-bold uppercase tracking-wide ${statusColors[trackingStatus]}`}>
            {trackingStatus === "Tracking" && (
              <span className="inline-block w-2 h-2 rounded-full bg-success mr-2 animate-pulse" />
            )}
            {trackingStatus === "Loop Closure" && (
              <span className="inline-block w-2 h-2 rounded-full bg-primary mr-2 animate-pulse" />
            )}
            {trackingStatus === "Lost" && (
              <span className="inline-block w-2 h-2 rounded-full bg-destructive mr-2 animate-status-blink" />
            )}
            {trackingStatus}
          </div>
        </div>
      </div>

      {/* Bottom-left: Legend */}
      <div className="absolute bottom-3 left-3 z-10">
        <div className="bg-background/60 backdrop-blur-sm border border-border rounded px-2 py-1.5 text-[9px] space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-3 h-0.5 bg-[#ff3333]" />
            <span className="text-muted-foreground">Trajectory</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#3388ff]" />
            <span className="text-muted-foreground">Keyframes</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#aaff33]" />
            <span className="text-muted-foreground">LiDAR Scan</span>
          </div>
        </div>
      </div>

      {/* Bottom-right: Frame info */}
      <div className="absolute bottom-3 right-3 z-10">
        <div className="bg-background/60 backdrop-blur-sm border border-border rounded px-2 py-1 text-[9px] font-mono text-muted-foreground">
          <span>FPS: 30</span>
          <span className="mx-2 text-border">|</span>
          <span>PTS: 4.3K</span>
          <span className="mx-2 text-border">|</span>
          <span>KF: 12</span>
        </div>
      </div>
    </>
  );
};

export default SlamOverlay;
