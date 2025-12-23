import { Badge } from "./ui/badge";

const ColorBadge: React.FC<{ color: string; label?: string }> = ({
    color,
    label,
}) => {
    color = color === "default" ? "gray" : color;
    return (
        <Badge
            style={{
                borderColor: `color-mix(in srgb, ${color} 70%, black)`,
                color: `color-mix(in srgb, ${color} 70%, black)`,
                backgroundColor: `color-mix(in srgb, ${color} 10%, white)`,
            }}
        >
            {label || "N/A"}
        </Badge>
    );
};

export default ColorBadge;
