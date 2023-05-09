import { Component } from '@angular/core';
import { ApiService } from '../api/api.service';
import Swal from 'sweetalert2';
import { LazyLoadEvent } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

interface purchase {
  name: string; //申請人
  position: string; //請購編號
  company: string; //公司名稱
  department: string; //請購部門
  product: string; //品名
  quantity: number; //請購數量
  price: number; //單價
  creater: string ; //創建者
}

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss'],
})
export class PurchaseComponent {
  purchase: purchase[] = [];
  visible: boolean = false;
  form: FormGroup;
  addData: boolean = false;

  constructor(
    private HttpApi: ApiService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required]], //必填
      position: [''],
      company: ['', [Validators.required]],
      department: ['', [Validators.required]],
      product: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      price: ['', [Validators.required]],
      creater: ['', [Validators.required]],
    });
  }

  id: any;
  apiData!: ApiService[];

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);

    this.purchase = [
      { name: 'pen', position: 'P-1', company: '這是筆', department: '業務部', product:'桌子', quantity: 2, price:8000 , creater: '王曉明' },
      { name: 'apple', position: 'P-2', company: '這是蘋果', department: '技術部', product:'', quantity: 2, price: 8000, creater: ''  },
    ];
  }

  // 懶加載
  loadPostsLazy(event: LazyLoadEvent) {
    const page = event.first! / event.rows! + 1;
    this.HttpApi.getAllRequest(page).subscribe((request) => {
      this.apiData = request;
      console.log(this.apiData);
    });
  }

  //新增
  post(): void {
    let body = {
      name: this.form.controls['name'].value,
      position: this.form.controls['position'].value,
      company: this.form.controls['company'].value,
      department: this.form.controls['department'].value,
      product: this.form.controls['product'].value,
      quantity: this.form.controls['quantity'].value,
      price: this.form.controls['price'].value,
      creater: this.form.controls['creater'].value,
    };
    this.HttpApi.postRequest(body).subscribe((request) => {
      console.log(request);
      // 新增成功後的動作
      this.addData = false;
      Swal.fire({
        icon: 'success',
        title: '成功',
      });
      this.data.push(body);
    });
  }

  //讀取
  getOne(id: any): void {
    this.HttpApi.getOneRequest(id).subscribe((data) => {
      console.log(data);
      this.form.patchValue(data);
    });
  }

  //更新
  patch(id: any): void {
    let body = {
      name: this.form.controls['name'].value,
      position: this.form.controls['position'].value,
      company: this.form.controls['company'].value,
      department: this.form.controls['department'].value,
      product: this.form.controls['product'].value,
      quantity: this.form.controls['quantity'].value,
      price: this.form.controls['price'].value,
      creater: this.form.controls['creater'].value,
    };
    this.HttpApi.patchRequest(id, body).subscribe((response) => {
      console.log(response);
      // 更新成功後的動作
      this.visible = false;
      Swal.fire({
        icon: 'success',
        title: '成功',
      });
    });
  }

  //刪除
  delete(id: any): void {
    this.HttpApi.deleteRequest(id).subscribe((response) => {
      console.log(response);
      // 刪除成功後的動作
      this.visible = false;
      Swal.fire({
        icon: 'success',
        title: '成功',
      });
    });
  }


  data: any = [
    {
      name: '',
      position: '',
      company: '',
      department: '',
      product: '',
      quantity: 0 ,
      price: 0 ,
      creater: '',
    },
  ];

  showDialog(purchase: any): void {
    this.data = purchase;
    console.log('data.position:' + this.data.position);
    this.visible = true;
    console.log('purchase:' + JSON.stringify(purchase));
  }

  confirm(): void {
    this.visible = false;
    Swal.fire({
      icon: 'success',
      title: '成功',
    });
  }

  cancel(): void {
    this.visible = false;
  }
}
