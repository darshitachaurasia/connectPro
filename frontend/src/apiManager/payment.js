import axios from "axios";

const Api_Uri="https://elevatehub-backend.onrender.com/v1/payment"
const paymentApi={
    createOder:async({amount,currency,name,description})=>{
        try{
            const response=await axios.post(`${Api_Uri}/create-order`,{
                
            })
        }
    }
}