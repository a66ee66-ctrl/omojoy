import { cacheLife } from "next/cache";

export type InstagramPost = {
  id: string;
  permalink: string;
  imageUrl: string;
  caption: string;
};

type ApiMedia = {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
};

/**
 * Recent posts via the official Instagram API (Instagram API with Instagram Login).
 * Requires INSTAGRAM_ACCESS_TOKEN — a long-lived token for the @joyfulartistry
 * professional account. Returns [] when not configured or when the API fails,
 * so the page always falls back to curated imagery. Failures are cached only
 * briefly so the live feed recovers quickly.
 */
export async function getInstagramPosts(limit = 6): Promise<InstagramPost[]> {
  "use cache";

  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) {
    cacheLife("hours");
    return [];
  }

  const url = new URL("https://graph.instagram.com/me/media");
  url.searchParams.set(
    "fields",
    "id,caption,media_type,media_url,thumbnail_url,permalink",
  );
  url.searchParams.set("limit", String(limit * 2));
  url.searchParams.set("access_token", token);

  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) throw new Error(`Instagram API responded with ${res.status}`);
    const { data } = (await res.json()) as { data: ApiMedia[] };

    cacheLife("hours");
    return data
      .map((m) => ({
        id: m.id,
        permalink: m.permalink,
        imageUrl:
          (m.media_type === "VIDEO" ? m.thumbnail_url : m.media_url) ?? "",
        caption: m.caption?.split("\n")[0].slice(0, 140) ?? "",
      }))
      .filter((p) => p.imageUrl)
      .slice(0, limit);
  } catch (error) {
    console.error(
      "[instagram] Live feed unavailable, using curated gallery:",
      error,
    );
    cacheLife("minutes");
    return [];
  }
}
