import { useState } from "react";
import { useMenuAddStore } from "../store/useMenuAddStore";

const ManageMenus = () => {
    const [formData, setformData] = useState({
        name : '',
        price : '',
        description : '',
        category : '',
    })
    const [image, setImage] = useState(null);

    const {addMenuItems} = useMenuAddStore();

    const handleChange = (e) => {
        setformData({ ...formData, [e.target.name]: e.target.value });
      };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if(file){
            setImage(file);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!image) return alert("Please select an image!");

        const data = new FormData();
        data.append('name', formData.name);
        data.append('price', formData.price);
        data.append('description', formData.description);
        data.append('category', formData.category);
        data.append('image', image);

        addMenuItems(data);
    }

  return (
    <div className="p-5 flex justify-center">
    <form onSubmit={handleSubmit} className="w-full max-w-md p-6 bg-base-200 rounded-lg shadow-lg">
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
        <input type="file" name="image" onChange={handleImageChange} className="file-input file-input-bordered w-full" accept="image/*" required />
      </div>

      <div className="pt-4">
        <button type="submit" className="btn btn-success w-full">Add Menu</button>
      </div>
    </form>
  </div>
  )
}

export default ManageMenus