import {Component, OnInit } from '@angular/core';
import {ApiService} from "../../api/api.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-edit-crud',
  templateUrl: './edit-crud.component.html',
  styleUrls: ['./edit-crud.component.scss']
})
export class EditCrudComponent implements OnInit {
  form: FormGroup;
  constructor(
    private HttpApi: ApiService,
    private fb: FormBuilder,
    private route: ActivatedRoute,)
    {this.form = this.fb.group({
      //必填
      id: ['', [Validators.required]],
      userId: [''],
      title: [''],
      body: [''],
    }); }

  id: any;
  ngOnInit() {
    // 擷取特定路徑的路由參數
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.getOne(this.id);
  }

  getOne(id:any):void{
    this.HttpApi.getOneRequest(id)
      .subscribe(request => {
        console.log(request)
        this.form.patchValue(request);
      })
  }

  patch(): void {
    let id = this.form.controls['id'].value
    let body = {
      title: this.form.controls['title'].value,
      body: this.form.controls['body'].value,
      userId: this.form.controls['userId'].value
    }
    this.HttpApi.patchRequest(id, body)
      .subscribe(request => {
        console.log(request)
      })
  }

  delete(): void {
    let id = this.form.controls['id'].value
    this.HttpApi.deleteRequest(id).subscribe(request => {
      console.log(request)
    })
  }

}
