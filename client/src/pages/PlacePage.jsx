import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "./BookingWidget";
import PlaceGallery from "../PlaceGallery";

const PlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState();
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  const imagesPath = "http://localhost:4000/uploads/";

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return "";

  if (showAllPhotos) {
    return (
      <div className="absolute bg-white inset-0 min-h-screen">
        <div className="px-8 pb-8 grid gap-4">
          <div className="fixed py-2 w-full bg-white">
            <button
              onClick={() => setShowAllPhotos(false)}
              className="rounded-full p-2 bg-white hover:bg-gray-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="mt-16">
            {" "}
            {place?.photos?.length > 0 &&
              place.photos.map((photo) => (
                <div>
                  <img src={imagesPath + photo} alt="" />
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 bg-gray-50 -mx-8 px-8 py-8">
      <h1 className="text-3xl">{place.title}</h1>
      <a
        className="flex gap-1 my-3 font-semibold underline"
        target="_blank"
        href={`http://maps.google.com/?q=${place.address}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>

        {place.address}
      </a>

      <PlaceGallery place={place} imagesPath={imagesPath} />
      <div className="my-4">
        <h2 className="font-semibold text-2xl">Description</h2>
        <p>{place.description}</p>
      </div>
      <BookingWidget place={place} />
    </div>
  );
};

export default PlacePage;
