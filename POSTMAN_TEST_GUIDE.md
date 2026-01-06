# Postman Testing Guide for Subscription API

## API Endpoint
```
POST /api/subscription
```

## Request Type
**multipart/form-data** (for file uploads with passport photo)

---

## Setup in Postman

### Step 1: Create New Request
1. Open Postman
2. Click "New" → "HTTP Request"
3. Set method to **POST**
4. Enter URL: `http://localhost:3000/api/subscription` (or your deployed URL)

### Step 2: Configure Headers
Postman will automatically set the `Content-Type: multipart/form-data` header when you select Body → form-data.

### Step 3: Configure Body

Select **Body** tab → **form-data**

Add the following fields:

#### Personal Information
| Key | Value | Type |
|-----|-------|------|
| title | Mr | text |
| surname | Doe | text |
| middleName | John | text |
| otherNames | Michael | text |
| nin | 12345678901 | text |
| maritalStatus | Married | text |
| dob | 1990-01-15 | text |
| sex | Male | text |
| spouseSurname | Doe | text |
| spouseFirstName | Jane | text |

#### Nationality & Employment
| Key | Value | Type |
|-----|-------|------|
| nationality | Nigerian | text |
| otherNationality | | text |
| occupation | Software Engineer | text |
| employerName | Tech Solutions Ltd | text |

#### Address Information
| Key | Value | Type |
|-----|-------|------|
| residentialAddress | 123 Lagos Street, Victoria Island | text |
| cityTown | Lagos | text |
| lga | Eti-Osa | text |
| state | Lagos | text |
| postalCode | 100001 | text |
| countryOfResidence | Nigeria | text |
| otherCountry | | text |
| language | English | text |

#### Contact Information
| Key | Value | Type |
|-----|-------|------|
| email | john.doe@example.com | text |
| phoneNumber1 | +2348012345678 | text |
| phoneNumber2 | +2347098765432 | text |

#### Next of Kin
| Key | Value | Type |
|-----|-------|------|
| nokSurname | Smith | text |
| nokFirstName | Mary | text |
| nokAddress | 456 Abuja Road, Garki | text |
| nokCityTown | Abuja | text |
| nokLga | Garki | text |
| nokPhoneNumber1 | +2348055555555 | text |
| nokPhoneNumber2 | +2347066666666 | text |

#### Investment Details
| Key | Value | Type |
|-----|-------|------|
| noOfAcres | 5 | text |
| paymentPlan | Outright | text |

#### Signature & Dates
| Key | Value | Type |
|-----|-------|------|
| signatureDate | 2026-01-06 | text |
| finalDate | 2026-01-06 | text |
| signature | data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg== | text |

#### Referral Information
| Key | Value | Type |
|-----|-------|------|
| referredBy | James Wilson | text |
| referralDateFull | 2026-01-05 | text |
| referralPhone | +2348099999999 | text |
| referralCid | REF12345 | text |

#### Payment Information
| Key | Value | Type |
|-----|-------|------|
| modeOfPayment | Transfer | text |
| accountName | John Doe | text |
| accountNumber | 0123456789 | text |
| bank | GTBank | text |

#### File Upload
| Key | Value | Type |
|-----|-------|------|
| passportPhoto | *Select file* | **file** |

**Important:** For the `passportPhoto` field:
1. Change the type dropdown from "text" to **"file"**
2. Click "Select Files" button
3. Choose a JPEG or PNG image (max 5MB)

---

## Alternative: JSON Body (without file upload)

If testing without file upload, you can use **Body** → **raw** → **JSON**:

```json
{
  "title": "Mr",
  "surname": "Doe",
  "middleName": "John",
  "otherNames": "Michael",
  "nin": "12345678901",
  "maritalStatus": "Married",
  "dob": "1990-01-15",
  "sex": "Male",
  "spouseSurname": "Doe",
  "spouseFirstName": "Jane",
  "nationality": "Nigerian",
  "otherNationality": "",
  "occupation": "Software Engineer",
  "employerName": "Tech Solutions Ltd",
  "residentialAddress": "123 Lagos Street, Victoria Island",
  "cityTown": "Lagos",
  "lga": "Eti-Osa",
  "state": "Lagos",
  "postalCode": "100001",
  "countryOfResidence": "Nigeria",
  "otherCountry": "",
  "language": "English",
  "email": "john.doe@example.com",
  "phoneNumber1": "+2348012345678",
  "phoneNumber2": "+2347098765432",
  "nokSurname": "Smith",
  "nokFirstName": "Mary",
  "nokAddress": "456 Abuja Road, Garki",
  "nokCityTown": "Abuja",
  "nokLga": "Garki",
  "nokPhoneNumber1": "+2348055555555",
  "nokPhoneNumber2": "+2347066666666",
  "noOfAcres": 5,
  "paymentPlan": "Outright",
  "signatureDate": "2026-01-06",
  "finalDate": "2026-01-06",
  "referredBy": "James Wilson",
  "referralDateFull": "2026-01-05",
  "referralPhone": "+2348099999999",
  "referralCid": "REF12345",
  "modeOfPayment": "Transfer",
  "accountName": "John Doe",
  "accountNumber": "0123456789",
  "bank": "GTBank",
  "signature": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
}
```

---

## Expected Response

### Success (200)
```json
{
  "success": true,
  "message": "Subscription submitted successfully! Check your email for confirmation.",
  "data": {
    "subscriptionId": "SUB123456",
    "email": "john.doe@example.com"
  }
}
```

### Error (400/500)
```json
{
  "success": false,
  "message": "Error message here",
  "error": "Detailed error information"
}
```

---

## Field Validation Rules

### Required Fields (*)
- title
- surname
- nin (11 digits)
- maritalStatus
- dob
- sex
- nationality
- occupation
- employerName
- residentialAddress
- state
- postalCode
- countryOfResidence
- language
- email (valid email format)
- phoneNumber1 (valid phone format)
- nokSurname
- nokFirstName
- nokAddress
- nokPhoneNumber1
- noOfAcres (minimum 1)
- paymentPlan
- signatureDate
- finalDate
- signature (base64 image)

### Optional Fields
- middleName
- otherNames
- spouseSurname
- spouseFirstName
- phoneNumber2
- nokCityTown
- nokLga
- nokPhoneNumber2
- referredBy
- referralDateFull
- referralPhone
- referralCid
- modeOfPayment
- accountName
- accountNumber
- bank

### File Requirements
- **passportPhoto**:
  - Format: JPEG, JPG, or PNG
  - Max size: 5MB
  - Optional field

---

## Testing Tips

1. **Test with minimum required fields first**
2. **Test file upload separately** - try different image sizes and formats
3. **Test validation** - omit required fields to see error messages
4. **Test email format** - try invalid emails
5. **Test NIN validation** - try less than/more than 11 digits
6. **Test signature** - send request without signature to test validation

---

## Quick Test Checklist

- [ ] Valid submission with all fields
- [ ] Valid submission with only required fields
- [ ] Submission with passport photo
- [ ] Submission without passport photo
- [ ] Invalid email format
- [ ] Missing required fields
- [ ] Invalid NIN (not 11 digits)
- [ ] File too large (>5MB)
- [ ] Wrong file format (e.g., PDF)
- [ ] Missing signature

---

## Notes

- The `signature` field should contain a base64-encoded image data URL
- All date fields should be in `YYYY-MM-DD` format
- Phone numbers should include country code
- The form data is sent to the backend with the signature as a base64 string
- The passport photo is sent as a separate file in multipart/form-data
