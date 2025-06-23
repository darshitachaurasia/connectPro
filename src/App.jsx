import { Outlet } from 'react-router-dom';
import Header from './components/Header';

function App() {
  return (
    <div className="flex flex-wrap content-between min-h-screen bg-[#2d0727]">
      <div className="w-full block">
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App;
