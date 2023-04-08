import { Link } from "react-router-dom";
import axios from "axios";
import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";

const PlacesPage = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  return (
    <div>
      <AccountNav />
      <div className="text-center">
        <Link
          className="inline-flex gap-1 items-center bg-primary text-white py-2 px-4 rounded-full"
          to={"/account/places/new"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add new place
        </Link>
      </div>
      <div className="mt-4">
        {places.length > 0 &&
          places.map((place) => (
            <Link
              to={"/account/places/" + place._id}
              key={place._id}
              className="flex gap-4 bg-gray-100 p-2 rounded-2xl"
            >
              <div className="w-32 h-32 bg-gray-300 grow shrink-0">
                {place.photos.length > 0 && (
                  <img src={place.photos[0]} alt="" />
                )}
              </div>
              <div className="grow-0 shrink">
                <h2 className="text-xl "> {place.title}</h2>
                <p className="text-sm mt-2 ">
                  Wierzbowa przystań to urokliwe drewniane domki letniskowe,
                  zlokalizowane na Kąpielisku Chorwacja w Jurkowie. Wewnątrz
                  domku znajduje się otwarty salon, kuchnia, oddzielna sypialnia
                  na parterze, łazienka oraz sypialnia na antresoli. Domki są
                  nowoczesne i w pełni wyposażone w potrzebne sprzęty. Sauna i
                  jacuzzi znajduje się w osobnym budynku obok domków ( dodatkowa
                  opłata).
                </p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default PlacesPage;
