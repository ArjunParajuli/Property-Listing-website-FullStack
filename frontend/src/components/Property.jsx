import React from 'react'
import moment from 'moment'
import { FaMapLocationDot } from "react-icons/fa6";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { Link } from 'react-router-dom'
import { FcBriefcase } from "react-icons/fc";
import { useAppContext } from '../context/AppContext'
import Wrapper from '../wrappers/property'
import propertyImg from '../assets/images/property.jpeg'
import PropertyInfo from './PropertyInfo'

const Property = ({
    _id,
    owner,
    propertyLocation,
    propertyType,
    createdAt,
    status,
}) => {
    let date = moment(createdAt)
    date = date.format('MMM Do, YYYY')

    const { setEditProperty, deleteProperty } = useAppContext()

  return (
    <Wrapper>
      <header>
        <div className='main-icon'>
          <img src={propertyImg} alt={owner} className='owner-image' /> 
        </div>
        <div className='info'>
          <p>{owner}</p>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <PropertyInfo icon={<FaMapLocationDot />} text={propertyLocation} />
          <PropertyInfo icon={<BsFillCalendarDateFill />} text={date} />
          <PropertyInfo icon={<FcBriefcase />} text={propertyType} />
          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
          <div className='actions'>
            <Link
              to='/add-property'
              className='btn edit-btn'
              onClick={() => setEditProperty(_id)}
            >
              Edit
            </Link>
            <button
              type='button'
              className='btn delete-btn'
              onClick={() => deleteProperty(_id)}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  )
}

export default Property