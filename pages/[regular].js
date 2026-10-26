import config from "@config/config.json";
import NotFound from "@layouts/404";
import Base from "@layouts/Baseof";
import Bio from "@layouts/Bio";
import Contact from "@layouts/Contact";
import Default from "@layouts/Default";
import Faq from "@layouts/Faq";
import Pricing from "@layouts/Pricing";
import { getRegularPage, getSinglePage } from "@lib/contentParser";
import { absoluteUrl } from "@lib/seo";
import { plainify } from "@lib/utils/textConverter";

// for all regular pages
const RegularPages = ({ data }) => {
  const {
    title,
    meta_title,
    description,
    image,
    noindex,
    canonical,
    layout,
    faqs,
    name,
    role,
    photo,
  } = data.frontmatter;
  const { content } = data;
  const siteUrl = config.site.site_url;
  const faqEntities =
    layout === "faq" && faqs
      ? faqs.map((faq) => ({
          "@type": "Question",
          name: faq.title,
          acceptedAnswer: {
            "@type": "Answer",
            text: plainify(faq.answer),
          },
        }))
      : undefined;
  const extraSchema =
    layout === "bio" && name
      ? [
          {
            "@type": "Person",
            name,
            jobTitle: role,
            image: absoluteUrl(siteUrl, photo),
            url: absoluteUrl(siteUrl, "/bio"),
            worksFor: { "@id": `${siteUrl.replace(/\/$/, "")}/#organization` },
          },
        ]
      : undefined;

  return (
    <Base
      title={title}
      description={description ? description : content.slice(0, 120)}
      meta_title={meta_title}
      image={image}
      noindex={noindex}
      canonical={canonical}
      pageType={
        layout === "faq" ? "FAQPage" : layout === "contact" ? "ContactPage" : undefined
      }
      mainEntity={faqEntities}
      extraSchema={extraSchema}
    >
      {layout === "404" ? (
        <NotFound data={data} />
      ) : layout === "bio" ? (
        <Bio data={data} />
      ) : layout === "contact" ? (
        <Contact data={data} />
      ) : layout === "pricing" ? (
        <Pricing data={data} />
      ) : layout === "faq" ? (
        <Faq data={data} />
      ) : (
        <Default data={data} />
      )}
    </Base>
  );
};
export default RegularPages;

// for regular page routes
export const getStaticPaths = async () => {
  const allslugs = getSinglePage("content");
  const slugs = allslugs.map((item) => item.slug);
  const paths = slugs.map((slug) => ({
    params: {
      regular: slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

// for regular page data
export const getStaticProps = async ({ params }) => {
  const { regular } = params;
  const regularPage = await getRegularPage(regular);

  return {
    props: {
      slug: regular,
      data: regularPage,
    },
  };
};
