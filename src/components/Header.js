import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-600 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link to="/" className="font-bold text-xl">
          Andika
        </Link>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <Link
            to="/"
            className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-200 mr-4"
          >
           Notes 
          </Link>
          <Link
            to="/create"
            className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-200 mr-4"
          >
            Create Note
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Header;
