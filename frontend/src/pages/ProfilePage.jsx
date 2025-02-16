import { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { MdEdit } from "react-icons/md";

const ProfilePage = () => {
  const { isUpdatingProfile, updateProfile, authUser } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    address: authUser?.address || '',
    city: authUser?.city || '',
    country: authUser?.country || '',
    pincode: authUser?.pincode || '',
    contact: authUser?.contact || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if(file){
      setSelectedImage(file);
    }
}

  const updateUserData = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('address', formData.address);
        data.append('city', formData.city);
        data.append('country', formData.country);
        data.append('pincode', formData.pincode);
        data.append('contact', formData.contact);
        data.append('image', selectedImage);
    await updateProfile(data);
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-10">
      <div className="shadow-lg rounded-lg p-6 w-11/12 md:w-2/3 lg:w-1/2">
        <form onSubmit={updateUserData} className='w-full'>
          <div className="relative flex justify-center w-[135px]">
            <img src={authUser.image || '/avatar.png'} alt='profile' className='size-32 rounded-full object-cover border-4'/>
            <label htmlFor='avatar-upload' className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}`}>
              <MdEdit className='w-8 h-8 rounded-full p-2 btn-success'/>
              <input type='file' id='avatar-upload' className='hidden' accept='image/*' onChange={handleImageChange} disabled={isUpdatingProfile}/>
            </label>
          </div>
          <div className="text-center mt-4">
            <h1 className="text-2xl font-bold">FullName : {authUser.name}</h1>
            <p>Email : {authUser.email}</p>
          </div>
          <div className="mt-6">
            <h2 className="text-lg font-semibold border-b pb-2">Address Information</h2>
            <div className="mt-4 space-y-2">
              {['address', 'city', 'country', 'pincode', 'contact'].map((field) => (
                <div key={field} className="flex items-center justify-between">
                  <span className="font-medium capitalize">{field}</span>
                  <input 
                    onChange={handleChange} 
                    name={field} 
                    value={formData[field]} 
                    type={field === 'pincode' ? 'number' : field === 'contact' ? 'tel' : 'text'} 
                    placeholder={field} 
                    className="input input-bordered w-full max-w-xs" 
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6">
            <h2 className="text-lg font-semibold border-b pb-2">Account Information</h2>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">Member Since:</span>
                <span>{authUser.createdAt?.split("T")[0] || "Not provided"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Status</span>
                <span>Active</span>
              </div>
            </div>
          </div>
          <div className='pt-8'>
            <button className='btn btn-success' type='submit'>{isUpdatingProfile ? "Updating..." : "Update Profile"}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
