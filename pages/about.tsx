import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout'
import BackgroundVideo from '../components/BackgroundVideo'

export default function About() {
  return (
    <>
      <Head>
        <title>ABOUT</title>
      </Head>
      <Layout className="about-page">
        {/* Single background video for entire page */}
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -2 }}>
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center center'
            }}
          >
            <source src="/videos/5734765-hd_1920_1080_30fps.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <section className="page__main main main_about main_pages">
          <div className="main__container main__container_pages">
            <h1 className="main__title">About</h1>
            <div className="main__text main__text_pages">
              Discover our passion for transforming mathematical learning.
            </div>
          </div>
        </section>
        
        <section className="page__about about">
          <div className="about__container">
            <div className="about__content">
              <h2 className="about__title title">Where Passion for Learning Meets Precision in Teaching</h2>
              <div className="about__text">
                <p>
                  At Mathsmastery Institute, we believe that true understanding comes from curiosity, not memorization. Our mission is to inspire students to see mathematics as a language of logic, creativity, and discovery. Guided by a team of passionate educators and innovators, we blend modern technology with proven teaching methods to deliver personalised learning experiences that bring out every student's potential.
                </p>
                <p>
                  From foundational concepts to advanced problem-solving, we approach each lesson with precision, patience, and purpose. Our commitment lies in nurturing confidence, critical thinking, and a lifelong love for learning — empowering every learner to achieve excellence, one equation at a time.
                </p>
              </div>
              <Link href="/pricing" className="about__button button">Get Started Today</Link>
            </div>
          </div>
        </section>
        
        <section className="page__outro outro outro_about">
          <div className="outro__container">
            <h2 className="outro__title title">Ready to Excel in Mathematics?</h2>
            <div className="outro__text">
              Join thousands of students who have transformed their mathematical understanding with our expert guidance and personalized approach.
            </div>
            <Link href="/contact" className="outro__button button">Contact Us</Link>
          </div>
        </section>
      </Layout>
    </>
  )
}
