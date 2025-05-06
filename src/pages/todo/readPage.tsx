import { useParams } from "react-router";

function ReadPage() {
  const obj = useParams();
  console.log("ReadPage", obj);

  return ( 
    <div className="bg-white w-full">
      <div className="text-4xl">Todo Read Page</div>
    </div>
   );
}

export default ReadPage;