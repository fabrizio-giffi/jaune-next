"use client";

import ArtForm from "@/components/ArtForm";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function EditArtForm() {
  const { id } = useParams();
  const [art, setArt] = useState({});
  const [fetching, setFetching] = useState(true);

  const router = useRouter();

  const fetchData = async () => {
    const response = await fetch(`http://localhost:5005/api/art/item/${id}`);
    const parsed = await response.json();
    setArt(parsed);
    setFetching(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {fetching && <h1>Loading</h1>}
      <div className="flex items-end gap-4">
        <button
          className="flex items-center bg-typo-400 text-sm text-typo-900 rounded-lg mt-4 p-2 ml-2"
          type="button"
          onClick={() => router.back()}
        >
          <ArrowBackIcon className="mr-1" fontSize="small" />
          Go back
        </button>
        <h1 className="text-3xl mt-3 text-center font-bold">Edit item</h1>
      </div>
      {!fetching && <ArtForm art={art} />}
    </>
  );
}

export default EditArtForm;
