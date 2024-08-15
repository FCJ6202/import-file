import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CsvParserService {

  constructor() { }

  objectFromCsvString(fileContent: string): Array<Object> {
    const lines = fileContent.split('\n');
    const headers = lines[0].split(',');

    const data = lines.slice(1).map(line => {
      const values = line.split(',');
      const obj: any = {};
      headers.forEach((header, index) => {
        if(typeof header === "string"){
          header = header.trim()
          // Check if the header is in JSON format and parse it
            try {
              header = JSON.parse(header);
          } catch (e) {
              // Not a JSON string, do nothing
          }
        }

        if(typeof values[index] === "string"){
          values[index] = values[index].trim();
          try {
            values[index] = JSON.parse(values[index]);
          } catch (e) {
              // Not a JSON string, do nothing
          }
        }
        obj[header.toLowerCase()] = values[index];
      });
      return obj;
    });

    return data;
  }

  csvParser(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
          const reader = new FileReader();

          reader.onload = (e: ProgressEvent<FileReader>) => {
              const fileContent = reader.result as string;
              const lines = fileContent.split('\n');
              const trimmedLines = lines.slice(0, 30); // Get at most 30 lines

              // If the file has less than 30 lines, resolve all lines
              if (lines.length <= 30) {
                  resolve(trimmedLines.join('\n'));
              } else {
                  resolve(trimmedLines.join('\n') + '\n[...truncated]');
              }
          };

          reader.onerror = (e: ProgressEvent<FileReader>) => {
              reject(e);
          };

          reader.readAsText(file);
    });
  }

}
