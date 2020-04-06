import { Component } from '@angular/core';
import { Note } from '../note';
import {NotesService} from '../services/notes.service';
import { RouterService } from '../services/router.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  note: Note;
  notes: Note[];
  errMessage: string;
  constructor(private notesService: NotesService) {
    this.note = new Note();
  }
  ngOnInit() {
    this.notesService.getNotes().subscribe(
      data => this.notes = data,
      err => { this.errMessage = 'Http failure response for http://localhost:3000/notes: 404 Not Found'; }
    );
  }

  addNote() {
    if (!!this.note.text && !!this.note.title) {
      this.notes.push(this.note);
      this.notesService.addNote(this.note).subscribe(
        data => { }, err => { this.errMessage = 'Http failure response for http://localhost:3000/notes: 404 Not Found'; });
      this.note = new Note();
    } else {
      this.errMessage = 'Title and Text both are required fields';
    }
  }

  
}


