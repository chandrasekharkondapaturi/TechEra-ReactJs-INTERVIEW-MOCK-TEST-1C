import {Link} from 'react-router-dom'
import './index.css'

const CourseItemCard = props => {
  const {courseDetails} = props
  const {id, name, logoUrl} = courseDetails

  return (
    <Link to={`/courses/${id}`} className="course-link">
      <li className="course-card">
        <img src={logoUrl} alt={name} className="course-logo" />
        <p className="course-name">{name}</p>
      </li>
    </Link>
  )
}

export default CourseItemCard
