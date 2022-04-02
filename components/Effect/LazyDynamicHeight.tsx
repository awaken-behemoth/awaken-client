import dynamic from "next/dynamic";


const Fallback = () => {
  return <div></div>;
};

const LazyDynamicHeight = dynamic(() => import("./DynamicHeight"), {
  loading: Fallback,
});


export default LazyDynamicHeight;