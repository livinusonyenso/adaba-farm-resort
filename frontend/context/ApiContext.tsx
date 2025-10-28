"use client";

import React, { createContext, useContext, ReactNode } from "react";

// Types for the API
export interface InvestmentFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  gender: string;
  message?: string;
  referralSource: string;
  sourceName?: string;
  sourceContact?: string;
  sourceEmail?: string;
}

export interface ApiResponse {
  message?: string;
  error?: string;
}

export interface ApiContextType {
  submitInvestmentForm: (formData: InvestmentFormData, receiptFile?: File) => Promise<ApiResponse>;
  checkServerHealth: () => Promise<boolean>;
  baseUrl: string;
}

// Create the context
const ApiContext = createContext<ApiContextType | undefined>(undefined);

// API service functions
class ApiService {
  private baseUrl: string;

  constructor() {
    // Temporarily use localhost for testing - change back to deployed URL when backend is fixed
    this.baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
  }

  async submitInvestmentForm(formData: InvestmentFormData, receiptFile?: File): Promise<ApiResponse> {
    try {
      const form = new FormData();

      // Add all form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          form.append(key, value);
        }
      });

      // Add file if provided
      if (receiptFile) {
        form.append("receiptFile", receiptFile);
      }

      const response = await fetch(`${this.baseUrl}/api/send-email`, {
        method: "POST",
        body: form,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  async checkServerHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/health`, {
        method: 'GET',
      });
      return response.ok;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }
}

// Provider component
export const ApiProvider = ({ children }: { children: ReactNode }) => {
  const apiService = new ApiService();

  const contextValue: ApiContextType = {
    submitInvestmentForm: apiService.submitInvestmentForm.bind(apiService),
    checkServerHealth: apiService.checkServerHealth.bind(apiService),
    baseUrl: apiService.getBaseUrl(),
  };

  return (
    <ApiContext.Provider value={contextValue}>
      {children}
    </ApiContext.Provider>
  );
};

// Custom hook to use the API context
export const useApi = (): ApiContextType => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApi must be used within an ApiProvider");
  }
  return context;
};

// Types are already exported above, no need to re-export
