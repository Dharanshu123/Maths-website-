import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout'

export default function Services() {
  return (
    <>
      <Head>
        <title>SERVICES - Mathsmastery Institute</title>
        <meta name="description" content="Expert maths tutoring services including 1-on-1 private tutoring, homework support, confidence coaching, and online learning programs." />
      </Head>
      <Layout>
        {/* Hero Section */}
        <section className="services-hero">
          <div className="services-hero__container">
            <h1 className="services-hero__title">Empowering Students with Expert Maths Tutoring</h1>
            <p className="services-hero__subtitle">
              Personalised 1-on-1 and small-group sessions that build confidence, clarity, and real results.
            </p>
            <div className="services-hero__cta">
              <Link href="/pricing" className="services-hero__button primary">
                Book Your Free Trial Session
              </Link>
              <Link href="/pricing" className="services-hero__link secondary">
                View Pricing
              </Link>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="services-grid-section">
          <div className="services-grid__container">
            <div className="services-grid">
              <div className="service-card">
                <div className="service-card__icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <h3 className="service-card__title">1-on-1 Private Tutoring</h3>
                <p className="service-card__description">
                  Individualised lessons tailored to each student's goals, strengths, and gaps—ideal for targeted progress.
                </p>
              </div>

              <div className="service-card">
                <div className="service-card__icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14,2 14,8 20,8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10,9 9,9 8,9"/>
                  </svg>
                </div>
                <h3 className="service-card__title">Homework & Exam Support</h3>
                <p className="service-card__description">
                  Step-by-step guidance for assignments, quizzes, and major exams with proven problem-solving strategies.
                </p>
              </div>

              <div className="service-card">
                <div className="service-card__icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                  </svg>
                </div>
                <h3 className="service-card__title">Maths Confidence Coaching</h3>
                <p className="service-card__description">
                  Reduce anxiety and build self-belief with structured practice, feedback, and mindset coaching.
                </p>
              </div>

              <div className="service-card">
                <div className="service-card__icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                    <line x1="8" y1="21" x2="16" y2="21"/>
                    <line x1="12" y1="17" x2="12" y2="21"/>
                  </svg>
                </div>
                <h3 className="service-card__title">Online Learning Program</h3>
                <p className="service-card__description">
                  Interactive lessons delivered online with notes, practice sets, and progress tracking.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Families Choose Us */}
        <section className="differentiators-section">
          <div className="differentiators__container">
            <h2 className="section__title">Why Families Choose Us</h2>
            <div className="differentiators__grid">
              <div className="differentiator__item">
                <div className="differentiator__icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <span className="differentiator__text">Qualified, experienced maths tutors</span>
              </div>

              <div className="differentiator__item">
                <div className="differentiator__icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 11H5a2 2 0 0 0-2 2v3c0 1.1.9 2 2 2h4l3 3V8l-3 3z"/>
                    <path d="M22 9L12 19l-3-3"/>
                  </svg>
                </div>
                <span className="differentiator__text">Personalised learning plan for every student</span>
              </div>

              <div className="differentiator__item">
                <div className="differentiator__icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 12l2 2 4-4"/>
                    <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
                    <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
                    <path d="M13 12h1"/>
                  </svg>
                </div>
                <span className="differentiator__text">Visible improvement in grades and confidence</span>
              </div>

              <div className="differentiator__item">
                <div className="differentiator__icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12,6 12,12 16,14"/>
                  </svg>
                </div>
                <span className="differentiator__text">Flexible scheduling (after-school & weekends)</span>
              </div>

              <div className="differentiator__item">
                <div className="differentiator__icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="1" x2="12" y2="23"/>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  </svg>
                </div>
                <span className="differentiator__text">Transparent, affordable pricing</span>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="process-framework-section">
          <div className="process-framework__container">
            <h2 className="section__title">How We Help Students Succeed</h2>
            <div className="process-steps">
              <div className="process-step">
                <div className="process-step__number">1</div>
                <h3 className="process-step__title">Assess</h3>
                <p className="process-step__description">Diagnostic check to find strengths and gaps.</p>
              </div>

              <div className="process-step">
                <div className="process-step__number">2</div>
                <h3 className="process-step__title">Teach</h3>
                <p className="process-step__description">Clear, concept-first explanations.</p>
              </div>

              <div className="process-step">
                <div className="process-step__number">3</div>
                <h3 className="process-step__title">Practice</h3>
                <p className="process-step__description">Targeted exercises with feedback.</p>
              </div>

              <div className="process-step">
                <div className="process-step__number">4</div>
                <h3 className="process-step__title">Review</h3>
                <p className="process-step__description">Address blockers and refine techniques.</p>
              </div>

              <div className="process-step">
                <div className="process-step__number">5</div>
                <h3 className="process-step__title">Master</h3>
                <p className="process-step__description">Confident, independent problem-solving.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Add-Ons Section */}
        <section className="addons-section">
          <div className="addons__container">
            <h2 className="section__title">Add-Ons</h2>
            <div className="addons__grid">
              <div className="addon-card">
                <h3 className="addon-card__title">Progress Reports</h3>
                <p className="addon-card__description">Monthly summary for parents.</p>
              </div>

              <div className="addon-card">
                <h3 className="addon-card__title">Mock Exams</h3>
                <p className="addon-card__description">Timed practice with scoring.</p>
              </div>

              <div className="addon-card">
                <h3 className="addon-card__title">Extension Work</h3>
                <p className="addon-card__description">Challenge tasks for advanced learners.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="services-final-cta">
          <div className="services-final-cta__container">
            <h2 className="services-final-cta__title">Ready to Start?</h2>
            <p className="services-final-cta__subtitle">
              Join students who are building confidence and mastery in maths.
            </p>
            <Link href="/pricing" className="services-final-cta__button">
              Get Started Today
            </Link>
          </div>
        </section>
      </Layout>
    </>
  )
}