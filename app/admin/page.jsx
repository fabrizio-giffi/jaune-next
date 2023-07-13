"use client";

import NewArtForm from "@/components/NewArtForm";
import React from "react";

function page() {
  return (
    <div className="m-3">
      <h1 className="text-3xl text-center font-bold">Admin panel</h1>
      <NewArtForm />
    </div>
  );
}

export default page;
