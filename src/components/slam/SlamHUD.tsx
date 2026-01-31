interface SlamHUDProps {
  distanceTraveled: number;
  trackingStatus: "Tracking" | "Loop Closure" | "Lost";
  keyframeCount: number;
  pointCount: number;
}

const SlamHUD = ({ distanceTraveled, trackingStatus, keyframeCount, pointCount }: SlamHUDProps) => {
  const statusConfig = {
    Tracking: { color: "text-green-400", bg: "bg-green-500/20", dot: "bg-green-400" },
    "Loop Closure": { color: "text-cyan-400", bg: "bg-cyan-500/20", dot: "bg-cyan-400" },
    Lost: { color: "text-red-400", bg: "bg-red-500/20", dot: "bg-red-400" },
  };

  const config = statusConfig[trackingStatus];

  return (
    <>
      {/* Top-left: Distance */}
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-black/70 border border-gray-700 rounded px-4 py-3">
          <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">
            Distance Traveled
          </div>
          <div className="text-3xl font-mono font-bold text-white tabular-nums">
            {distanceTraveled.toFixed(2)}
            <span className="text-sm text-gray-400 ml-1">m</span>
          </div>
        </div>
      </div>

      {/* Top-right: Status */}
      <div className="absolute top-4 right-4 z-10">
        <div className={`${config.bg} border border-gray-700 rounded px-4 py-3`}>
          <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">
            SLAM Status
          </div>
          <div className={`flex items-center gap-2 text-lg font-bold ${config.color}`}>
            <span className={`w-2.5 h-2.5 rounded-full ${config.dot} ${trackingStatus === "Tracking" ? "animate-pulse" : ""}`} />
            {trackingStatus}
          </div>
        </div>
      </div>

      {/* Bottom-left: Stats */}
      <div className="absolute bottom-4 left-4 z-10">
        <div className="bg-black/70 border border-gray-700 rounded px-3 py-2 space-y-1">
          <div className="flex items-center justify-between gap-6 text-xs">
            <span className="text-gray-500">Keyframes</span>
            <span className="font-mono text-white">{keyframeCount}</span>
          </div>
          <div className="flex items-center justify-between gap-6 text-xs">
            <span className="text-gray-500">Map Points</span>
            <span className="font-mono text-white">{(pointCount / 1000).toFixed(1)}K</span>
          </div>
        </div>
      </div>

      {/* Bottom-right: Legend */}
      <div className="absolute bottom-4 right-4 z-10">
        <div className="bg-black/70 border border-gray-700 rounded px-3 py-2 text-[10px] space-y-1.5">
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-green-400 rounded" />
            <span className="text-gray-400">Trajectory</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-white" />
            <span className="text-gray-400">Keyframe</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="text-gray-400">Current Pos</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-2 rounded-sm" style={{ background: "linear-gradient(90deg, #0000ff, #00ffff, #00ff00, #ffff00, #ff0000)" }} />
            <span className="text-gray-400">Height</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SlamHUD;
