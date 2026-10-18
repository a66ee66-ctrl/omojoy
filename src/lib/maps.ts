import { site } from "@/config/site"

/** Full postal address, formatted for display and for Google queries. */
export const fullAddress = `${site.location.street}, ${site.location.city}, ${site.location.region} ${site.location.postalCode}`

const mapQuery = `${site.name}, ${fullAddress}`

/**
 * An embeddable Google Maps view of the studio. Uses the key-less
 * `output=embed` form (no Maps API key / billing required).
 */
export const mapEmbedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&z=15&output=embed`

/** Opens driving directions to the studio in Google Maps. */
export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapQuery)}`

/** The business's own Google Business Profile — reviews, directions, hours at a glance. */
export const googleBusinessUrl = site.googleMapsUrl ?? directionsUrl
