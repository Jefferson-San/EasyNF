# EasyNF - Sistema de Gestão de Produtos e Notas Fiscais

Sistema integrado para gestão de estoque e emissão de notas fiscais desenvolvido em Angular.

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- Angular CLI
- .NET 6+ (para os serviços backend)

## 🚀 Como Executar

### 1. Serviços Backend

Primeiro, clone e execute os serviços backend necessários:

```bash
git clone https://github.com/Jefferson-San/InvoiceProject.git
cd InvoiceProject
```

Execute os seguintes serviços em http:
- **StockService**(porta: 5199): Gerencia produtos e estoque
- **BillingService**(porta: 5064): Gerencia emissão de notas fiscais

### 2. Frontend Angular

```bash
# Instalar dependências
npm install
# Executar
npm start
# Executar em modo de desenvolvimento
ng serve
```

Acesse: `http://localhost:4200`

## 🔧 Configuração

Os endpoints dos serviços são configurados em `src/environments/environment.ts`:

```typescript
export const environment = {
  stockServiceUrl: 'http://localhost:5199/api/Product',
  billingServiceUrl: 'http://localhost:5064/api/Invoice'
};
```

## 📱 Funcionalidades

- ✅ Cadastro e gestão de produtos
- ✅ Controle de estoque
- ✅ Criação de notas fiscais
- ✅ Resumo de vendas
- ✅ Interface responsiva

## 🛠️ Tecnologias

- **Frontend**: Angular 17, Angular Material
- **Backend**: .NET 6, C#
- **Estilo**: CSS3, Flexbox, Grid
