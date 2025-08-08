import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Product, CreateProductRequest, ReduceStockRequest } from '../models/product.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = environment.stockServiceUrl;
  private productsSubject = new BehaviorSubject<Product[]>([]);
  public products$ = this.productsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.productsSubject.next([]);
    this.loadProducts();
  }

  createProduct(product: CreateProductRequest): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product).pipe(
      tap(newProduct => {
        const currentProducts = this.productsSubject.value || [];
        this.productsSubject.next([...currentProducts, newProduct]);
      })
    );
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      tap(products => {
        const validProducts = Array.isArray(products) ? products : [];
        this.productsSubject.next(validProducts);
      })
    );
  }

  reduceStock(items: ReduceStockRequest[]): Observable<void> {
    return this.http.post<void>(`${environment.stockServiceUrl}/reduce-stock`, items).pipe(
      tap(() => this.loadProducts())
    );
  }

  private loadProducts(): void {
    this.getAllProducts().subscribe();
  }

  getProductById(id: string): Product | undefined {
    const currentProducts = this.productsSubject.value || [];
    return currentProducts.find(p => p.id === id);
  }
} 