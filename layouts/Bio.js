import { markdownify } from "@lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";

const Bio = ({ data }) => {
  const { frontmatter } = data;
  const { name, role, photo, intro, focus, belief, highlights } = frontmatter;

  return (
    <section className="section text-white">
      <div className="container">
        <div className="row items-center">
          <div className="col-12 md:col-5">
            <div className="mx-auto max-w-[420px] overflow-hidden rounded-2xl border-2 border-primary shadow-[0_12px_40px_rgba(10,168,167,0.18)]">
              <Image
                src={photo}
                alt={`${name} with his family on the beach`}
                width={556}
                height={833}
                className="h-auto w-full"
                priority
              />
            </div>
          </div>
          <div className="col-12 mt-8 md:col-7 md:mt-0">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
              About
            </p>
            <h1 className="mt-3 text-white">{name}</h1>
            <p className="mt-3 text-lg font-bold text-primary">{role}</p>
            <p className="mt-6 text-lg leading-relaxed text-white">{intro}</p>
            <p className="mt-4 text-lg leading-relaxed text-white">{focus}</p>
          </div>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {highlights.map((item) => (
            <div
              className="feature-card flex h-full flex-col rounded-xl bg-white p-8 text-dark"
              key={item.title}
            >
              {markdownify(item.title, "h3", "h5")}
              <p className="mt-4 leading-relaxed">{item.content}</p>
            </div>
          ))}
        </div>

        <blockquote className="mt-12 rounded-xl border border-primary/40 bg-gray-900 px-6 py-8 md:px-10">
          <p className="text-xl leading-relaxed text-white">{belief}</p>
        </blockquote>

        <div className="mt-12 text-center">
          <Link className="btn btn-primary" href="/contact">
            Work with James
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Bio;
