import { useState } from "react";
import PropTypes from "prop-types";
import { useMenuAddStore } from "../store/useMenuAddStore";

const EditMenu = ({selectedItem}) => {

    const {editMenuItems} = useMenuAddStore();
    
    const [image, setImage] = useState(selectedItem?.image);

    console.log(selectedItem);
    const [formData, setFormData] = useState({
        name: selectedItem?.name || "",
        price: selectedItem?.price || 0,
        category: selectedItem?.category || "Salad",
        description: selectedItem?.description || "",
      });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]:value}))

    }

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if(file){
          setImage(file);
      }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', formData.name);
        data.append('price', formData.price);
        data.append('description', formData.description);
        data.append('category', formData.category);
        data.append('image', image);

        const res = await editMenuItems(selectedItem._id,data);
        console.log(res);
    }

  return (
    <div className="flex justify-center">
    <form onSubmit={handleSubmit} className="w-full max-w-md p-3 bg-base-200 rounded-lg shadow-lg">
      <div className="text-lg font-bold text-center">Add Menu Item</div>

      <div className="pt-4">
        <label>Item Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} className="input input-bordered w-full" placeholder="Item Name" required />
      </div>

      <div className="pt-4">
        <label>Price</label>
        <input type="number" name="price" value={formData.price} onChange={handleChange} className="input input-bordered w-full" placeholder="Item Price" required />
      </div>

      <div className="pt-4">
        <label>Item Category</label>
        <select value={formData.category} onChange={handleChange} name="category" className=" w-full h-10 rounded-lg bg-base-100 outline-1 px-3">
          <option value="Salad">Salad</option>
          <option value="Rolls">Rolls</option>
          <option value="Deserts">Deserts</option>
          <option value="Sandwich">Sandwich</option>
          <option value="Cake">Cake</option>
          <option value="Pure Veg">Pure Veg</option>
          <option value="Pasta">Pasta</option>
          <option value="Noodles">Noodles</option>
        </select>
      </div>

      <div className="pt-4">
        <label>Item Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange} className="textarea textarea-bordered w-full" placeholder="Item Description" required />
      </div>

      <div className="pt-4">
        <label>Item Image</label>
        <input type="file" name="image" onChange={handleImageChange} className="file-input file-input-bordered w-full" accept="image/*" />
      </div>

      <div className="pt-4">
        <button type="submit" className="btn btn-success w-full">Edit Menu</button>
      </div>
    </form>
  </div>
  )
}

EditMenu.propTypes = {
    selectedItem: PropTypes.shape({
         _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      category: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string, // Image could be a URL (string) or null
    }).isRequired,
  };

export default EditMenu