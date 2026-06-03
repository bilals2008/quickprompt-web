// File: src/components/ui/link.jsx
import { cn } from "@/lib/utils";

function Link({ className, children, ...props }) {
  return (
    <a
      className={cn(
        "transition-colors duration-200",
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
}

export { Link };
