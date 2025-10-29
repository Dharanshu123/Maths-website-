import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import Layout from '../components/Layout'

// Testimonials data extracted from MathsOnline with profile images
const testimonialData = [
  {
    id: 1,
    name: "Lorene Stevenson",
    location: "Bluff QLD",
    role: "Parent",
    title: "Clear, Concise Video Tutorials",
    message: "We love the video tutorials, they are very clearly explained, very concise. You're able to rewind or go back or pause if you need to replay them. It's great that you can access any year level, you can diagnose if your child needs some extra help, the lessons are in full colour, with diagrams that show very clearly exactly what to do. My kids find it very clearly explained.",
    rating: 5,
    featured: true,
    image: "/images/testimonials/lorene-stevenson-real.png" // Real photo of Lorene Stevenson
  },
  {
    id: 2,
    name: "Rebekah Haack",
    location: "Albion Park NSW",
    role: "Parent",
    title: "No More Pressure",
    message: "MathsOnline doesn't put pressure on the child to have to get their question or lesson right first time around, they are given a space to try and fail but also succeed. They know they can work towards 100% and there is space and time to do that and I think that encourages the child to learn because they are enjoying it and because they know it is attainable. I am so thankful that we discovered this product and we will definitely be using it in the school years to come.",
    rating: 5,
    featured: true,
    image: "/images/testimonials/parent-woman-2.png" // Blonde woman with professional look
  },
  {
    id: 3,
    name: "Claire Cheong",
    location: "Balwyn VIC",
    role: "Year 9 Student",
    title: "Extra Revision to Help me for Exams",
    message: "I have been doing MathsOnline for three years now and one of the best thing about MathsOnline is the fact that for tests and exams and I can have some extra revision to help me. My grades have improved from using MathsOnline especially with the video tutorials and the easy access to it.",
    rating: 5,
    featured: true,
    image: "/images/testimonials/student-asian-girl.png" // Asian girl - matches name Claire Cheong
  },
  {
    id: 4,
    name: "John Sargeant",
    location: "Bonny Hills, NSW",
    role: "Parent",
    title: "Improved Confidence and Grades",
    message: "We found MathsOnline when our child first entered year 7 in about 2009. We found that he was having some teacher issues, and not understanding his teacher in Mathematics and that caused him to be not so confident in his work he was producing. With the assistance of MathsOnline, he was able to gain confidence, he was able to improve his grades, and he was able to do this by listening to the video tutorials online and understanding them as they were being taught by someone else. This went on to year 12 where he did 3 unit Maths all with the aid of MathsOnline.",
    rating: 5,
    featured: true,
    image: "/images/testimonials/parent-man-1.png" // Older man with glasses - matches parent role
  },
  {
    id: 5,
    name: "Anthony English",
    location: "Ryde NSW",
    role: "Parent of 7 Children",
    title: "Short, Systematic Lessons",
    message: "My wife and I have 7 children and they've been using MathsOnline ever since they started, our eldest child is 16. I really like the way that it goes through very short lessons, really systematic. The children enjoy it, even those who aren't so good at maths, or are not so confident. I really love the program and the children do too. We don't really have any trouble getting them to do it. It's great.",
    rating: 5,
    featured: false,
    image: "/images/testimonials/parent-man-2.png" // Middle-aged man - matches father role
  },
  {
    id: 6,
    name: "Britney Lorenz",
    location: "Campbelltown NSW",
    role: "Year 9 Student",
    title: "I Used to Struggle with Maths",
    message: "MathsOnline has been a huge help for me in this subject. Before I started I used to struggle heaps with maths but now I'm excelling to great heights. Everything is so simple and easy to understand on the site from the videos to the worksheets. Without it I wouldn't be able to finish high school. Thanks MathsOnline",
    rating: 5,
    featured: true,
    image: "/images/testimonials/student-girl-1.png" // Young blonde girl - matches student role
  },
  {
    id: 7,
    name: "Kerrin Simpson",
    location: "Old Bar NSW",
    role: "Parent",
    title: "The Kids are Really Engaged Now",
    message: "Two years ago, we discovered MathsOnline which is the best thing that has ever happened to us. The kids are really engaged now. All they have to do in the morning is just put the headset on, the lesson is playing, and they just move from one to the other. It's completely aligned with the Australian curriculum. The lessons are fantastic, they are very well put together and we just really enjoy it. Thank you, MathsOnline.",
    rating: 5,
    featured: false,
    image: "/images/testimonials/parent-woman-3.png" // Woman with curly hair - matches parent role
  },
  {
    id: 8,
    name: "Michelle Eime",
    location: "Jerusalem Israel",
    role: "Parent",
    title: "Available on All Devices",
    message: "Since we live outside the Australia I like the online convenience and being able to access lessons from all devices; Desktops, iPads, Laptops and I appreciate the way the lessons are explained and we are able to access lessons from different grade levels. MathsOnline has been wonderful for our family and it helps to boost confidence and to create a love of Maths. Thank you Mr. Pat",
    rating: 5,
    featured: false,
    image: "/images/testimonials/student-girl-2.png" // Young girl - represents family with children
  },
  {
    id: 9,
    name: "Sherri Mcnichol",
    location: "Bucasia QLD",
    role: "Qualified Primary School Teacher",
    title: "The Detailed Reporting Keeps Track of the Student's Progress",
    message: "We have had MathsOnline for a few years now and I found it amazing for consolidating the maths my children are learning class. I am also a qualified primary school teacher and I recommend MathsOnline to friends and students who are experiencing difficulties. MathsOnline is easy to use, the lessons are shorts and to the point, easily understood and the students can stop and rewind at any point. It is convenient in that it can be used anytime, anywhere, on any device. There is detailed reporting so parents can keep track of their child's progress at all times. MathsOnline is particularly useful for revision before exams, improving the student's confidence. Most of all MathsOnline is value for money and it's much more affordable than a private tutor.",
    rating: 5,
    featured: true,
    image: "/images/testimonials/teacher-woman.png" // Professional woman - matches teacher role
  },
  {
    id: 10,
    name: "Nike Ajao",
    location: "Port Lincoln SA",
    role: "Parent",
    title: "The Kids Love It Now",
    message: "I would like to let you know that your program is absolutely fantastic. My kids love it, my daughter actually say she loves maths now because whenever a new topic is being taught in the class room she understands it a lot better and that is because of your easy to understand short video lessons you provide at the beginning of every lesson. Thank you for saving me time, money and anxiety.",
    rating: 5,
    featured: false,
    image: "/images/testimonials/nike-ajao.png" // Real photo of Nike Ajao
  }
]

