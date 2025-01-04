import React from 'react';
import AppNavbar from './components/AppNavbar';
import AnimeList from './components/AnimeList';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Authors from './components/authors/Authors';
// import Authors from './components/Authors';

const App: React.FC = () => {
  return(
    <div>
      <ToastContainer
				autoClose={3000}
				theme="colored"
				hideProgressBar={true}
			/>
      <AppNavbar />
      <section className='my-5 mx-8'>
        <Routes>
          <Route path="/authors" element={<Authors />} />
          <Route path="/" element={<AnimeList />} />
        </Routes>
      </section>
    </div>)
};

export default App;
 