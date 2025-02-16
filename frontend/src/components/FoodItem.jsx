
import PropTypes from "prop-types";
import { useMenuSelectionStore } from "../store/useMenuSelectionStore";

const FoodItem = ({ id, name, image, price, description, category, }) => {

  const {addToCart} = useMenuSelectionStore();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const items = {
      foodId: id,
      name,
      image,
      price,
      quantity: 1,
    }
    await addToCart(items)
  }

  return (
    <div className="card card-compact bg-base-300 w-72 shadow-xl">
      <figure>
        <img className=" rounded-t-lg w-full" src={image} alt={name} />
        
      </figure>
      <div className="card-body">
        
        <h2 className="card-title">{name}</h2>
        <p>{description}</p>
        <h4 className=" font-bold text-[16px]">Price : {price} Rs.</h4>
        <p className="badge badge-neutral text-[14px]">Category : {category}</p>
        <div className="card-actions justify-end">
          <button onClick={handleSubmit} className="btn btn-primary">Add to Cart</button>
        </div>
      </div>
    </div>
  )
}

FoodItem.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string,
  category: PropTypes.string.isRequired,
};

export default FoodItem