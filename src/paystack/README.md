# Paystack Service

### [Paystack](https://paystack.com/)
Paystack is a payments platform that makes the online payments process seamless for both the consumers and the businesses they are trying to pay. It is a secure, modern, easy-to-use platform that allows merchants to accept online payments from customers around the world.

**Usage**:
```typescript
import { PaystackService } from 'payment-gateway-integrations'

const paystack = new PaystackService('secret key')
paystack.bankService.getBanks().then((response) => {
    console.log(response)
})
```

### Accessing Type Definitions
```typescript
import { PaystackService, CreateChargeRequest } from 'payment-gateway-integrations'

const paystack = new PaystackService('secret key')

const chargeRequest: CreateChargeRequest = {
    amount: 10000,
    email: 'user@gmail.com'
} // wrong type will be caught by the typescript compiler and editor intelligence

paystack.chargeService.createCharge(chargeRequest).then((response) => {
    console.log(response)
})
```

#### Supported Methods:
1. `bankService`:
    - `getBanks()`
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
    - `listSubscriptions()`
7. `PlanService`:
    - `listPlans()`
    - `createPlan(input: CreatePlanRequest)`
