import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, map } from 'rxjs';
import { Product } from '../../../@Models/Product';
import { NgForm } from '@angular/forms';
import { ProductStoreServiceService } from '../../../@Service/ProductStoreService.service';

@Component({
  selector: 'app-Add-Product',
  templateUrl: './Add-Product.component.html',
  styleUrls: ['./Add-Product.component.css']
})
export class AddProductComponent implements OnInit,OnDestroy {





// showData() {
//  this.http.get('https://workdemoakash-default-rtdb.firebaseio.com/product.json').subscribe((res:any)=>
//     {
//       this.products= Object.values(res)
//       console.log(res);
      
//     },
//   (err:any)=>
//   {
//     console.error('Error fetching products:', err);
//   })
// }
// products: any;

//second method used here object(id auto generated) inside another object  ,we need to merge the id to inside 2object
//we using method

allProducts:Product[]=[];
allProduct:any
  message: any;
getAllTableData()
{
  let header=new HttpHeaders({'hi':'hiii'})
console.log(this.sproductService.getAllTableData().subscribe(),"haa");
  this.sproductService.getAllTableData().subscribe((res)=>
  {
    this.allProducts=res
  },(err:Error)=>
{ 
// console.log(err.message);
   

})
}








  constructor(private http:HttpClient,private sproductService:ProductStoreServiceService) { }
  ngOnDestroy(): void {
   
  }

  ngOnInit() {
    this.getAllTableData();
    this.sproductService.ErroMEssagePasser.subscribe((mes)=>
    {
      this.message=mes;
      console.log(this.message);
      
    })
  }




  deleteARecordData(id:any)
  {
    // this.http.delete('https://workdemoakash-default-rtdb.firebaseio.com/product/'+id+'.json').subscribe()
    this.sproductService.deleteARecordData(id)
  }


  deleteAllRecordData()
  {
    // this.http.delete('https://workdemoakash-default-rtdb.firebaseio.com/product.json').subscribe()
    this.sproductService.deleteAllRecordData()
  }




  submitForm(productValue:{pName:string,price:number,description:string}) {

    if (!this.updateButton) {
      this.sproductService.postData(productValue)
      // this.http.post('https://workdemoakash-default-rtdb.firebaseio.com/product.json',productValue).subscribe((res)=>
      //   {
      //     console.log(res);
          
      //   })
    }
    else{
      // this.http.put('https://workdemoakash-default-rtdb.firebaseio.com/product/'+this.storeIdForApi+'.json',productValue).subscribe()
      this.sproductService.updateData(this.storeIdForApi,productValue)
    }





   
    
    }


    @ViewChild('productAddForm') updateformData:NgForm

storeIdForApi:any
updateButton:boolean=false
    UpdateRecordData(id: string)
     {

      let updateDataStorer= this.allProducts.find((p)=>
      {
       return p.id===id
      })

      console.log(updateDataStorer,"update stored Data");

      this.updateformData .setValue({
        productName:updateDataStorer.productName,
        productPrice:updateDataStorer.productPrice,
        productDescription:updateDataStorer.productDescription
        
      })
      this.storeIdForApi=updateDataStorer.id
      this.updateButton=true
      
     }


   




      
    
}

