import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Profile from '../Profile' // Ensure Profile/index.js exists
import JobCard from '../JobCard' // Ensure JobCard/index.js exists
import transformKeys from '../../utils'
import './index.css'

const employmentTypesList = [
  {
    employmentTypeId: 'FULLTIME',
    label: 'Full Time',
  },
  {
    employmentTypeId: 'PARTTIME',
    label: 'Part Time',
  },
  {
    employmentTypeId: 'FREELANCE',
    label: 'Freelance',
  },
  {
    employmentTypeId: 'INTERNSHIP',
    label: 'Internship',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    profileData: {},
    jobsData: [],
    isProfileLoading: true,
    isJobsLoading: true,
    profileError: false,
    jobsError: false,
    searchInput: '',
    employmentType: [employmentTypesList[0].employmentTypeId],
    salaryRange: salaryRangesList[0].salaryRangeId,
  }

  componentDidMount() {
    this.getProfile()
    this.getJobs()
  }

  getProfile = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const profilesdetails = data.profile_details
      const updateProfile = {
        name: profilesdetails.name,
        profileImageUrl: profilesdetails.profile_image_url,
        shortBio: profilesdetails.short_bio,
      }
      this.setState({
        profileData: updateProfile,
        isProfileLoading: false,
      })
    } else {
      this.setState({profileError: true, isProfileLoading: false})
    }
  }

  getJobs = async () => {
    this.setState({isJobsLoading: true})
    const {searchInput, employmentType, salaryRange} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const employmentTypeString = employmentType.join(',')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeString}&minimum_package=${salaryRange}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const transformedData = transformKeys(data)
      this.setState({jobsData: transformedData.jobs, isJobsLoading: false})
    } else {
      this.setState({jobsError: true, isJobsLoading: false})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearch = () => {
    this.getJobs()
  }

  onChangeEmploymentType = event => {
    const {employmentType} = this.state
    const {value, checked} = event.target
    if (checked) {
      this.setState({employmentType: [...employmentType, value]}, this.getJobs)
    } else {
      this.setState(
        {employmentType: employmentType.filter(type => type !== value)},
        this.getJobs,
      )
    }
  }

  onChangeSalaryRange = event => {
    console.log(event.target.value)
    this.setState({salaryRange: event.target.value}, this.getJobs)
  }

  renderEmploymentTypes = () => (
    <div className="employment-types-container">
      <h1 className="employment-types-heading">Type of Employment</h1>
      <ul className="employment-types-list">
        {employmentTypesList.map(type => (
          <li key={type.employmentTypeId} className="employment-type-item">
            <input
              type="checkbox"
              id={type.employmentTypeId}
              value={type.employmentTypeId}
              onChange={this.onChangeEmploymentType}
            />
            <label
              htmlFor={type.employmentTypeId}
              className="employment-type-label"
            >
              {type.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  renderSalaryRanges = () => (
    <div className="salary-ranges-container">
      <h1 className="salary-ranges-heading">Salary Range</h1>
      <ul className="salary-ranges-list">
        {salaryRangesList.map(range => (
          <li key={range.salaryRangeId} className="salary-range-item">
            <input
              type="radio"
              id={range.salaryRangeId}
              name="salaryRange"
              value={range.salaryRangeId}
              onChange={this.onChangeSalaryRange}
            />
            <label htmlFor={range.salaryRangeId} className="salary-range-label">
              {range.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  renderSearchInput = () => {
    const {searchInput} = this.state
    return (
      <div className="search-input-container">
        <input
          type="search"
          className="search-input"
          placeholder="Search"
          value={searchInput}
          onChange={this.onChangeSearchInput}
        />
        <button
          type="button"
          data-testid="searchButton"
          className="search-button"
          onClick={this.onClickSearch}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/app-store/app-store-search-img.png"
            alt="search icon"
            className="search-icon"
          />
        </button>
      </div>
    )
  }

  renderJobsList = () => {
    const {jobsData} = this.state
    return (
      <ul className="jobs-list">
        {jobsData.map(job => (
          <JobCard key={job.id} jobData={job} />
        ))}
      </ul>
    )
  }

  renderProfileFailure = () => (
    <div className="profile-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" className="retry-button" onClick={this.getProfile}>
        Retry
      </button>
    </div>
  )

  renderJobsFailure = () => (
    <div className="jobs-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" className="retry-button" onClick={this.getJobs}>
        Retry
      </button>
    </div>
  )

  renderNoJobs = () => (
    <div className="no-jobs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-image"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p className="no-jobs-description">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  render() {
    // Destructure all state at the top (fixes react/destructuring-assignment and prettier)
    const {
      isProfileLoading,
      isJobsLoading,
      profileError,
      jobsError,
      jobsData,
      profileData,
    } = this.state

    // Refactor to avoid nested ternaries (fixes no-nested-ternary)
    let profileContent
    if (isProfileLoading) {
      profileContent = (
        <div className="loader-container" data-testid="loader">
          <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
        </div>
      )
    } else if (profileError) {
      profileContent = this.renderProfileFailure()
    } else {
      profileContent = <Profile profileData={profileData} />
    }

    let jobsContent
    if (isJobsLoading) {
      jobsContent = (
        <div className="loader-container" data-testid="loader">
          <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
        </div>
      )
    } else if (jobsError) {
      jobsContent = this.renderJobsFailure()
    } else if (jobsData.length === 0) {
      jobsContent = this.renderNoJobs()
    } else {
      jobsContent = this.renderJobsList()
    }

    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="jobs-content">
            <div className="profile-and-filters-container">
              {profileContent}
              <hr className="separator" />
              {this.renderEmploymentTypes()}
              <hr className="separator" />
              {this.renderSalaryRanges()}
            </div>
            <div className="jobs-and-search-container">
              {this.renderSearchInput()}
              {jobsContent}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
