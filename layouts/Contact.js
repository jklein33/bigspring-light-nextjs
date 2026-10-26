import config from "@config/config.json";
import { markdownify } from "@lib/utils/textConverter";
import { useForm, ValidationError } from "@formspree/react";
import { useEffect, useState } from "react";

const Contact = ({ data }) => {
  const { frontmatter } = data;
  const { title, info } = frontmatter;
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [state, handleSubmit] = useForm("xjvqdlpz");

  useEffect(() => {
    if (state.succeeded) {
      // Set form as submitted
      setFormSubmitted(true);
      // Timer to reset the form submission state
      const timer = setTimeout(() => {
        setFormSubmitted(false);
      }, 5000); // 5 seconds
      return () => clearTimeout(timer);
    }
  }, [state.succeeded]);

  if (formSubmitted) {
    return (
      <div className="mt-4 rounded border border-gray-300 bg-gray-100 p-4 text-center">
        Thanks for your submission!
      </div>
    );
  }
  return (
    <section className="section text-white">
      <div className="container">
        {markdownify(title, "h1", "text-center text-white")}
        <div className="section row pb-0">
          <div className="col-12 md:col-6 lg:col-7">
            <form
              onSubmit={handleSubmit}
              action="https://formspree.io/f/xjvqdlpz"
              className={`contact-form ${
                formSubmitted ? "invisible opacity-0" : "opacity-100"
              }`}
              method="POST"
            >
              <div className="mb-3">
                <input
                  className="form-input w-full rounded"
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Name"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  className="form-input w-full rounded"
                  name="email"
                  id="email"
                  type="email"
                  placeholder="Your email"
                  required
                />
              </div>
              <div className="mb-3">
                <textarea
                  id="message"
                  name="message"
                  className="form-textarea w-full rounded-md"
                  rows="7"
                  placeholder="Your message"
                />
              </div>
              <ValidationError
                prefix="Message"
                field="message"
                errors={state.errors}
              />
              <button
                type="submit"
                className="btn btn-primary"
                disabled={state.submitting}
              >
                Send Now
              </button>
            </form>
          </div>
          <div className="content col-12 text-white md:col-6 lg:col-5">
            {markdownify(info.title, "h2", "h4 text-white")}
            {markdownify(info.description, "p", "mt-4", "text-white")}
            <ul className="contact-list mt-5">
              {info.contacts.map((contact, index) => (
                <li key={index}>
                  {markdownify(contact, "strong", "text-white")}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
