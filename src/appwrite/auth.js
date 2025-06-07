import conf from "./conf"
import { Client, Account, ID } from "appwrite";

export class AuthService { //using class to create a proper , reusable , singular and organised structure 
    client = new Client(); // Initialize the Appwrite client
    account; // will later be assigned to a new Account instance
    constructor() { // constructor runs when an object of AuthService is created
        this.client
          .setEndpoint(conf.appwriteUrl)
          .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);// creates an account instance using the client
    }


async createAccount({email,password,name}){
    try{
    const userAccount = await this.account.create(
    ID.unique(),
    email,
    password,
    name
);
    if(userAccount){
        return this.login({email,password})
    }else{
        return userAccount;
        }
    }
    catch(error){
        console.log("Appwrite service :: createAccount :: error", error);
    }
}

async login({email,password}){
    try{
        return await this.account.createEmailPasswordSession(email, password);
    }
    catch (error){
        console.log("Appwrite service :: login :: error", error);
    }
}

async getCurrentUser(){
    try{
    
       return await this.account.get();

    }catch(error){
       console.log("Appwrite service :: getCurrentUser :: error", error);
    }

    return null;
}

async logout(){
    try{
    await this.account.deleteSessions()
    }catch(error){
        console.log("Appwrite service :: logout :: error", error);
    }
}
}

const authService = new AuthService(); // as class is not usable  directly , we create an instance/ object  of that class 

export default authService;