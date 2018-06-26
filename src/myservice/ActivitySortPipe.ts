import {Pipe, PipeTransform} from '@angular/core'

@Pipe({name:'ActivitySort'})
export class ActivitySortPipe implements  PipeTransform {
  transform(dataList: any, content: any): any {
    if(dataList == null || dataList == undefined)
      return null;
    else return dataList.filter(sd => (sd.Project.projectname.indexOf(content) != -1))
  }
}