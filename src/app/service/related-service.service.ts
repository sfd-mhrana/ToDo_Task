import { Injectable } from '@angular/core';
import { Task } from '../interface/task.interface';

@Injectable({
  providedIn: 'root'
})
export class RelatedServiceService {
  key="task";
  alldata:Task[];

  constructor() { 
      this.alldata = JSON.parse(localStorage.getItem(this.key));
      if(!this.alldata){
        this.alldata=[]
      }
  }

  getRandomNumber(){
    return Math.floor((Math.random()*6)+1);
  }

  getAllData(){
    return this.alldata;
  }

  setMyData(data){
    this.alldata.push(data)
    localStorage.setItem(this.key,JSON.stringify(this.alldata))
  }

  updateMyData(data){
    const newData=this.alldata.map((item)=>{
      if(item.id==data.id){
        item=data;
      }
      return item;
    })
    this.alldata=newData;
    localStorage.setItem(this.key,JSON.stringify(newData))
  }

  getSingledata(id){
    let data:Task;
    this.alldata.map((item:Task)=>{
      if(item.id==id){
        data=item;
      }
    })

    return data;
  }
}
