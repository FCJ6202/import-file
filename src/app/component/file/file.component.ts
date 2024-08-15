import { Component,output } from '@angular/core';

@Component({
  selector: 'app-file',
  standalone: true,
  imports: [],
  templateUrl: './file.component.html',
  styleUrl: './file.component.css'
})
export class FileComponent {

  onFileChange = output();


  handleFile(e : any){
    this.onFileChange.emit(e);
  }

}
