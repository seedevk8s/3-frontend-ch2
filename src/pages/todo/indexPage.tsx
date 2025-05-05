import { Outlet } from "react-router";


function IndexPage() {
  return ( 
    <div>
      <div className="w-full flex m-2 p-2">
        <div className="text-xl m-1 p-2 w-20 font-extrabold text-center underline">
          LIST
        </div>
        <div className="text-xl m-1 p-2 w-20 font-extrabold text-center underline">
          ADD
        </div>        
      </div>
      <div className="flex flex-wrap w-full">
        <Outlet />
      </div>

    </div>

   );
}

export default IndexPage;