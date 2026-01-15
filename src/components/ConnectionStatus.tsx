import { Bluetooth, BluetoothConnected, WifiOff } from "lucide-react";

interface ConnectionStatusProps {
  status: "connected" | "connecting" | "disconnected";
  deviceName?: string;
}

const ConnectionStatus = ({ status, deviceName }: ConnectionStatusProps) => {
  const statusConfig = {
    connected: {
      icon: BluetoothConnected,
      label: deviceName || "Connected",
      color: "text-success",
      bgColor: "bg-success/10",
      borderColor: "border-success/30",
      glow: "glow-success",
    },
    connecting: {
      icon: Bluetooth,
      label: "Connecting...",
      color: "text-warning",
      bgColor: "bg-warning/10",
      borderColor: "border-warning/30",
      glow: "",
    },
    disconnected: {
      icon: WifiOff,
      label: "Disconnected",
      color: "text-destructive",
      bgColor: "bg-destructive/10",
      borderColor: "border-destructive/30",
      glow: "",
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div
      className={`
        flex items-center gap-2 px-3 py-1.5 rounded-full
        border ${config.borderColor} ${config.bgColor}
        ${config.glow}
      `}
    >
      <Icon
        size={14}
        className={`${config.color} ${status === "connecting" ? "animate-status-blink" : ""}`}
      />
      <span className={`text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    </div>
  );
};

export default ConnectionStatus;
