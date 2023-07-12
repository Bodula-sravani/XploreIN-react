import React from "react";

export const CarouselCard = ({ image2 }) => {
  return (
    <>
      <div className="flex justify-center w-full items-center">
        <div className="p-10 w-[50%] mb-5">
          <img
            className="object-fit h-[60vh] w-[50vw] rounded-3xl shadow-2xl"
            src={image2}
            alt={image2}
          />
        </div>
      </div>
    </>
  );
};
