export interface IProduct {
  id: number;
  cateid:number;
  subcateid:number;
  name:string,
  details:string,

  sellerid: number;
  hasmixedvari:string;
  hasvari:string;

  price:number,
  discount:number,
  quantity:number;
  sku:string,
  personalization:string,
  isp:string,

  file1:string,
  file2:string,
  file3:string,
  file4:string,
  file5:string,
  file6:string,
  file7:string,
  file8:string,

  vari : Ivari,
  mixedvari : Imixvari
}

export interface Ivari {
  id: number;
  name:string;
  values:Ivalues[]
}
export interface Imixvari {
  id: number;
  vari1:string;
  vari2:string;
  values:Imixvalues[]
}
export interface Imixvalues {
  id: number;
  vari1name:string;
  vari2name:string;
  quantity: number;
  price: number;
  sku: string;
}

export interface Ivalues {
    id: number;
    name:string;
    quantity: number;
    price: number;
    sku: string;
}
