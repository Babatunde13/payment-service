# Budpay Service

### [Budpay](https://Budpay.com/)
With [Budpay](https://budpay.com/), you have everything your business needs to accept local and global payments. Whether you’re a small business, startup, or a large enterprise, our payment solutions are designed to empower your business.

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
