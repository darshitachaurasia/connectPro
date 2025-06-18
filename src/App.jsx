import {login,logout} from './redux/authSlice';
import {useDispatch} from 'react-redux';
import {useState,useEffect} from 'react';
import authService from './appwrite/auth';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';


function App() {
  const[loading,setLoading] = useState(false);
  const dispatch = useDispatch();
 useEffect(() => {
  setLoading(true); // just in case
  authService.getCurrentUser()
    .then((userData) => {
      console.log("User from Appwrite:", userData);
      if (userData) {
        dispatch(login(userData));
      } else {
        dispatch(logout());
      }
    })
    .catch((err) => {
      console.error("Error fetching user", err);
    })
    .finally(() => {
      setLoading(false);
    });
}, [dispatch]);

  return !loading ? (
    <div className="flex flex-wrap content-between min-h-screen bg-[#2d0727]">
      <div className="w-full block">
        <Header/>
        <main>
          <Outlet/>
        </main>
        
      </div>
    </div>
  ) : null;
}

export default App;
