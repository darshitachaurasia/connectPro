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

  // ✅ Account Creation + DB Profile with Role
  async createAccount({ email, password, name, role }) {
    try {
      // Step 1: Create auth account
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      // Step 2: Automatically log them in
      if (!userAccount) return null;
      await this.login({ email, password });

      // Step 3: Get current user details to store in DB
      const user = await this.account.get();

      // Step 4: Store user profile (with role) in DB
      await this.databases.createDocument(
        conf.appwritedatabaseId,
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
      console.log("Appwrite service :: createAccount :: error", error);
      throw error;
    }
  }

  // ✅ Login
  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log("Appwrite service :: login :: error", error);
      throw error;
    }
  }

  // ✅ Get Auth User + Role from DB
  async getCurrentUser() {
    try {
      const user = await this.account.get();
      if (!user || !user.$id) return null;

      const profile = await this.databases.getDocument(
        conf.appwritedatabaseId,
        conf.appwriteUsersCollectionId,
        user.$id
      );

      return { ...user, role: profile?.role || "user" };
    } catch (error) {
      console.log("Appwrite service :: getCurrentUser :: error", error);
      return null;
    }
  }

  // ✅ Logout
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite service :: logout :: error", error);
      throw error;
    }
  }
}

const authService = new AuthService();
export default authService;
