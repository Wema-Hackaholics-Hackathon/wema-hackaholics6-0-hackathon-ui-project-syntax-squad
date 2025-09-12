"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import MuiButton, { type ButtonProps as MuiButtonProps } from "@mui/material/Button";

import { cn } from "./utils";

type OurVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
type OurSize = "default" | "sm" | "lg" | "icon";

export function buttonVariants(opts?: { variant?: OurVariant; size?: OurSize; className?: string }) {
  const variant = opts?.variant ?? "default";
  const size = opts?.size ?? "default";
  return `mui-button-${variant} mui-button-size-${size}`;
}

type ButtonProps = Omit<MuiButtonProps, "variant" | "size"> & {
  variant?: OurVariant;
  size?: OurSize;
  asChild?: boolean;
  className?: string;
};

function mapVariantToMui(variant: OurVariant) {
  switch (variant) {
    case "destructive":
      return { variant: "contained" as const, color: "error" as const };
    case "outline":
      return { variant: "outlined" as const, color: "primary" as const };
    case "secondary":
      return { variant: "contained" as const, color: "secondary" as const };
    case "ghost":
      return { variant: "text" as const, color: "inherit" as const };
    case "link":
      return { variant: "text" as const, color: "primary" as const };
    default:
      return { variant: "contained" as const, color: "primary" as const };
  }
}

function mapSizeToMui(size: OurSize) {
  switch (size) {
    case "sm":
      return "small" as const;
    case "lg":
      return "large" as const;
    case "icon":
      return "medium" as const;
    default:
      return "medium" as const;
  }
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, children, ...props }, ref) => {
    if (asChild) {
      const Comp = Slot as any;
      return (
        <Comp data-slot="button" className={cn(className)} ref={ref as unknown as React.Ref<HTMLButtonElement>} {...(props as Record<string, unknown>)}>
          {children}
        </Comp>
      );
    }

    const mui = mapVariantToMui(variant);
    const muiSize = mapSizeToMui(size);

    return (
      <MuiButton
        data-slot="button"
        variant={mui.variant}
        color={mui.color}
        size={muiSize}
        className={cn(className)}
        ref={ref}
        {...(props as MuiButtonProps)}
      >
        {children}
      </MuiButton>
    );
  }
);

Button.displayName = "Button";

export { Button };
