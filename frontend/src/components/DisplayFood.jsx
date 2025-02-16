import {useMenuSelectionStore} from '../store/useMenuSelectionStore';
import FoodItem from './FoodItem';

const DisplayFood = () => {
    const {foodDisplay, category, fetchingFood} = useMenuSelectionStore();
    
    
    if(fetchingFood){
      return (
        <div>Loading...</div>
      )
    }
    
  return (
    <div className='md:px-10 px-5 pb-10'>
        <h2 className=' font-bold text-2xl py-4 text-center'>Top Dishies Near You</h2>
        <div className='flex flex-wrap gap-5 justify-center'>
        {foodDisplay.map((food, index) => 
        {
          if(category === "All" || category === food.category){
            return <FoodItem key={index} id={food._id} name={food.name} image={food.image} price={food.price} description={food.description} category={food.category}/>
          }
        }
        )}
        </div>
    </div>
  )
}

export default DisplayFood