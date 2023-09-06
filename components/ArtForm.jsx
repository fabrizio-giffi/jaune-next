import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { useRouter } from "next/navigation";

function ArtForm({ art }) {
  const router = useRouter();

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

  const apiPath = "http://localhost:5005/api";

  useEffect(() => {
    getPrices();
    let formats = [];
    sale.forEach((format) => formats.push(format.format));
    setToggleFormats(formats);
  }, [sale]);

  // *** This function makes sure that checkboxes stay consistent with the input values.
  // On the edit view they get pre-checked if a value is already on the DB entry.
  // If a checkbox gets unchecked, the value is reset to 0 to avoid passing data to the create/edit function accidentally ***
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

  // *** This function takes the prices from the sale property of the entry and sets the states accordingly ***
  const getPrices = () => {
    sale.forEach((format) => {
      if (format.format === "original") setOriginalPrice(format.price);
      if (format.format === "poster") setPosterPrice(format.price);
      if (format.format === "postcard") setPostCardPrice(format.price);
    });
  };

  // *** This function will update the file image to the cloudinary folder and set the URL state
  // with the returned value from the backend. ***
  const uploadImage = async (event) => {
    const formdata = new FormData();
    formdata.append("url", event.target.files[0]);

    const requestOptions = {
      method: "POST",
      body: formdata,
    };
    try {
      const response = await fetch(`${apiPath}/upload`, requestOptions);
      const parsed = await response.json();
      setUrl(parsed.fileUrl);
    } catch (error) {
      console.error("Error while uploading the file: ", error);
    }
  };

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

    const apiUrl = art._id ? `${apiPath}/art/item/${art._id}` : `${apiPath}/create`;
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

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete the item?")) {
      try {
        const response = await fetch(`${apiPath}/art/item/${id}`, {
          method: "DELETE",
        });
        const parsed = response.json();
        if (response.status === 200 || response.status === 201) {
          setApiResponse({ status: "success", message: parsed.message });
        } else if (response.status === 400) {
          setApiResponse({ status: "error", message: response.message });
        }
      } catch (err) {
        console.error("There was an error with the request: ", err);
      }
      router.push("/art");
    } else {
      return;
    }
  };

  return (
    <div className="w-full sm:w-3/4 md:w-1/2 xl:w-1/3 ">
      <form className="flex-col mt-3" method="" action="">
        <label className="text-typo-600">
          URL
          <input className="border-2 p-1 rounded-sm w-full" type="file" onChange={(event) => uploadImage(event)} required />
        </label>
        <label>
          Name
          <input
            className="border-2 p-1 rounded-sm w-full"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </label>
        <label>
          Year
          <input
            className="border-2 p-1 rounded-sm w-full"
            type="text"
            value={year}
            onChange={(event) => setYear(event.target.value)}
          />
        </label>
        <label>
          Description
          <input
            className="border-2 p-1 rounded-sm w-full"
            type="text"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </label>
        <label>
          Technique
          <select
            className="border-2 p-1 rounded-sm w-full"
            type="text"
            value={technique}
            onChange={(event) => setTechnique(event.target.value)}
            required
          >
            <option defaultValue="">Select the technique</option>
            <option value="acryl-leinwand">Acryl Leinwand</option>
            <option value="bleistift">Bleistift</option>
            <option value="federzeichnung-mit-tinte">Federzeichnung mit Tinte</option>
            <option value="acryl-holz">Acryl Holz</option>
            <option value="buntstift">Buntstift</option>
          </select>
        </label>
        <hr className="mt-4 mb-2" />
        <h4>Size</h4>
        <div className="flex flex-col md:flex-row md:justify-between gap-1 w-full">
          <label>
            Height
            <input
              className="border-2 p-1 w-full rounded-sm"
              type="number"
              value={height}
              onChange={(event) => setHeight(event.target.value)}
              required
            />
          </label>
          <label>
            Width
            <input
              className="border-2 p-1 w-full rounded-sm"
              type="number"
              value={width}
              onChange={(event) => setWidth(event.target.value)}
              required
            />
          </label>
        </div>
        <hr className="mt-4 mb-2" />
        <h4>Sale</h4>
        <label className="flex w-full justify-between gap-2 mb-1">
          <div className="flex w-1/3 gap-2 items-center">
            <input
              type="checkbox"
              checked={toggleFormats.includes("original")}
              onChange={(event) => handleCheckbox("original", event)}
            />
            Original
          </div>
          <input
            className="w-2/3 border-2 p-1 rounded-sm"
            type="number"
            placeholder="Price for original"
            disabled={!toggleFormats.includes("original")}
            value={originalPrice}
            onChange={(event) => setOriginalPrice(event.target.value)}
          />
        </label>
        <label className="flex w-full justify-between gap-2 mb-1">
          <div className="flex w-1/3 gap-2 items-center">
            <input
              type="checkbox"
              checked={toggleFormats.includes("poster")}
              onChange={(event) => handleCheckbox("poster", event)}
            />
            Poster
          </div>
          <input
            className="w-2/3 border-2 p-1 rounded-sm"
            type="number"
            placeholder="Price for poster"
            disabled={!toggleFormats.includes("poster")}
            value={posterPrice}
            onChange={(event) => setPosterPrice(event.target.value)}
          />
        </label>
        <label className="flex w-full justify-between gap-2 ">
          <div className="flex w-1/3 gap-2 items-center">
            <input
              type="checkbox"
              checked={toggleFormats.includes("postcard")}
              onChange={(event) => handleCheckbox("postcard", event)}
            />
            Postcard
          </div>
          <input
            className="w-2/3 border-2 p-1 rounded-sm"
            type="number"
            placeholder="Price for postcard"
            disabled={!toggleFormats.includes("postcard")}
            value={postCardPrice}
            onChange={(event) => setPostCardPrice(event.target.value)}
          />
        </label>
        <div className="flex justify-start">
          <button
            className="flex items-center bg-green-600 text-sm text-white rounded-lg mt-4 p-2"
            type="submit"
            onClick={handleSubmit}
          >
            <SaveAltIcon className="mr-1" fontSize="small" />
            {art._id ? "Edit Item" : "Create Item"}
          </button>
          {art._id && (
            <button
              className="flex items-center bg-red-600 text-sm text-white rounded-lg mt-4 p-2 ml-2"
              type="button"
              onClick={() => handleDelete(art._id)}
            >
              <DeleteIcon className="mr-1" fontSize="small" /> Delete Item
            </button>
          )}
        </div>
      </form>
      {apiResponse.status === "success" && <div>{apiResponse.message}</div>}
      {apiResponse.status === "error" && <div>{apiResponse.message}</div>}
    </div>
  );
}

export default ArtForm;
