import { LucideIcon } from "lucide-react";

interface ControlButtonProps {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  variant?: "default" | "danger";
  onPress?: () => void;
  onRelease?: () => void;
  size?: "sm" | "md" | "lg";
}

const ControlButton = ({
  icon: Icon,
  label,
  active = false,
  variant = "default",
  onPress,
  onRelease,
  size = "md",
}: ControlButtonProps) => {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-20 h-20",
  };

  const iconSizes = {
    sm: 18,
    md: 24,
    lg: 28,
  };

  const variantClasses = {
    default: active
      ? "border-primary bg-primary/20 glow-primary-sm"
      : "border-border hover:border-primary/50",
    danger: active
      ? "border-destructive bg-destructive/20 glow-destructive"
      : "border-destructive/50 hover:border-destructive",
  };

  return (
    <div className="flex flex-col items-center gap-1.5">
      <button
        className={`
          touch-control control-button
          ${sizeClasses[size]}
          rounded-xl border-2 
          flex items-center justify-center
          transition-all duration-150
          ${variantClasses[variant]}
        `}
        onMouseDown={onPress}
        onMouseUp={onRelease}
        onMouseLeave={onRelease}
        onTouchStart={(e) => {
          e.preventDefault();
          onPress?.();
        }}
        onTouchEnd={(e) => {
          e.preventDefault();
          onRelease?.();
        }}
      >
        <Icon
          size={iconSizes[size]}
          className={`transition-colors ${
            active
              ? variant === "danger"
                ? "text-destructive"
                : "text-primary"
              : "text-foreground"
          }`}
        />
      </button>
      <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
    </div>
  );
};

export default ControlButton;
