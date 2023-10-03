import Link from "next/link";
import React from "react";

function page() {
  return (
    <div className="flex gap-2">
      <Link href="/art/acryl">
        <button className="rounded bg-typo-400 p-2" type="button">
          Acryl Leinwand
        </button>
      </Link>
      <Link href="/art/bleistift">
        <button className="rounded bg-typo-400 p-2" type="button">
          Bleistift
        </button>
      </Link>
      <Link href="/art/tinte">
        <button className="rounded bg-typo-400 p-2" type="button">
          Federzeichnung mit Tinte
        </button>
      </Link>
      <Link href="/art/holz">
        <button className="rounded bg-typo-400 p-2" type="button">
          Holz
        </button>
      </Link>
      <Link href="/art/buntstift">
        <button className="rounded bg-typo-400 p-2" type="button">
          Buntstift
        </button>
      </Link>
    </div>
  );
}

export default page;
