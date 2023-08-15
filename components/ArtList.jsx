"use client";

import { Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function ArtList({ technique }) {
  const [artList, setArtList] = useState([]);
  const [fetching, setFetching] = useState(true);

  const fetchData = async () => {
    const response = await fetch(`http://localhost:5005/api/art/${technique}`);
    const parsed = await response.json();
    setArtList(parsed);
    setFetching(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {fetching && <h2>Loading...</h2>}
      <ul>
        {artList.map((item) => {
          return (
            <li key={item._id}>
              <Image src={item.url} alt={item.id + "-" + item.name} width={300} height={200} />
              <Typography variant="h4">{item.name}</Typography>
              <Typography variant="body1">{item.description}</Typography>
              <Typography variant="body1">{item.year}</Typography>
              <Typography variant="body1">{item.technique}</Typography>
              <Typography variant="body2">
                H{item.size.height}*W{item.size.width}
              </Typography>
              {item.sale.map((format) => {
                return (
                  <Typography key={format.format} variant="body1">
                    {format.format} - {format.price}
                  </Typography>
                );
              })}
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default ArtList;
