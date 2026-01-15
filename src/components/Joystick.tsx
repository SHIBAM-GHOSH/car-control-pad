import { useCallback, useRef, useState } from "react";

interface JoystickProps {
  size?: number;
  label: string;
  onMove?: (x: number, y: number) => void;
  vertical?: boolean; // For throttle - restrict to vertical only
}

const Joystick = ({ size = 140, label, onMove, vertical = false }: JoystickProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);

  const knobSize = size * 0.42;
  const maxDistance = (size - knobSize) / 2 - 4;

  const handleMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      let deltaX = vertical ? 0 : clientX - centerX;
      let deltaY = clientY - centerY;

      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance > maxDistance) {
        const angle = Math.atan2(deltaY, deltaX);
        deltaX = vertical ? 0 : Math.cos(angle) * maxDistance;
        deltaY = Math.sin(angle) * maxDistance;
      }

      setPosition({ x: deltaX, y: deltaY });
      
      // Normalize to -1 to 1 range
      const normalizedX = vertical ? 0 : deltaX / maxDistance;
      const normalizedY = -deltaY / maxDistance; // Invert Y so up is positive
      onMove?.(normalizedX, normalizedY);
    },
    [maxDistance, onMove, vertical]
  );

  const handleStart = useCallback(
    (clientX: number, clientY: number) => {
      setIsActive(true);
      handleMove(clientX, clientY);
    },
    [handleMove]
  );

  const handleEnd = useCallback(() => {
    setIsActive(false);
    setPosition({ x: 0, y: 0 });
    onMove?.(0, 0);
  }, [onMove]);

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    handleStart(e.clientX, e.clientY);

    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    };

    const handleMouseUp = () => {
      handleEnd();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <div
        ref={containerRef}
        className="touch-control relative rounded-full bg-joystick border-2 border-border"
        style={{ width: size, height: size }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleEnd}
      >
        {/* Track lines */}
        <div className="absolute inset-4 rounded-full border border-joystick-track opacity-40" />
        <div className="absolute inset-8 rounded-full border border-joystick-track opacity-20" />
        
        {/* Center cross */}
        <div className="absolute left-1/2 top-4 bottom-4 w-px bg-joystick-track opacity-30 -translate-x-1/2" />
        <div className="absolute top-1/2 left-4 right-4 h-px bg-joystick-track opacity-30 -translate-y-1/2" />

        {/* Knob */}
        <div
          className={`absolute rounded-full transition-shadow duration-150 ${
            isActive ? "glow-primary" : ""
          }`}
          style={{
            width: knobSize,
            height: knobSize,
            left: `calc(50% - ${knobSize / 2}px + ${position.x}px)`,
            top: `calc(50% - ${knobSize / 2}px + ${position.y}px)`,
            background: `radial-gradient(circle at 35% 35%, 
              hsl(var(--primary-glow)) 0%, 
              hsl(var(--primary)) 50%, 
              hsl(185 100% 35%) 100%)`,
            boxShadow: isActive
              ? "0 0 30px hsl(var(--primary) / 0.6), inset 0 -2px 8px hsl(185 100% 30%)"
              : "inset 0 -2px 8px hsl(185 100% 30%)",
          }}
        />
      </div>
    </div>
  );
};

export default Joystick;
