import React from 'react'
import { SpinnerCircular } from 'spinners-react'

const Loader = () => {

  return (
    <SpinnerCircular size={50} thickness={100} speed={100} color="#36ad47" secondaryColor="rgba(0, 0, 0, 0.44)" />
  )
}

export default Loader