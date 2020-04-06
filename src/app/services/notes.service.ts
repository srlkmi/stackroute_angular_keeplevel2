import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Note } from '../note';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class NotesService {
  notes = 'http://localhost:3000/api/v1/notes';
  constructor(private httpcli: HttpClient,private authService : AuthenticationService) {
    
  }

  getNotes(): Observable<Array<Note>> {
    const token = this.authService.getBearerToken();
    return this.httpcli.get<Array<Note>>(this.notes,
      {
        headers:new HttpHeaders().set('Authorization',`Bearer ${token}`)

      }).map((res)=>{return (res);
      });

  }

  addNote(note: Note): Observable<Note> {
    return this.httpcli.post<Note>(this.notes, note,
      {
        headers:new HttpHeaders().set("Authorization",`Bearer ${this.authService.getBearerToken()}`)

      }).map((res) =>{return (res);

    });
  }

}
