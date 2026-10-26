const trimSlash = (value) => String(value || "").replace(/\/$/, "");

export const absoluteUrl = (siteUrl, pathOrUrl = "/") => {
  if (!pathOrUrl) return trimSlash(siteUrl);
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;

  const base = trimSlash(siteUrl);
  const [withoutHash] = String(pathOrUrl).split("#");
  const [path] = withoutHash.split("?");
  if (!path || path === "/") return `${base}/`;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
};

export const buildSchema = ({
  siteUrl,
  siteName,
  description,
  email,
  services = [],
  pageUrl,
  pageName,
  pageDescription,
  pageType = "WebPage",
  mainEntity,
  extra = [],
}) => {
  const organizationId = `${trimSlash(siteUrl)}/#organization`;
  const websiteId = `${trimSlash(siteUrl)}/#website`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": organizationId,
        name: siteName,
        url: trimSlash(siteUrl),
        email,
        description,
        audience: {
          "@type": "BusinessAudience",
          audienceType: "Small and mid-sized businesses",
        },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email,
          url: absoluteUrl(siteUrl, "/contact"),
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Custom software for small businesses",
          itemListElement: services.map((name) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name,
              provider: { "@id": organizationId },
            },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: trimSlash(siteUrl),
        name: siteName,
        description,
        publisher: { "@id": organizationId },
      },
      {
        "@type": pageType,
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: pageName,
        description: pageDescription,
        isPartOf: { "@id": websiteId },
        about: { "@id": organizationId },
        ...(mainEntity ? { mainEntity } : {}),
      },
      ...extra,
    ],
  };
};
