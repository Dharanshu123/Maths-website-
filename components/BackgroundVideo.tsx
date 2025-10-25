interface BackgroundVideoProps {
  src: string
  className?: string
}

const BackgroundVideo = ({ src, className = 'background-video' }: BackgroundVideoProps) => {
  return (
    <video className={className} autoPlay muted loop playsInline>
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  )
}

export default BackgroundVideo
