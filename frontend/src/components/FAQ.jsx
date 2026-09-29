import { useState } from "react";
import "./FAQ.css";

const faqs = [
  {
    question: "What is Voxa and how does it work?",
    answer:
      "Voxa is your personal AI audio workspace. Record or upload audio and Voxa can transcribe it, summarize it, translate it, and keep everything organized in one place.",
    icon: "▤",
  },
  {
    question: "Can I talk to Voxa in real time?",
    answer:
      "Yes. You can have a natural conversation with Voxa while your conversation is transcribed in real time.",
    icon: "♩",
  },
  {
    question: "Can I upload an existing recording?",
    answer:
      "Yes. Upload your existing MP3, WAV, M4A, or FLAC recordings and Voxa will process them for you.",
    icon: "↑",
  },
  {
    question: "What languages does Voxa support?",
    answer:
      "Voxa can detect the spoken language and translate your recordings into supported languages.",
    icon: "文",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <section className="faq-section">

      {/* Heading */}
      <div className="faq-heading">
        <span className="faq-label">✦ FAQ</span>

        <h2>
          Questions,
          <span> answered.</span>
        </h2>

        <p>
          Everything you need to know about Voxa, in one place.
        </p>
      </div>

      {/* Questions */}
      <div className="faq-list">

        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${
              openIndex === index ? "faq-open" : ""
            }`}
          >

            {/* Question */}
            <button
              className="faq-question"
              onClick={() => toggleFAQ(index)}
            >

              <div className="faq-question-left">

                <div className={`faq-icon faq-icon-${index}`}>
                  {faq.icon}
                </div>

                <span>{faq.question}</span>

              </div>

              <span className="faq-plus">
                {openIndex === index ? "−" : "+"}
              </span>

            </button>

            {/* Answer */}
            <div className="faq-answer">
              <p>{faq.answer}</p>
            </div>

          </div>
        ))}

      </div>

    </section>
  );
}
