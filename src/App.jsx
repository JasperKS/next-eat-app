import { useState, useEffect } from 'react'; 
import './App.css';
import RestaurantCard from './RestaurantCard.jsx';

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-cards';

const formatPriceLevel = (priceLevel) => {
  if (!priceLevel) return 'N/A';
  switch (priceLevel) {
    case 'PRICE_LEVEL_FREE': return 'Free';
    case 'PRICE_LEVEL_INEXPENSIVE': return '$';
    case 'PRICE_LEVEL_MODERATE': return '$$';
    case 'PRICE_LEVEL_EXPENSIVE': return '$$$';
    case 'PRICE_LEVEL_VERY_EXPENSIVE': return '$$$$';
    default: return 'N/A';
  }
};

function App() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

        const searchResponse = await fetch('/api/v1/places:searchText', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': apiKey,
            'X-Goog-FieldMask': 'places.id',
          },
          body: JSON.stringify({
            textQuery: 'restaurants in Toronto',
            maxResultCount: 10,
          }),
        });

        const searchData = await searchResponse.json();
        if (!searchData.places) return;

        const detailPromises = searchData.places.map(place => {
          const detailUrl = `/api/v1/places/${place.id}`;
          const fields = 'id,displayName,types,priceLevel,photos.name';

          return fetch(detailUrl, {
            headers: {
              'X-Goog-Api-Key': apiKey,
              'X-Goog-FieldMask': fields,
            }
          }).then(res => res.json());
        });

        const detailResults = await Promise.all(detailPromises);

        const formattedData = detailResults.map((place) => {
          const photoUrls = (place.photos || []).map(photo =>
            `https://places.googleapis.com/v1/${photo.name}/media?maxHeightPx=400&key=${apiKey}`
          );

          return {
            id: place.id,
            name: place.displayName?.text || 'Name not available',
            photos: photoUrls.length > 0 ? photoUrls : ['https://placehold.co/600x400/orange/white?text=No\nImage'],
            cuisine: place.types?.[0]?.replace(/_/g, ' ') || 'Restaurant',
            price: formatPriceLevel(place.priceLevel),
          };
        });

        setRestaurants(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
  );
}

export default App;
