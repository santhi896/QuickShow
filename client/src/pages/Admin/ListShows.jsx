
import React, { useEffect, useState } from 'react';
import Loading from '../../components/Loading';
import Title from '../../components/admin/Title';
import { dateFormat } from '../../lib/DateFormat';
import { useAppContext } from '../../context/AppContext';

const ListShows = () => {
  const currency = import.meta.env.VITE_CURRENCY;
  const { axios, getToken, user } = useAppContext();

  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllShows = async () => {
    try {
      const { data } = await axios.get('/api/admin/all-shows', {
        headers: { Authorization: `Bearer ${await getToken()}` }
      });

      console.log("All Shows Response:", data); // ✅ For debugging
      setShows(data.shows || []);
    } catch (error) {
      console.error("Error fetching shows:", error);
    } finally {
      setLoading(false); // ✅ Always stop loading
    }
  };

  useEffect(() => {
    if (user) {
      getAllShows();
    }
  }, [user]);

  return !loading ? (
    <>
      <Title text1="List" text2="Shows" />

      <div className='max-w-4xl mt-6 overflow-x-auto'>
        <table className='w-full border-collapse rounded-md overflow-hidden text-nowrap'>
          <thead>
            <tr className='bg-[#ef4444]/25 text-left text-white'>
              <th className='p-2 font-medium pl-5'>Movie Name</th>
              <th className='p-2 font-medium'>Show Time</th>
              <th className='p-2 font-medium'>Total Bookings</th>
              <th className='p-2 font-medium'>Earnings</th>
            </tr>
          </thead>
          <tbody className='text-sm font-light'>
            {shows.length > 0 ? (
              shows.map((show, index) => {
                const movie = show.movie;
                const bookingsCount = show.occupiedSeats ? Object.keys(show.occupiedSeats).length : 0;
                const earnings = bookingsCount * (show.showPrice || 0);

                return (
                  <tr key={index} className='bg-[#ef4444]/7 border border-[#ef4444]/10 even:bg-[#ef4444]/14'>
                    <td className='p-2 min-w-45 pl-5'>
                      {movie ? movie.title : 'Unknown Movie'}
                    </td>
                    <td className='p-2'>
                      {show.showDateTime ? dateFormat(show.showDateTime) : 'N/A'}
                    </td>
                    <td className='p-2'>{bookingsCount}</td>
                    <td className='p-2'>
                      {currency} {earnings}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-400">
                  No active shows to display.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default ListShows;
