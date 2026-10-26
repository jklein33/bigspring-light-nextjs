import config from "@config/config.json";
import { absoluteUrl, buildSchema } from "@lib/seo";
import { plainify } from "@lib/utils/textConverter";
import Footer from "@partials/Footer";
import Header from "@partials/Header";
import Head from "next/head";
import { useRouter } from "next/router";

const Base = ({
  title,
  meta_title,
  description,
  image,
  noindex,
  canonical,
  pageType,
  mainEntity,
  extraSchema,
  children,
}) => {
  const { meta_image, meta_author, meta_description } = config.metadata;
  const { site_url, title: siteTitle, email, services } = config.site;
  const router = useRouter();

  const pageName = plainify(
    meta_title ? meta_title : title ? title : siteTitle
  );
  const pageDescription = plainify(description ? description : meta_description);
  const pagePath = router.asPath.split("#")[0].split("?")[0];
  const pageUrl = canonical
    ? absoluteUrl(site_url, canonical)
    : absoluteUrl(site_url, pagePath);
  const imageUrl = absoluteUrl(site_url, image || meta_image);
  const schema = buildSchema({
    siteUrl: site_url,
    siteName: siteTitle,
    description: plainify(meta_description),
    email,
    services,
    pageUrl,
    pageName,
    pageDescription,
    pageType,
    mainEntity,
    extra: extraSchema || [],
  });

  return (
    <>
      <Head>
        <title>{pageName}</title>

        {!noindex && <link rel="canonical" href={pageUrl} />}

        <meta
          name="robots"
          content={noindex ? "noindex,nofollow" : "index,follow"}
        />
        <meta name="description" content={pageDescription} />
        <meta name="author" content={meta_author} />

        <meta property="og:title" content={pageName} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={siteTitle} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:url" content={pageUrl} />
        {imageUrl && <meta property="og:image" content={imageUrl} />}

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageName} />
        <meta name="twitter:description" content={pageDescription} />
        {imageUrl && <meta name="twitter:image" content={imageUrl} />}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Base;
