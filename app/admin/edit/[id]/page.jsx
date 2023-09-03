"use client";

import ArtForm from "@/components/ArtForm";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

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
    <div>
      {fetching && <h1>Loading</h1>}
      {!fetching && <ArtForm art={art} />}
      <button className="border-2 bg-slate-400 mt-4 px-2 py-1" type="button" onClick={() => router.back()}>
        Go back
      </button>
    </div>
  );
}

export default EditArtForm;
