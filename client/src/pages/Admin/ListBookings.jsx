import React, { useEffect, useState } from 'react'
import { dummyBookingData } from '../../assets/assets';
import Title from '../../components/admin/Title';
import Loading from '../../components/Loading';
import { dateFormat } from '../../lib/DateFormat';
import { useAppContext } from '../../context/AppContext';

const ListBookings = () => {

  const currency = import.meta.env.VITE_CURRENCY

  const { axios, getToken, user } = useAppContext()


  const [Bookings, setBookings] = useState([]);

  const [isloading, setIsLoading] = useState(true);

  const getAllBookings = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get('api/admin/all-bookings', {
        headers: { Authorization: `Bearer ${await getToken()}` }
      });
      setBookings(data.Bookings)
    } catch (error) {
      console.error(error);

    }
    setIsLoading(false)
  };

  useEffect(() => {
    if (user) {
      getAllBookings();
    }
  }, [user]);

  return !isloading ? (
    <>
      <Title text1="List" text2="Bookings" />
      <div className='max-w-4xl mt-6 overflow-x-auto'>
        <table className='w-full border-collapse rounded-md overflow-hidden text-nowrap'>
          <thead>
            <tr className='bg-[#ef4444]/20 text-left text-white'>
              <th className='p-2 font-medium pl-5'>User Name</th>
              <th className='p-2 font-medium '>Movie Name</th>
              <th className='p-2 font-medium '>Show Time</th>
              <th className='p-2 font-medium '>Seats</th>
              <th className='p-2 font-medium '>Amount</th>

            </tr>
          </thead>
          
          <tbody className='text-sm font-light'>
            {/* Check if Bookings is an array and has items before mapping */}
            {Bookings && Bookings.length > 0 ? (
              Bookings.map((item, index) => (
                <tr key={index} className='bg-[#ef4444]/7 border border-[#ef4444]/10 even:bg-[#ef4444]/20 '>
                  <td className='p-2 min-w-45 pl-5'>{item.user.name}</td>
                  <td className='p-2 '>{item.show.movie.title}</td>
                  <td className='p-2'>{dateFormat(item.show.showDateTime)}</td>
                  <td className='p-2'>{item.bookedSeats ? Object.keys(item.bookedSeats).map(seat => item.bookedSeats[seat]).join(", ") : ''}</td>
                  <td className='p-2'>{currency} {item.amount}</td>
                </tr>
              ))
            ) : (
              // Render a row with a message if no bookings are found
              <tr>
                <td colSpan="5" className="text-center p-4">No bookings found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  ) : <Loading />
}

export default ListBookings
