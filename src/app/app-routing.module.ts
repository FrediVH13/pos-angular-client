import { ProductsComponent } from './core/components/products/products.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderFormComponent } from './core/components/order-form/order-form.component';
import { OrdersComponent } from './core/components/orders/orders.component';
import { CustomersComponent } from './core/components/customers/customers.component';

const routes: Routes = [
  { path: 'new-order', component: OrderFormComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'products', component: ProductsComponent },
  { path: '', pathMatch: 'full', redirectTo: '/products' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
