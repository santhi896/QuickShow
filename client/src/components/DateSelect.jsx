// import React, { useState } from 'react'
// import BlurCircle from './BlurCircle'
// import { ChevronRightIcon, ChevronsLeftIcon } from 'lucide-react'
// import toast from 'react-hot-toast'
// import { useNavigate } from 'react-router-dom'

// const DateSelect = ({ dateTime, id }) => {

//   const navigate = useNavigate();

//   const [selected, setSelected] = useState(null)

//   const onBookHandler = () => {
//     if (!selected) {
//       return toast('Please select a date')
//     }
//     navigate(`/movies/${id}/${selected}`)
//     scrollTo(0, 0)
//   }
//   return (
//     <div id='dateSelect' className='pt-30'>
//       <div class="flex flex-col md:flex-row items-center justify-between gap-10 relative p-8 bg-[#ef4444]/20 border border-[#ef4444]/20 rounded-lg">
//         <BlurCircle top='-100px' left='-100px' />
//         <BlurCircle top='100px' right='0px' />
//         <div>
//           <p className='text-lg font-semibold'>Choose Date</p>
//           <div className='flex items-center  gap-6 text-sm mt-5'>
//             <ChevronsLeftIcon width={28} />
//             {/* <span className='grid grid-cols-3 md:flex flex-wrap md:max-w-lg gap-4'>
//                   {Object.keys(dateTime).map((date)=>(
//                     <button onClick={()=>setSelected(date)} key={date} className={`flex flex-col items-center justify-center h-14 w-14 aspect-square rounded cursor-pointer
//                        ${selected === date? "bg-red-500 text-white" : "border border-red-400"}`}>
//                       <span>{new Date(date).getDate()}</span>
//                       <span>{new Date(date).toLocaleDateString("en-US",{month:"short"})}</span>

//                     </button>
//                   ))}
//                 </span> */}
//             <span className='grid grid-cols-3 md:flex flex-wrap md:max-w-lg gap-4'>
//               {dateTime && typeof dateTime === 'object' ? Object.keys(dateTime).map((date) => (
//                 <button
//                   key={date}
//                   onClick={() => setSelected(date)}
//                   aria-label={`Select date ${new Date(date).toDateString()}`}
//                   className={`flex flex-col items-center justify-center h-14 w-14 aspect-square rounded cursor-pointer
//          ${selected === date ? "bg-red-500 text-white" : "border border-red-400"}`}
//                 >
//                   <span>{new Date(date).getDate()}</span>
//                   <span>{new Date(date).toLocaleDateString("en-US", { month: "short" })}</span>
//                 </button>
//               )) : <p>No available dates</p>}
//             </span>

//             <ChevronRightIcon width={28} />
//           </div>
//         </div>
//         <button onClick={onBookHandler} className='bg-red-500 text-white px-8 py-2 mt-6 rounded hover:bg-red/90 transition-all cursor-pointer'>Book Now</button>
//       </div>

//     </div>
//   )
// }

// export default DateSelect



// import React, { useState } from 'react'
// import BlurCircle from './BlurCircle'
// import { ChevronRightIcon, ChevronsLeftIcon } from 'lucide-react'
// import toast from 'react-hot-toast'
// import { useNavigate } from 'react-router-dom'

// const DateSelect = ({ dateTime, id }) => {
//   const navigate = useNavigate()
//   const [selected, setSelected] = useState(null)

//   const onBookHandler = () => {
//     if (!selected) {
//       return toast('Please select a date')
//     }
//     navigate(`/movies/${id}/${selected}`)
//     scrollTo(0, 0)
//   }

//   console.log("👉 DateTime prop (stringified):", JSON.stringify(dateTime, null, 2));


//   return (
//     <div id='dateSelect' className='pt-30'>
//       <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative p-8 bg-[#ef4444]/20 border border-[#ef4444]/20 rounded-lg">
//         <BlurCircle top='-100px' left='-100px' />
//         <BlurCircle top='100px' right='0px' />
//         <div>
//           <p className='text-lg font-semibold'>Choose Date</p>
//           <div className='flex items-center gap-6 text-sm mt-5'>
//             <ChevronsLeftIcon width={28} />
//             <span className='grid grid-cols-3 md:flex flex-wrap md:max-w-lg gap-4'>
//               {
//                 dateTime && typeof dateTime === 'object' && Object.keys(dateTime).length > 0 ? (
//                   Object.keys(dateTime).map((date) => (
//                     <button
//                       key={date}
//                       onClick={() => setSelected(date)}
//                       aria-label={`Select date ${new Date(date).toDateString()}`}
//                       className={`flex flex-col items-center justify-center h-14 w-14 aspect-square rounded cursor-pointer
//                         ${selected === date ? "bg-red-500 text-white" : "border border-red-400"}`}
//                     >
//                       <span>{new Date(date).getDate()}</span>
//                       <span>{new Date(date).toLocaleDateString("en-US", { month: "short" })}</span>
//                     </button>
//                   ))
//                 ) : (
//                   <p className="text-gray-500">No available dates</p>
//                 )
//               }
//             </span>
//             <ChevronRightIcon width={28} />
//           </div>
//         </div>
//         <button onClick={onBookHandler} className='bg-red-500 text-white px-8 py-2 mt-6 rounded hover:bg-red/90 transition-all cursor-pointer'>Book Now</button>
//       </div>
//     </div>
//   )
// }

// export default DateSelect



import React, { useState } from 'react'
import BlurCircle from './BlurCircle'
import { ChevronRightIcon, ChevronsLeftIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const DateSelect = ({ dateTime }) => {
  const navigate = useNavigate()
  const [selectedShow, setSelectedShow] = useState(null)

  const onBookHandler = () => {
    if (!selectedShow) {
      return toast('Please select a show')
    }
    // selectedShow = { showId, date }
    navigate(`/movies/${selectedShow.showId}/${selectedShow.date}`)
    scrollTo(0, 0)
  }

  return (
    <div id='dateSelect' className='pt-30'>
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative p-8 bg-[#ef4444]/20 border border-[#ef4444]/20 rounded-lg">
        <BlurCircle top='-100px' left='-100px' />
        <BlurCircle top='100px' right='0px' />
        <div>
          <p className='text-lg font-semibold'>Choose Show</p>
          <div className='flex items-center gap-6 text-sm mt-5'>
            <ChevronsLeftIcon width={28} />
            <div className='max-w-lg overflow-auto'>
              {
                dateTime && typeof dateTime === 'object' && Object.keys(dateTime).length > 0 ? (
                  Object.entries(dateTime).map(([date, shows]) => (
                    <div key={date} className='mb-4'>
                      <p className="font-semibold">{new Date(date).toDateString()}</p>
                      <div className="flex gap-4 flex-wrap">
                        {shows.map(show => (
                          <button
                            key={show.showId}
                            onClick={() => setSelectedShow({ showId: show.showId, date })}
                            className={`px-4 py-2 rounded cursor-pointer border ${
                              selectedShow?.showId === show.showId
                                ? 'bg-red-500 text-white border-red-500'
                                : 'border-red-400 text-red-700'
                            }`}
                            aria-label={`Select show at ${show.time} on ${new Date(date).toDateString()}`}
                          >
                            {show.time}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No available shows</p>
                )
              }
            </div>
            <ChevronRightIcon width={28} />
          </div>
        </div>
        <button
          onClick={onBookHandler}
          className='bg-red-500 text-white px-8 py-2 mt-6 rounded hover:bg-red/90 transition-all cursor-pointer'
        >
          Book Now
        </button>
      </div>
    </div>
  )
}

export default DateSelect
