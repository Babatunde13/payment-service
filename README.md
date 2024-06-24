## Payment Gateway Integrations

This package provides helper functions that helps in integrating different payment gateways with your application.

### Installation
```bash
npm install payment-gateway-integrations
```

or

```bash
yarn add payment-gateway-integrations
```

### Available Payment Gateways

#### 1. [Paystack](./lib/paystack/README.md)
[Paystack](https://paystack.com/) is a payments platform that makes the online payments process seamless for both the consumers and the businesses they are trying to pay. It is a secure, modern, easy-to-use platform that allows merchants to accept online payments from customers around the world.

**Usage**:
```typescript
import { PaystackService } from 'payment-gateway-integrations';

const paystack = new PaystackService('secret key');
paystack.bankService.listBanks().then((response) => {
    console.log(response);
}).catch((error) => {
    console.log(error);
});
```
