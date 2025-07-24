import React from 'react'

const MentorCard = ({mentor}) => {
  return (
  <>
  <div>
    <div>
      <h4>
        {mentor?.profile?.title  }
      </h4>
    </div>
  </div>
  </>
  )
}

export default MentorCard