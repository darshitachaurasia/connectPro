const conf = {
  appwriteUrl: import.meta.env.VITE_APPWRITE_URL || "",
  appwriteProjectId: import.meta.env.VITE_APPWRITE_PROJECT_ID || "",
  appwriteDatabaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID || "",
  appwriteBookingCollectionId: import.meta.env.VITE_APPWRITE_BOOKING_COLLECTION_ID || "",
  appwriteMentorsCollectionId: import.meta.env.VITE_APPWRITE_MENTOR_COLLECTION_ID || "",
  appwriteUsersCollectionId: import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID || "",
  appwriteBucketId: import.meta.env.VITE_APPWRITE_BUCKET_ID || "",
};

export default conf;
