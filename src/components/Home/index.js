import {Component} from 'react'
import Loader from 'react-loader-spinner'
import CourseItemCard from '../CourseItemCard'
import FailureView from '../FailureView'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    coursesList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getCoursesList()
  }

  getCoursesList = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const coursesUrl = 'https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }
    const response = await fetch(coursesUrl, options)

    if (response.ok) {
      const data = await response.json()
      const updatedData = data.courses.map(eachCourse => ({
        id: eachCourse.id,
        name: eachCourse.name,
        logoUrl: eachCourse.logo_url,
      }))

      console.log(updatedData)

      this.setState({
        coursesList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderCoursesList = () => {
    const {coursesList} = this.state

    return (
      <div className="container">
        <h1 className="courses-heading">Courses</h1>
        <ul className="courses-list">
          {coursesList.map(eachCourse => (
            <CourseItemCard key={eachCourse.id} courseDetails={eachCourse} />
          ))}
        </ul>
      </div>
    )
  }

  retryButtonClicked = () => {
    this.getCoursesList()
  }

  renderFailureView = () => (
    <FailureView retryButtonClicked={this.retryButtonClicked} />
  )

  renderLoadingView = () => (
    <div data-testid="loader" className="courses-loader">
      <Loader type="ThreeDots" color="#4656a1" height="50" width="50" />
    </div>
  )

  renderPageDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCoursesList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <div className="Home-container">{this.renderPageDetails()}</div>
  }
}

export default Home
