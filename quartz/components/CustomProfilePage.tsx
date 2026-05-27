import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

interface Options {
  profileImage?: string
  title?: string
  subtitle?: string
  experience?: Array<{
    period: string
    company: string
    url: string
    description: string
    highlights?: string[]
  }>
  contact?: {
    linkedin?: string
    github?: string
    email?: string
  }
}

const defaultOptions: Options = {
  profileImage: "matthew-davies-profile.png",
  title: "Matthew Davies",
  subtitle:
    "Software Architect with 15 years of engineering experience in a wide range of industries including fintech & developer tooling. Now leveraging that technical expertise at a global consulting firm to bridge engineering excellence and business strategy.",
  experience: [
    {
      period: "2024 — Now",
      company: "Software Architect at Endava",
      url: "https://endava.com/",
      description:
        "Responsible for designing and guiding software architecture. Provide technical leadership in system design, best practices, and code quality. Work across the stack to support project needs and align architecture with business goals.",
    },
    {
      period: "2020 — 2024",
      company: "Senior Software Engineer at configure8",
      url: "https://configure8.io/",
      description:
        "I started with leading frontend development, transforming the existing scaffolded application into a robust application with end-to-end typings and standard code styling. I have since become one of our leading engineers working across the entire codebase, frontend to backend and everything in between.",
    },
  ],
  contact: {
    linkedin: "https://linkedin.com/in/daviesgeek",
    github: "https://github.com/daviesgeek",
    email: "mailto:matthew@daviesgeek.com",
  },
}

export default ((userOpts?: Partial<Options>) => {
  const opts = { ...defaultOptions, ...userOpts }

  const CustomProfilePage: QuartzComponent = (_props: QuartzComponentProps) => {
    return (
      <div className="custom-profile-page">
        <div className="profile-hero">
          <div className="profile-image">
            <img src={`./attachments/${opts.profileImage}`} alt={opts.title} />
          </div>
          <div className="profile-content">
            <h1 className="profile-title">{opts.title}</h1>
            <h2 className="profile-subtitle">{opts.subtitle}</h2>
          </div>
        </div>
        <section className="work-experience">
          <h3>Work Experience</h3>
          {opts.experience?.map((job, index) => (
            <div key={index} className="job-entry">
              <p className="job-header">
                <strong>{job.period}</strong>:{" "}
                <a href={job.url} target="_blank" rel="noopener noreferrer">
                  {job.company}
                </a>
              </p>
              <p className="job-description">{job.description}</p>
              {job.highlights && (
                <ul className="job-highlights">
                  {job.highlights.map((highlight, i) => (
                    <li key={i}>{highlight}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
        <section className="contact">
          <h3>Contact</h3>
          <div className="contact-links">
            {opts.contact?.linkedin && (
              <a
                href={opts.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                LinkedIn
              </a>
            )}
            {opts.contact?.github && (
              <a
                href={opts.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                GitHub
              </a>
            )}
            {opts.contact?.email && (
              <a href={opts.contact.email} className="contact-link">
                Email
              </a>
            )}
          </div>
        </section>
      </div>
    )
  }

  CustomProfilePage.css = `
    .custom-profile-page {
      max-width: 800px;
      margin: 0 auto;
      
      .profile-hero {
        display: flex;
        align-items: flex-start;
        gap: 2rem;
        margin-bottom: 3rem;
        padding: 2rem;
        background: var(--lightgray);
        border-radius: 12px;
        border: 1px solid var(--gray);
      }
      
      .profile-image img {
        width: 150px;
        height: auto;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }
      
      .profile-title {
        margin: 0 0 0.5rem 0;
        font-size: 2.2rem;
        font-weight: 700;
        color: var(--dark);
      }
      
      .profile-subtitle {
        margin: 0;
        font-size: 1.1rem;
        line-height: 1.6;
        color: var(--darkgray);
      }
      
      .job-entry {
        margin-bottom: 2rem;
        padding-bottom: 2rem;
        border-bottom: 1px solid var(--lightgray);
      }
      
      .job-header {
        font-size: 1.1rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
      }
      
      .contact-links {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
      }
      
      .contact-link {
        display: inline-flex;
        align-items: center;
        padding: 0.5rem 1rem;
        background: var(--secondary);
        color: white !important;
        text-decoration: none;
        border-radius: 6px;
        font-weight: 500;
        transition: all 0.2s ease;
      }
      
      .contact-link:hover {
        background: var(--tertiary);
        transform: translateY(-1px);
      }
    }
  `

  return CustomProfilePage
}) satisfies QuartzComponentConstructor
