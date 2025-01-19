import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import Link from "next/link";

interface TooltipIconProps {
    href?: string; // For external links
    link?: string; // For internal links
    icon: React.ElementType;
    tooltip: string;
    iColor?: string; // Optional color for the icon
}

const TooltipIcon: React.FC<TooltipIconProps> = ({
    href,
    link,
    icon: Icon,
    tooltip,
    iColor = "text-blue-600", // Default color if not provided
}) => {
    const iconStyle = `hover:scale-200 ${iColor}`;
    console.log(iconStyle, "iconStyle");
    const content = (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <Icon
                        size={33}
                        className={iconStyle}
                    />
                </TooltipTrigger>
                <TooltipContent>
                    <p>{tooltip}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );

    if (href) {
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={tooltip}
            >
                {content}
            </a>
        );
    }

    if (link) {
        return <Link href={link}>{content}</Link>;
    }

    return null;
};

export default TooltipIcon;
