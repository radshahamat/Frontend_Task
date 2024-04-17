
import { useState, useEffect } from 'react';

function useFetchData() {
    const [data, setData] = useState([]);
    
    useEffect(() => {
        fetch('https://dummyjson.com/products?skip=0&limit=100')
            .then(response => response.json())
            .then(result => setData(result.products))
            .catch(err => console.error(err));
    }, []);
    
    return data;
}

export default useFetchData;
