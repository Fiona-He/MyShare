import { Component,Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({ template: '',})

@Injectable()

export class ProjectserviceService{

  constructor(private http: HttpClient) { }



}

export class NewProject{
  constructor(
    public projectname: string,
    public priority: string,
    public headcount: string,
    public enddate: string,
    public description: string,
  ){}
};
