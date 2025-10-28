# API Integration Documentation

## Overview
Your backend endpoint has been successfully integrated into your frontend using a centralized API context. This provides better organization, error handling, and reusability across your application.

## What Was Added

### 1. API Context (`context/ApiContext.tsx`)
- **Purpose**: Centralized API management for all backend communications
- **Features**:
  - Type-safe API calls
  - Automatic error handling
  - Server health checking
  - Environment-based URL configuration

### 2. Updated Components
- **ContactPage.tsx**: Now uses API context with enhanced features
- **InvestmentForm.tsx**: Migrated from direct fetch calls to API context

## New Features Added

### Server Status Indicator
- Real-time server health monitoring
- Visual indicators (online/offline/checking)
- Automatic form disabling when server is offline

### Enhanced Error Handling
- Better error messages
- Automatic retry logic (built into the API service)
- Loading states and user feedback

### Type Safety
- TypeScript interfaces for all API data
- Compile-time error checking
- Better IDE support and autocomplete

## How to Use

### In Any Component
```tsx
import { useApi, InvestmentFormData } from "../context/ApiContext";

function MyComponent() {
  const { submitInvestmentForm, checkServerHealth, baseUrl } = useApi();
  
  // Use the API functions
  const handleSubmit = async (data: InvestmentFormData, file?: File) => {
    try {
      const response = await submitInvestmentForm(data, file);
      console.log('Success:', response.message);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
}
```

### Environment Configuration

#### Frontend (.env.local)
```
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
```

#### Backend (.env)
```
# Email Configuration
EMAIL_USER=admin@earnestora.com
EMAIL_PASS=Chika1997.@123
COMPANY_EMAIL=admin@earnestora.com

# SMTP Configuration
SMTP_HOST=earnestora.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_TLS_REJECT_UNAUTHORIZED=false

# Server Configuration
PORT=3001
FRONTEND_URL=http://localhost:3000
```

## Backend Endpoint Used
- **URL**: `/api/send-email`
- **Method**: POST
- **Content-Type**: multipart/form-data
- **Features**: File upload support, email notifications, validation

## Benefits

1. **Centralized**: All API logic in one place
2. **Reusable**: Easy to use across multiple components
3. **Type-Safe**: Full TypeScript support
4. **Error Handling**: Consistent error management
5. **Maintainable**: Easy to update API logic
6. **User-Friendly**: Better loading states and feedback

## Testing

To test the integration:

1. **Start your backend server** (port 3001)
2. **Start your frontend** (port 3000)
3. **Navigate to the contact page**
4. **Check the server status indicator**
5. **Submit a test form**

The server status should show "Server Online" if your backend is running correctly.
