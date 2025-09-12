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
      <Comp data-slot="badge" className={cn(className)} {...(props as any)}>
        {children}
      </Comp>
    );
  }

  const color = variant === "destructive" ? "error" : variant === "secondary" ? "secondary" : "default";
  const variantStyle = variant === "outline" ? "outlined" : "filled";

  return (
    <Chip
      data-slot="badge"
      label={children as React.ReactNode}
      size="small"
      color={color as string}
      variant={variantStyle as any}
      className={cn(className)}
      {...(props as any)}
    />
  );
}

export { Badge };
