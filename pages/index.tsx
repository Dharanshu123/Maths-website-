import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import Layout from '../components/Layout'

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const faqData = [
    {
      question: "When is the best time to start tutoring?",
      answer: "The best time to start tutoring is as soon as you notice your child struggling with concepts or when you want to get ahead. Early intervention helps build strong foundations and prevents learning gaps from widening."
    },
    {
      question: "Will my child have an assessment?",
      answer: "Yes, we conduct an initial assessment to understand your child's current level, learning style, and areas that need improvement. This helps us create a personalized learning plan."
    },
    {
      question: "Does my child need a tutor?",
      answer: "If your child is struggling with homework, has declining grades, lacks confidence in math, or wants to excel further, a tutor can provide the personalized attention and support they need."
    },
    {
      question: "Why choose Alchemy over other options?",
      answer: "Alchemy offers personalized one-on-one tutoring with qualified teachers, flexible scheduling, proven results, and a comprehensive approach that builds both skills and confidence."
    },
    {
      question: "Are there contracts or do I pay in advance?",
      answer: "No long-term contracts required. We offer flexible payment options and you only pay for the lessons you book. Your first lesson is covered by our 100% satisfaction guarantee."
    },
    {
      question: "How do you monitor progress?",
      answer: "We provide regular progress reports, weekly feedback from tutors, and detailed assessments every 10 lessons to track improvement and adjust learning plans as needed."
    },
    {
      question: "Will my tutor provide content and resources?",
      answer: "Yes, our tutors provide all necessary learning materials, practice worksheets, and resources tailored to your child's curriculum and learning needs."
    },
    {
      question: "How often will lessons happen?",
      answer: "We recommend 1-2 lessons per week for optimal results, but the frequency can be adjusted based on your child's needs and your family's schedule."
    },
    {
      question: "How long does each lesson go for?",
      answer: "Standard lessons are 1-1.5 hours long, but we can customize the duration based on your child's attention span and learning requirements."
    },
    {
      question: "Is the first lesson a free trial lesson?",
      answer: "Yes! Your first lesson is covered by our 100% satisfaction guarantee. If you're not completely satisfied, it's completely free with no obligations."
    }
  ]

  const testimonialData = [
    {
      name: "Jo Rees",
      timeAgo: "22 hours ago",
      rating: 5,
      text: "We were matched with a wonderful tutor that was stylistically matched very well. The responsiveness of the organisation was great and general start up process was easy. After just a few sessions our daughters knowledge and confidence has picked up tremendously",
      avatar: "/images/testimonials/jo-rees.jpg"
    },
    {
      name: "Leesa Keller", 
      timeAgo: "4 weeks ago",
      rating: 5,
      text: "Our tutor, Holly is excellent. My son was engaged from the first lesson. His tutoring sessions have given him the motivation to learn, study and prepare for his upcoming exams.",
      avatar: "/images/testimonials/leesa-keller.jpg"
    },
    {
      name: "Teena Jean",
      timeAgo: "4 weeks ago", 
      rating: 5,
      text: "My daughter has a good teacher who is consistent in teaching and provides helpful feedback for improvement.",
      avatar: "/images/testimonials/teena-jean.jpg"
    },
    {
      name: "Mo Atif",
      timeAgo: "4 weeks ago",
      rating: 5, 
      text: "Easy access and flexible scheduling, tutoring for HSC Students. Change rate is reasonable. No lock in contract, like Cluey Learning who commit you to get better rate.",
      avatar: "/images/testimonials/mo-atif.jpg"
    },
    {
      name: "Rajeev Anand",
      timeAgo: "a month ago",
      rating: 5,
      text: "One of the best tutors I have ever seen. They teach your kids at the right pace this has helped improve my child's knowledge tremendously.",
      avatar: "/images/testimonials/rajeev-anand.jpg"
    },
    {
      name: "Tamica Rowe",
      timeAgo: "a month ago", 
      rating: 5,
      text: "We have started with Alchemy Tuition for term 3 and have found it great. The process of booking to find a tutor is great with the questions asked about our daughter so she can be with a tutor who is great for her.",
      avatar: "/images/testimonials/tamica-rowe.jpg"
    },
    {
      name: "The Renovation Hub",
      timeAgo: "a month ago",
      rating: 5,
      text: "Can't speak highly enough, Alchemy has been so professional from the first session, going above and beyond. My daughter looks forward to every session and she has improved so rapidly since starting, highly recommend them",
      avatar: "/images/testimonials/renovation-hub.jpg"
    },
    {
      name: "Marlene reay", 
      timeAgo: "a month ago",
      rating: 5,
      text: "Highly recommend Alchemy Tuition. It's made a big difference in my daughter's approach to maths in general & our household appreciates her calm attitude during assessment periods ! Thanks Afraz -",
      avatar: "/images/testimonials/marlene-reay.jpg"
    }
  ]

  return (
    <>
      <Head>
        <title>HOME</title>
      </Head>
      <Layout>
        {/* Hero Section */}
        <section className="page__main main">
          <div className="main__container">
            <div className="urgency-banner" role="status" aria-live="polite">
              <svg className="urgency-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{opacity: 0.7}}>
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12,6 12,12 16,14"/>
              </svg>
              <span className="urgency-text">Limited Spots Available - Enroll Today!</span>
            </div>
            <h3 className="main__caption">Australia's Leading Personalised Maths Tutoring</h3>
            <h1 className="main__title">We help your child do better at school,<br />grow in confidence and gain a<br />life-long love of learning</h1>
            <div className="cta-buttons">
              <Link href="/pricing" className="main__button primary">Get Started Today</Link>
              <div className="urgency-cta">
                <span className="urgency-highlight" role="status" aria-live="polite">
                  <svg className="urgency-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{opacity: 0.7}}>
                    <path d="M8 2v4"/>
                    <path d="M16 2v4"/>
                    <rect width="18" height="18" x="3" y="4" rx="2"/>
                    <path d="M3 10h18"/>
                  </svg>
                  Early Bird Discount - Save 20%
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Step-by-Step Process Section */}
        <section className="process-section">
          <div className="process__container">
            {/* Step 1 */}
            <div className="process__step">
              <div className="step__number">
                <span>1</span>
              </div>
              <h3 className="step__title">You book</h3>
              <p className="step__description">
                Phone, email, live chat or online;<br />
                tell us about your child and how we can help.
              </p>
              <p className="step__note">
                No payment details are required upfront and your first lesson is covered by our 100% happiness guarantee.
              </p>
            </div>

            {/* Step 2 */}
            <div className="process__step">
              <div className="step__number">
                <span>2</span>
              </div>
              <h3 className="step__title">We match</h3>
              <p className="step__description">
                We work with our team to organise an online maths tutor that best matches your child's needs.
              </p>
              <p className="step__note">
                Once lined up we'll send you through their profile by email and they'll give you a call to introduce themselves.
              </p>
            </div>

            {/* Step 3 */}
            <div className="process__step">
              <div className="step__number">
                <span>3</span>
              </div>
              <h3 className="step__title">The magic happens</h3>
              <p className="step__description">
                Your child and their tutor will meet in our online classroom and get to know each other via video call.
              </p>
              <p className="step__note">
                We'll check in with you after to make sure it went well and you can schedule in your next lesson and submit payment information.
              </p>
              <div className="step__additional-info">
                <p>
                  From there, you don't need to do anything else. Your child and their Maths tutor will meet weekly at the same time online and payments are simply charged to your debit or credit card 24 hours after each lesson. We'll send you feedback after every lesson, receipts upon payment and a detailed progress report every 10 lessons.
                </p>
                <p>
                  For best results we recommend consistent weekly lessons of 1 to 1.5 hours – but we will leave this up to you to discuss with your tutor directly. Any changes to lesson timing or postponing of sessions can also be discussed with your tutor directly – our lessons are flexible and you are only ever charged for lessons that occur.
                </p>
                <p>
                  Every lesson is tailored around your child and will be curated by your Maths tutor to target their specific needs in line with the core curriculum.
                </p>
              </div>
              <div className="step__cta">
                <p><strong>Get started with an Alchemy online Maths tutor by booking your first session today!</strong></p>
                <Link href="/pricing" className="cta-button">BOOK YOUR FIRST SESSION NOW</Link>
              </div>
            </div>
          </div>
        </section>

        {/* About Section with Orange Background */}
        <section className="about-section-orange">
          <div className="about__container">
            <div className="about__content">
              <h2 className="about__title">Who We Are</h2>
              <div className="about__text">
                <p>
                  At Mathsmastery Institute, we are dedicated to transforming the way students understand and enjoy mathematics. Our mission is to make learning both engaging and effective by combining expert teaching methods with personalized support.
                </p>
                <p>
                  With a team of passionate educators, we focus on building strong mathematical foundations and nurturing problem-solving skills that last a lifetime. We believe that every student can achieve mastery when guided with patience, precision, and purpose.
                </p>
                <p>
                  Join us on a journey where passion for learning meets precision in teaching — helping students unlock their full potential and gain confidence in every lesson.
                </p>
              </div>
              <Link href="/pricing" className="cta-button">BOOK YOUR FIRST SESSION NOW</Link>
              <p className="contact-info">
                Or call us on <strong>0426 913 932</strong> to speak with one of our education experts! We are open now and ready to help!
              </p>
            </div>
            <div className="about__image">
              <Image 
                src="/images/About/classroom-teacher.png" 
                alt="Teacher with students in classroom - Mathematics tutoring" 
                width={600}
                height={400}
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="services-info-section">
          <div className="services__container">
            <div className="section-urgency">
              <span className="urgency-badge" role="status" aria-live="polite">
                <svg className="urgency-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{opacity: 0.7}}>
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12,6 12,12 16,14"/>
                </svg>
                Only 3 Tutors Available This Week
              </span>
            </div>
            <h2 className="section__title">Services Heading</h2>
            <div className="services__content">
              <p className="services__intro">
                Empowering every student to master mathematics through personalized teaching and structured learning paths.
              </p>
              <div className="services__detailed-list">
                <div className="service__item">
                  <div className="service__number">1</div>
                  <div className="service__details">
                    <h3 className="service__title">One-on-One Tutoring</h3>
                    <p className="service__description">
                      Focused, individual lessons tailored to each student's learning goals and pace. Our expert tutors help strengthen core concepts, boost confidence, and develop problem-solving skills.
                    </p>
                  </div>
                </div>
                
                <div className="service__item">
                  <div className="service__number">2</div>
                  <div className="service__details">
                    <h3 className="service__title">Online Group Sessions</h3>
                    <p className="service__description">
                      Interactive and collaborative sessions that encourage peer learning while covering key topics in the Australian mathematics curriculum. Students engage, compete, and grow together.
                    </p>
                  </div>
                </div>
                
                <div className="service__item">
                  <div className="service__number">3</div>
                  <div className="service__details">
                    <h3 className="service__title">Exam Preparation Programs</h3>
                    <p className="service__description">
                      Comprehensive revision courses for NAPLAN, HSC, and university entry exams. We focus on strategy, accuracy, and time management to help students perform their best under pressure.
                    </p>
                  </div>
                </div>
                
                <div className="service__item">
                  <div className="service__number">4</div>
                  <div className="service__details">
                    <h3 className="service__title">Homework Help & Support</h3>
                    <p className="service__description">
                      Dedicated support for school homework, assignments, and projects. Our tutors guide students through step-by-step problem-solving and concept reinforcement.
                    </p>
                  </div>
                </div>
                
                <div className="service__item">
                  <div className="service__number">5</div>
                  <div className="service__details">
                    <h3 className="service__title">Advanced Maths Mentoring</h3>
                    <p className="service__description">
                      For students aiming for excellence, we provide higher-level problem-solving sessions, competition training, and mentorship for math enrichment programs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="testimonials-grid-section">
          <div className="testimonials__container">
            <h2 className="section__title">We've helped thousands of students achieve better results in Maths</h2>
            <p className="section__subtitle">(These are all legitimate verified reviews from Google and Facebook.)</p>
            
            <div className="testimonials__grid">
              {testimonialData.map((testimonial, index) => (
                <div key={index} className="testimonial__card">
                  <div className="testimonial__header">
                    <div className="testimonial__avatar">
                      <div className="avatar__placeholder">
                        {testimonial.name.charAt(0)}
                      </div>
                    </div>
                    <div className="testimonial__info">
                      <h4 className="testimonial__name">{testimonial.name}</h4>
                      <p className="testimonial__time">{testimonial.timeAgo}</p>
                      <div className="testimonial__rating">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <span key={i} className="star">★</span>
                        ))}
                      </div>
                    </div>
                    <div className="google-icon">G</div>
                  </div>
                  <p className="testimonial__text">{testimonial.text}</p>
                </div>
              ))}
            </div>
            <div className="testimonials-urgency">
              <div className="urgency-stats">
                <span className="stats-number">500+</span>
                <span className="stats-text">Students Joined This Month</span>
              </div>
              <Link href="/pricing" className="urgency-cta-button">Join 500+ Students This Month</Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section">
          <div className="faq__container">
            <h2 className="section__title">Frequently Asked Questions:</h2>
            <div className="faq__grid">
              {faqData.map((faq, index) => (
                <div key={index} className="faq__item">
                  <button 
                    className={`faq__question ${openFaq === index ? 'active' : ''}`}
                    onClick={() => toggleFaq(index)}
                  >
                    {faq.question}
                    <span className="faq__icon">{openFaq === index ? '−' : '+'}</span>
                  </button>
                  {openFaq === index && (
                    <div className="faq__answer">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="final-cta-section">
          <div className="cta__container">
            <div className="final-urgency-banner">
              <span className="urgency-flash" role="status" aria-live="polite">
                <svg className="urgency-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{opacity: 0.7}}>
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12,6 12,12 16,14"/>
                </svg>
                Limited Time Offer
              </span>
            </div>
            <h2 className="cta__title">Talk To Us Heading</h2>
            <p className="cta__text">
              Text: In this section, you can compose a friendly and informative paragraph that encourages visitors to
              engage with your business.
            </p>
            <div className="final-cta-buttons">
              <Link href="/pricing" className="cta-button primary">BOOK YOUR FIRST SESSION NOW</Link>
              <div className="discount-highlight">
                <span className="discount-text">Early Bird Discount - Save 20%</span>
                <span className="discount-subtext">Limited spots available this week</span>
              </div>
            </div>
            <p className="contact-info">
              Or call us on <strong>0426 913 932</strong> to speak with one of our education experts! We are open now and ready to help!
            </p>
          </div>
        </section>

        {/* Floating Urgency Notification */}
        <div className="floating-urgency" role="status" aria-live="polite">
          <div className="floating-content">
            <svg className="floating-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{opacity: 0.7, color: 'rgba(255, 255, 255, 0.9)'}}>
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12,6 12,12 16,14"/>
            </svg>
            <div className="floating-text">
              <span className="floating-main">Limited Spots Available</span>
              <span className="floating-sub">Only 3 tutors left this week</span>
            </div>
            <Link href="/pricing" className="floating-btn">Enroll Now</Link>
          </div>
        </div>

        {/* Contact Section with Background */}
        <section className="contact-background-section">
          <div className="contact__overlay">
            <div className="contact__container">
              <h2 className="contact__title">Get in touch</h2>
              <p className="contact__subtitle">Let's create <span className="highlight">gold</span> together.</p>
              
              <div className="contact__info">
                <div className="contact__item">
                  <h3>Call us</h3>
                  <p className="contact__phone">0426 913 932</p>
                  <p className="contact__hours">
                    Office hours:<br />
                    Monday–Friday 9AM–9PM AEST | Saturday-Sunday 9AM-5PM AEST
                  </p>
                </div>
                
                <div className="contact__item">
                  <h3>Email Us</h3>
                  <p>info@alchemytuition.com.au</p>
                </div>
                
                <div className="contact__item">
                  <h3>Text Us</h3>
                  <p>0488 839 417</p>
                </div>
                
                <div className="contact__item">
                  <h3>We come to you</h3>
                  <p>All suburbs of Sydney, Melbourne, Brisbane, Canberra, Adelaide, Perth, the Gold Coast or online everywhere.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}
