import { Outlet } from "react-router";


function IndexPage() {
  return ( 
    <div className="bg-amber-400 h-9">
      Todo Index Page
      <Outlet />
    </div>

   );
}

export default IndexPage;