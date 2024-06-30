# Budpay Service

### [Budpay](https://Budpay.com/)
Budpay is a payments platform that makes the online payments process seamless for both the consumers and the businesses they are trying to pay. It is a secure, modern, easy-to-use platform that allows merchants to accept online payments from customers around the world.

**Usage**:
```typescript
import { BudpayService } from 'payment-gateway-integrations'

const budpay = new BudpayService('secret key')
budpay.billPaymentService.tvService.getTVProviders().then((response) => {
    console.log(response)
})
```

### Accessing Type Definitions
```typescript
import { BudpayService, TVValidationRequest } from 'payment-gateway-integrations'

const budpay = new BudpayService('secret key')

const tvValidation: TVValidationRequest = {
    number: '1234567890',
    provider: 'DSTV'
} // wrong type will be caught by the typescript compiler and editor intelligence

Budpay.billPaymentService.tvService.validateTV(tvValidation).then((response) => {
    console.log(response)
})
```

#### Supported Methods:
1. `billPaymentService`:
    - `tvService`:
        - `getTVProviders()`
        - `getTVProviderPackages(provider: string)`
        - `validateTV(input: TVValidationRequest)`
        - `initiateTVTopup(input: TVTopupRequest)`
    - `electricityService`:
        - `getElectricityProviders()`
        - `validateMeterNumber(input: ElectricityMeterValidationRequest)`
        - `purchaseElectricity(input: ElectricityTopupRequest)`
    - `airtimeService`:
        - `getAirtimeProviders()`
        - `purchaseAirtime(input: AirtimeTopupRequest)`
    - `internetService`:
        - `getInternetProviders()`
        - `getInternetProviderPlans(provider: string)`
        - `purchaseInternetPlan(input: InternetTopupRequest)`

2. `identityVerificationService`:
    - `verifyAccountName(input: VerifyAccountNameRequest)`
    - `verifyBVN(input: VerifyBVNRequest)`
