import { TurbineStatus } from "@/types";
import { Badge, BadgeProps, Tooltip } from "@radix-ui/themes";

function getStatus(status: TurbineStatus): {
  color: BadgeProps["color"];
  text: string;
} {
  let color: BadgeProps["color"] = "blue";
  let text = "Unknown";
  switch (TurbineStatus[status]) {
    case TurbineStatus.Offline:
      color = "gray";
      text = "Offline";
      break;
    case TurbineStatus.Operational:
      color = "green";
      text = "Operational";
      break;
    case TurbineStatus.Pending:
      color = "amber";
      text = "Pending";
      break;
  }
  return {
    color,
    text,
  };
}

const Status = ({ status: statusProp }: { status: TurbineStatus }) => {
  const { color, text } = getStatus(statusProp);
  const badge = <Badge color={color}>{text}</Badge>;

  if (text === "Unknown") {
    return <Tooltip content={statusProp}>{badge}</Tooltip>;
  }
  return <>{badge}</>;
};

export default Status;
