const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwritedatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwritebookingCollectionId: String(import.meta.env.VITE_APPWRITE_BOOKING_COLLECTION_ID),
    appwritementorsCollectionId: String(import.meta.env.VITE_APPWRITE_MENTOR_COLLECTION_ID),
    appwriteUsersCollectionId: String(import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID),
    appwritebucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    };
    
    export default conf;