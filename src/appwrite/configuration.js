import config from "../config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class DbService{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);  
    }

    async createPost({title, slug, content, featuredimage, status, userId}){
        try{
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredimage,
                    status,
                    userId
                }
            )

        }
        catch(error){
            console.log("Appwrite error : : "+error);
        }
    }

    async updatePost(slug, {title, content, featuredimage, status}){
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredimage,
                    status
                }
            )
            
        } catch (error) {
            console.log("Appwrite error : : "+error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            return true;
            
        } catch (error) {
            console.log("Appwrite error : : "+error);
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            
        } catch (error) {
            console.log("Appwrite error : : "+error);
            return false;
        }
    }

    async getAllPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries,
            )
            
        } catch (error) {
            console.log("Appwrite error : : "+error);
            return false;
        }
    }

    // file upload service

    async uploadFile(file){
        try{
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
        }
        catch(error){
            console.log("Appwrite error : : "+error);
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId
            )
            return true;
            
        } catch (error) {
            console.log("Appwrite error : : "+error);
            return false;
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            config.appwriteBucketId,
            fileId
        )
    }

}

const service = new DbService()

export default service