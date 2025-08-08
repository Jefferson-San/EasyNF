import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { InvoiceItem, CreateInvoiceRequest } from '../../models/invoice.model';
import { Product } from '../../models/product.model';
import { InvoiceService } from '../../services/invoice.service';
import { ProductService } from '../../services/product.service';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { CurrencyPipe } from '../../shared/pipes/currency.pipe';

@Component({
  selector: 'app-invoice-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    CurrencyPipe
  ],
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.css']
})
export class InvoiceFormComponent implements OnInit {
  @Input() invoiceItems: InvoiceItem[] = [];
  @Output() itemRemoved = new EventEmitter<string>();
  @Output() itemUpdated = new EventEmitter<InvoiceItem>();
  @Output() invoiceIssued = new EventEmitter<void>();
  
  isLoading = false;

  constructor(
    private invoiceService: InvoiceService,
    private productService: ProductService,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit(): void {}

  onRemoveItem(itemId: string): void {
    this.itemRemoved.emit(itemId);
  }

  onQuantityChange(item: InvoiceItem, newQuantity: number): void {
    if (newQuantity < 1) {
      return;
    }

    const product = this.productService.getProductById(item.productId);
          if (product && newQuantity > product.stokBalance) {
        this.errorHandler.showWarning(`Quantidade máxima disponível: ${product.stokBalance}`);
      return;
    }

    const updatedItem: InvoiceItem = {
      ...item,
      amount: newQuantity,
      subtotal: item.price * newQuantity
    };

    this.itemUpdated.emit(updatedItem);
  }

  onIssueInvoice(): void {
    if (this.invoiceItems.length === 0) {
      this.errorHandler.showWarning('Adicione pelo menos um item à nota fiscal');
      return;
    }

    this.isLoading = true;
    const request: CreateInvoiceRequest = {
      items: this.invoiceItems.map(item => ({
        id: item.productId,
        amount: item.amount
      }))
    };

         this.invoiceService.issueInvoice(request).subscribe({
       next: () => {
         this.errorHandler.showSuccess('Nota fiscal emitida com sucesso!');
         this.invoiceIssued.emit();
         this.isLoading = false;
         this.productService.getAllProducts().subscribe();
       },
       error: (error) => {
         this.errorHandler.handleError(error);
         this.isLoading = false;
       }
     });
  }



  canIssueInvoice(): boolean {
    return this.invoiceItems.length > 0 && !this.isLoading;
  }
} 