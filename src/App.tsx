import React from 'react';
import AppNavbar from './components/AppNavbar';
import AnimeList from './components/AnimeList';

const App: React.FC = () => {
  return <div>
    <AppNavbar />
    <section className='my-5 mx-8'>
      <AnimeList />
    </section>
  </div>;
};

export default App;
 