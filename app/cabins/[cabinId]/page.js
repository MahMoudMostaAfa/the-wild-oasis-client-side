export const revalidate = 0;
import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import ReservationReminder from "@/app/_components/ReservationReminder";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { Suspense } from "react";

// name of the function must be `generateMetadata`
export async function generateMetadata({ params }) {
  const { name } = await getCabin(params.cabinId);
  return {
    title: `Cabin ${name}`,
  };
}

// name of the function must be `generateStaticParams`
export async function generateStaticParams() {
  const cabins = await getCabins();
  const ids = cabins.map((cabin) => {
    cabinID: String(cabin.id);
  });
  return ids;
}

export default async function Page({ params }) {
  const cabin = await getCabin(params?.cabinId);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />
      <div>
        <h2 className="text-5xl font-semibold text-center mb-10  text-accent-400">
          Reserve today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
