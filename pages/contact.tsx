import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Layout from '../components/Layout'
import ContactForm from '../components/ContactForm'
import ContactTest from '../components/ContactTest'
import EmailJSTest from '../components/EmailJSTest' // EmailJS testing

export default function Contact() {
  return (
    <>
      <Head>
        <title>CONTACT</title>
      </Head>
      <Layout>
        <section className="page__main main main_contact main_pages">
          <div className="main__container main__container_pages">
            <h1 className="main__title">Contact</h1>
            <div className="main__text main__text_pages">
              We're here to help—reach out to book a trial, ask a question, or plan a study path.
            </div>
          </div>
        </section>
        <section className="page__contact contact">
          <div className="contact__container">
            <div className="contact__contacts">
              <h2 className="contact__title">You can find us at</h2>
              <div className="contact__connect connect-contact">
                <Link href="tel:+61426913932" className="connect-contact__item hover:underline">
                  <div className="connect-contact__icon">
                    <Image src="/img/contact/phone.svg" alt="ico" width={24} height={24} />
                  </div>
                  <div className="connect-contact__content">
                    <h3 className="connect-contant__type">Phone</h3>
                    <div className="connect-contact__label">0426 913 932</div>
                  </div>
                </Link>
                <Link href="mailto:mathstutoring412@gmail.com" className="connect-contact__item hover:underline">
                  <div className="connect-contact__icon">
                    <Image src="/img/contact/email.svg" alt="ico" width={24} height={24} />
                  </div>
                  <div className="connect-contact__content">
                    <h3 className="connect-contant__type">Email</h3>
                    <div className="connect-contact__label">mathstutoring412@gmail.com</div>
                  </div>
                </Link>
                <Link 
                  href="https://www.google.com/maps/search/?api=1&query=Bellamy+Street,+Pennant+Hills,+NSW+2120,+Sydney"
                  className="connect-contact__item hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="connect-contact__icon">
                    <Image src="/img/contact/address.svg" alt="ico" width={24} height={24} />
                  </div>
                  <div className="connect-contact__content">
                    <h3 className="connect-contant__type">Address</h3>
                    <div className="connect-contact__label">
                      Bellamy Street, Pennant Hills, NSW 2120, Sydney
                    </div>
                  </div>
                </Link>
              </div>
              <p className="mt-6 text-sm text-neutral-400">
                Prefer a quick chat? Call us now or <a href="/pricing" className="text-blue-500 hover:underline">see pricing</a> to get started.
              </p>
              <div className="contact__links">
                <Link href="#" className="contact__link">
                  <Image src="/img/contact/fb.svg" alt="icon" width={24} height={24} />
                </Link>
                <Link href="#" className="contact__link">
                  <Image src="/img/contact/tw.svg" alt="icon" width={24} height={24} />
                </Link>
                <Link href="#" className="contact__link">
                  <Image src="/img/contact/ig.svg" alt="icon" width={24} height={24} />
                </Link>
                <Link href="#" className="contact__link">
                  <Image src="/img/contact/youtube.svg" alt="icon" width={24} height={24} />
                </Link>
                <Link href="#" className="contact__link">
                  <Image src="/img/contact/in.svg" alt="icon" width={24} height={24} />
                </Link>
              </div>
            </div>
            <div className="contact__info">
              <h2 className="contact__title">Let us get in touch</h2>
              <div className="contact__text">
                <p>
                  At Mathsmastery Institute, we make maths simple, structured, and confidence-building. Whether you're enquiring about weekly lessons, exam preparation, or a custom learning plan, our team is ready to help.
                </p>
                <p>
                  Tell us a little about your goals and we'll recommend the right pathway—book a trial, schedule a call, or send us a message and we'll get back to you promptly.
                </p>
              </div>
            </div>
          </div>
        </section>

               {/* Supabase Connection Test */}
               <ContactTest />

               {/* EmailJS Test Component */}
               <EmailJSTest />

        {/* Contact Form Section */}
        <section className="page__contact-form">
          <ContactForm />
        </section>

        <section className="page__map map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3316.123456789!2d151.0833333!3d-33.7333333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDQ0JzAwLjAiUyAxNTHCsDA1JzAwLjAiRQ!5e0!3m2!1sen!2sau!4v1640995200000!5m2!1sen!2sau&q=Pennant+Hills+NSW+2120+Australia"
            width="600" 
            height="450" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </section>
      </Layout>
    </>
  )
}
