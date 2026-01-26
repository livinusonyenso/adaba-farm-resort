"use client";

import React, { useState, useRef, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';
import SignatureCanvas from 'react-signature-canvas';
import { useApi } from '../context/ApiContext';
import { SubscriptionFormState, SubmitStatus } from '../types/subscription';

const AdabaSubscriptionForm = () => {
  const { submitSubscriptionForm } = useApi();
  const signatureRef = useRef<SignatureCanvas | null>(null);
  const [passportPhoto, setPassportPhoto] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [submitMessage, setSubmitMessage] = useState<string>('');
  const [fileError, setFileError] = useState<string>('');
  const [signatureError, setSignatureError] = useState<string>('');

  const [formData, setFormData] = useState<SubscriptionFormState>({
    title: '',
    surname: '',
    middleName: '',
    otherNames: '',
    nin: '',
    maritalStatus: '',
    dob: { full: '' },
    sex: '',
    spouseSurname: '',
    spouseFirstName: '',
    nationality: 'Nigerian',
    otherNationality: '',
    occupation: '',
    employerName: '',
    residentialAddress: '',
    cityTown: '',
    lga: '',
    state: '',
    postalCode: '',
    countryOfResidence: 'Nigeria',
    otherCountry: '',
    language: '',
    email: '',
    phoneNumber1: '',
    phoneNumber2: '',
    nokSurname: '',
    nokFirstName: '',
    nokAddress: '',
    nokCityTown: '',
    nokLga: '',
    nokPhoneNumber1: '',
    nokPhoneNumber2: '',
    noOfAcres: '',
    paymentPlan: '',
    signatureDate: { full: '' },
    finalDate: '',
    referredBy: '',
    referralDateFull: '',
    referralPhone: '',
    referralCid: '',
    modeOfPayment: '',
    accountName: '',
    accountNumber: '',
    bank: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileError('');

    if (file) {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        setFileError('Please upload only JPEG or PNG files');
        setPassportPhoto(null);
        return;
      }

      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        setFileError('File size must be less than 5MB');
        setPassportPhoto(null);
        return;
      }

      setPassportPhoto(file);
    } else {
      setPassportPhoto(null);
    }
  };

  const clearSignature = () => {
    if (signatureRef.current) {
      signatureRef.current.clear();
      setSignatureError('');
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate signature
    if (signatureRef.current && signatureRef.current.isEmpty()) {
      setSignatureError('Please provide your signature');
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      return;
    }

    if (fileError) {
      setSubmitStatus('error');
      setSubmitMessage('Please fix the file upload error before submitting.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitMessage('');
    setSignatureError('');

    try {
      // Get signature as base64 data URL
      const signatureDataURL = signatureRef.current ? signatureRef.current.toDataURL() : null;

      // Flatten nested date objects
      const flattenedData = {
        ...formData,
        dob: formData.dob.full,
        signatureDate: formData.signatureDate.full,
        signature: signatureDataURL, // Add signature to form data
      };

      // Use the API context to submit the form
      const data = await submitSubscriptionForm(flattenedData, passportPhoto);

      setSubmitStatus('success');
      setSubmitMessage(data.message || '✅ Subscription submitted successfully! Check your email for confirmation.');

      setFormData({
        title: '',
        surname: '',
        middleName: '',
        otherNames: '',
        nin: '',
        maritalStatus: '',
        dob: { full: '' },
        sex: '',
        spouseSurname: '',
        spouseFirstName: '',
        nationality: 'Nigerian',
        otherNationality: '',
        occupation: '',
        employerName: '',
        residentialAddress: '',
        cityTown: '',
        lga: '',
        state: '',
        postalCode: '',
        countryOfResidence: 'Nigeria',
        otherCountry: '',
        language: '',
        email: '',
        phoneNumber1: '',
        phoneNumber2: '',
        nokSurname: '',
        nokFirstName: '',
        nokAddress: '',
        nokCityTown: '',
        nokLga: '',
        nokPhoneNumber1: '',
        nokPhoneNumber2: '',
        noOfAcres: '',
        paymentPlan: '',
        signatureDate: { full: '' },
        finalDate: '',
        referredBy: '',
        referralDateFull: '',
        referralPhone: '',
        referralCid: '',
        modeOfPayment: '',
        accountName: '',
        accountNumber: '',
        bank: '',
      });
      setPassportPhoto(null);

      // Reset file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) {
        (fileInput as HTMLInputElement).value = '';
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error: any) {
      console.error('Error submitting:', error);
      setSubmitStatus('error');
      setSubmitMessage(error?.message || '❌ Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Source+Sans+Pro:wght@400;600&display=swap');
        
        * {
          box-sizing: border-box;
        }
        
        .form-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #f5f7e8 0%, #e8f0d8 50%, #d4e4c1 100%);
          padding: 40px 20px;
          font-family: 'Source Sans Pro', sans-serif;
        }
        
        .form-wrapper {
          max-width: 900px;
          margin: 0 auto;
          background: #ffffff;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(45, 80, 22, 0.15);
          overflow: hidden;
          animation: fadeInUp 0.6s ease-out;
        }
        
        input[type="text"], input[type="email"], input[type="tel"], input[type="number"], input[type="date"], select {
          font-family: 'Source Sans Pro', sans-serif;
          font-size: 14px;
          padding: 8px 12px;
          border: 2px solid #2d5016;
          border-radius: 4px;
          background: #fffef5;
          transition: all 0.3s ease;
          width: 100%;
        }
        
        input:focus, select:focus {
          outline: none;
          border-color: #f7941d;
          box-shadow: 0 0 0 3px rgba(247, 148, 29, 0.2);
        }
        
        input[type="checkbox"], input[type="radio"] {
          accent-color: #2d5016;
          width: 18px;
          height: 18px;
          cursor: pointer;
          flex-shrink: 0;
        }
        
        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 30px;
          background: linear-gradient(180deg, #ffffff 0%, #f8faf5 100%);
          border-bottom: 3px solid #2d5016;
          gap: 20px;
        }
        
        .logo-section {
          flex: 1;
          min-width: 80px;
        }
        
        .center-logo {
          flex: 2;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .logo-container {
          background: linear-gradient(135deg, #2d5016 0%, #4a7c23 100%);
          border-radius: 12px;
          padding: 12px;
          margin-bottom: 12px;
          box-shadow: 0 4px 12px rgba(45, 80, 22, 0.3);
        }
        
        .farm-type {
          font-size: 16px;
          font-weight: 600;
          color: #333;
          margin: 12px 0 4px;
        }
        
        .site-location {
          font-size: 13px;
          color: #666;
          margin: 0;
        }
        
        .photo-box {
          flex: 1;
          display: flex;
          justify-content: flex-end;
          min-width: 80px;
        }
        
        .photo-placeholder {
          width: 120px;
          height: 140px;
          border: 2px dashed #2d5016;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #f8faf5;
          cursor: pointer;
          transition: all 0.3s ease;
          overflow: hidden;
        }
        
        .photo-text {
          font-size: 11px;
          color: #666;
          text-align: center;
          pointer-events: none;
        }
        
        .photo-preview {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .form-title-section {
          text-align: center;
          padding: 20px;
          background: #2d5016;
        }
        
        .form-title {
          font-family: 'Playfair Display', serif;
          font-size: 28px;
          color: #ffffff;
          margin: 0 0 8px;
        }
        
        .form-instruction {
          font-size: 13px;
          color: #c8e6c9;
          margin: 0;
        }
        
        .section {
          padding: 20px 30px;
          border-bottom: 1px solid #e0e0e0;
        }
        
        .section-header {
          background: linear-gradient(90deg, #2d5016 0%, #4a7c23 100%);
          padding: 10px 16px;
          border-radius: 6px;
          margin-bottom: 20px;
        }
        
        .section-title {
          color: #ffffff;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.5px;
        }
        
        .field-row {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          margin-bottom: 16px;
        }
        
        .field-group {
          flex: 1;
          min-width: 200px;
        }
        
        .field-group-wide {
          flex: 2;
          min-width: 250px;
        }
        
        .field-group-medium {
          flex: 1;
          min-width: 150px;
        }
        
        .field-group-full {
          flex: 1 1 100%;
        }
        
        .label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: #333;
          margin-bottom: 6px;
        }
        
        .title-row, .checkbox-row {
          display: flex;
          gap: 15px;
          align-items: center;
          flex-wrap: wrap;
        }
        
        .radio-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          color: #333;
          cursor: pointer;
          white-space: nowrap;
        }
        
        .spouse-fields, .phone-fields {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }
        
        .spouse-fields > div, .phone-fields > div {
          flex: 1;
          min-width: 150px;
        }
        
        .field-hint {
          display: block;
          font-size: 11px;
          color: #888;
          margin-top: 4px;
        }
        
        .or-text {
          font-size: 14px;
          color: #666;
          font-style: italic;
          align-self: center;
        }
        
        .payment-options {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
          margin-top: 10px;
        }
        
        .payment-option {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          padding: 12px 16px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          transition: all 0.3s ease;
          flex: 1;
          min-width: 140px;
        }
        
        .payment-option:hover {
          border-color: #2d5016;
          background: #f8faf5;
        }
        
        .payment-label {
          font-size: 14px;
          font-weight: 600;
          color: #333;
        }
        
        .interest-badge {
          font-size: 10px;
          color: #f7941d;
          font-weight: 600;
          display: block;
        }
        
        .declaration-section {
          padding: 20px 30px;
          background: #f8faf5;
          border-bottom: 1px solid #e0e0e0;
        }
        
        .declaration-text {
          font-size: 13px;
          line-height: 1.8;
          color: #333;
          margin-bottom: 12px;
        }
        
        .note-text {
          font-size: 13px;
          color: #c41e3a;
          background: #fff5f5;
          padding: 12px 16px;
          border-radius: 6px;
          border-left: 4px solid #c41e3a;
        }
        
        .signature-section {
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding: 20px 30px;
          border-bottom: 1px solid #e0e0e0;
        }
        
        .signature-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
          flex-wrap: wrap;
          gap: 10px;
        }
        
        .signature-pad-wrapper {
          border: 2px solid #2d5016;
          border-radius: 8px;
          overflow: hidden;
          background: #ffffff;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .signature-canvas {
          width: 100%;
          height: 200px;
          cursor: crosshair;
          display: block;
        }
        
        .clear-button {
          background: #dc3545;
          color: #ffffff;
          border: none;
          padding: 8px 16px;
          font-size: 14px;
          font-weight: 600;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .clear-button:hover {
          background: #c82333;
        }
        
        .signature-hint {
          font-size: 12px;
          color: #666;
          font-style: italic;
          margin-top: 8px;
          margin-bottom: 0;
        }
        
        .error-text {
          color: #dc3545;
          font-size: 13px;
          margin-top: 5px;
          margin-bottom: 0;
          font-weight: 600;
        }
        
        .referral-section {
          padding: 20px 30px;
          background: #fffef5;
          border-bottom: 1px solid #e0e0e0;
        }
        
        .page-break {
          padding: 40px 30px 20px;
          text-align: center;
          border-top: 4px solid #2d5016;
          margin-top: 20px;
        }
        
        .page2-title {
          font-family: 'Playfair Display', serif;
          font-size: 28px;
          color: #2d5016;
          margin: 0;
        }
        
        .account-section {
          padding: 20px 30px;
          text-align: center;
        }
        
        .account-name {
          font-size: 14px;
          color: #666;
          margin: 0 0 8px;
        }
        
        .account-name-value {
          font-size: 20px;
          font-weight: 700;
          color: #2d5016;
          margin: 0 0 30px;
        }
        
        .bank-cards {
          display: flex;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
          margin-bottom: 30px;
        }
        
        .bank-card {
          padding: 20px;
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          background: #ffffff;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          min-width: 180px;
          flex: 1;
          max-width: 250px;
        }
        
        .bank-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-bottom: 12px;
          font-size: 14px;
          color: #666;
        }
        
        .sterling-logo {
          font-size: 20px;
        }
        
        .fcmb-logo {
          background: #6a1b9a;
          color: #fff;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 700;
        }
        
        .bank-details {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        
        .account-num {
          font-size: 20px;
          font-weight: 700;
          color: #2d5016;
          letter-spacing: 1px;
        }
        
        .dollar-section {
          margin-top: 20px;
          padding-top: 20px;
          border-top: 2px dashed #e0e0e0;
        }
        
        .dollar-title {
          font-size: 18px;
          font-weight: 600;
          color: #333;
          margin-bottom: 20px;
        }
        
        .submit-section {
          padding: 30px;
          text-align: center;
          background: #f8faf5;
        }
        
        .submit-button {
          background: linear-gradient(135deg, #2d5016 0%, #4a7c23 100%);
          color: #ffffff;
          border: none;
          padding: 16px 40px;
          font-size: 18px;
          font-weight: 600;
          border-radius: 50px;
          cursor: pointer;
          box-shadow: 0 8px 24px rgba(45, 80, 22, 0.3);
          transition: all 0.3s ease;
          font-family: 'Source Sans Pro', sans-serif;
          width: 100%;
          max-width: 300px;
        }
        
        .submit-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(45, 80, 22, 0.4);
        }
        
        .submit-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        
        .footer {
          padding: 20px 30px;
          background: #c41e3a;
          text-align: center;
        }
        
        .footer-text {
          font-size: 12px;
          color: #ffffff;
          margin: 4px 0;
          word-break: break-word;
        }
        
        .status-message {
          padding: 15px 30px;
          margin: 0;
        }
        
        .status-message.success {
          background: #d4edda;
          border-left: 4px solid #28a745;
        }
        
        .status-message.error {
          background: #f8d7da;
          border-left: 4px solid #dc3545;
        }
        
        .status-message p {
          margin: 0;
          font-size: 14px;
          font-weight: 600;
        }
        
        .status-message.success p {
          color: #155724;
        }
        
        .status-message.error p {
          color: #721c24;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Mobile Responsive Styles */
        @media screen and (max-width: 768px) {
          .form-container {
            padding: 15px 10px;
          }
          
          .form-wrapper {
            border-radius: 12px;
          }
          
          .header {
            flex-direction: column;
            align-items: center;
            padding: 20px 15px;
            gap: 15px;
          }
          
          .logo-section {
            order: 1;
            width: 100%;
            display: flex;
            justify-content: center;
          }
          
          .center-logo {
            order: 2;
            width: 100%;
          }
          
          .photo-box {
            order: 3;
            width: 100%;
            justify-content: center;
          }
          
          .photo-placeholder {
            width: 100px;
            height: 120px;
          }
          
          .farm-type {
            font-size: 14px;
          }
          
          .site-location {
            font-size: 12px;
          }
          
          .form-title-section {
            padding: 15px;
          }
          
          .form-title {
            font-size: 22px;
          }
          
          .form-instruction {
            font-size: 12px;
          }
          
          .section {
            padding: 15px;
          }
          
          .section-header {
            padding: 8px 12px;
            margin-bottom: 15px;
          }
          
          .section-title {
            font-size: 13px;
          }
          
          .field-row {
            gap: 12px;
            margin-bottom: 12px;
          }
          
          .field-group,
          .field-group-wide,
          .field-group-medium {
            min-width: 100%;
            flex: 1 1 100%;
          }
          
          .label {
            font-size: 12px;
          }
          
          input[type="text"], 
          input[type="email"], 
          input[type="tel"], 
          input[type="number"], 
          input[type="date"], 
          select {
            font-size: 16px; /* Prevents zoom on iOS */
            padding: 10px 12px;
          }
          
          .title-row, .checkbox-row {
            gap: 10px;
          }
          
          .radio-label {
            font-size: 13px;
          }
          
          .spouse-fields, .phone-fields {
            flex-direction: column;
            gap: 12px;
          }
          
          .spouse-fields > div, .phone-fields > div {
            min-width: 100%;
          }
          
          .or-text {
            text-align: center;
            width: 100%;
          }
          
          .payment-options {
            flex-direction: column;
            gap: 10px;
          }
          
          .payment-option {
            min-width: 100%;
            padding: 12px;
          }
          
          .declaration-section {
            padding: 15px;
          }
          
          .declaration-text {
            font-size: 12px;
            line-height: 1.6;
          }
          
          .note-text {
            font-size: 12px;
            padding: 10px 12px;
          }
          
          .signature-section {
            padding: 15px;
          }
          
          .signature-header {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .clear-button {
            width: 100%;
            padding: 10px;
          }
          
          .signature-canvas {
            height: 150px;
          }
          
          .referral-section {
            padding: 15px;
          }
          
          .page-break {
            padding: 30px 15px 15px;
          }
          
          .page2-title {
            font-size: 22px;
          }
          
          .account-section {
            padding: 15px;
          }
          
          .account-name-value {
            font-size: 16px;
            word-break: break-word;
          }
          
          .bank-cards {
            flex-direction: column;
            align-items: center;
            gap: 15px;
          }
          
          .bank-card {
            width: 100%;
            max-width: 100%;
            padding: 15px;
          }
          
          .account-num {
            font-size: 18px;
          }
          
          .dollar-section .bank-card {
            max-width: 100%;
          }
          
          .submit-section {
            padding: 20px 15px;
          }
          
          .submit-button {
            padding: 14px 30px;
            font-size: 16px;
            max-width: 100%;
          }
          
          .footer {
            padding: 15px;
          }
          
          .footer-text {
            font-size: 11px;
          }
          
          .status-message {
            padding: 12px 15px;
          }
          
          .status-message p {
            font-size: 13px;
          }
        }
        
        /* Extra small devices */
        @media screen and (max-width: 375px) {
          .form-container {
            padding: 10px 5px;
          }
          
          .header {
            padding: 15px 10px;
          }
          
          .section {
            padding: 12px 10px;
          }
          
          .form-title {
            font-size: 20px;
          }
          
          .photo-placeholder {
            width: 90px;
            height: 110px;
          }
          
          .checkbox-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
          
          .title-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
        }
      `}</style>
      
      <form onSubmit={handleSubmit} className="form-wrapper">
        {/* Header */}
        <div className="header">
          <div className="logo-section">
            <div className="kazfield-logo">
              <Image
                src="/kazfieldisl-logo.png"
                alt="Kazfield ISL Logo"
                width={120}
                height={60}
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>
          
          <div className="center-logo">
            <div className="logo-container">
              <Image
                src="/adaba-logo.png"
                alt="Adaba Farm Logo"
                width={100}
                height={100}
                style={{ objectFit: 'contain' }}
              />
            </div>
            <h2 className="farm-type">FIRST HYBRID COCONUT FARM</h2>
            <p className="site-location">Site Location: Owode LGA, Ogun State</p>
          </div>
          
          <div className="photo-box">
            <label htmlFor="passport-photo-header" className="photo-placeholder">
              <input
                id="passport-photo-header"
                type="file"
                accept="image/png,image/jpeg,image/jpg,.png,.jpg,.jpeg"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              {passportPhoto ? (
                <img
                  src={URL.createObjectURL(passportPhoto)}
                  alt="Passport"
                  className="photo-preview"
                />
              ) : (
                <>
                  <span className="photo-text">Affix Passport</span>
                  <span className="photo-text">Photograph Here</span>
                </>
              )}
            </label>
          </div>
        </div>

        {/* Form Title */}
        <div className="form-title-section">
          <h2 className="form-title">Subscription Form</h2>
          <p className="form-instruction">Please complete all fields in BLOCK LETTERS.</p>
        </div>

        {/* Status Message */}
        {submitMessage && (
          <div className={`status-message ${submitStatus === 'success' ? 'success' : 'error'}`}>
            <p>{submitMessage}</p>
          </div>
        )}

        {/* Subscriber's Information */}
        <div className="section">
          <div className="section-header">
            <span className="section-title">Subscriber's Information</span>
          </div>
          
          <div className="field-row">
            <div className="field-group">
              <label className="label">*Preferred Name for Title preparation</label>
              <div className="title-row">
                <label className="radio-label">
                  <input type="radio" name="title" value="Mr" onChange={handleChange} /> Mr.
                </label>
                <label className="radio-label">
                  <input type="radio" name="title" value="Mrs" onChange={handleChange} /> Mrs.
                </label>
              </div>
            </div>
            <div className="field-group">
              <label className="label">*Date</label>
              <input
                type="date"
                name="signatureDate"
                value={formData.signatureDate?.full || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  signatureDate: { ...prev.signatureDate, full: e.target.value }
                }))}
              />
            </div>
          </div>

          <div className="field-row">
            <div className="field-group-wide">
              <label className="label">(Surname)</label>
              <input type="text" name="surname" value={formData.surname} onChange={handleChange} />
            </div>
            <div className="field-group-medium">
              <label className="label">(Middle Name)</label>
              <input type="text" name="middleName" value={formData.middleName} onChange={handleChange} />
            </div>
          </div>

          <div className="field-row">
            <div className="field-group-wide">
              <label className="label">Other names</label>
              <input type="text" name="otherNames" value={formData.otherNames} onChange={handleChange} />
            </div>
            <div className="field-group">
              <label className="label">*NIN</label>
              <input type="text" name="nin" value={formData.nin} maxLength={11} onChange={handleChange} />
            </div>
          </div>

          <div className="field-row">
            <div className="field-group">
              <label className="label">*Marital Status</label>
              <div className="checkbox-row">
                <label className="radio-label">
                  <input type="radio" name="maritalStatus" value="Single" onChange={handleChange} /> Single
                </label>
                <label className="radio-label">
                  <input type="radio" name="maritalStatus" value="Married" onChange={handleChange} /> Married
                </label>
              </div>
            </div>
            <div className="field-group">
              <label className="label">*D.O.B</label>
              <input
                type="date"
                name="dob"
                value={formData.dob?.full || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  dob: { ...prev.dob, full: e.target.value }
                }))}
              />
            </div>
            <div className="field-group">
              <label className="label">*Sex</label>
              <div className="checkbox-row">
                <label className="radio-label">
                  <input type="radio" name="sex" value="Male" onChange={handleChange} /> Male
                </label>
                <label className="radio-label">
                  <input type="radio" name="sex" value="Female" onChange={handleChange} /> Female
                </label>
              </div>
            </div>
          </div>

          <div className="field-row">
            <div className="field-group-full">
              <label className="label">*Name of Spouse</label>
              <div className="spouse-fields">
                <div>
                  <input type="text" name="spouseSurname" onChange={handleChange} />
                  <span className="field-hint">(Surname)</span>
                </div>
                <div>
                  <input type="text" name="spouseFirstName" onChange={handleChange} />
                  <span className="field-hint">(First Name)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="field-row">
            <div className="field-group">
              <label className="label">*Nationality</label>
              <div className="checkbox-row">
                <label className="radio-label">
                  <input type="radio" name="nationality" value="Nigerian" defaultChecked onChange={handleChange} /> Nigerian
                </label>
                <label className="radio-label">
                  <input type="radio" name="nationality" value="Others" onChange={handleChange} /> Others
                </label>
                <input type="text" name="otherNationality" placeholder="(Specify)" onChange={handleChange} style={{ maxWidth: '150px' }} />
              </div>
            </div>
            <div className="field-group">
              <label className="label">*Occupation</label>
              <input type="text" name="occupation" onChange={handleChange} />
            </div>
          </div>

          <div className="field-row">
            <div className="field-group-full">
              <label className="label">*Employer's Name/Name</label>
              <input type="text" name="employerName" onChange={handleChange} />
            </div>
          </div>

          <div className="field-row">
            <div className="field-group-full">
              <label className="label">*Residential Address</label>
              <input type="text" name="residentialAddress" onChange={handleChange} />
            </div>
          </div>

          <div className="field-row">
            <div className="field-group">
              <label className="label">City/Town</label>
              <input type="text" name="cityTown" onChange={handleChange} />
            </div>
            <div className="field-group">
              <label className="label">L.G.A (Residential)</label>
              <input type="text" name="lga" onChange={handleChange} />
            </div>
          </div>

          <div className="field-row">
            <div className="field-group">
              <label className="label">*State</label>
              <input type="text" name="state" onChange={handleChange} />
            </div>
            <div className="field-group">
              <label className="label">*Postal Code</label>
              <input type="text" name="postalCode" onChange={handleChange} />
            </div>
          </div>

          <div className="field-row">
            <div className="field-group">
              <label className="label">*Country of Residence</label>
              <div className="checkbox-row">
                <label className="radio-label">
                  <input type="radio" name="countryOfResidence" value="Nigeria" defaultChecked onChange={handleChange} /> Nigeria
                </label>
                <label className="radio-label">
                  <input type="radio" name="countryOfResidence" value="Others" onChange={handleChange} /> Others
                </label>
                <input type="text" name="otherCountry" placeholder="(Specify)" onChange={handleChange} style={{ maxWidth: '150px' }} />
              </div>
            </div>
            <div className="field-group">
              <label className="label">*Language</label>
              <input type="text" name="language" onChange={handleChange} />
            </div>
          </div>

          <div className="field-row">
            <div className="field-group-full">
              <label className="label">*Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
          </div>

          <div className="field-row">
            <div className="field-group-full">
              <label className="label">*Phone Number</label>
              <div className="phone-fields">
                <div>
                  <input type="tel" name="phoneNumber1" value={formData.phoneNumber1} onChange={handleChange} required />
                </div>
                <span className="or-text">or</span>
                <div>
                  <input type="tel" name="phoneNumber2" value={formData.phoneNumber2} onChange={handleChange} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next of Kin */}
        <div className="section">
          <div className="section-header">
            <span className="section-title">Next of Kin</span>
          </div>

          <div className="field-row">
            <div className="field-group-full">
              <label className="label">*Name</label>
              <div className="spouse-fields">
                <div>
                  <input type="text" name="nokSurname" onChange={handleChange} />
                  <span className="field-hint">(Surname)</span>
                </div>
                <div>
                  <input type="text" name="nokFirstName" onChange={handleChange} />
                  <span className="field-hint">(First Name)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="field-row">
            <div className="field-group-full">
              <label className="label">*Residential Address</label>
              <input type="text" name="nokAddress" onChange={handleChange} />
            </div>
          </div>

          <div className="field-row">
            <div className="field-group">
              <label className="label">City/Town</label>
              <input type="text" name="nokCityTown" onChange={handleChange} />
            </div>
            <div className="field-group">
              <label className="label">L.G.A (Residential)</label>
              <input type="text" name="nokLga" onChange={handleChange} />
            </div>
          </div>

          <div className="field-row">
            <div className="field-group-full">
              <label className="label">*Phone Number</label>
              <div className="phone-fields">
                <div>
                  <input type="tel" name="nokPhoneNumber1" onChange={handleChange} />
                </div>
                <span className="or-text">or</span>
                <div>
                  <input type="tel" name="nokPhoneNumber2" onChange={handleChange} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Investment Details */}
        <div className="section">
          <div className="section-header">
            <span className="section-title">Investment Details</span>
          </div>

          <div className="field-row">
            <div className="field-group">
              <label className="label">*No of Acres</label>
              <input type="number" name="noOfAcres" value={formData.noOfAcres} min="1" onChange={handleChange} required />
            </div>
          </div>

          <div className="field-row">
            <div className="field-group-full">
              <label className="label">*Payment Plan:</label>
              <div className="payment-options">
                <label className="payment-option">
                  <input type="radio" name="paymentPlan" value="Outright" checked={formData.paymentPlan === 'Outright'} onChange={handleChange} required />
                  <span className="payment-label">Outright</span>
                </label>
                <label className="payment-option">
                  <input type="radio" name="paymentPlan" value="3 Months" checked={formData.paymentPlan === '3 Months'} onChange={handleChange} required />
                  <span className="payment-label">3 Months</span>
                </label>
                <label className="payment-option">
                  <input type="radio" name="paymentPlan" value="6 Months" checked={formData.paymentPlan === '6 Months'} onChange={handleChange} required />
                  <div>
                    <span className="payment-label">6 Months</span>
                    <span className="interest-badge">(Attract 5% Interest)</span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Declaration */}
        <div className="declaration-section">
          <p className="declaration-text">
            I/we <strong>{`${formData?.surname} ${formData?.middleName} ${formData?.otherNames} `}</strong> hereby affirm that all information provided as a requirement for the land in
            Adaba Farm & Resort Owode Local Government Area, Ogun State,
            is true and any false or inaccurate information given by me may result in the decline of my application.
          </p>
          <p className="declaration-text">
            I/we also affirm that I/we understood the terms and conditions of the investment as explained in the FAQ and other relevant related
            information provided by the company.
          </p>
          <p className="note-text">
            <strong>Note:</strong> N200,000 is for documentation and N500,000 is for land preparation, seedling, and cultivation per acre.
          </p>
        </div>

        {/* Signature Section */}
        <div className="signature-section">
          <div className="signature-pad-container">
            <div className="signature-header">
              <label className="label">*Digital Signature</label>
              <button
                type="button"
                onClick={clearSignature}
                className="clear-button"
              >
                Clear Signature
              </button>
            </div>
            <div className="signature-pad-wrapper">
              <SignatureCanvas
                ref={signatureRef}
                canvasProps={{
                  className: 'signature-canvas'
                }}
                backgroundColor="#ffffff"
                penColor="#000000"
              />
            </div>
            {signatureError && (
              <p className="error-text">❌ {signatureError}</p>
            )}
            <p className="signature-hint">
              Please sign above using your mouse or touchscreen
            </p>
          </div>
          <div className="field-group">
            <label className="label">*Date</label>
            <input type="date" name="finalDate" onChange={handleChange} required />
          </div>
        </div>

        {/* Referral Section */}
        <div className="referral-section">
          <div className="field-row">
            <div className="field-group">
              <label className="label">REFERRED BY:</label>
              <input type="text" name="referredBy" onChange={handleChange} />
            </div>
            <div className="field-group">
              <label className="label">DATE:</label>
              <input type="date" name="referralDateFull" onChange={handleChange} />
            </div>
          </div>
          <div className="field-row">
            <div className="field-group">
              <label className="label">REFERRAL'S PHONE NOs:</label>
              <input type="tel" name="referralPhone" onChange={handleChange} />
            </div>
            <div className="field-group">
              <label className="label">REFERRAL'S CID:</label>
              <input type="text" name="referralCid" onChange={handleChange} />
            </div>
          </div>
        </div>

        {/* Page 2 - Account Details */}
        <div className="page-break">
          <h2 className="page2-title">ACCOUNT DETAILS</h2>
        </div>

        <div className="account-section">
          <h3 className="account-name">ACCOUNT NAME:</h3>
          <h3 className="account-name-value">KAZFIELD INTEGRATED SERVICES</h3>
          
          <div className="bank-cards">
            <div className="bank-card">
              <div className="bank-logo">
                <span className="sterling-logo">🔴</span>
                <span>Sterling Bank</span>
              </div>
              <div className="bank-details">
                <strong>STERLING BANK</strong>
                <span className="account-num">0500876289</span>
              </div>
            </div>
            
            <div className="bank-card">
              <div className="bank-logo">
                <span className="fcmb-logo">FCMB</span>
              </div>
              <div className="bank-details">
                <strong>FCMB</strong>
                <span className="account-num">5626752011</span>
              </div>
            </div>
          </div>

          <div className="dollar-section">
            <h3 className="dollar-title">DOLLAR ACCOUNT</h3>
            <div className="bank-cards">
              <div className="bank-card">
                <div className="bank-logo">
                  <span className="fcmb-logo">FCMB</span>
                </div>
                <div className="bank-details">
                  <strong>FCMB</strong>
                  <span className="account-num">2007301592</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mode of Payment at Maturity */}
        <div className="section">
          <div className="section-header">
            <span className="section-title">Mode of Payment at Maturity</span>
          </div>

          <div className="field-row">
            <div className="field-group">
              <div className="checkbox-row">
                <label className="radio-label">
                  <input type="radio" name="modeOfPayment" value="Cheque" onChange={handleChange} /> Cheque
                </label>
                <label className="radio-label">
                  <input type="radio" name="modeOfPayment" value="Transfer" onChange={handleChange} /> Transfer
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Account Details for Transfer */}
        <div className="section">
          <div className="section-header">
            <span className="section-title">Account Details for Transfer</span>
          </div>

          <div className="field-row">
            <div className="field-group-full">
              <label className="label">Account Name</label>
              <input type="text" name="accountName" onChange={handleChange} />
            </div>
          </div>

          <div className="field-row">
            <div className="field-group">
              <label className="label">Account Number</label>
              <input type="text" name="accountNumber" maxLength={10} onChange={handleChange} />
            </div>
          </div>

          <div className="field-row">
            <div className="field-group-full">
              <label className="label">Bank</label>
              <input type="text" name="bank" onChange={handleChange} />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="submit-section">
          <button
            type="submit"
            disabled={isSubmitting}
            className="submit-button"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </button>
          {isSubmitting && (
            <p style={{
              textAlign: 'center',
              color: '#666',
              fontSize: '14px',
              marginTop: '10px'
            }}>
              Please wait while we process your subscription...
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="footer">
          <p className="footer-text">
            Office Address: 4, Oluwole Agbede Street, Off Idowu Dabiri Road, Behind Blenco Supermarket, Sangotedo Lagos.
          </p>
          <p className="footer-text">
            Tel: 09077324522, 08024112949. Mail: info.kazfield@gmail.com
          </p>
        </div>
      </form>
    </div>
  );
};

export default AdabaSubscriptionForm;