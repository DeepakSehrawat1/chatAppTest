import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex justify-center ">
      <Link className="p-4" to="/register">
        Register
      </Link>
      <Link className="p-4" to="/login">
        Login
      </Link>
    </div>
  );
};

export default Home;
