import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SimilarJobCard from '../SimilarJobCard'
import transformKeys from '../../utils'
import './index.css'

class JobItemDetails extends Component {
  state = {
    jobDetails: {},
    similarJobs: [],
    isLoading: true,
    isError: false,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({isLoading: true})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const transformedData = transformKeys(data) // Transform to camelCase
      this.setState({
        jobDetails: transformedData.jobDetails,
        similarJobs: transformedData.similarJobs,
        isLoading: false,
      })
    } else {
      this.setState({isError: true, isLoading: false})
    }
  }

  renderJobDetails = () => {
    const {jobDetails} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      id,
      jobDescription,
      skills,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobDetails

    return (
      <div className="job-details-container">
        <div className="job-header">
          <img
            src={companyLogoUrl}
            alt="job details company logo"
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
        <div className="job-info">
          <div className="location-employment-package">
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
            <p className="package">{packagePerAnnum}</p>
          </div>
          <hr className="separator" />
          <div className="description-visit">
            <h1 className="description-heading">Description</h1>
            <a
              href={companyWebsiteUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button type="button" className="visit-button">
                Visit
              </button>
            </a>
          </div>
          <p className="job-description">{jobDescription}</p>
        </div>
        <div className="skills-container">
          <h1 className="skills-heading">Skills</h1>
          <ul className="skills-list">
            {skills.map(skill => (
              <li key={skill.name} className="skill-item">
                {' '}
                {/* Unique key: skill.name */}
                <img
                  src={skill.imageUrl}
                  alt={skill.name}
                  className="skill-image"
                />
                <p className="skill-name">{skill.name}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="life-at-company-container">
          <h1 className="life-at-company-heading">Life at Company</h1>
          <div className="life-at-company-content">
            <p className="life-at-company-description">
              {lifeAtCompany.description}
            </p>
            <img
              src={lifeAtCompany.imageUrl}
              alt="life at company"
              className="life-at-company-image"
            />
          </div>
        </div>
      </div>
    )
  }

  renderSimilarJobs = () => {
    const {similarJobs} = this.state
    return (
      <div className="similar-jobs-container">
        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <ul className="similar-jobs-list">
          {similarJobs.map(job => (
            <SimilarJobCard key={job.id} jobData={job} />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.getJobDetails}
      >
        Retry
      </button>
    </div>
  )

  render() {
    const {isLoading, isError} = this.state
    let content
    if (isLoading) {
      content = (
        <div className="loader-container" data-testid="loader">
          <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
        </div>
      )
    } else if (isError) {
      content = this.renderFailureView()
    } else {
      content = (
        <>
          {this.renderJobDetails()}
          {this.renderSimilarJobs()}
        </>
      )
    }
    return (
      <>
        <Header />
        <div className="job-item-details-container">{content}</div>
      </>
    )
  }
}

export default JobItemDetails
