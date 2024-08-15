import { Component } from '@angular/core';
import { CsvParserService } from '../../service/csv-parser.service';

@Component({
  selector: 'app-show-data',
  standalone: true,
  imports: [],
  templateUrl: './show-data.component.html',
  styleUrl: './show-data.component.css'
})
export class ShowDataComponent {
  showData : any = [
    {
      "name" : "Jitu Rajak",
      "email" : "rajakjitu708@gmail.com",
      "number" : "7325012187",
      "city" : "Jamshedpur",
      "address" : "27, Adarsh Nagar Bhuiyadih",
      "gpa" : "8.35"
    }
  ];
  constructor(private csvService : CsvParserService){
    const localData = localStorage.getItem('csvItem');
    if(localData){
      this.showData = this.csvService.objectFromCsvString(localData);
    }
    console.log(this.showData)
  }
}
