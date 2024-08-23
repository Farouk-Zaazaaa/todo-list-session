import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotesService } from '../../services/notes.service';

declare var $:any
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  noteList:any

  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _NotesService = inject(NotesService)

  ngOnInit(): void {
      this.getUserNote()
  }

  addNoteForm:FormGroup = this._FormBuilder.group({
    title : [null ,[ Validators.required]],
    content : [null ,[ Validators.required]],
  })

  updateNoteForm:FormGroup = this._FormBuilder.group({
    _id : [null],
    title : [null ,[ Validators.required]],
    content : [null ,[ Validators.required]],
  })

  addNote(){
    this._NotesService.addNote(this.addNoteForm.value).subscribe({
      next:(res)=>{
        console.log(res);
        this.addNoteForm.reset()
        $("#exampleModal").modal("hide")
        
        this.getUserNote()
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
    
  }


  getUserNote(){
    this._NotesService.getUserNotes().subscribe({
      next:(res)=>{
        console.log(res);
        this.noteList = res.notes

        
      },
      error: (err)=>{
        console.log(err);

        if(err.error.msg == "not notes found"){
          this.noteList = []
        }
      }

    })
  }

  // deleteNote(id:any){
  //   this._NotesService.DelteNote(id).subscribe({
  //     next:(res)=>{
  //       console.log(res);
  //       this.getUserNote()

        
  //     },
  //     error: (err)=>{
  //       console.log(err);
        
  //     }
  //   })
  // }

  // setUpdateModal(note:any){
  //   $("#updateModal").modal("show")
  //   this.updateNoteForm.patchValue(note)
  // }

  updateNote(){

    const {_id , content , title} = this.updateNoteForm.value

    this._NotesService.updateNote(_id , {content , title} ).subscribe({
      next:(res)=>{
        console.log(res);
        this.getUserNote()
        $("#updateModal").modal("hide")

        
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }

}
