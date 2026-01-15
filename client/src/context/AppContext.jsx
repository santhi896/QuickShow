
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

        if (!token) {
            console.warn("No token found. User might not be logged in.");
            setIsAdmin(false);
            return;
        }

        console.log("Token from Clerk:", token); // ✅ check this in dev tools

        const { data } = await axios.get('/api/admin/is-admin', {
            headers: { Authorization: `Bearer ${token}` }
        });

        console.log("Admin check response:", data);

        setIsAdmin(data.isAdmin);

        if (!data.isAdmin && location.pathname.startsWith('/admin')) {
            navigate('/');
            toast.error('You are not authorized to access admin dashboard');
        }
    } catch (error) {
        console.error('Error checking admin status:', error);

        if (error.response) {
            console.error('Backend response:', error.response.data);
        }

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
        if(user){
        fetchIsAdmin();
         
        }
    }, [user]);

    // Fetch shows on first load
    // useEffect(() => {
    //     if(user){
    //     fetchShows()
    //     }
    // }, [user]);

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
