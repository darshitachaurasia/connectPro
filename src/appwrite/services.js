import conf from "../conf/conf";
import { Client, ID , Databases,Storage,Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
    
    constructor() {
        this.client
          .setEndpoint(conf.appwriteUrl)
          .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createProfile({userId,name,email,role,slug}){
        try{
          return await this.databases.createDocument(
            conf.appwritedatabaseId,
            conf.appwriteUsersCollectionId,
            slug,
            {   
                name,
                email,
                role,
                userId
            }
          )
        }catch(error){
            console.log("Appwrite service :: createProfile :: error", error);
        }
    }
    async getUserProfile(userId){
      try{
        return await this.databases.getDocument(
          conf.appwritedatabaseId,
          conf.appwriteUsersCollectionId,
          userId
        )
      }catch(error){
          console.log("Appwrite service :: getUserProfile :: error", error);
      }
  }
    async updateUserProfile({userId,updatedData}){
        try{
          return await this.databases.updateDocument(
            conf.appwritedatabaseId,
            conf.appwriteUsersCollectionId,
            userId,
            updatedData
          )
        }catch(error){
            console.log("Appwrite service :: updateUserProfile :: error", error);
        }
    }

    // Mentor Profile


    async createMentorProfile({userId,services,availavleSlots,bio,experience,slug}){
      try{
        return await this.databases.createDocument(
          conf.appwritedatabaseId,
          conf.appwritementorsCollectionId,
          slug,
          userId,
          {   
            services,
            availavleSlots,
            bio,
            experience
          }
        )
      }catch(error){
          console.log("Appwrite service :: createMentorProfile :: error", error);
      }
  }
  async getMentorBYProfile(userId){
    try{
      return await this.databases.getDocument(
        conf.appwritedatabaseId,
        conf.appwritementorsCollectionId,
        userId
      )
    }catch(error){
        console.log("Appwrite service :: getMentorByProfile :: error", error);
    }
}
async listMentors(){
  try{
    return await this.databases.listDocuments(
      conf.appwritedatabaseId,
      conf.appwritementorsCollectionId,
     
    )
  }catch(error){
      console.log("Appwrite service :: listMentors :: error", error);
  }
}
async updateMentorsProfile({userId,updatedData}){
  try{
    return await this.databases.updateDocument(
      conf.appwritedatabaseId,
      conf.appwritementorsCollectionId,
      userId,
      updatedData
    )
  }catch(error){
      console.log("Appwrite service :: updateUserProfile :: error", error);
  }
}

// Booking 

async createBooking({userId,mentorId,service,dateTime,status,slug}){
  try{
    return await this.databases.createDocument(
      conf.appwritedatabaseId,
      conf.appwritebookingCollectionId,
      slug,
      userId,
      {   
        mentorId,
        service,
        dateTime,
        status,
      }
    )
  }catch(error){
      console.log("Appwrite service :: createBooking :: error", error);
  }
}
async listBookingsByUser(userId){
  try{
    return await this.databases.listDocuments(
      conf.appwritedatabaseId,
      conf.appwritebookingCollectionId,
      userId,
      [Query.equal("userId", userId)]
     
    )
  }catch(error){
      console.log("Appwrite service :: listbookingsbyuser :: error", error);
  }
}
async listBookingsByMentor(mentorId){
  try{
    return await this.databases.listDocuments(
      conf.appwritedatabaseId,
      conf.appwritebookingCollectionId,
      mentorId,
      [Query.equal("mentorId", mentorId)]
    )
  }catch(error){
      console.log("Appwrite service :: listBookingsByMentor :: error", error);
  }
}
    async deleteBooking(bookingId){
        try{
           await this.databases.deleteDocument(
            conf.appwritedatabaseId,
            conf.appwritebookingCollectionId,
            bookingId
          )
          return true
        }
        catch(error){
            console.log("Appwrite service :: deleteBooking :: error", error);
        return false
        }
    }
    async updateBooking({bookingId,updatedData}){
      try{
        return await this.databases.updateDocument(
          conf.appwritedatabaseId,
          conf.appwritebookingCollectionId,
          bookingId,
          updatedData
        )
      }catch(error){
          console.log("Appwrite service :: updateBooking :: error", error);
      }
    }
    // file handling
    async uploadFile(file){
        try{
          return await this.bucket.createFile(
            conf.appwritebucketId,
            ID.unique(),
            file
          )
        }catch(error){
            console.log("Appwrite service :: uploadFile :: error", error);
        }
    }
    async deleteFile(fileId){
        try{
           await this.bucket.deleteFile(
            conf.appwritebucketId,
            fileId
          )
          return true
        }catch(error){
            console.log("Appwrite service :deleteFile  :: error", error);
        return false
          }
    }

  
getFilePreview(fileId){
    return this.bucket.getFilePreview(
      conf.appwritebucketId,
      fileId);
      
} 
}

const service = new Service();

export default service;