import SpinnerMini from "../_components/SpinnerMini";

function Loading() {
  return (
    <div className="grid  items-center justify-center">
      <SpinnerMini />
      <p className="text-primary-200 text-xl mt-5">Loading cabins...</p>
    </div>
  );
}

export default Loading;
