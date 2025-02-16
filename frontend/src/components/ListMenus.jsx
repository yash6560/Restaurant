import { useMenuSelectionStore } from "../store/useMenuSelectionStore";
import { useMenuAddStore } from "../store/useMenuAddStore";
import { useState } from "react";
import EditMenu from "./EditMenu";

const ListMenus = () => {
  const { foodDisplay } = useMenuSelectionStore();
  const { removeMenuItems } = useMenuAddStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setselectedItem] = useState(null);

  const openModal = (item) => {
    setselectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setselectedItem(null);
  };

  return (
    <div className="">
      <h2 className="text-2xl font-semibold mb-4">Available Menu</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {foodDisplay.map((item) => (
          <div key={item._id} className="card bg-base-200 shadow-lg p-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-32 object-cover mb-4"
            />
            <h3 className="text-xl font-semibold">{item.name}</h3>
            <p>{item.description}</p>
            <p className="font-bold text-lg">${item.price}</p>
            <p className="text-sm text-gray-500">{item.category}</p>
            <div className="flex gap-2">
              <button onClick={() => openModal(item)} className="btn btn-sm btn-success">
                Edit
              </button>
              <button onClick={() => removeMenuItems(item._id)} className="btn btn-sm btn-error">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <dialog open className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button onClick={closeModal} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <div>
              <EditMenu selectedItem={selectedItem} />
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ListMenus;
