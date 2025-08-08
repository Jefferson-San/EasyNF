import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { InvoiceItem } from '../../models/invoice.model';
import { CurrencyPipe } from '../../shared/pipes/currency.pipe';

@Component({
  selector: 'app-invoice-summary',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    CurrencyPipe
  ],
  templateUrl: './invoice-summary.component.html',
  styleUrls: ['./invoice-summary.component.css']
})
export class InvoiceSummaryComponent {
  @Input() invoiceItems: InvoiceItem[] = [];

  getTotal(): number {
    return this.invoiceItems.reduce((total, item) => total + item.subtotal, 0);
  }

  getItemCount(): number {
    return this.invoiceItems.length;
  }

  getTotalQuantity(): number {
    return this.invoiceItems.reduce((total, item) => total + item.amount, 0);
  }
} 