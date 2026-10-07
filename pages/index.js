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
  const { banner, belief, feature, call_to_action } = frontmatter;
  const { title } = config.site;

  return (
    <Base title={title}>
      {/* Banner */}
      <section className="section pb-10 pt-8 text-white md:pt-10">
        <div className="container max-w-[1280px]">
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
      <section className="section bg-black">
        <div className="container max-w-[1280px]">
          <div className="text-center">
            <h2 className="text-white">{markdownify(feature.title)}</h2>
          </div>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
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
