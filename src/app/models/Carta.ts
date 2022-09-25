export class Carta{
  id?: string;
  title: string;
  body: string;
  userId?: number;

  constructor(title: string, body: string){
    this.title = title;
    this.body = body;
    this.userId = 1;
  }

}
