import Link from "next/link";
import Cta from "./components/Cta";

function Pricing({ data }) {
  const {
    frontmatter: { title, intro, plans, call_to_action },
  } = data;
  return (
    <>
      <section className="section pb-0 text-white">
        <div className="container">
          <h1 className="text-center font-normal text-white">{title}</h1>
          {intro && (
            <p className="mx-auto mt-4 max-w-3xl text-center text-lg leading-relaxed">
              {intro}
            </p>
          )}
          <div className="section row -mt-10 justify-center md:mt-0">
            {plans.map((plan, index) => (
              <div
                className={`col-12 md:col-4 ${
                  !plan.recommended ? "lg:px-0" : "col-recommended"
                }`}
                key={plan.title + index}
              >
                <div className="card text-center text-dark">
                  <h2 className="h4">{plan.title}</h2>
                  {plan.price ? (
                    <div className="mt-5">
                      <span className="text-5xl text-dark">${plan.price}</span>
                      <span>/ {plan.type}</span>
                    </div>
                  ) : null}
                  <h3 className="mt-2 h5 font-normal text-text">
                    {plan.subtitle}
                  </h3>
                  {plan.summary && (
                    <p className="mt-4 leading-relaxed">{plan.summary}</p>
                  )}
                  <ul className="mt-5">
                    {plan.features.map((feature, index) => (
                      <li className="mb-[10px] leading-5" key={index}>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    className={`btn mt-5 ${
                      plan.recommended ? "btn-primary" : "btn-outline-primary"
                    }`}
                    href={plan.button.link}
                    rel={plan.button.rel}
                  >
                    {plan.button.label}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Cta cta={call_to_action} />
    </>
  );
}

export default Pricing;
