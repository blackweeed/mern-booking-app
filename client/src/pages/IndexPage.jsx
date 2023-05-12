import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const IndexPage = () => {
  const [places, setPlaces] = useState([]);
  const [users, setUsers] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isInWishlist, setIsInWishlist] = useState({});
  const [currentUser, setCurrentUser] = useState(null);

  console.log(currentUser);

  useEffect(() => {
    axios
      .get("/auth/user")
      .then((response) => {
        setCurrentUser(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios.get("/places").then((response) => {
      setPlaces(response.data);
    });
    axios.get("/users").then((response) => {
      setUsers(response.data);
    });
  }, []);

  // pobranie danych zalogowanego użytkownika z serwera
  useEffect(() => {
    axios.get("/auth/user").then((response) => {
      setCurrentUser(response.data);
      setWishlist(response.data.wishlist || []); // wczytanie listy życzeń użytkownika
    });
  }, []);

  // dodanie/usunięcie miejsca z listy życzeń
  function handleWishlist(place) {
    if (!currentUser) {
      alert("You need to log in to add places to your wishlist.");
      return;
    }

    const action = isInWishlist[place._id] ? "remove" : "add";

    axios
      .post("/wishlist", {
        placeId: place._id,
        userId: currentUser._id,
        action: action,
      })
      .then((response) => {
        if (response.data.success) {
          if (action === "add") {
            setWishlist([...wishlist, place]);
          } else {
            setWishlist(
              wishlist.filter((wishedPlace) => wishedPlace._id !== place._id)
            );
          }
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-[7%]">
      {places.length > 0 &&
        places.map((place) => {
          const placeOwner = users.find((user) => user._id === place.owner);
          const isWishlisted = wishlist.some(
            (wishedPlace) => wishedPlace._id === place._id
          );

          return (
            <Link to={""}>
              {/* <Link to={"/place/" + place._id}> */}
              <div className="bg-gray-500 mb-2 rounded-2xl flex relative">
                {place.photos?.[0] && (
                  <img
                    className="rounded-2xl aspect-square object-cover"
                    src={"http://localhost:4000/uploads/" + place.photos?.[0]}
                    alt=""
                  />
                )}
                <div className="absolute bottom-4 left-4 border-2 border-white/70 w-12 h-12 rounded-full overflow-hidden shadow-md">
                  <img
                    className="object-cover w-full h-full "
                    src={placeOwner?.photo}
                    alt="owner photo"
                  />
                </div>
                <button
                  onClick={() => handleWishlist(place)}
                  className="absolute top-4 right-4 bg-transparent hover:scale-110"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg "
                    fill={isInWishlist[place._id] ? "#ff385c" : "#00000084"}
                    viewBox="0 0 24 24"
                    strokeWidth={1.2}
                    stroke="#ffffffbe"
                    className="w-7 h-7 "
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                </button>
              </div>
              <h2 className="font-bold ">{place.address}</h2>
              <h3 className="text-sm text-black/70">{place.title}</h3>
              <div className="mt-1">
                <span className="font-bold">${place.price}</span> per night
              </div>
            </Link>
          );
        })}
    </div>
  );
};

export default IndexPage;
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const IndexPage = () => {
//   const [places, setPlaces] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [wishlist, setWishlist] = useState([]);
//   const [isInWishlist, setIsInWishlist] = useState({});

//   useEffect(() => {
//     axios.get("/places").then((response) => {
//       setPlaces(response.data);
//     });
//   }, []);
//   useEffect(() => {
//     axios.get("/users").then((response) => {
//       setUsers(response.data);
//     });
//   }, []);

//   function addToWishlist(item) {
//     setWishlist([...wishlist, item]);
//   }

//   function removeFromWishlist(item) {
//     setWishlist(wishlist.filter((place) => place._id !== item._id));
//   }

//   useEffect(() => {
//     const isInWishlistObj = {};
//     wishlist.forEach((item) => {
//       isInWishlistObj[item._id] = true;
//     });
//     setIsInWishlist(isInWishlistObj);
//   }, [wishlist]);

//   return (
//     <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-[7%]">
//       {places.length > 0 &&
//         places.map((place) => {
//           const placeOwner = users.find((user) => user._id === place.owner);
//           const isWishlisted = wishlist.some(
//             (wishedPlace) => wishedPlace._id === place._id
//           );

//           return (
//             <Link to={""}>
//               {/* <Link to={"/place/" + place._id}> */}
//               <div className="bg-gray-500 mb-2 rounded-2xl flex relative">
//                 {place.photos?.[0] && (
//                   <img
//                     className="rounded-2xl aspect-square object-cover"
//                     src={"http://localhost:4000/uploads/" + place.photos?.[0]}
//                     alt=""
//                   />
//                 )}
//                 <div className="absolute bottom-4 left-4 border-2 border-white/70 w-12 h-12 rounded-full overflow-hidden shadow-md">
//                   <img
//                     className="object-cover w-full h-full "
//                     src={placeOwner?.photo}
//                     alt="owner photo"
//                   />
//                 </div>
//                 <button
//                   onClick={() => {
//                     isWishlisted
//                       ? removeFromWishlist(place)
//                       : addToWishlist(place);
//                   }}
//                   className="absolute top-4 right-4 bg-transparent hover:scale-110"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg "
//                     fill={isInWishlist[place._id] ? "#ff385c" : "#00000084"}
//                     viewBox="0 0 24 24"
//                     strokeWidth={1.2}
//                     stroke="#ffffffbe"
//                     className="w-7 h-7 "
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
//                     />
//                   </svg>
//                 </button>
//               </div>
//               <h2 className="font-bold ">{place.address}</h2>
//               <h3 className="text-sm text-black/70">{place.title}</h3>
//               <div className="mt-1">
//                 <span className="font-bold">${place.price}</span> per night
//               </div>
//             </Link>
//           );
//         })}
//     </div>
//   );
// };

// export default IndexPage;
