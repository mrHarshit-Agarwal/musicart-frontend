import axios from "axios";

export default
async function GetProductsByQuery(query, value){
    try{
        let queryString = '';
        if(query === 'name'){
            queryString = `?name=${value}`;
        }
        const result = await axios.get(`https://musicart-backend.onrender.com/products/view${queryString}`);
        return result.data;
    }
    catch(err){
        // console.log('API error GetProductsByQuery', err);
        return -1;
    }
}