import Stats from "./Stats";

const Drawer = () => {
  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label
          htmlFor="my-drawer"
          className="btn btn-primary rounded-full drawer-button z-50 absolute"
        >
          {/* Hamburger icon */}
          <svg
            className="swap-off fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 512 512"
          >
            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
          </svg>
        </label>
      </div>
      <div className="drawer-side z-20 overflow-hidden">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className=" p-8 w-[85vw] sm:w-[60vw] min-h-full bg-primary lg:w-[50vw] xl:w-[45vw] text-base-content flex flex-col justify-between">
          {/* Sidebar content here */}
          <div className="mt-20 pb-8 flex-1 flex flex-col justify-between overflow-x-scroll">
            <h2 className="text-8xl text-base-200 font-extrabold">
              CRUDS PROJECT.
            </h2>
            <h2 className="text-lg text-base-200 font-semibold">
              The full stack coding assignment :{" "}
              <span className="text-xl font-extrabold">
                Venkatesh Sirigineedi
              </span>
            </h2>
          </div>
          {/* Tech stacks status bar */}
          <Stats />
        </div>
      </div>
    </div>
  );
};

export default Drawer;
