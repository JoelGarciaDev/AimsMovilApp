import { Injectable, inject } from '@angular/core';
import { Database, ref, onValue, push, set, update, remove } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {
    private db: Database = inject(Database);

    getRealtimeData(path: string): Observable<any> {
        return new Observable(subscriber => {
            const reference = ref(this.db, path);
            return onValue(reference, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    // Si es una lista, convertir a array
                    if (typeof data === 'object') {
                        const items = Object.keys(data).map(key => ({ id: key, ...data[key] }));
                        subscriber.next(items);
                    } else {
                        subscriber.next(data);
                    }
                } else {
                    subscriber.next(null);
                }
            });
        });
    }
    // Métodos CRUD usando el nuevo SDK
    async add(path: string, data: any): Promise<string> {
        const reference = ref(this.db, path);
        const newRef = push(reference);
        await set(newRef, data);
        return newRef.key || "";
    }

    async update(path: string, data: any): Promise<void> {
        const reference = ref(this.db, path);
        return update(reference, data);
    }

    async delete(path: string): Promise<void> {
        const reference = ref(this.db, path);
        return remove(reference);
    }
}