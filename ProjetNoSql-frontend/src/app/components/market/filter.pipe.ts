import { Pipe, PipeTransform } from '@angular/core';
import { Announcements } from 'src/app/models/announcements.model';
const { isArray } = Array;

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  
  transform(announcements: Announcements[], find: string): Announcements[] {
    if (!announcements) return [];
    if (!find) return announcements;
    find = find.toLowerCase();
    return search(announcements, find);
    
  }
}

function search(inputArray: Announcements[], query: string) {
    return inputArray.filter( (elem) => {
     return  elem['title'].includes(query) 
    })

}
