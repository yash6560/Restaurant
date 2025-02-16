import { useEffect, useState } from "react";
import { useMenuSelectionStore } from "../store/useMenuSelectionStore";

const ExploreMenu = () => {
  const {chooseCategory, menuListe, menuItems} = useMenuSelectionStore();
  const [choose, setChoose] = useState()

  useEffect(() => {
    const list = async() =>{
      await menuListe();
    }
    list();
  }, [menuListe])  

  return (
    <div className="container mx-auto text-center py-10 px-3">
      <h2 className="text-3xl font-bold mb-6">Order our best food options</h2>
      <div className="flex overflow-x-auto space-x-6 p-4">
        {menuItems.map((item, index) => (
          <div key={index} className="flex flex-col items-center flex-shrink-0 w-28">
            
            <button onClick={() => chooseCategory(item.menu_name)}><img onClick={() => setChoose(item.menu_name)}
              src={item.menu_image}
              alt={item.menu_name}
              className={`w-24 h-24 object-cover rounded-full shadow-md ${choose == item.menu_name ? "opacity-50 shadow-black border-success border-[5px]" : "" }`}
            /></button>
            <h3 className="mt-2 text-md font-semibold">{item.menu_name}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ExploreMenu