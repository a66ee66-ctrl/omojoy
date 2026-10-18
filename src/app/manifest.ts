import type { MetadataRoute } from "next"

import { site } from "@/config/site"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.name,
    description: "Makeup artistry, hair styling and photography in Beaverton, Oregon.",
    start_url: "/",
    display: "browser",
    background_color: "#f8f3ec",
    theme_color: "#2b211c",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  }
}
