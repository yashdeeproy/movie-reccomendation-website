const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
import { Client, Databases, ID, Query } from "appwrite";
const client = new Client()
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
    .setProject(PROJECT_ID);

const databases = new Databases(client);

export const updateSearchCount = async (searchTerm, movie) => {
    try {
        const result = await databases.listDocuments(
            DATABASE_ID,
            COLLECTION_ID,
            [Query.equal("searchTerm", searchTerm)]
        );
        if (result.documents.length > 0) {
            const documentId = result.documents[0].$id;
            await databases.updateDocument(DATABASE_ID, COLLECTION_ID, documentId, {
                count: result.documents[0].count + 1
            });
        } else {
            await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
                searchTerm: searchTerm,
                count: 1,
                movie_id: movie.id,
                poster_url: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            });
        }
    } catch (error) {
        console.error("Error updating search count:", error);
    }
}

export const getTrendingMovies = async () => {
    try{
        const result=await databases.listDocuments(
            DATABASE_ID,
            COLLECTION_ID,
            [Query.orderDesc("count"), Query.limit(10)]
        );
        return result.documents;
    } catch (error) {
        console.error("Error fetching trending movies:", error);
    }
}