"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import Chip from "@mui/material/Chip";

import { cn } from "./utils";

type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

function Badge({
  className,
  variant = "default",
  asChild = false,
  children,
  ...props
}: React.ComponentProps<"span"> & { variant?: BadgeVariant; asChild?: boolean; children?: React.ReactNode }) {
  const Comp = asChild ? Slot : "span";

  if (asChild) {
    return (
      <Comp data-slot="badge" className={cn(className)} {...(props as Record<string, unknown>)}>
        {children}
      </Comp>
    );
  }

  const color: "default" | "secondary" | "error" =
    variant === "destructive"
      ? "error"
      : variant === "secondary"
      ? "secondary"
      : "default";
  const variantStyle: "filled" | "outlined" = variant === "outline" ? "outlined" : "filled";

  return (
    <Chip
      data-slot="badge"
      label={children as React.ReactNode}
      size="small"
      color={color}
      variant={variantStyle}
      className={cn(className)}
      {...(props as Record<string, unknown>)}
    />
  );
}

export { Badge };
