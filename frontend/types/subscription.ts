// Subscription Form Types

export interface SubscriptionFormData {
  title: 'Mr' | 'Mrs' | '';
  surname: string;
  middleName: string;
  otherNames: string;
  nin: string;
  maritalStatus: 'Single' | 'Married' | '';
  dob: string;
  sex: 'Male' | 'Female' | '';
  spouseSurname: string;
  spouseFirstName: string;
  nationality: string;
  otherNationality: string;
  occupation: string;
  employerName: string;
  residentialAddress: string;
  cityTown: string;
  lga: string;
  state: string;
  postalCode: string;
  countryOfResidence: string;
  otherCountry: string;
  language: string;
  email: string;
  phoneNumber1: string;
  phoneNumber2: string;
  nokSurname: string;
  nokFirstName: string;
  nokAddress: string;
  nokCityTown: string;
  nokLga: string;
  nokPhoneNumber1: string;
  nokPhoneNumber2: string;
  noOfAcres: string | number;
  paymentPlan: 'Outright' | '3 Months' | '6 Months' | '';
  signatureDate: string;
  finalDate: string;
  referredBy: string;
  referralDateFull: string;
  referralPhone: string;
  referralCid: string;
  modeOfPayment: 'Cheque' | 'Transfer' | '';
  accountName: string;
  accountNumber: string;
  bank: string;
  signature: string; // Base64 data URL
}

export interface SubscriptionFormState {
  title: string;
  surname: string;
  middleName: string;
  otherNames: string;
  nin: string;
  maritalStatus: string;
  dob: { full: string };
  sex: string;
  spouseSurname: string;
  spouseFirstName: string;
  nationality: string;
  otherNationality: string;
  occupation: string;
  employerName: string;
  residentialAddress: string;
  cityTown: string;
  lga: string;
  state: string;
  postalCode: string;
  countryOfResidence: string;
  otherCountry: string;
  language: string;
  email: string;
  phoneNumber1: string;
  phoneNumber2: string;
  nokSurname: string;
  nokFirstName: string;
  nokAddress: string;
  nokCityTown: string;
  nokLga: string;
  nokPhoneNumber1: string;
  nokPhoneNumber2: string;
  noOfAcres: string;
  paymentPlan: string;
  signatureDate: { full: string };
  finalDate: string;
  referredBy: string;
  referralDateFull: string;
  referralPhone: string;
  referralCid: string;
  modeOfPayment: string;
  accountName: string;
  accountNumber: string;
  bank: string;
}

export type SubmitStatus = 'idle' | 'success' | 'error';
