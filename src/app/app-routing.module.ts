import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './core/components/products/products.component';

const routes: Routes = [
  { path: 'products', component: ProductsComponent },
  { path: '', pathMatch: 'full', redirectTo: 'products'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
