"use client";

import { useServerInsertedHTML } from "next/navigation";
import React from "react";
import createCache, { Options as EmotionOptions } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

type Props = {
  children: React.ReactNode;
  options?: EmotionOptions;
};

export default function EmotionCacheProvider({ children, options }: Props) {
  const [cache] = React.useState(() => {
    const c = createCache({ key: "mui", prepend: true, ...options });
    // Enable compatibility mode to better work with SSR in React 18/19
    (c as any).compat = true;
    return c;
  });

  useServerInsertedHTML(() => (
    <style
      data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(" ")}`}
       
      dangerouslySetInnerHTML={{
        __html: Object.values(cache.inserted).join(" "),
      }}
    />
  ));

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}


