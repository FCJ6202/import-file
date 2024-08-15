import { Component, inject } from '@angular/core';
import { FileComponent } from '../file/file.component';
import { CsvParserService } from '../../service/csv-parser.service';
import { Router } from '@angular/router';
import { TickComponent } from '../tick/tick.component';

const HEADER_DATA = ["name","email","city","address","gpa"];

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FileComponent,TickComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  fileData : any;
  router = inject(Router)
  isUploading : boolean = false;
  successRow : number = 0;
  failureRow : number = 0;
  totalRecord : number = 0;
  constructor(private csvService : CsvParserService){}

  getRowDetails(data : string){
    try {
      const lines = data.split('\n');
      const headers= lines[0].split(',');

      console.log(headers , " => headers");
      console.log(HEADER_DATA, " => Defainded header")

      // Check if all header elements are present in HEADER_DATA
      const isValidHeader = headers.every(ele => {
        if(typeof ele === 'string'){
          try {
            ele = JSON.parse(ele);
          } catch (e) {
              // Not a JSON string, do nothing
          }
        }
        return HEADER_DATA.includes(ele.trim().toLowerCase())
      });
      if(!isValidHeader){
        alert("Please select a csv file which have header exactly like name, email, city, address, gpa")
        throw new Error("Please select a csv file which have valid header");
      }

      const objectData = this.csvService.objectFromCsvString(data);

      objectData.forEach((ele,index) => {
        const values = Object.values(ele);
        console.log(values);
        let check_fail = 0;
        for(let i=0;i<values.length;i++){
          if(!values[i]){
            check_fail = 1;
            break;
          }
        }

        this.failureRow += check_fail;
        this.successRow += check_fail^1;
      })

      this.totalRecord = objectData.length;
    } catch (error) {
      console.log("An error while getting row details => ",error)
      throw error;
    }
    

  }

  async getFileData(e : any){
    try {
      this.isUploading = false;
      const fileData : File = e.target.files[0];
      if(!fileData || fileData.type !== "text/csv"){
        alert("Please select valid csv file");
        return;
      }
      const data = await this.csvService.csvParser(fileData)
      this.fileData = data;
      localStorage.setItem('csvItem',data);
      console.log(data) 
      this.getRowDetails(data)
      this.isUploading = true;
    } catch (error) {
      console.log("An error occured while parsing file data ",error)
    }
  }

  goToShowData(){
    const localData = localStorage.getItem('csvItem');
    if(this.fileData && localData){
      this.router.navigate(['/show-data']);
    }else{
      alert("Please select a valid csv file")
    }
  }
}
