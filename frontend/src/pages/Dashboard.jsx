import GetOders from '../components/GetOders';
import ListMenus from '../components/ListMenus';
import ManageMenu from '../components/ManageMenu'
const Dashboard = () => {
  

  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <div className="flex-1 p-3 ">
        <h1 className="text-3xl font-semibold mb-4">Dashboard</h1>
        <div className="md:flex gap-4 space-y-4 md:space-y-0">
          {/* Cards for Dashboard Stats */}
          <div className="card w-full bg-base-200 shadow-lg p-4">
            <h2 className="text-xl font-semibold">Total Orders</h2>
            <p className="text-3xl text-center">120</p>
          </div>
          <div className="card w-full bg-base-200 shadow-lg p-4">
            <h2 className="text-xl font-semibold">New Customers</h2>
            <p className="text-3xl text-center">25</p>
          </div>
          <div className="card w-full bg-base-200 shadow-lg p-4">
            <h2 className="text-xl font-semibold">Revenue</h2>
            <p className="text-3xl text-center">$1,500</p>
          </div>
        </div>
        
        <div role="tablist" className="tabs tabs-lifted pt-10">
          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab"
            aria-label="AddMenu"
          />
          <div
            role="tabpanel"
            className="tab-content bg-base-100 border-base-300 rounded-box p-3"
          >
           <ManageMenu/>
          </div>

          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab"
            aria-label="MenuList"
            defaultChecked
          />
          <div
            role="tabpanel"
            className="tab-content bg-base-100 border-base-300 rounded-box p-3"
          >
            <ListMenus/>
          </div>

          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab"
            aria-label="Orders"
          />
          <div
            role="tabpanel"
            className="tab-content bg-base-100 border-base-300 rounded-box p-6"
          >
            <GetOders/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
