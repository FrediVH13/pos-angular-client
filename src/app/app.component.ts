import { Component } from '@angular/core';

export interface ListItem {
  link: string;
  icon: string;
  description: string;
}

const DATA_ITEM: ListItem[] = [
  { link: '/dashboard', icon: 'storefront', description: 'Inicio' },
  { link: '/new-order', icon: 'point_of_sale', description: 'Nueva venta' },
  { link: '/products', icon: 'inventory_2', description: 'Productos' },
  { link: '/statistics', icon: 'trending_up', description: 'Estadísticas' },
  { link: '/categories', icon: 'category', description: 'Categorías' },
  { link: '/orders', icon: 'shopping_cart', description: 'Ventas' },
  { link: '/purchase_orders', icon: 'shopping_bag', description: 'Compras' },
  { link: '/customers', icon: 'group', description: 'Clientes' },
  { link: '/providers', icon: 'local_shipping', description: 'Proveedores' },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  listItems: ListItem[] = [...DATA_ITEM];
}
