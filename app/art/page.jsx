import Link from "next/link";
import React from "react";

function page() {
  return (
    <div>
      <Link href="/art/holz">
        <button className="rounded bg-slate-400 px-2" type="button">
          Holz
        </button>
      </Link>
      <Link href="/art/acryl">
        <button className="rounded bg-slate-400 px-2 ml-2" type="button">
          Acryl Leinwand
        </button>
      </Link>
    </div>
  );
}

export default page;
