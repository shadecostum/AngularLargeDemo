import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductStoreServiceService {

constructor(private http:HttpClient) { }

ErroMEssagePasser=new Subject<any>();

getAllTableData()
{
  
 return this.http.get<{pName:string,price:number,description:string}>('https://workdemoakash-default-rtdb.firebaseio.com/product.json').pipe(
    
    map((res)=>
    {const product=[]
      for(let key in res) 
        {
          if (res.hasOwnProperty(key)) {
            product.push({...res[key],id:key})

          }
        }
        return product
    })
  )
}

postData(productValue:any)
{
  this.http.post('https://workdemoakash-default-rtdb.firebaseio.com/product.json',productValue).subscribe((res)=>
    {
      console.log(res);
    }),((err:Error)=>
    {
      this.ErroMEssagePasser.next(err.message)

    })
}


updateData(storeIdForApi:any,productValue:any)
{
  this.http.put('https://workdemoakash-default-rtdb.firebaseio.com/product/'+storeIdForApi+'.json',productValue).subscribe()
}



deleteARecordData(id:any)
{
  this.http.delete('https://workdemoakash-default-rtdb.firebaseio.com/product/'+id+'.json').subscribe()
}


deleteAllRecordData()
{
  this.http.delete('https://workdemoakash-default-rtdb.firebaseio.com/product.json').subscribe()
}







}
