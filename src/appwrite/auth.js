import conf from "./conf";
import { Client, Account, ID, Databases } from "appwrite";

export class AuthService {
  client = new Client();
  account;
  databases;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
    this.databases = new Databases(this.client);
  }

  // ✅ Create Account + Add Profile to DB with Role
  async createAccount({ email, password, name, role }) {
    try {
      // Step 1: Create Appwrite account
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (!userAccount) return null;

      // Step 2: Log the user in
      await this.login({ email, password });

      // Step 3: Get user details
      const user = await this.account.get();

      // Step 4: Store user profile in DB with role
      await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteUsersCollectionId,
        user.$id,
        {
          name,
          email,
          role,
          userId: user.$id,
        }
      );

      return userAccount;
    } catch (error) {
      console.error("AuthService :: createAccount ::", error);
      throw error;
    }
  }

  // ✅ Login
  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.error("AuthService :: login ::", error);
      throw error;
    }
  }

  // ✅ Get Current User + Role from DB
 async getCurrentUser() {
  try {
    const user = await this.account.get();
    if (!user || !user.$id) return null;

    try {
      const profile = await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteUsersCollectionId,
        user.$id
      );

      return { ...user, role: profile?.role || "user" };
    } catch  {
      // If user exists but profile doesn't, fallback
      console.warn("No user profile found in DB. Returning default role.");
      return { ...user, role: "user" };
    }
  } catch (error) {
    console.error("AuthService :: getCurrentUser ::", error);
    return null;
  }
}


  // ✅ Logout
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.error("AuthService :: logout ::", error);
      throw error;
    }
  }
}

const authService = new AuthService();
export default authService;
