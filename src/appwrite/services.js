import conf from "./conf";
import { Client, Databases, Storage, ID, Query, Permission, Role } from "appwrite";

export class Service {
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

  // 🔄 USER PROFILE (excluding creation, which is done by AuthService)
  async getUserProfile(userId) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteUsersCollectionId,
        userId
      );
    } catch (error) {
      console.error("Service :: getUserProfile ::", error);
    }
  }

  async updateUserProfile({ userId, updatedData }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteUsersCollectionId,
        userId,
        updatedData
      );
    } catch (error) {
      console.error("Service :: updateUserProfile ::", error);
    }
  }

  // 🧑‍🏫 MENTOR MANAGEMENT
  async createMentorProfile({ userId, services, availableSlots, bio, experience, slug }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteMentorsCollectionId,
        slug,
        {
          userId,
          services,
          availableSlots,
          bio,
          experience
        },
        [
          Permission.read(Role.any()),
          Permission.update(Role.user(userId)),
          Permission.delete(Role.user(userId))
        ]
      );
    } catch (error) {
      console.error("Service :: createMentorProfile ::", error);
    }
  }

  async getMentorByUserId(userId) {
    try {
      const result = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteMentorsCollectionId,
        [Query.equal("userId", userId)]
      );
      return result.documents[0];
    } catch (error) {
      console.error("Service :: getMentorByUserId ::", error);
    }
  }

  async updateMentorProfile({ userId, updatedData }) {
    try {
      const mentor = await this.getMentorByUserId(userId);
      if (!mentor) return null;
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteMentorsCollectionId,
        mentor.$id,
        updatedData
      );
    } catch (error) {
      console.error("Service :: updateMentorProfile ::", error);
    }
  }

  async listMentors() {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteMentorsCollectionId
      );
    } catch (error) {
      console.error("Service :: listMentors ::", error);
    }
  }

  // 📅 BOOKINGS
  async createBooking({ userId, mentorId, service, dateTime, status, slug }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteBookingCollectionId,
        slug,
        {
          userId,
          mentorId,
          service,
          dateTime,
          status
        },
        [
          Permission.read(Role.user(userId)),
          Permission.update(Role.user(userId)),
          Permission.delete(Role.user(userId))
        ]
      );
    } catch (error) {
      console.error("Service :: createBooking ::", error);
    }
  }

  async listBookingsByUser(userId) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteBookingCollectionId,
        [Query.equal("userId", userId)]
      );
    } catch (error) {
      console.error("Service :: listBookingsByUser ::", error);
    }
  }

  async listBookingsByMentor(mentorId) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteBookingCollectionId,
        [Query.equal("mentorId", mentorId)]
      );
    } catch (error) {
      console.error("Service :: listBookingsByMentor ::", error);
    }
  }

  async updateBooking({ bookingId, updatedData }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteBookingCollectionId,
        bookingId,
        updatedData
      );
    } catch (error) {
      console.error("Service :: updateBooking ::", error);
    }
  }

  async deleteBooking(bookingId) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteBookingCollectionId,
        bookingId
      );
      return true;
    } catch (error) {
      console.error("Service :: deleteBooking ::", error);
      return false;
    }
  }

  // 🧾 FILE HANDLING
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.error("Service :: uploadFile ::", error);
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(
        conf.appwriteBucketId,
        fileId
      );
      return true;
    } catch (error) {
      console.error("Service :: deleteFile ::", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return fileId
      ? this.bucket.getFilePreview(conf.appwriteBucketId, fileId)
      : null;
  }

  // 📊 ADMIN: COUNTS
  async getCounts() {
    try {
      const [users, mentors, bookings] = await Promise.all([
        this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteUsersCollectionId),
        this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteMentorsCollectionId),
        this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteBookingCollectionId)
      ]);

      return {
        userCount: users.total,
        mentorCount: mentors.total,
        bookingCount: bookings.total
      };
    } catch (error) {
      console.error("Service :: getCounts ::", error);
    }
  }
}

const service = new Service();
export default service;
