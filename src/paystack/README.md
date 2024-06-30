# Paystack Service


### [Paystack](https://paystack.com/)
Paystack is a payments platform that makes the online payments process seamless for both the consumers and the businesses they are trying to pay. It is a secure, modern, easy-to-use platform that allows merchants to accept online payments from customers around the world.

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

#### Supported Methods:
1. `bankService`:
    - `listBanks()`
    - `resolveAccountNumber(accountNumber: string, bankCode: string)`
    - `verifyAccountNumber(accountNumber: string, bankCode: string)`
    - `createDedicatedVirtualAccount(input: CreateDedicatedVirtualAccountRequest)`
2. `chargeService`:
    - `createCharge(input: CreateChargeRequest)`
    - `payWithUSSD(input: PayWithUSSDRequest)`
    - `payWithTransfer(input: CreateChargeRequest)`
    - `payWithMobileMoney(input: PayWithMobileMoneyRequest)`
    - `payWithEft(input: PayWithEftRequest)`
    - `payWithQRCode(input: PayWithQRCodeRequest)`
    - `bulkCharge(input: BulkChargeRequest)`
3. `TransactionService`:
    - `initializeTransaction(data: InitializeTransactionData)`
    - `verifyTransaction(reference: string)`
    - `chargeAuthorization(input: ChargeAuthorizationRequest)`
    - `listTransactions(input: ListTransactionRequest)`
4. `customerService`:
    - `createCustomer(data: CreateCustomerData)`
    - `getCustomer(customerId: string)`
    - `listCustomers()`
    - `fetchCustomer(email_or_code: string)`
    - `updateCustomer(data: UpdateCustomerData)`
    - `validateCustomer(code: string, input: ValidateCustomerRequest)`
    - `whitelistCustomer(code: string)`
    - `blacklistCustomer(code: string)`
    - `deactivateAuthorization(authorization_code: string)`
5. `miscService`:
    - `resolveBVN(bvn: string)`
    - `resolveCardBin(bin: string)`
    - `resolvePhone(phone: string)`
    - `resolveTransferRecipient(recipientCode: string)`
6. `subscriptionService`:
    - `createPlan(data: CreatePlanData)`
    - `createSubscription(data: CreateSubscriptionData)`
    - `disableSubscription(subscriptionCode: string)`
    - `enableSubscription(subscriptionCode: string)`
    - `getSubscription(subscriptionCode: string)`
    - `listSubscriptions()`
    - `updateSubscription(data: UpdateSubscriptionData)`
