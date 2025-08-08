import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProductService } from '../../services/product.service';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { CreateProductRequest } from '../../models/product.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private errorHandler: ErrorHandlerService
  ) {
    this.productForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.min(0.01)]],
      stockBalance: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.productForm.valid) {
      this.isLoading = true;
      
      const formValue = this.productForm.value;
      const stockBalanceValue = parseInt(formValue.stockBalance, 10);
      
      const productData: CreateProductRequest = {
        title: formValue.title,
        price: parseFloat(formValue.price),
        stokBalance: stockBalanceValue
      };
      
      this.productService.createProduct(productData).subscribe({
        next: () => {
          this.errorHandler.showSuccess('Produto criado com sucesso!');
          this.productForm.reset();
          this.clearFormErrors();
          this.isLoading = false;
          this.productService.getAllProducts().subscribe();
        },
        error: (error) => {
          this.errorHandler.handleError(error);
          this.isLoading = false;
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.productForm.controls).forEach(key => {
      const control = this.productForm.get(key);
      control?.markAsTouched();
    });
  }

  private clearFormErrors(): void {
    Object.keys(this.productForm.controls).forEach(key => {
      const control = this.productForm.get(key);
      control?.markAsUntouched();
      control?.markAsPristine();
      control?.setErrors(null);
    });
  }

  getErrorMessage(fieldName: string): string {
    const field = this.productForm.get(fieldName);
    
    if (field?.hasError('required')) {
      return 'Este campo é obrigatório';
    }
    
    if (field?.hasError('minlength')) {
      return `Mínimo de ${field.errors?.['minlength'].requiredLength} caracteres`;
    }
    
    if (field?.hasError('min')) {
      if (fieldName === 'stockBalance') {
        return 'O saldo em estoque deve ser maior que 0';
      }
      return 'O valor deve ser maior que 0';
    }
    
    return '';
  }
} 