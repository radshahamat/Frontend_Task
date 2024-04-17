import localforage from "localforage";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/ProductCard";

export default function Details() {
  let { id } = useParams();
  const [data, setData] = useState(null);
  const [loading,setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    localforage.getItem(id, function (err, value) {
      
      if (!err) {
        console.log(value);
        setData(value);
        setLoading(false)
      } else {
        console.log(err);
      }
    });
  }, [id]);

  

  if(!data){
    return <p>Loading</p>
  }

  return (
    <div className="container mx-auto">
        <ProductCard product={data} />
    </div>
  );
}
