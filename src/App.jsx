import {login,logout} from './redux/authSlice';
import {useDispatch} from 'react-redux';
import {useState,useEffect} from 'react';
import authService from './appwrite/auth';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const[loading,setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login(userData));
      }else{
        dispatch(logout());
      }
    }).finally(()=>{
      setLoading(false);
    })
  },[dispatch])
  return !loading ? (
    <div className="flex flex-wrap content-between min-h-screen bg-[#2d0727]">
      <div className="w-full block">
        <Header/>
        <main>
          <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  ) : null;
}

export default App;
