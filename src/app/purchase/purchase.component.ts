import { Component } from '@angular/core';
import { ApiService } from '../api/api.service';
import Swal from 'sweetalert2';
import { LazyLoadEvent } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

//定義
interface purchases {
  applicant: string; //申請人
  purchase_id: string;
  company_name: string; //公司名稱
  requisition_department: string; //請購部門
  product: string; //品名
  requisition_quantity: number; //請購數量
  price: number; //單價
  position:string ; //請購編號
  created_by: string ; //創建者
}

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss'],
})

export class PurchaseComponent {
  purchases: purchases[] = [];
  visible: boolean = false;
  form: FormGroup;
  addData: boolean = false;

  constructor(
    private HttpApi: ApiService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
  ) {
    this.form = this.fb.group({
      applicant: ['', [Validators.required]], //必填
      position: ['',],
      company_name: ['', [Validators.required]],
      requisition_department: ['', [Validators.required]],
      product: ['', [Validators.required]],
      requisition_quantity: ['', [Validators.required]],
      price: ['', [Validators.required]],
      created_by: ['', [Validators.required]],
    });
  }

  id: any;
  apiData!: ApiService[];

  ngOnInit(): void {
    this.getAll();
    // this.id = this.route.snapshot.paramMap.get('id');
    // console.log(this.id);

    // this.purchase = [
    //   { name: 'pen', purchase_id: 'P-1', company: '這是筆', department: '業務部', product:'桌子', quantity: 2, price:8000 , creater: '王曉明' },
    //   { name: 'apple', purchase_id: 'P-2', company: '這是蘋果', depaapplicantrtment: '技術部', product:'', quantity: 0, price: 0, creater: ''  },
    // ];
  }

  // 懶加載
  loadPostsLazy(event: LazyLoadEvent) {
    const page = event.first! / event.rows! + 1;
    this.HttpApi.getAllRequest(page).subscribe((request) => {
      this.apiData = request.body.purchases;
      console.log(this.apiData);
    });
  }

  //新增
  post(): void {
    let body = {
      applicant: this.form.controls['applicant'].value,
      // purchase_id: this.form.controls['purchase_id'].value,
      company_name: this.form.controls['company_name'].value,
      requisition_department: this.form.controls['requisition_department'].value,
      product: this.form.controls['product'].value,
      requisition_quantity: Number(this.form.controls['requisition_quantity'].value),
      price: Number(this.form.controls['price'].value),
      created_by: this.form.controls['created_by'].value,
    };
    console.log(body)
    this.HttpApi.postRequest(body).subscribe((request) => {
      console.log(request);
      // 新增成功後的動作
      this.addData = false;
      Swal.fire({
        icon: 'success',
        title: '成功',
      });
      this.getAll()
    });
  }

  //讀取
  getAll(): void {
    this.HttpApi.getAllRequest(1).subscribe((request) => {
      this.apiData = request.body.purchases;
      console.log(this.apiData);
    });
  }

  //更新
  patch(id : any): void {
    let body = {
      applicant: this.form.get('applicant')?.value,
      // purchase_id: this.form.controls['purchase_id'].value,
      company_name: this.form.get('company_name')?.value,
      requisition_department: this.form.get('requisition_departmentname')?.value,
      product: this.form.get('product')?.value,
      requisition_quantity: this.form.get('requisition_quantity')?.value,
      price: this.form.get('price')?.value,
      created_by: this.form.get('created_by')?.value,
    };
    this.HttpApi.patchRequest(id, body).subscribe((response) => {
      console.log(response);
      // 更新成功後的動作
      this.visible = false;
      this.getAll();
      Swal.fire({
        icon: 'success',
        title: '成功',
      });
    });
  }

  //刪除
  delete(id : any): void {
    console.log(id)
    this.HttpApi.deleteRequest(id).subscribe((response) => {
      console.log(response);
      // 刪除成功後的動作
      this.visible = false;
      this.getAll();
      Swal.fire({
        icon: 'success',
        title: '成功',
      });
    });
  }

  showDialog(purchases: any): void {
    // this.data = purchase;
    // console.log('data.purchase_id:' + this.data.purchase_id);
    this.visible = true;
    this.form.patchValue(purchases);
    console.log('purchase:' + JSON.stringify(purchases));
    this.id = purchases.purchase_id;
    console.log(this.id);
  }

  // confirm(): void {
  //   this.visible = false;
  //   Swal.fire({
  //     icon: 'success',
  //     title: '成功',
  //   });
  // }

  cancel(): void {
    this.visible = false;
  }

  newDialog():void{
    this.form.reset()
    this.addData = true ;
  }

}
