export interface IProduct {
  id: number;
  cateid:number;
  subcateid:number;
  name:string,
  details:string,

  price:number,
  discount:number,
  quantity:number;
  sku:string,
  ispersonalization:string,
  personalization:string,

  file1:string,
  file2:string,
  file3:string,
  file4:string,
  file5:string,
  file6:string,
  file7:string,
  file8:string,

  hasvari1:string,
  hasprice1:string,
  hasquantity1:string,
  hassku1:string,

  hasvari2:string,
  hasprice2:string,
  hasquantity2:string,
  hassku2:string,

  hasmixedvari:string,

  vari1 : Ivari,
  vari2 : Ivari,
  mixedvari : Imixvari
}

export interface Ivari {
  name:string;
  values:Ivalues[]
}
export interface Imixvari {
  vari1:string;
  vari2:string;
  values:Imixvalues[]
}
export interface Imixvalues {
  vari1name:string;
  vari2name:string;
  quantity: number;
  price: number;
  sku: string;
}

export interface Ivalues {
    name:string;
    quantity: number;
    price: number;
    sku: string;
}

export interface Product {
  id: number;
  cateid:number;
  subcateid:number;
  name:string,
  details:string,

  price:number,
  tempprice:number,
  discount:number,
  quantity:number;
  sku:string,
  ispersonalization:string,
  personalization:string,

  file1:string,
  file2:string,
  file3:string,
  file4:string,
  file5:string,
  file6:string,
  file7:string,
  file8:string,
  sellerid:number,

  hasvari1:string,
  hasprice1:string,
  hasquantity1:string,

  hasvari2:string,
  hasprice2:string,
  hasquantity2:string,

  hasmixedvari:string,

  vari1 : Vari,
  vari2 : Vari
  mixedvari : Mixvari
}

export interface Vari {
  id: number,
  name:string;
  values:Values[]
}
export interface Values {
    id: number,
    name:string;
    quantity: number;
    price: number;
    sku: string;
}

export interface Mixvari {
  id: number,
  vari1:string;
  vari2:string;
  values:Mixvalues[]
}
export interface Mixvalues {
  id: number,
  vari1name:string;
  vari2name:string;
  quantity: number;
  price: number;
  sku: string;
}