export default function Testimonial() {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} style={{ color: i < rating ? '#ffd700' : '#ddd', fontSize: '18px' }}>★</span>
    ))
  }

  return (
    <>
      <Head>
        <title>TESTIMONIALS</title>
      </Head>
      <Layout>
        <section className="page__main main main_services main_pages">
          <div className="main__container main__container_pages">
            <h1 className="main__title">Testimonials</h1>
            <div className="main__text main__text_pages">
              Real stories from students and parents who have transformed their mathematics learning journey with us.
            </div>
          </div>
        </section>
        
        <section className="reviews">
          <div className="reviews__container">
            <div className="reviews__row">
              {testimonialData.map((testimonial) => (
                <div key={testimonial.id} className="reviews__column">
                  <div className="reviews__item">
                    <div className="item-reviews">
                      <div className="item-reviews__img">
                        {testimonial.image ? (
                          <img
                            src={`${testimonial.image}?v=${Date.now()}`}
                            alt={`${testimonial.name} - ${testimonial.role}`}
                            width={80}
                            height={80}
                            style={{
                              width: '80px',
                              height: '80px',
                              borderRadius: '50%',
                              objectFit: 'cover',
                              border: '3px solid #e1e4eb',
                              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = 'scale(1.05)';
                              e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = 'scale(1)';
                              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
                            }}
                          />
                        ) : (
                          <div style={{ 
                            width: '80px', 
                            height: '80px', 
                            background: 'linear-gradient(135deg, #303a4d, #4a5568)', 
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '32px',
                            fontWeight: 'bold',
                            border: '3px solid #e1e4eb',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                          }}>
                            {testimonial.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <h3 style={{ 
                        fontSize: '18px', 
                        fontWeight: '600', 
                        marginBottom: '12px',
                        color: '#303a4d'
                      }}>
                        {testimonial.title}
                      </h3>
                      <div className="item-reviews__text">
                        "{testimonial.message}"
                      </div>
                      <div style={{ marginBottom: '10px' }}>
                        {renderStars(testimonial.rating)}
                      </div>
                      <div className="item-reviews__author">
                        {testimonial.name}
                      </div>
                      <div className="item-reviews__geo">
                        {testimonial.role} • {testimonial.location}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="page__outro outro outro_services">
          <div className="outro__container">
            <h2 className="outro__title title">Ready to Join Our Success Stories?</h2>
            <div className="outro__text">
              Contact us today to start your mathematics learning journey and become our next success story.
            </div>
            <Link href="/pricing" className="outro__button button">Get Started</Link>
          </div>
        </section>
      </Layout>
    </>
  )
}

