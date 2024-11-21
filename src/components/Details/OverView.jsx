import React from 'react'

function OverView({overview}) {
  return (
    <>
     <div className="over-view-section flex flex-col gap-3 md:gap-4">
                <h2 className="text-3xl text-white">Overview</h2>
                <p className="text-lg text-gray-300">{overview}</p>
              </div>
    </>
  )
}

export default OverView