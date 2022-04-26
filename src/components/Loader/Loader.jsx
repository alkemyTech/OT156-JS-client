import React from 'react'
import { SpinnerCircular } from 'spinners-react'

const Loader = () => {

  return (
    <div className="position-absolute d-flex justify-content-center w-100 h-100">
      <SpinnerCircular size={50} thickness={100} speed={100} color="#36ad47" secondaryColor="rgba(0, 0, 0, 0.44)" />
    </div>
  )
}

export default Loader