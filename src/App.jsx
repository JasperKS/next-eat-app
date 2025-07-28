import { useState, useEffect} from 'react'; 
import './App.css';
import RestaurantCard from './RestaurantCard.jsx';

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-cards';

function App() {
  // State to hold the list of all restaurants
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/restaurants.json');
      const data = await response.json();
      setRestaurants(data);
    };
    fetchData();
  }, [])

  // Loading message while waiting for data
  if (restaurants.length === 0) {
    return <div>Loading restaurants...</div>;
  }

  return (
    <div className="app-container">
      <h1>NextEat</h1>

      <Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
      >
        {restaurants.map((restaurant) => (
          <SwiperSlide key={restaurant.id}>
            <RestaurantCard restaurant={restaurant} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default App;