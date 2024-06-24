## Payment Gateway Integrations

This repository contains code different services that helps in integrating payment gateways with your application.

### Installation
```bash
npm install payment-gateway-integrations
```

or

```bash
yarn add payment-gateway-integrations
```

### 1. [Paystack](https://paystack.com/)
Paystack is a payments platform that makes the online payments process seamless for both the consumers and the businesses they are trying to pay. It is a secure, modern, easy-to-use platform that allows merchants to accept online payments from customers around the world.

**Usage**:
```typescript
import { PaystackService} from 'payment-gateway-integrations';

const paystack = new PaystackService('secret key');
paystack.bankService.listBanks().then((response) => {
    console.log(response);
}).catch((error) => {
    console.log(error);
});
```

#### Supported Methods:
1. `bankService`:
    - `listBanks()`
    - `resolveAccountNumber(accountNumber: string, bankCode: string)`
    - `verifyAccountNumber(accountNumber: string, bankCode: string)`
    - `createDedicatedVirtualAccount(input: CreateDedicatedVirtualAccountRequest)`
2. `chargeService`:
    - `initializeTransaction(data: InitializeTransactionData)`
    - `verifyTransaction(reference: string)`
3. `customerService`:
    - `createCustomer(data: CreateCustomerData)`
    - `getCustomer(customerId: string)`
    - `updateCustomer(data: UpdateCustomerData)`
    - `getCustomerTransactions(customerId: string)`
4. `miscService`:
    - `resolveBVN(bvn: string)`
    - `resolveCardBin(bin: string)`
    - `resolvePhone(phone: string)`
    - `resolveTransferRecipient(recipientCode: string)`
5. `subscriptionService`:
    - `createPlan(data: CreatePlanData)`
    - `createSubscription(data: CreateSubscriptionData)`
    - `disableSubscription(subscriptionCode: string)`
    - `enableSubscription(subscriptionCode: string)`
    - `getSubscription(subscriptionCode: string)`
    - `listSubscriptions()`
    - `updateSubscription(data: UpdateSubscriptionData)`
