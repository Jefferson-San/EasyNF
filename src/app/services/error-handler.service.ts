import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  constructor(private snackBar: MatSnackBar) {}

  handleError(error: any): void {
    console.error('An error occurred:', error);
    
    let message = 'Ocorreu um erro inesperado. Tente novamente.';
    
    if (error.status === 0) {
      message = 'Erro de conexão. Verifique se o servidor está rodando.';
    } else if (error.status === 400) {
      message = 'Dados inválidos. Verifique as informações fornecidas.';
    } else if (error.status === 401) {
      message = 'Não autorizado. Faça login novamente.';
    } else if (error.status === 403) {
      message = 'Acesso negado. Verifique as permissões.';
    } else if (error.status === 404) {
      message = 'Recurso não encontrado.';
    } else if (error.status === 500) {
      message = 'Erro interno do servidor. Tente novamente mais tarde.';
    } else if (error.status === 502) {
      message = 'Servidor indisponível no momento. Tente novamente mais tarde.';
    } else if (error.status === 503) {
      message = 'Serviço temporariamente indisponível. Tente novamente mais tarde.';
    } else if (error.status === 504) {
      message = 'Timeout do servidor. Tente novamente mais tarde.';
    } else if (error.status === 408) {
      message = 'Tempo limite da requisição excedido. Tente novamente.';
    } else if (error.error?.message) {
      message = error.error.message;
    } else if (error.message) {
      message = error.message;
    }
    
    console.log('Error details:', {
      status: error.status,
      statusText: error.statusText,
      url: error.url,
      message: error.message,
      error: error.error
    });
    
    this.showError(message);
  }

  showSuccess(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      panelClass: ['success-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  showError(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 5000,
      panelClass: ['error-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  showWarning(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 4000,
      panelClass: ['warning-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
} 