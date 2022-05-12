import { AngularFirestore, AngularFirestoreCollection, QueryFn } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";
/**
 * This class provides other services CRUD methods to connect to the database.
 */
export abstract class Firestore<T extends { key_doc: string }> {

    // Collectiong object from AngularFirestore with generic class T
    protected collection: AngularFirestoreCollection<T>;

    constructor(protected db: AngularFirestore) { }

    /**
     * This function enables the services to set the collection path to the database
     * @param path string containg the path to the desired database collection
     */
    protected setCollection(path: string): void {
        this.collection = path ? this.db.collection(path) : null;
    }

    /**
     * This function return all of the documents from the collection from the database
     * @returns Observable of all the collection documents from database
     */
    getAll(): Observable<T[]> {
        return this.collection.valueChanges();
    }

    /**
     * This function return a single document from the collection given its reference 
     * @param key_doc string containg the reference of the document from database
     * @returns Observable of the document based on the referene
     */
    get(key_doc: string): Observable<T> {
        return this.collection.doc<T>(key_doc).valueChanges();
    }

    /**
     * This function is used internally to facilitate other functions to create or update items
     * @param item generic class item
     * @param operation operation wanted expects 'set' | 'update'
     * @returns Promise of the generic type passed through param
     */
    private setItem(item: T, operation: string): Promise<T> {
        return this.collection.doc<T>(item.key_doc)[operation](item).then(() => item);
    }

    /**
     * This function is used to create new item in the database
     * @param item generic class item
     * @returns Promise of the generic type passed through param
     */
    create(item: T): Promise<T> {
        item.key_doc = this.db.createId();
        return this.setItem(item, 'set');
    }

    /**
     * This function is used to update items from the database
     * @param item generic class item
     * @returns Promise of the generic type passed thought param
     */
    update(item: T): Promise<T> {
        return this.setItem(item, 'update');
    }

}

