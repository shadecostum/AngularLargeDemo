import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-SelectNgformthreeOne',
  templateUrl: './SelectNgformthreeOne.component.html',
  styleUrls: ['./SelectNgformthreeOne.component.css']
})
export class SelectNgformthreeOneComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  email: any;
lastname: any;
address: any;
number: any;
age: any;
name: any;
searchresult(val:any) {
console.log("val",val);

}
dob: any;
selectedOption: any;

}
