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
              Subheading: Craft a compelling subheading that sparks curiosity.
            </div>
          </div>
        </section>
        <section className="page__contact contact">
          <div className="contact__container">
            <div className="contact__contacts">
              <h2 className="contact__title">You can find us at</h2>
              <div className="contact__connect connect-contact">
                <Link href="tel:+1234567890" className="connect-contact__item">
                  <div className="connect-contact__icon">
                    <Image src="/img/contact/phone.svg" alt="ico" width={24} height={24} />
                  </div>
                  <div className="connect-contact__content">
                    <h3 className="connect-contant__type">Phone</h3>
                    <div className="connect-contact__label">+123 456 7890</div>
                  </div>
                </Link>
                <Link href="mailto:email@website.com" className="connect-contact__item">
                  <div className="connect-contact__icon">
                    <Image src="/img/contact/email.svg" alt="ico" width={24} height={24} />
                  </div>
                  <div className="connect-contact__content">
                    <h3 className="connect-contant__type">Email</h3>
                    <div className="connect-contact__label">email@website.com</div>
                  </div>
                </Link>
                <Link 
                  href="https://www.google.com/maps/place/Skill+Chart/@34.0349095,-118.6967567,942m/data=!3m2!1e3!4b1!4m6!3m5!1s0x80e81e35198c4237:0x9be35a11a754469a!8m2!3d34.0349051!4d-118.6941818!16s%2Fg%2F11vr04dx6l?hl=en&entry=ttu&g_ep=EgoyMDI1MDEwMS4wIKXMDSoASAFQAw%3D%3D"
                  className="connect-contact__item"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="connect-contact__icon">
                    <Image src="/img/contact/address.svg" alt="ico" width={24} height={24} />
                  </div>
                  <div className="connect-contact__content">
                    <h3 className="connect-contant__type">Address</h3>
                    <div className="connect-contact__label">2727 Ocean Road, Malibu, CA, 90264</div>
                  </div>
                </Link>
              </div>
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
                  About Text: In this section, you can provide a detailed paragraph that delves into the history,
                  values, and mission of your web development business. Highlight expertise, unique approach of your
                  team, and the commitment that sets you apart.
                </p>
                <p>
                  Emphasize your passion for creating exceptional web solutions and convey your dedication to delivering
                  remarkable results for clients.
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
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d16411.20345240449!2d-118.6941818!3d34.0349051!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80e81e35198c4237%3A0x9be35a11a754469a!2sSkill%20Chart!5e1!3m2!1sen!2sua!4v1736237616553!5m2!1sen!2sua"
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
