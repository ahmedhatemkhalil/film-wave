import React from 'react'

function OverView({data}) {
  return (
    <>
    <div className="over-view-section flex flex-col gap-3 md:gap-4">
                <div className=" flex flex-col gap-2">
                  <h2 className=" text-3xl text-white">OverView</h2>
                  <p className=" text-lg text-gray-300">{data?.overview}</p>
                </div>
              </div>
    </>
  )
}

export default OverView