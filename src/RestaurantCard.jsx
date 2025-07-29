import "./RestaurantCard.css";

function RestaurantCard({ restaurant }) {
  return (
    <div className="card">
      <div className="card-photos">
        {restaurant.photos.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`${restaurant.name} photo ${index + 1}`}
            className="card-image"
          />
        ))}
      </div>
      <div className="card-info">
        <h2 className="card-name">{restaurant.name}</h2>
        <p className="card-cuisine">{restaurant.cuisine}</p>
        <p className="card-price">{restaurant.price}</p>
      </div>
    </div>
  );
}

export default RestaurantCard;
