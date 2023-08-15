import React, { useState } from "react";

function NewArtForm() {
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [year, setYear] = useState(0);
  const [description, setDescription] = useState("");
  const [technique, setTechnique] = useState("");
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  const [formats, setFormats] = useState([]);

  const [originalPrice, setOriginalPrice] = useState(0);
  const [posterPrice, setPosterPrice] = useState(0);
  const [postCardPrice, setPostCardPrice] = useState(0);

  const [apiResponse, setApiResponse] = useState({});

  const handleFormats = (format) => {
    if (!formats.includes(format)) {
      setFormats([...formats, format]);
    } else {
      let filteredFormats = formats.filter((item) => item !== format);
      setFormats(filteredFormats);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let sale = [];
    
    formats.forEach((item) => {
      item === "original" && sale.push({ format: item, price: originalPrice });
      item === "poster" && sale.push({ format: item, price: posterPrice });
      item === "postcard" && sale.push({ format: item, price: postCardPrice });
    });

    const payload = {
      url,
      name,
      year,
      description,
      technique,
      size: { height, width },
      sale,
    };
    const response = await fetch("http://localhost:5005/api/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const parsed = await response.json();
    if (response.status === 201) {
      setApiResponse({ status: "success", message: parsed.message });
    }
    if (response.status === 400) {
      setApiResponse({ status: "error", message: response.message });
    }
  };
  return (
    <>
      <form className="flex-col m-auto md:w-1/2" method="POST" action="http://localhost:5005/api/create">
        <label>
          URL
          <input
            className="border-2 rounded-sm w-full"
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
            <option defaultValue="">
              Select the technique
            </option>
            <option value="acryl leinwand">Acryl Leinwand</option>
            <option value="bleistift">Bleistift</option>
            <option value="federzeichnung mit tinte">Federzeichnung mit Tinte</option>
            <option value="acryl holz">Acryl Holz</option>
            <option value="buntstift">Buntstift</option>
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
          <input type="checkbox" onChange={() => handleFormats("original")} />
          <input
            className="border-2 rounded-sm"
            type="number"
            placeholder="Price for original"
            disabled={!formats.includes("original")}
            value={originalPrice}
            onChange={(event) => setOriginalPrice(event.target.value)}
          />
        </label>
        <br />
        <label>
          Poster
          <input type="checkbox" onChange={() => handleFormats("poster")} />
          <input
            className="border-2 rounded-sm"
            type="number"
            placeholder="Price for poster"
            disabled={!formats.includes("poster")}
            value={posterPrice}
            onChange={(event) => setPosterPrice(event.target.value)}
          />
        </label>
        <br />
        <label>
          Postcard
          <input type="checkbox" onChange={() => handleFormats("postcard")} />
          <input
            className="border-2 rounded-sm"
            type="number"
            placeholder="Price for postcard"
            disabled={!formats.includes("postcard")}
            value={postCardPrice}
            onChange={(event) => setPostCardPrice(event.target.value)}
          />
        </label>
        <button className="border-2 bg-yellow-200 mt-4 px-2 py-1" type="submit" onClick={handleSubmit}>
          Create new Item
        </button>
      </form>
      {apiResponse.status === "success" && <div>{apiResponse.message}</div>}
      {apiResponse.status === "error" && <div>{apiResponse.message}</div>}
    </>
  );
}

export default NewArtForm;
