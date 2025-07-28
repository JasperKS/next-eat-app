import "./RestaurantCard.css"

function RestaurantCard({ restaurant }) {
  return (
    <div className="card">
      <img
        src={restaurant.image}
        alt={restaurant.name}
        className="card-image"
      />
      <div className="card-info">
        <h2 className="card-name">{restaurant.name}</h2>
        <p className="card-cuisine">{restaurant.cuisine}</p>
        <p className="card-price">{restaurant.price}</p>
      </div>
    </div>
  )
}

export default RestaurantCard;

