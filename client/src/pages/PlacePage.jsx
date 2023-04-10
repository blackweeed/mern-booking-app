import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "./BookingWidget";

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

      <div className="relative ">
        <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden ">
          <div>
            {place.photos?.[0] && (
              <div>
                <img
                  className=" aspect-square object-cover"
                  src={imagesPath + place.photos?.[0]}
                  alt=""
                />
              </div>
            )}
          </div>
          <div className="grid">
            {place.photos?.[1] && (
              <img
                className="aspect-square object-cover "
                src={imagesPath + place.photos?.[0]}
                alt=""
              />
            )}
            {place.photos?.[2] && (
              <div className="overflow-hidden rounded-br-xl">
                <img
                  className="aspect-square object-cover relative top-2 r "
                  src={imagesPath + place.photos?.[0]}
                  alt=""
                />
              </div>
            )}
          </div>
        </div>
        <button
          onClick={() => setShowAllPhotos(true)}
          className="flex gap-2 items-center absolute bottom-4 right-4 py-2 px-4 bg-white rounded-2xl shadow-md shadow-black/50"
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
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          Show more photos
        </button>
      </div>
      <div className="my-4">
        <h2 className="font-semibold text-2xl">Description</h2>
        <p>{place.description}</p>
      </div>
      <BookingWidget place={place} />
    </div>
  );
};

export default PlacePage;
