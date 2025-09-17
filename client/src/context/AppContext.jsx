// import { Children, createContext, useContext, useEffect, useState } from "react";
// import axios from "axios"
// import { useAuth, useUser } from "@clerk/clerk-react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


// axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

// export const AppContext = createContext()

// export const AppProvider = ({children}) => {

//      const [isAdmin,setIsAdmin] = useState(false)
//      const [shows,setShows] = useState([])
//      const [favoriteMovies,setFavoriteMovies] = useState([])

//     const {user} = useUser();
//     const {getToken} = useAuth()
//     const location = useLocation()
//     const navigate = useNavigate()

//     const fetchIsAdmin = async () =>{
//         try{


//             const {data} = await axios.get('/api/admin/is-admin',{headers:{Authorization:`Bearer ${await getToken()}`}})
//             setIsAdmin(data.isAdmin)

//             if(!data.isAdmin && location.pathname.startsWith('/admin')){
//                 navigate('/')
//                 toast.error('You are not authorized to access admin dashboard')
//             }
//         }catch(error){
//             console.error(error);
            
//         }
//     }




//     const fetchShows = async () => {
//         try{
//             const {data} = await axios.get('/api/show/all')
//             if(data.success){
//                 setShows(data.shows)
//             }
//             else{
//                 toast.error(data.message)
//             }
//         }catch(error){
//             console.error(error);
            
//         }
//     }

//     const fetchFavoriteMovies = async () => {

//         try{
//         const {data} = await axios.get('/api/user/favorites',{headers:{Authorization:`Bearer ${await getToken()}`}})
//         if(data.success){
//             setFavoriteMovies(data.movies)
//         }else{
//             toast.error(data.movies)
//         }
//         }catch(error){
//         console.error(error);
            
//         }
//     }


//    useEffect(() => {
//     if(user){
//         fetchIsAdmin();
//         fetchFavoriteMovies();
//     }
//    },[user])

//     useEffect(()=>{
//         fetchShows()
       
//     },[])




//     useEffect(() => {
//   toast.success("Toast is working!");
// }, []);


//     const value = {
//         axios,
//         fetchIsAdmin,
//         user,getToken,navigate,isAdmin,shows,
//         favoriteMovies,fetchFavoriteMovies
//     }
//     return(
//         <AppContext.Provider value={value}>
//             {children}
//         </AppContext.Provider>
//     )
// }

// export const useAppContext = () => useContext(AppContext)





import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(null);
    const [shows, setShows] = useState([]);
    const [favoriteMovies, setFavoriteMovies] = useState([]);

    const image_base_url = import.meta.env.VITE_TMDB_IMAGE_BASE_URL

    const { user } = useUser();
    const { getToken } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const fetchIsAdmin = async () => {
        try {
            const token = await getToken();
            const { data } = await axios.get('/api/admin/is-admin', {
                headers: { Authorization: `Bearer ${token}` }
            });

            setIsAdmin(data.isAdmin === true);

            if (!data.isAdmin && location.pathname.startsWith('/admin')) {
                navigate('/');
                toast.error('You are not authorized to access admin dashboard');
            }
        } catch (error) {
            console.error('Error checking admin status:', error);
            toast.error('Failed to verify admin status');
            setIsAdmin(false);
        }
    };

    const fetchShows = async () => {
        try {
            const { data } = await axios.get('/api/show/all');
            if (data.success) {
                setShows(data.shows);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Error fetching shows:', error);
            toast.error('Failed to fetch shows');
        }
    };

    const fetchFavoriteMovies = async () => {
        try {
            const token = await getToken();
            const { data } = await axios.get('/api/user/favorites', {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (data.success) {
                setFavoriteMovies(data.movies);
            } else {
                toast.error(data.message || 'Failed to load favorite movies');
            }
        } catch (error) {
            console.error('Error fetching favorite movies:', error);
            toast.error('Failed to fetch favorite movies');
        }
    };

    // Fetch admin status on route change
    useEffect(() => {
        fetchIsAdmin();
    }, [location.pathname]);

    // Fetch shows on first load
    useEffect(() => {
        fetchShows();
    }, []);

    // Fetch favorites when user is available
    useEffect(() => {
        if (user) {
            fetchFavoriteMovies();
        }
    }, [user]);

    const value = {
        axios,
        fetchIsAdmin,
        user,
        getToken,
        navigate,
        isAdmin,
        shows,
        favoriteMovies,
        fetchFavoriteMovies,
        image_base_url
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
