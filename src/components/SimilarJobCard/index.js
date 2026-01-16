import {Link} from 'react-router-dom'
import './index.css'

const SimilarJobCard = props => {
  const {jobData} = props
  const {
    id,
    title,
    companyLogoUrl,
    rating,
    location,
    employmentType,
    packagePerAnnum,
  } = jobData

  return (
    <Link to={`/jobs/${id}`} className="similar-job-card-link">
      <li className="similar-job-card">
        {' '}
        {/* Wrapped in <li> */}
        <div className="similar-job-header">
          <img
            src={companyLogoUrl}
            alt="similar job company logo"
            className="similar-company-logo"
          />
          <div className="similar-job-title-rating">
            <h1 className="similar-job-title">{title}</h1>
            <div className="similar-rating-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                alt="star"
                className="similar-star-icon"
              />
              <p className="similar-rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="similar-job-details">
          <div className="similar-location-employment">
            <div className="similar-location-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/location-img.png"
                alt="location"
                className="similar-location-icon"
              />
              <p className="similar-location">{location}</p>
            </div>
            <div className="similar-employment-type-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/briefcase-img.png"
                alt="briefcase"
                className="similar-briefcase-icon"
              />
              <p className="similar-employment-type">{employmentType}</p>
            </div>
          </div>
          <p className="similar-package">{packagePerAnnum}</p>
        </div>
      </li>
    </Link>
  )
}

export default SimilarJobCard
