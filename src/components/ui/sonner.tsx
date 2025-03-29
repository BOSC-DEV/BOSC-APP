
import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          success: 
            "group-[.toaster]:bg-green-600 group-[.toaster]:text-white",
          error: 
            "group-[.toaster]:bg-destructive group-[.toaster]:text-destructive-foreground",
        },
        // Fixed TypeScript error by using proper type assertion for custom CSS variables
        style: {
          "--toast-success-bg": "#ea384c",
          "--toast-success-fg": "white",
        } as React.CSSProperties,
      }}
      {...props}
    />
  );
};

export { Toaster };
