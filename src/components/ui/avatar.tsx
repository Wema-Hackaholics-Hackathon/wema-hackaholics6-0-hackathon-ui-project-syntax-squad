"use client";

import * as React from "react";
import AvatarMui from "@mui/material/Avatar";

interface AvatarProps {
  src?: string;
  alt?: string;
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
}

function Avatar({ src, alt, className, children, ...props }: AvatarProps) {
  return (
    <AvatarMui src={src} alt={alt} className={className} {...props}>
      {children}
    </AvatarMui>
  );
}

export { Avatar };