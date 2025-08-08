import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { InvoiceFormComponent } from './components/invoice-form/invoice-form.component';
import { InvoiceSummaryComponent } from './components/invoice-summary/invoice-summary.component';
import { Product } from './models/product.model';
import { InvoiceItem } from './models/invoice.model';
import { ProductService } from './services/product.service';
import { ErrorHandlerService } from './services/error-handler.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    ProductFormComponent,
    ProductListComponent,
    InvoiceFormComponent,
    InvoiceSummaryComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  invoiceItems: InvoiceItem[] = [];
  private nextItemId = 1;

  constructor(
    private productService: ProductService,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit(): void {}

  onAddToInvoice(product: Product): void {
    const existingItem = this.invoiceItems.find(item => item.productId === product.id);
    
    if (existingItem) {
      if (existingItem.amount < product.stokBalance) {
        const updatedItem: InvoiceItem = {
          ...existingItem,
          amount: existingItem.amount + 1,
          subtotal: existingItem.price * (existingItem.amount + 1)
        };
        this.updateInvoiceItem(updatedItem);
        this.errorHandler.showSuccess('Quantidade aumentada!');
      } else {
        this.errorHandler.showWarning('Estoque insuficiente para adicionar mais unidades');
      }
    } else {
      const newItem: InvoiceItem = {
        id: this.generateItemId(),
        productId: product.id,
        productTitle: product.title,
        price: product.price,
        amount: 1,
        subtotal: product.price
      };
      this.invoiceItems.push(newItem);
      this.errorHandler.showSuccess('Produto adicionado à nota fiscal!');
    }
  }

  onRemoveItem(itemId: string): void {
    this.invoiceItems = this.invoiceItems.filter(item => item.id !== itemId);
  }

  onUpdateItem(updatedItem: InvoiceItem): void {
    this.updateInvoiceItem(updatedItem);
  }

  onInvoiceIssued(): void {
    this.invoiceItems = [];
    this.nextItemId = 1;
  }

  private updateInvoiceItem(updatedItem: InvoiceItem): void {
    const index = this.invoiceItems.findIndex(item => item.id === updatedItem.id);
    if (index !== -1) {
      this.invoiceItems[index] = updatedItem;
    }
  }

  private generateItemId(): string {
    return `item_${this.nextItemId++}`;
  }
} 