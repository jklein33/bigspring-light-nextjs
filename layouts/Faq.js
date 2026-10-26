import { markdownify } from "@lib/utils/textConverter";

function Faq({ data }) {
  const { frontmatter } = data;
  const { title, description, faqs } = frontmatter;
  return (
    <section className="section text-white">
      <div className="container">
        {markdownify(title, "h1", "text-center font-normal text-white")}
        {description && (
          <p className="mx-auto mt-4 max-w-3xl text-center text-lg leading-relaxed">
            {description}
          </p>
        )}
        <div className="section row -mt-6">
          {faqs.map((faq, index) => (
            <div key={index} className="col-12 mt-6 md:col-6">
              <div className="feature-card h-full rounded-xl bg-white p-12 text-dark shadow">
                <div className="faq-head relative">
                  {markdownify(faq.title, "h2", "h4")}
                </div>
                {markdownify(faq.answer, "p", "faq-body mt-4")}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Faq;
