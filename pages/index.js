import config from "@config/config.json";
import Base from "@layouts/Baseof";
import Cta from "@layouts/components/Cta";
import { markdownify } from "@lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import { getListPage } from "../lib/contentParser";

const Home = ({ frontmatter }) => {
  const {
    banner,
    belief,
    feature,
    agreement,
    call_to_action,
    meta_title,
    description,
    image,
  } = frontmatter;
  const { title } = config.site;

  return (
    <Base
      title={title}
      meta_title={meta_title}
      description={description}
      image={image}
    >
      {/* Banner */}
      <section className="section relative overflow-hidden pb-10 pt-8 text-white md:pt-10">
        {banner.background && (
          <>
            <Image
              src={banner.background}
              alt=""
              fill
              priority
              sizes="100vw"
              className="scale-105 object-cover opacity-40 blur-[2px]"
            />
            <div
              className="absolute inset-0 bg-black/55"
              aria-hidden="true"
            />
          </>
        )}
        <div className="container relative z-10 max-w-[1280px]">
          <div className="row text-center">
            <div className="col-12">
              <h1 className="font-bold text-white md:text-[3.4rem] md:leading-tight">
                {banner.title}
              </h1>
              {banner.content && (
                <p className="mt-4">{markdownify(banner.content)}</p>
              )}
              {banner.button.enable && (
                <Link
                  className="btn btn-primary mt-4"
                  href={banner.button.link}
                  rel={banner.button.rel}
                >
                  {banner.button.label}
                </Link>
              )}
              <Image
                className="mx-auto mt-8 h-auto w-full max-w-[420px] rounded-2xl"
                src={banner.image}
                width={384}
                height={452}
                alt="Portrait of James"
                priority
              />
              <p className="mx-auto mt-8 max-w-5xl text-xl leading-relaxed md:text-2xl">
                {belief.content}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section bg-black" id="services">
        <div className="container max-w-[1280px]">
          <div className="text-center">
            <h2 className="text-white" id="services-heading">
              {markdownify(feature.title)}
            </h2>
          </div>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {feature.features.map((item, i) => (
              <div
                className="feature-card flex items-center justify-center rounded-xl bg-white px-8 py-14 text-center"
                key={`feature-${i}`}
              >
                {item.icon && (
                  <Image
                    className="mx-auto"
                    src={item.icon}
                    width={30}
                    height={30}
                    alt=""
                  />
                )}
                <div className={`w-full ${item.icon ? "mt-4" : ""}`}>
                  {markdownify(item.name, "h3", "h4")}
                  {item.content && <p className="mt-3 text-lg">{item.content}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {agreement && (
        <section className="section bg-theme-light" id="agreement">
          <div className="container max-w-[1280px]">
            <div className="mx-auto max-w-3xl text-center">
              <h2 id="agreement-heading">{agreement.title}</h2>
              <p className="mt-4 text-lg leading-relaxed">{agreement.content}</p>
            </div>
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {agreement.points.map((point) => (
                <div
                  className="feature-card rounded-xl bg-white p-8 text-dark"
                  key={point.name}
                >
                  {markdownify(point.name, "h3", "h5")}
                  <p className="mt-4 leading-relaxed">{point.content}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link className="btn btn-primary" href="/pricing">
                How engagements work
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Cta */}
      <Cta cta={call_to_action} />
    </Base>
  );
};

export const getStaticProps = async () => {
  const homePage = await getListPage("content/_index.md");
  const { frontmatter } = homePage;
  return {
    props: {
      frontmatter,
    },
  };
};

export default Home;
