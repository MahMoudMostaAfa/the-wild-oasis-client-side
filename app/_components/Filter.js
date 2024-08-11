"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const activeFilter = searchParams?.get("capacity") ?? "all";
  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }
  return (
    <div className="border border-primary-800 flex">
      <Button
        handleFilter={handleFilter}
        activeFilter={activeFilter}
        filter="all"
      >
        All
      </Button>
      <Button
        handleFilter={handleFilter}
        activeFilter={activeFilter}
        filter="small"
      >
        1-3 guests
      </Button>
      <Button
        handleFilter={handleFilter}
        activeFilter={activeFilter}
        filter="medium"
      >
        4-7 guests
      </Button>
      <Button
        handleFilter={handleFilter}
        activeFilter={activeFilter}
        filter="large"
      >
        8-12 guests
      </Button>
    </div>
  );
}
function Button({ filter, activeFilter, handleFilter, children }) {
  return (
    <button
      onClick={() => handleFilter(filter)}
      className={`px-5 py-2 hover:bg-primary-700 font-semibold ${
        activeFilter === filter ? "bg-primary-700 text-primary-50" : ""
      }`}
    >
      {children}
    </button>
  );
}
export default Filter;
