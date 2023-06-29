"use client";

import React, { useState } from "react";

function page() {
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [year, setYear] = useState(0);
  const [description, setDescription] = useState("");
  const [technique, setTechnique] = useState("");
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  const [original, setOriginal] = useState(true);
  const [poster, setPoster] = useState(true);
  const [postCard, setPostCard] = useState(true);

  const [originalPrice, setOriginalPrice] = useState(0);
  const [posterPrice, setPosterPrice] = useState(0);
  const [postCardPrice, setPostCardPrice] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
  };

  return (
    <div className="m-3">
      <h1 className="text-3xl text-center font-bold">Admin panel</h1>
      <form className="flex-col justify-items-center" method="POST" action="http://localhost:5005/api/create">
        <label>
          URL
          <input
            className="border-2 rounded-sm w-full "
            type="text"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            required
          />
        </label>
        <label>
          Name
          <input
            className="border-2 rounded-sm w-full "
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </label>
        <label>
          Year
          <input
            className="border-2 rounded-sm w-full "
            type="text"
            value={year}
            onChange={(event) => setYear(event.target.value)}
          />
        </label>
        <label>
          Description
          <input
            className="border-2 rounded-sm w-full "
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </label>
        <label>
          Technique
          <select
            className=" border-2 rounded-sm w-full "
            type="text"
            value={technique}
            onChange={(event) => setTechnique(event.target.value)}
            required
          >
            <option>acryl leinwand</option>
            <option>bleistift</option>
            <option>federzeichnung mit tinte</option>
            <option>acryl holz</option>
            <option>buntstift</option>
          </select>
        </label>
        <label>
          Height
          <input
            className="border-2 rounded-sm w-full"
            type="number"
            value={height}
            onChange={(event) => setHeight(event.target.value)}
            required
          />
        </label>
        <label>
          Width
          <input
            className="border-2 rounded-sm w-full"
            type="number"
            value={width}
            onChange={(event) => setWidth(event.target.value)}
            required
          />
        </label>
        <h4>Sale</h4>
        <label>
          Original
          <input type="checkbox" onChange={() => setOriginal(!original)} />
          <input
            className="border-2 rounded-sm"
            type="number"
            placeholder="Price for original"
            disabled={original}
            value={originalPrice}
            onChange={(event) => setOriginalPrice(event.target.value)}
          />
        </label>
        <br />
        <label>
          Poster
          <input type="checkbox" onChange={() => setPoster(!poster)} />
          <input
            className="border-2 rounded-sm"
            type="number"
            placeholder="Price for poster"
            disabled={poster}
            value={posterPrice}
            onChange={(event) => setPosterPrice(event.target.value)}
          />
        </label>
        <br />
        <label>
          Postcard
          <input type="checkbox" onChange={() => setPostCard(!postCard)} />
          <input
            className="border-2 rounded-sm"
            type="number"
            placeholder="Price for postcard"
            disabled={postCard}
            value={postCardPrice}
            onChange={(event) => setPostCardPrice(event.target.value)}
          />
        </label>
        <button className="border-2 bg-yellow-200 mt-4 px-2 py-1" type="submit" onClick={handleSubmit}>
          Create new Item
        </button>
      </form>
    </div>
  );
}

export default page;
