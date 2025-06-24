import conf from "./conf";
import { Client, Account, ID, Databases ,Query,Permission,Role} from "appwrite";

export class AuthService {
  client = new Client();
  account;


  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
    this.databases = new Databases(this.client);
  }

  // ✅ Create Account + Add Profile to DB with Role
  async signUp({ email, password, name, role, profileImage, bio }) {
    try {
      // Step 1: Create Appwrite account
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      // Step 4: Store user profile in DB with role
      await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteUsersCollectionId,
        userAccount.$id,
        {
          name,
          email,
          role,
          userId: userAccount.$id,
           profileImage, 
           bio
        },
  [
    Permission.read(Role.user(userAccount.$id)),
    Permission.update(Role.user(userAccount.$id)),
    Permission.delete(Role.user(userAccount.$id))
  ]
      );

      return this.getCurrentUser();
    } catch (error) {
      console.error("AuthService :: createAccount ::", error);
      throw error;
    }
  }

  // ✅ Login
  async login({ email, password }) {
    try {
      await this.account.createEmailPasswordSession(email, password);
      return this.getCurrentUser();
    } catch (error) {
      console.error("AuthService :: login ::", error);
      throw error;
    }
  }

  // ✅ Get Current User + Role from DB
 async getCurrentUser() {
  try {
    const session = await this.account.get();
    const userId = session.$id;

    const docs = await this.databases.listDocuments(
      conf.appwriteDatabaseId,  
      conf.appwriteUsersCollectionId,
      [Query.equal("userId", userId)]);

      return { ...session, ...docs.documents[0] };
    
  } catch (error) {
    console.error("AuthService :: getCurrentUser ::", error);
    return null;
  }
}


  // ✅ Logout
 // ✅ Logout
async logout() {
  try {
    const session = await this.account.get(); // Check if logged in
    if (session) {
      await this.account.deleteSessions();
    }
  } catch (error) {
    // Optional: only log errors if it's not "guest" issue
    if (error.code !== 401) {
      console.error("AuthService :: logout ::", error);
    }
  }
}

}

const authService = new AuthService();
export default authService;
