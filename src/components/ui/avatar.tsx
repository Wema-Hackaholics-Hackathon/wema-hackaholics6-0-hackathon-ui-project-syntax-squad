"use client";

import * as React from "react";
import AvatarMui from "@mui/material/Avatar";

interface AvatarProps {
  src?: string;
  alt?: string;
  className?: string;
  children?: React.ReactNode;
  [key: string]: unknown;
}

function Avatar({ src, alt, className, children, ...props }: AvatarProps) {
  return (
    <AvatarMui src={src} alt={alt} className={className} {...props}>
      {children}
    </AvatarMui>
  );
}

interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

function AvatarImage(props: AvatarImageProps) {
  return // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  <img {...props} />;
}

interface AvatarFallbackProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
}

function AvatarFallback({ children, ...props }: AvatarFallbackProps) {
  return <span {...props}>{children}</span>;
}

export { Avatar, AvatarImage, AvatarFallback };