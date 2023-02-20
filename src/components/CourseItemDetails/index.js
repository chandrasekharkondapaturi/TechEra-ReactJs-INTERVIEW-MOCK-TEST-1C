import {Component} from 'react'
import Loader from 'react-loader-spinner'
import FailureView from '../FailureView'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CourseItemDetails extends Component {
  state = {
    courseDetails: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getCourseDetails()
  }

  getCourseDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const {match} = this.props
    const {params} = match
    const {id} = params

    const apiUrl = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const data = await response.json()
      const fetchedData = {
        id: data.course_details.id,
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
        description: data.course_details.description,
      }

      console.log(fetchedData)

      this.setState({
        courseDetails: fetchedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderCourseDetails = () => {
    const {courseDetails} = this.state
    const {imageUrl, name, description} = courseDetails

    return (
      <div className="course-container">
        <img src={imageUrl} alt={name} className="course-details-image" />
        <div className="course-details-name-and-description">
          <h1 className="course-details-heading">{name}</h1>
          <p className="course-details-description">{description}</p>
        </div>
      </div>
    )
  }

  retryButtonClicked = () => {
    this.getCourseDetails()
  }

  renderFailureView = () => (
    <FailureView retryButtonClicked={this.retryButtonClicked} />
  )

  renderLoadingView = () => (
    <div data-testid="loader" className="courses-details-loader">
      <Loader type="ThreeDots" color="#4656a1" height="50" width="50" />
    </div>
  )

  renderPageDetailsView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCourseDetails()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="course-details-container">
        {this.renderPageDetailsView()}
      </div>
    )
  }
}

export default CourseItemDetails
