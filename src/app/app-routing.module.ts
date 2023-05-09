import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { TableComponent } from './table/table.component';
import { SurveyComponent } from './survey/survey.component';
import { CrudComponent } from './crud/crud.component';
import { EditCrudComponent } from './crud/edit-crud/edit-crud.component';
import { PurchaseComponent } from './purchase/purchase.component';

const routes: Routes = [
  { path: 'form', component: FormComponent },
  { path: 'table', component: TableComponent },
  { path: 'survey', component: SurveyComponent },
  { path: 'crud',component: CrudComponent},
  { path: 'crud/edit/:id', component: EditCrudComponent },
  { path: 'puchase',component: PurchaseComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
