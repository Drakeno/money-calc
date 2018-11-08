 export class APPEvent {
     constructor(
         public type: string,
         public amount: number,
         public category: number,
         public date: string,
         public desciption: string,
         public id?: string,
         public catName?: string
     ) {

     }
 }