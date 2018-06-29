import {Pipe, PipeTransform} from '@angular/core'


@Pipe({name:'ActivitySort'})
export class ActivitySortPipe implements  PipeTransform {
  oldList:any;
  transform(dataList: any, content: any): any {
    if(this.oldList == undefined || this.oldList == null || this.oldList == ''){this.oldList = dataList}
    console.log(dataList.length);
    console.log(dataList);
    console.log(this.oldList);

    if(dataList == null || dataList == undefined)
      return null;
    // else if (content == '' || content == null || content == undefined) {
    //   dataList.filter(sd => (sd.Project.enddate == "2018-06-29"))
    // }
    else return dataList.filter(sd => (sd.Project.projectname.indexOf(content) != -1))
  }
}

@Pipe({name:'FriendSort'})
export class FriendSortPipe implements  PipeTransform {
  transform(dataList: any, content: any): any {
    if(dataList == null || dataList == undefined)
      return null;
    else return dataList.filter(sd => (sd.bfdisplayname.indexOf(content) != -1))
  }
}
