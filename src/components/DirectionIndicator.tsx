import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";

interface DirectionIndicatorProps {
  steering: number; // -1 to 1
  throttle: number; // -1 to 1
}

const DirectionIndicator = ({ steering, throttle }: DirectionIndicatorProps) => {
  const arrowOpacity = (value: number, threshold: number) =>
    Math.abs(value) > threshold ? Math.min(Math.abs(value), 1) : 0.2;

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="grid grid-cols-3 gap-0.5 p-2 rounded-lg bg-card border border-border">
        <div />
        <ArrowUp
          size={18}
          className="text-primary transition-opacity"
          style={{ opacity: throttle > 0.1 ? arrowOpacity(throttle, 0.1) : 0.2 }}
        />
        <div />
        <ArrowLeft
          size={18}
          className="text-primary transition-opacity"
          style={{ opacity: steering < -0.1 ? arrowOpacity(steering, 0.1) : 0.2 }}
        />
        <div className="w-4 h-4 rounded-full bg-muted flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-primary/50" />
        </div>
        <ArrowRight
          size={18}
          className="text-primary transition-opacity"
          style={{ opacity: steering > 0.1 ? arrowOpacity(steering, 0.1) : 0.2 }}
        />
        <div />
        <ArrowDown
          size={18}
          className="text-primary transition-opacity"
          style={{ opacity: throttle < -0.1 ? arrowOpacity(Math.abs(throttle), 0.1) : 0.2 }}
        />
        <div />
      </div>
      <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
        Direction
      </span>
    </div>
  );
};

export default DirectionIndicator;
