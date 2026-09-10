import aboutData from '../data/about.json'
import './About.css'

export default function About() {
  return (
    <div className="container">
      <div className="about-page">
        <div className="about-header">
          <div className="about-avatar">
            <img src={aboutData.avatar} alt={aboutData.author} />
          </div>
          <h1 className="about-name">{aboutData.author}</h1>
          <p className="about-bio">{aboutData.bio}</p>
        </div>

        <div className="about-section">
          <h3>联系方式</h3>
          <div className="about-contact">
            <p>
              <a href={`mailto:${aboutData.email}`}>{aboutData.email}</a>
            </p>
          </div>
        </div>

        <div className="about-section">
          <h3>社交媒体</h3>
          <div className="social-links">
            {aboutData.socialLinks.github && (
              <a href={aboutData.socialLinks.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            )}
            {aboutData.socialLinks.twitter && (
              <a href={aboutData.socialLinks.twitter} target="_blank" rel="noopener noreferrer">Twitter</a>
            )}
            {aboutData.socialLinks.zhihu && (
              <a href={aboutData.socialLinks.zhihu} target="_blank" rel="noopener noreferrer">知乎</a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
