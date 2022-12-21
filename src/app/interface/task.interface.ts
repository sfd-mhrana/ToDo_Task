export interface Task{
    id:string;
    title:string;
    description:string;
    priority:number;
    start_date:Date;
    end_date:Date;
    status:number;
    assigned_person:string;
    attachment:string[];
    sub_task:string[];
}

export interface Sub_Task{
    title:string;
    description:string;
}