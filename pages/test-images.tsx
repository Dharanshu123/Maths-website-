import Head from 'next/head'

export default function TestImages() {
  const images = [
    '/images/testimonials/parent-woman-1.svg',
    '/images/testimonials/parent-woman-2.svg',
    '/images/testimonials/student-asian-girl.svg',
    '/images/testimonials/parent-man-1.svg',
    '/images/testimonials/parent-man-2.svg',
    '/images/testimonials/student-girl-1.svg',
    '/images/testimonials/parent-woman-3.svg',
    '/images/testimonials/student-girl-2.svg',
    '/images/testimonials/teacher-woman.svg'
  ];

  return (
    <>
      <Head>
        <title>Test Images</title>
      </Head>
      <div style={{ padding: '20px' }}>
        <h1>Testimonial Images Test</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '20px' }}>
          {images.map((src, index) => (
            <div key={index} style={{ textAlign: 'center' }}>
              <img
                src={src}
                alt={`Test image ${index + 1}`}
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  border: '3px solid #e1e4eb',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                }}
              />
              <p style={{ fontSize: '12px', marginTop: '10px' }}>{src.split('/').pop()}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
