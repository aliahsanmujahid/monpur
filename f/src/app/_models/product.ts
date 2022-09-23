export interface IProduct {
  id: number;
  cateid:number;
  subcateid:number;
  name:string,
  details:string,
  orgprice:number,
  discprice:number,
  qty:number;
  file1:string,
  file2:string,
  file3:string,
  file4:string,
  file5:string,
  file6:string,
  file7:string,
  file8:string,
  colors : IColors[];
  sizes : ISizes[]
}
export interface IColors {
  name: string;
  colorCode:string;
  quantity: number;
}
export interface ISizes {
  name: string;
  variCode:string;
  quantity: number;
}

export interface Product {
  id: number;
  cateid:number;
  subcateid:number;
  name:string,
  details:string,
  orgprice:number,
  discprice:number,
  qty:number;
  file1:string,
  file2:string,
  file3:string,
  file4:string,
  file5:string,
  file6:string,
  file7:string,
  file8:string,
  sellerid:number,
  hascolor:string,
  hassize:string,
  colors : Colors[],
  sizes : Sizes[]
}

export interface Colors {
    id: number,
    name: string;
    colorCode:string;
    quantity: number;
}
export interface Sizes {
    id: number,
    name: string;
    variCode:string;
    quantity: number;
}
