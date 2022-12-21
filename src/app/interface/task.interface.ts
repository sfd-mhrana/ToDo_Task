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
    sub_task:Sub_Task[];
}

export interface Sub_Task{
    id:string;
    title:string;
    description:string;
}