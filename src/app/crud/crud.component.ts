import { Component } from '@angular/core';
import {ApiService} from '../api/api.service';
import {LazyLoadEvent} from 'primeng/api';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent {
  form: FormGroup;

  addData: boolean = false;

  constructor(private HttpApi: ApiService,private fb: FormBuilder,private router:Router) {
    this.form = this.fb.group({
      //必填
      id: ['', [Validators.required]],
      userId: [''],
      title: [''],
      body: [''],
    });
  }

  apiData!: ApiService[];

  ngOnInit(): void {

  }

  // 懶加載
  loadPostsLazy(event: LazyLoadEvent) {
      const page = (event.first! / event.rows!) + 1;
      this.HttpApi.getAllRequest(page).subscribe(request => {
        this.apiData = request;
        console.log(this.apiData);
      });
    }

    post(): void {
      // 使用雙向繫結將值帶入body
      let body = {
        // 另title(要post的欄位) = 表單控制元件'title'的值
        title: this.form.controls['title'].value,
        body: this.form.controls['body'].value,
        userId: this.form.controls['userId'].value
      }
      // 請求post api
      this.HttpApi.postRequest(body)
        .subscribe(request => {
          console.log(request)
        })
    }

    edit(id:any): void {
      this.router.navigate(['/crud/edit/'+id]);
  }
}
