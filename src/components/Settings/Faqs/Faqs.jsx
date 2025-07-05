import React, { useState } from 'react';
import { FaChevronDown, FaQuestionCircle, FaLightbulb } from 'react-icons/fa';
import './Faqs.css';

const Faqs = () => {
  // State to track which FAQ is open (null means all are closed)
  const [openIndex, setOpenIndex] = useState(null);

  // Toggle function to open/close FAQ items
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // FAQ data
  const faqs = [
    {
      question: 'What is the referral program?',
      answer:
        'Our referral program allows you to earn rewards by inviting friends to join our platform. When someone signs up using your unique referral link and completes a qualifying action, you\'ll receive bonus coins that can be redeemed for various benefits. The more friends you refer, the more rewards you can earn!',
    },
    {
      question: 'How does it work?',
      answer:
        'The process is simple: 1) Share your unique referral link with friends via email, social media, or direct message. 2) Your friend signs up using your link. 3) When they complete their first qualifying action (like making a purchase or completing a profile), you\'ll automatically receive your reward in your account. You can track all your referrals and rewards in your dashboard.',
    },
    {
      question: 'Where could I use these coins?',
      answer:
        'The coins you earn can be used in multiple ways: redeem them for discounts on future purchases, exchange them for gift cards from popular retailers, donate them to charitable causes we partner with, or even use them to unlock premium features on our platform. The redemption options may vary over time, so check the rewards section regularly for updates.',
    },
    {
      question: 'Is there a limit to how many people I can refer?',
      answer:
        'There\'s no limit to the number of people you can refer! However, we do have systems in place to prevent abuse of the program. All referrals must be genuine, and we reserve the right to review and potentially disqualify referrals that appear fraudulent or violate our terms of service. As long as you\'re referring real people who are genuinely interested in our services, you can earn unlimited rewards.',
    },
    {
      question: 'How long does it take to receive my referral rewards?',
      answer:
        'Rewards are typically credited to your account immediately after your referred friend completes the qualifying action. However, in some cases it may take up to 48 hours for the system to process and verify the action. You\'ll receive a notification when your reward is available. If you believe you\'re missing a reward, please contact our support team with details of the referral.',
    },
  ];

  return (
    <div className="faqs">
      <div className="faqs__container">
        {/* Header */}
        <div className="faqs__header">
          <div className="faqs__header-content">
            <div className="faqs__header-text">
              <h1 className="faqs__title">Frequently Asked Questions</h1>
              <p className="faqs__subtitle">Find answers to common questions about our platform</p>
            </div>
          </div>
        </div>

        {/* FAQ List */}
        <div className="faqs__list">
          {faqs.map((faq, index) => (
            <div key={index} className="faqs__item">
              <button
                className={`faqs__question ${openIndex === index ? 'faqs__question--active' : ''}`}
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
                aria-controls={`answer${index}`}
              >
                <div className="faqs__question-content">
                  <div className="faqs__question-icon">
                    <FaLightbulb />
                  </div>
                  <span className="faqs__question-text">{faq.question}</span>
                </div>
                <div className="faqs__question-arrow">
                  <FaChevronDown
                    className={`faqs__arrow-icon ${openIndex === index ? 'faqs__arrow-icon--rotated' : ''}`}
                  />
                </div>
              </button>
              <div
                id={`answer${index}`}
                className={`faqs__answer ${openIndex === index ? 'faqs__answer--open' : ''}`}
              >
                <div className="faqs__answer-content">
                  <p className="faqs__answer-text">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Help Section */}
        <div className="faqs__help">
          <div className="faqs__help-content">
            <h3 className="faqs__help-title">Still have questions?</h3>
            <p className="faqs__help-text">
              Can't find the answer you're looking for? Please chat with our friendly team.
            </p>
            <button className="faqs__help-btn">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faqs;