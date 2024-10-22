"use client";

import { CircleCheck, CircleX, Info as InfoIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

export const Error = () => (
  <CircleX className="bg-red-500 rounded-full text-white w-5 h-5" />
);

export const Success = () => (
  <CircleCheck className="bg-green-500 rounded-full text-white w-5 h-5" />
);

export const Info = () => (
  <InfoIcon className="bg-yellow-500 rounded-full text-white w-5 h-5" />
);

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
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
