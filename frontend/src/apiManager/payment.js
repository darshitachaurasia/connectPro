import axios from "axios";

const Api_Uri=""
const paymentApi={
    createOrder:async({amount,currency,name,description})=>{
        try{
            const response=await axios.post(`${Api_Uri}/create-order`,{
                
            })
        }
    }
}