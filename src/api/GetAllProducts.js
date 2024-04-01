import axios from "axios";

async function GetAllProducts() {
    try {
        const res = await axios.get('https://musicart-backend.onrender.com/products/view');
        return res.data;
    }
    catch (err) {
        // console.log(`Error in fetching products, ${err}`);
        return -1;
    }
}

export default GetAllProducts;