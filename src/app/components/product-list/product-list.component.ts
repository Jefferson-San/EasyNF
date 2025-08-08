import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CurrencyPipe } from '../../shared/pipes/currency.pipe';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    CurrencyPipe
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  @Output() addToInvoice = new EventEmitter<Product>();
  
  products: Product[] = [];
  isLoading = false;
  error: string | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.error = null;

    this.productService.products$.subscribe({
      next: (products) => {
        this.products = products;
        this.isLoading = false;
      },
      error: (error) => {
        this.error = 'Erro ao carregar produtos';
        this.isLoading = false;
        console.error('Error loading products:', error);
      }
    });
  }

  onAddToInvoice(product: Product): void {
    this.addToInvoice.emit(product);
  }

  getStockStatus(product: Product): { color: string; text: string } {
    if (product.stokBalance === 0) {
      return { color: 'warn', text: 'Sem estoque' };
    } else if (product.stokBalance <= 5) {
      return { color: 'accent', text: 'Estoque baixo' };
    } else {
      return { color: 'primary', text: 'Em estoque' };
    }
  }

  isLowStock(product: Product): boolean {
    return product.stokBalance <= 5;
  }

  isOutOfStock(product: Product): boolean {
    return product.stokBalance === 0;
  }
} 