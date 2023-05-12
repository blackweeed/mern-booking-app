import { useState } from "react";

const Wishlist = () => {
  const [data, setData] = useState([]);

  return (
    <div className="px-[7%]">
      <h1 className="text-2xl">Wishlist</h1>
      <div className="flex">
        {data?.map((place) => (
          <div>elo</div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
