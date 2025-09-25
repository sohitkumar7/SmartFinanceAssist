import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import Header from "../../components/Header";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen">
    <Header/>
    <div className=" flex justify-center items-center mt-55">
        <div >
            <h1 className=" ml-[28%]  font-extrabold text-blue-500ext-5xl md:text-8xl lg:text-[105px]  font-extrabold leading-tight tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
          404
        </h1>
        <h3 className="pt-1">
          ops! The page you're looking for doesn't exist or has been moved,
        </h3>
        <Button className=" mt-4 ml-[36%]" onClick={() => navigate("/")}>Return Home</Button>
        </div>
      </div>
    </div>

  );
}

export default NotFoundPage;