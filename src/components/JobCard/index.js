import {Link} from 'react-router-dom'

import './index.css'

const JobCard = props => {
  const {jobData} = props
  const {
    id,
    title,
    companyLogoUrl,
    rating,
    location,
    employmentType,
    packagePerAnnum,
    jobDescription,
  } = jobData
  console.log(jobData.id)
  return (
    <Link to={`/jobs/${id}`} className="job-card-link">
      <li className="job-card">
        <div className="job-card-header">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div className="job-title-rating">
            <h1 className="job-title">{title}</h1>
            <div className="rating-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                alt="star"
                className="star-icon"
              />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-details">
          <div className="location-employment-container">
            <div className="location-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/location-img.png"
                alt="location"
                className="location-icon"
              />
              <p className="location">{location}</p>
            </div>
            <div className="employment-type-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/briefcase-img.png"
                alt="briefcase"
                className="briefcase-icon"
              />
              <p className="employment-type">{employmentType}</p>
            </div>
          </div>
          <p className="package">{packagePerAnnum}</p>
        </div>
        <hr className="separator" />
        <div className="job-description-container">
          <h1 className="description-heading">Description</h1>
          <p className="job-description">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobCard
