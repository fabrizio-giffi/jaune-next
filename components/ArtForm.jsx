import React, { useEffect, useState } from "react";

function ArtForm({ art }) {
  const [url, setUrl] = useState(art.url || "");
  const [name, setName] = useState(art.name || "");
  const [year, setYear] = useState(art.year || 0);
  const [description, setDescription] = useState(art.description || "");
  const [technique, setTechnique] = useState(art.technique || "");
  const [height, setHeight] = useState(art.size?.height || 0);
  const [width, setWidth] = useState(art.size?.width || 0);

  const [sale, setSale] = useState(art.sale || []);
  const [toggleFormats, setToggleFormats] = useState([]);

  const [originalPrice, setOriginalPrice] = useState(0);
  const [posterPrice, setPosterPrice] = useState(0);
  const [postCardPrice, setPostCardPrice] = useState(0);

  const [apiResponse, setApiResponse] = useState({});
  const [showDelete, setShowDelete] = useState(false);

  const handleCheckbox = (format, event) => {
    if (!toggleFormats.includes(format)) {
      setToggleFormats([...toggleFormats, format]);
    } else {
      const filteredFormats = toggleFormats.filter((item) => item !== format);
      setToggleFormats(filteredFormats);
    }
    if (!event.target.checked) {
      if (format === "original") setOriginalPrice(0);
      if (format === "poster") setPosterPrice(0);
      if (format === "postcard") setPostCardPrice(0);
    }
  };

  const getPrices = () => {
    sale.forEach((format) => {
      if (format.format === "original") setOriginalPrice(format.price);
      if (format.format === "poster") setPosterPrice(format.price);
      if (format.format === "postcard") setPostCardPrice(format.price);
    });
  };

  useEffect(() => {
    getPrices();
    let formats = [];
    sale.forEach((format) => formats.push(format.format));
    setToggleFormats(formats);
  }, [sale]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let saleList = [];

    toggleFormats.forEach((item) => {
      if (item === "original" && originalPrice !== 0) saleList.push({ format: "original", price: parseInt(originalPrice) });
      if (item === "poster" && posterPrice !== 0) saleList.push({ format: "poster", price: parseInt(posterPrice) });
      if (item === "postcard" && postCardPrice !== 0) saleList.push({ format: "postcard", price: parseInt(postCardPrice) });
    });

    const payload = {
      url,
      name,
      year,
      description,
      technique,
      size: { height, width },
      sale: saleList,
    };

    const apiUrl = art._id ? `http://localhost:5005/api/art/item/${art._id}` : "http://localhost:5005/api/create";
    const apiMethod = art._id ? "PATCH" : "POST";

    const response = await fetch(apiUrl, {
      method: apiMethod,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const parsed = await response.json();
    if (response.status === 200 || response.status === 201) {
      setApiResponse({ status: "success", message: parsed.message });
    }
    if (response.status === 400) {
      setApiResponse({ status: "error", message: response.message });
    }
  };

  const handleDelete = async (id, event) => {
    event.preventDefault();

    const response = await fetch(`http://localhost:5005/api/art/item/${id}`, {
      method: "DELETE",
    });
    const parsed = response.json();
    if (response.status === 200 || response.status === 201) {
      setApiResponse({ status: "success", message: parsed.message });
    }
    if (response.status === 400) {
      setApiResponse({ status: "error", message: response.message });
    }
  };

  return (
    <>
      <form className="flex-col m-auto md:w-1/2" method="" action="">
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
            <option defaultValue="">Select the technique</option>
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
          <input
            type="checkbox"
            checked={toggleFormats.includes("original")}
            onChange={(event) => handleCheckbox("original", event)}
          />
          <input
            className="border-2 rounded-sm"
            type="number"
            placeholder="Price for original"
            disabled={!toggleFormats.includes("original")}
            value={originalPrice}
            onChange={(event) => setOriginalPrice(event.target.value)}
          />
        </label>
        <br />
        <label>
          Poster
          <input
            type="checkbox"
            checked={toggleFormats.includes("poster")}
            onChange={(event) => handleCheckbox("poster", event)}
          />
          <input
            className="border-2 rounded-sm"
            type="number"
            placeholder="Price for poster"
            disabled={!toggleFormats.includes("poster")}
            value={posterPrice}
            onChange={(event) => setPosterPrice(event.target.value)}
          />
        </label>
        <br />
        <label>
          Postcard
          <input
            type="checkbox"
            checked={toggleFormats.includes("postcard")}
            onChange={(event) => handleCheckbox("postcard", event)}
          />
          <input
            className="border-2 rounded-sm"
            type="number"
            placeholder="Price for postcard"
            disabled={!toggleFormats.includes("postcard")}
            value={postCardPrice}
            onChange={(event) => setPostCardPrice(event.target.value)}
          />
        </label>
        <button className="border-2 bg-yellow-200 mt-4 px-2 py-1" type="submit" onClick={handleSubmit}>
          {art._id ? "Edit Item" : "Create Item"}
        </button>
        {art._id && (
          <button className="border-2 bg-yellow-200 mt-4 px-2 py-1" type="button" onClick={() => setShowDelete(true)}>
            Delete Item
          </button>
        )}
        {showDelete && (
          <dialog>
            <button type="button" onClick={() => setShowDelete(false)}>
              Cancel
            </button>
            <button type="submit" onClick={(event) => handleDelete(art._id)}>
              Cancel
            </button>
          </dialog>
        )}
      </form>
      {apiResponse.status === "success" && <div>{apiResponse.message}</div>}
      {apiResponse.status === "error" && <div>{apiResponse.message}</div>}
    </>
  );
}

export default ArtForm;
