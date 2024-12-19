// src/app/services/realtime-database.service.ts
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Volunteer {
  id?: string | null;
  name: string;
  number: string;
  email: string;
  address: string;
  capabilities: string;
  tagline: string;
  createdAt: number;
}

@Injectable({
  providedIn: 'root',
})
export class RealtimeDatabaseService {
  private dbPath = '/volunteers';
  volunteersRef: AngularFireList<Volunteer>;

  constructor(private db: AngularFireDatabase) {
    this.volunteersRef = db.list(this.dbPath, (ref) => ref.orderByChild('createdAt'));
  }

  addVolunteer(volunteer: Volunteer): Promise<void> {
    volunteer.createdAt = Date.now();
    return this.volunteersRef.push(volunteer).then(() => {});
  }

  getVolunteers(): Observable<Volunteer[]> {
    return this.volunteersRef.snapshotChanges().pipe(
      map((changes) =>
        changes.map((c) => ({ id: c.payload.key, ...c.payload.val() as Volunteer }))
      )
    );
  }
}
