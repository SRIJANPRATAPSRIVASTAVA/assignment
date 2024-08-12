import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import Banner from './components/banner';
import Dashboard from './components/dashboard';

function App() {
  const [bannerData, setBannerData] = useState(null);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    fetchBannerData();
  }, []);

  const fetchBannerData = async () => {
    try {
      const response = await axios.get('/api/banner');
      setBannerData(response.data);
      setTimer(response.data.timer)
    } catch (error) {
      console.error('Error fetching banner data:', error);
    }
  };

  const handleUpdateBanner = (newBannerData) => {
    setBannerData(newBannerData);
    setTimer(newBannerData.timer)
  };

  return (
    <Routes>
      <Route path='/' element={<Banner bannerData={bannerData} setBannerData={setBannerData} timer={timer} setTimer={setTimer} />} />
      <Route path='/dashboard' element={<Dashboard onUpdateBanner={handleUpdateBanner} bannerData={bannerData} />} />
    </Routes>
  );
}

export default App;
