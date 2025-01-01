import React from 'react';
import AppNavbar from './components/AppNavbar';
import AnimeList from './components/AnimeList';
import { ToastContainer } from 'react-toastify';

const App: React.FC = () => {
  return <div>
    <ToastContainer
				autoClose={3000}
				theme="colored"
				hideProgressBar={true}
			/>
    <AppNavbar />
    <section className='my-5 mx-8'>
      <AnimeList />
    </section>
  </div>;
};

export default App;
 