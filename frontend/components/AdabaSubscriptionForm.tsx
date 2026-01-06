"use client";

import React, { useState, useRef, ChangeEvent, FormEvent } from 'react';
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
        fileInput.value = '';
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
    <div style={styles.container}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Source+Sans+Pro:wght@400;600&display=swap');
        
        * {
          box-sizing: border-box;
        }
        
        input[type="text"], input[type="email"], input[type="tel"], input[type="number"], select {
          font-family: 'Source Sans Pro', sans-serif;
          font-size: 14px;
          padding: 8px 12px;
          border: 2px solid #2d5016;
          border-radius: 4px;
          background: #fffef5;
          transition: all 0.3s ease;
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
        }
        
        .char-box {
          width: 32px;
          height: 36px;
          text-align: center;
          text-transform: uppercase;
          font-weight: 600;
          margin-right: 2px;
        }
        
        .small-char-box {
          width: 28px;
          height: 32px;
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
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
      `}</style>
      
      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.logoSection}>
            <div style={styles.kazfieldLogo}>
              <div style={styles.logoIcon}>
                <span style={styles.logoK}>K</span>
                <span style={styles.logoText}>KAZFIELD</span>
              </div>
              <span style={styles.logoSubtext}>INTEGRATED SERVICES LTD</span>
            </div>
          </div>
          
          <div style={styles.centerLogo}>
            <div style={styles.coconutIcon}>🥥</div>
            <h1 style={styles.adabaTitle}>Àdàbà</h1>
            <span style={styles.farmResort}>FARM AND RESORT</span>
            <h2 style={styles.farmType}>FIRST HYBRID COCONUT FARM</h2>
            <p style={styles.siteLocation}>Site Location: Owode LGA, Ogun State</p>
          </div>
          
          <div style={styles.photoBox}>
            <label htmlFor="passport-photo-header" style={styles.photoPlaceholder}>
              <input
                id="passport-photo-header"
                type="file"
                accept="image/jpeg,image/jpg,image/png"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              {passportPhoto ? (
                <img
                  src={URL.createObjectURL(passportPhoto)}
                  alt="Passport"
                  style={styles.photoPreview}
                />
              ) : (
                <>
                  <span style={styles.photoText}>Affix Passport</span>
                  <span style={styles.photoText}>Photograph Here</span>
                </>
              )}
            </label>
          </div>
        </div>

        {/* Form Title */}
        <div style={styles.formTitleSection}>
          <h2 style={styles.formTitle}>Subscription Form</h2>
          <p style={styles.formInstruction}>Please complete all fields in BLOCK LETTERS.</p>
        </div>

        {/* Status Message */}
        {submitMessage && (
          <div style={{
            ...styles.section,
            background: submitStatus === 'success' ? '#d4edda' : '#f8d7da',
            borderLeft: `4px solid ${submitStatus === 'success' ? '#28a745' : '#dc3545'}`,
            padding: '15px 30px',
            margin: '0',
          }}>
            <p style={{
              margin: 0,
              color: submitStatus === 'success' ? '#155724' : '#721c24',
              fontSize: '14px',
              fontWeight: '600',
            }}>
              {submitMessage}
            </p>
          </div>
        )}

    

        {/* Subscriber's Information */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionTitle}>Subscriber's Information</span>
          </div>
          
          <div style={styles.fieldRow}>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>*Preferred Name for Title preparation</label>
              <div style={styles.titleRow}>
                <label style={styles.radioLabel}>
                  <input type="radio" name="title" value="Mr" onChange={handleChange} /> Mr.
                </label>
                <label style={styles.radioLabel}>
                  <input type="radio" name="title" value="Mrs" onChange={handleChange} /> Mrs.
                </label>
              </div>
            </div>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>*Date</label>
              <input
                type="date"
                name="signatureDate"
                style={styles.inputMedium}
                value={formData.signatureDate?.full || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  signatureDate: { ...prev.signatureDate, full: e.target.value }
                }))}
              />
            </div>
          </div>

          <div style={styles.fieldRow}>
            <div style={styles.fieldGroupWide}>
              <label style={styles.label}>(Surname)</label>
              <input type="text" name="surname" value={formData.surname} style={styles.inputWide} onChange={handleChange} />
            </div>
            <div style={styles.fieldGroupMedium}>
              <label style={styles.label}>(Middle Name)</label>
              <input type="text" name="middleName" value={formData.middleName} style={styles.inputMedium} onChange={handleChange} />
            </div>
          </div>

          <div style={styles.fieldRow}>
            <div style={styles.fieldGroupWide}>
              <label style={styles.label}>Other names</label>
              <input type="text" name="otherNames" value={formData.otherNames} style={styles.inputWide} onChange={handleChange} />
            </div>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>*NIN</label>
              <input type="text" name="nin" value={formData.nin} maxLength="11" style={styles.inputMedium} onChange={handleChange} />
            </div>
          </div>

          <div style={styles.fieldRow}>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>*Marital Status</label>
              <div style={styles.checkboxRow}>
                <label style={styles.radioLabel}>
                  <input type="radio" name="maritalStatus" value="Single" onChange={handleChange} /> Single
                </label>
                <label style={styles.radioLabel}>
                  <input type="radio" name="maritalStatus" value="Married" onChange={handleChange} /> Married
                </label>
              </div>
            </div>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>*D.O.B</label>
              <input
                type="date"
                name="dob"
                style={styles.inputMedium}
                value={formData.dob?.full || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  dob: { ...prev.dob, full: e.target.value }
                }))}
              />
            </div>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>*Sex</label>
              <div style={styles.checkboxRow}>
                <label style={styles.radioLabel}>
                  <input type="radio" name="sex" value="Male" onChange={handleChange} /> Male
                </label>
                <label style={styles.radioLabel}>
                  <input type="radio" name="sex" value="Female" onChange={handleChange} /> Female
                </label>
              </div>
            </div>
          </div>

          <div style={styles.fieldRow}>
            <div style={styles.fieldGroupFull}>
              <label style={styles.label}>*Name of Spouse</label>
              <div style={styles.spouseFields}>
                <div>
                  <input type="text" name="spouseSurname" style={styles.inputMedium} onChange={handleChange} />
                  <span style={styles.fieldHint}>(Surname)</span>
                </div>
                <div>
                  <input type="text" name="spouseFirstName" style={styles.inputMedium} onChange={handleChange} />
                  <span style={styles.fieldHint}>(First Name)</span>
                </div>
              </div>
            </div>
          </div>

          <div style={styles.fieldRow}>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>*Nationality</label>
              <div style={styles.checkboxRow}>
                <label style={styles.radioLabel}>
                  <input type="radio" name="nationality" value="Nigerian" defaultChecked onChange={handleChange} /> Nigerian
                </label>
                <label style={styles.radioLabel}>
                  <input type="radio" name="nationality" value="Others" onChange={handleChange} /> Others
                </label>
                <input type="text" name="otherNationality" placeholder="(Specify)" style={styles.inputSmall} onChange={handleChange} />
              </div>
            </div>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>*Occupation</label>
              <input type="text" name="occupation" style={styles.inputMedium} onChange={handleChange} />
            </div>
          </div>

          <div style={styles.fieldRow}>
            <div style={styles.fieldGroupFull}>
              <label style={styles.label}>*Employer's Name/Name</label>
              <input type="text" name="employerName" style={styles.inputFull} onChange={handleChange} />
            </div>
          </div>

          <div style={styles.fieldRow}>
            <div style={styles.fieldGroupFull}>
              <label style={styles.label}>*Residential Address</label>
              <input type="text" name="residentialAddress" style={styles.inputFull} onChange={handleChange} />
            </div>
          </div>

          <div style={styles.fieldRow}>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>City/Town</label>
              <input type="text" name="cityTown" style={styles.inputMedium} onChange={handleChange} />
            </div>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>L.G.A (Residential)</label>
              <input type="text" name="lga" style={styles.inputMedium} onChange={handleChange} />
            </div>
          </div>

          <div style={styles.fieldRow}>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>*State</label>
              <input type="text" name="state" style={styles.inputMedium} onChange={handleChange} />
            </div>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>*Postal Code</label>
              <input type="text" name="postalCode" style={styles.inputSmall} onChange={handleChange} />
            </div>
          </div>

          <div style={styles.fieldRow}>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>*Country of Residence</label>
              <div style={styles.checkboxRow}>
                <label style={styles.radioLabel}>
                  <input type="radio" name="countryOfResidence" value="Nigeria" defaultChecked onChange={handleChange} /> Nigeria
                </label>
                <label style={styles.radioLabel}>
                  <input type="radio" name="countryOfResidence" value="Others" onChange={handleChange} /> Others
                </label>
                <input type="text" name="otherCountry" placeholder="(Specify)" style={styles.inputSmall} onChange={handleChange} />
              </div>
            </div>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>*Language</label>
              <input type="text" name="language" style={styles.inputMedium} onChange={handleChange} />
            </div>
          </div>

          <div style={styles.fieldRow}>
            <div style={styles.fieldGroupFull}>
              <label style={styles.label}>*Email</label>
              <input type="email" name="email" value={formData.email} style={styles.inputFull} onChange={handleChange} required />
            </div>
          </div>

          <div style={styles.fieldRow}>
            <div style={styles.fieldGroupFull}>
              <label style={styles.label}>*Phone Number</label>
              <div style={styles.phoneFields}>
                <input type="tel" name="phoneNumber1" value={formData.phoneNumber1} style={styles.inputMedium} onChange={handleChange} required />
                <span style={styles.orText}>or</span>
                <input type="tel" name="phoneNumber2" value={formData.phoneNumber2} style={styles.inputMedium} onChange={handleChange} />
              </div>
            </div>
          </div>
        </div>

        {/* Next of Kin */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionTitle}>Next of Kin</span>
          </div>

          <div style={styles.fieldRow}>
            <div style={styles.fieldGroupFull}>
              <label style={styles.label}>*Name</label>
              <div style={styles.spouseFields}>
                <div>
                  <input type="text" name="nokSurname" style={styles.inputMedium} onChange={handleChange} />
                  <span style={styles.fieldHint}>(Surname)</span>
                </div>
                <div>
                  <input type="text" name="nokFirstName" style={styles.inputMedium} onChange={handleChange} />
                  <span style={styles.fieldHint}>(First Name)</span>
                </div>
              </div>
            </div>
          </div>

          <div style={styles.fieldRow}>
            <div style={styles.fieldGroupFull}>
              <label style={styles.label}>*Residential Address</label>
              <input type="text" name="nokAddress" style={styles.inputFull} onChange={handleChange} />
            </div>
          </div>

          <div style={styles.fieldRow}>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>City/Town</label>
              <input type="text" name="nokCityTown" style={styles.inputMedium} onChange={handleChange} />
            </div>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>L.G.A (Residential)</label>
              <input type="text" name="nokLga" style={styles.inputMedium} onChange={handleChange} />
            </div>
          </div>

          <div style={styles.fieldRow}>
            <div style={styles.fieldGroupFull}>
              <label style={styles.label}>*Phone Number</label>
              <div style={styles.phoneFields}>
                <input type="tel" name="nokPhoneNumber1" style={styles.inputMedium} onChange={handleChange} />
                <span style={styles.orText}>or</span>
                <input type="tel" name="nokPhoneNumber2" style={styles.inputMedium} onChange={handleChange} />
              </div>
            </div>
          </div>
        </div>

        {/* Investment Details */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionTitle}>Investment Details</span>
          </div>

          <div style={styles.fieldRow}>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>*No of Acres</label>
              <input type="number" name="noOfAcres" value={formData.noOfAcres} min="1" style={styles.inputSmall} onChange={handleChange} required />
            </div>
          </div>

          <div style={styles.fieldRow}>
            <div style={styles.fieldGroupFull}>
              <label style={styles.label}>*Payment Plan:</label>
              <div style={styles.paymentOptions}>
                <label style={styles.paymentOption}>
                  <input type="radio" name="paymentPlan" value="Outright" checked={formData.paymentPlan === 'Outright'} onChange={handleChange} required />
                  <span style={styles.paymentLabel}>Outright</span>
                </label>
                <label style={styles.paymentOption}>
                  <input type="radio" name="paymentPlan" value="3 Months" checked={formData.paymentPlan === '3 Months'} onChange={handleChange} required />
                  <span style={styles.paymentLabel}>3 Months</span>
                </label>
                <label style={styles.paymentOption}>
                  <input type="radio" name="paymentPlan" value="6 Months" checked={formData.paymentPlan === '6 Months'} onChange={handleChange} required />
                  <span style={styles.paymentLabel}>6 Months</span>
                  <span style={styles.interestBadge}>(Attract 5% Interest)</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Declaration */}
        <div style={styles.declarationSection}>
          <p style={styles.declarationText}>
            I/we <strong>{`${formData?.surname} ${formData?.middleName} ${formData?.otherNames} `}</strong> hereby affirm that all information provided as a requirement for the land in
            Adaba Farm & Resort Owode Local Government Area, Ogun State,
            is true and any false or inaccurate information given by me may result in the decline of my application.
          </p>
          <p style={styles.declarationText}>
            I/we also affirm that I/we understood the terms and conditions of the investment as explained in the FAQ and other relevant related
            information provided by the company.
          </p>
          <p style={styles.noteText}>
            <strong>Note:</strong> N200,000 is for documentation and N500,000 is for land preparation, seedling, and cultivation per acre.
          </p>
        </div>

        {/* Signature Section */}
        <div style={styles.signatureSection}>
          <div style={styles.signaturePadContainer}>
            <div style={styles.signatureHeader}>
              <label style={styles.label}>*Digital Signature</label>
              <button
                type="button"
                onClick={clearSignature}
                style={styles.clearButton}
              >
                Clear Signature
              </button>
            </div>
            <div style={styles.signaturePadWrapper}>
              <SignatureCanvas
                ref={signatureRef}
                canvasProps={{
                  style: styles.signaturePad
                }}
                backgroundColor="#ffffff"
                penColor="#000000"
              />
            </div>
            {signatureError && (
              <p style={styles.errorText}>❌ {signatureError}</p>
            )}
            <p style={styles.signatureHint}>
              Please sign above using your mouse or touchscreen
            </p>
          </div>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>*Date</label>
            <input type="date" name="finalDate" style={styles.inputMedium} onChange={handleChange} required />
          </div>
        </div>

        {/* Referral Section */}
        <div style={styles.referralSection}>
          <div style={styles.fieldRow}>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>REFERRED BY:</label>
              <input type="text" name="referredBy" style={styles.inputMedium} onChange={handleChange} />
            </div>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>DATE:</label>
              <input type="date" name="referralDateFull" style={styles.inputMedium} onChange={handleChange} />
            </div>
          </div>
          <div style={styles.fieldRow}>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>REFERRAL'S PHONE NOs:</label>
              <input type="tel" name="referralPhone" style={styles.inputMedium} onChange={handleChange} />
            </div>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>REFERRAL'S CID:</label>
              <input type="text" name="referralCid" style={styles.inputMedium} onChange={handleChange} />
            </div>
          </div>
        </div>

        {/* Page 2 - Account Details */}
        <div style={styles.pageBreak}>
          <h2 style={styles.page2Title}>ACCOUNT DETAILS</h2>
        </div>

        <div style={styles.accountSection}>
          <h3 style={styles.accountName}>ACCOUNT NAME:</h3>
          <h3 style={styles.accountNameValue}>KAZFIELD INTEGRATED SERVICES</h3>
          
          <div style={styles.bankCards}>
            <div style={styles.bankCard}>
              <div style={styles.bankLogo}>
                <span style={styles.sterlingLogo}>🔴</span>
                <span>Sterling Bank</span>
              </div>
              <div style={styles.bankDetails}>
                <strong>STERLING BANK</strong>
                <span style={styles.accountNum}>0500876289</span>
              </div>
            </div>
            
            <div style={styles.bankCard}>
              <div style={styles.bankLogo}>
                <span style={styles.fcmbLogo}>FCMB</span>
              </div>
              <div style={styles.bankDetails}>
                <strong>FCMB</strong>
                <span style={styles.accountNum}>5626752011</span>
              </div>
            </div>
          </div>

          <div style={styles.dollarSection}>
            <h3 style={styles.dollarTitle}>DOLLAR ACCOUNT</h3>
            <div style={styles.bankCard}>
              <div style={styles.bankLogo}>
                <span style={styles.fcmbLogo}>FCMB</span>
              </div>
              <div style={styles.bankDetails}>
                <strong>FCMB</strong>
                <span style={styles.accountNum}>2007301592</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mode of Payment at Maturity */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionTitle}>Mode of Payment at Maturity</span>
          </div>

          <div style={styles.fieldRow}>
            <div style={styles.fieldGroup}>
              <div style={styles.checkboxRow}>
                <label style={styles.radioLabel}>
                  <input type="radio" name="modeOfPayment" value="Cheque" onChange={handleChange} /> Cheque
                </label>
                <label style={styles.radioLabel}>
                  <input type="radio" name="modeOfPayment" value="Transfer" onChange={handleChange} /> Transfer
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Account Details for Transfer */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionTitle}>Account Details for Transfer</span>
          </div>

          <div style={styles.fieldRow}>
            <div style={styles.fieldGroupFull}>
              <label style={styles.label}>Account Name</label>
              <input type="text" name="accountName" style={styles.inputFull} onChange={handleChange} />
            </div>
          </div>

          <div style={styles.fieldRow}>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Account Number</label>
              <input type="text" name="accountNumber" maxLength="10" style={styles.inputMedium} onChange={handleChange} />
            </div>
          </div>

          <div style={styles.fieldRow}>
            <div style={styles.fieldGroupFull}>
              <label style={styles.label}>Bank</label>
              <input type="text" name="bank" style={styles.inputFull} onChange={handleChange} />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div style={styles.submitSection}>
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              ...styles.submitButton,
              opacity: isSubmitting ? 0.6 : 1,
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
            }}
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
        <div style={styles.footer}>
          <p style={styles.footerText}>
            Office Address: 4, Oluwole Agbede Street, Off Idowu Dabiri Road, Behind Blenco Supermarket, Sangotedo Lagos.
          </p>
          <p style={styles.footerText}>
            Tel: 09077324522, 08024112949. Mail: info.kazfield@gmail.com
          </p>
        </div>
      </form>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f5f7e8 0%, #e8f0d8 50%, #d4e4c1 100%)',
    padding: '40px 20px',
    fontFamily: "'Source Sans Pro', sans-serif",
  },
  form: {
    maxWidth: '900px',
    margin: '0 auto',
    background: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 20px 60px rgba(45, 80, 22, 0.15)',
    overflow: 'hidden',
    animation: 'fadeInUp 0.6s ease-out',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '30px',
    background: 'linear-gradient(180deg, #ffffff 0%, #f8faf5 100%)',
    borderBottom: '3px solid #2d5016',
  },
  logoSection: {
    flex: '1',
  },
  kazfieldLogo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  logoIcon: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  logoK: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#c41e3a',
    fontFamily: "'Playfair Display', serif",
  },
  logoText: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#2d5016',
    letterSpacing: '2px',
  },
  logoSubtext: {
    fontSize: '10px',
    color: '#666',
    letterSpacing: '1px',
    marginTop: '2px',
  },
  centerLogo: {
    flex: '2',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  coconutIcon: {
    fontSize: '48px',
    marginBottom: '8px',
  },
  adabaTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '42px',
    fontWeight: '700',
    color: '#2d5016',
    margin: '0',
    letterSpacing: '2px',
  },
  farmResort: {
    fontSize: '12px',
    color: '#f7941d',
    letterSpacing: '3px',
    fontWeight: '600',
    marginTop: '4px',
  },
  farmType: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#333',
    margin: '12px 0 4px',
  },
  siteLocation: {
    fontSize: '13px',
    color: '#666',
    margin: '0',
  },
  photoBox: {
    flex: '1',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  photoPlaceholder: {
    width: '120px',
    height: '140px',
    border: '2px dashed #2d5016',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f8faf5',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    overflow: 'hidden',
  },
  photoText: {
    fontSize: '11px',
    color: '#666',
    textAlign: 'center',
    pointerEvents: 'none',
  },
  photoPreview: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  formTitleSection: {
    textAlign: 'center',
    padding: '20px',
    background: '#2d5016',
  },
  formTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '28px',
    color: '#ffffff',
    margin: '0 0 8px',
  },
  formInstruction: {
    fontSize: '13px',
    color: '#c8e6c9',
    margin: '0',
  },
  section: {
    padding: '20px 30px',
    borderBottom: '1px solid #e0e0e0',
  },
  sectionHeader: {
    background: 'linear-gradient(90deg, #2d5016 0%, #4a7c23 100%)',
    padding: '10px 16px',
    borderRadius: '6px',
    marginBottom: '20px',
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: '600',
    letterSpacing: '0.5px',
  },
  fieldRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    marginBottom: '16px',
  },
  fieldGroup: {
    flex: '1',
    minWidth: '200px',
  },
  fieldGroupWide: {
    flex: '2',
    minWidth: '300px',
  },
  fieldGroupMedium: {
    flex: '1',
    minWidth: '150px',
  },
  fieldGroupFull: {
    flex: '1 1 100%',
  },
  label: {
    display: 'block',
    fontSize: '13px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '6px',
  },
  inputWide: {
    width: '100%',
  },
  inputMedium: {
    width: '100%',
    maxWidth: '250px',
  },
  inputSmall: {
    width: '120px',
  },
  inputFull: {
    width: '100%',
  },
  titleRow: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
  },
  radioLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '14px',
    color: '#333',
    cursor: 'pointer',
  },
  checkboxRow: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  dateInputs: {
    display: 'flex',
    alignItems: 'center',
    gap: '2px',
  },
  dateSeparator: {
    margin: '0 4px',
    fontWeight: '600',
    color: '#666',
  },
  spouseFields: {
    display: 'flex',
    gap: '30px',
    flexWrap: 'wrap',
  },
  fieldHint: {
    display: 'block',
    fontSize: '11px',
    color: '#888',
    marginTop: '4px',
  },
  phoneFields: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flexWrap: 'wrap',
  },
  orText: {
    fontSize: '14px',
    color: '#666',
    fontStyle: 'italic',
  },
  paymentOptions: {
    display: 'flex',
    gap: '30px',
    flexWrap: 'wrap',
    marginTop: '10px',
  },
  paymentOption: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    padding: '12px 20px',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
  },
  paymentLabel: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#333',
  },
  interestBadge: {
    fontSize: '11px',
    color: '#f7941d',
    fontWeight: '600',
    marginLeft: '4px',
  },
  declarationSection: {
    padding: '20px 30px',
    background: '#f8faf5',
    borderBottom: '1px solid #e0e0e0',
  },
  declarationText: {
    fontSize: '13px',
    lineHeight: '1.8',
    color: '#333',
    marginBottom: '12px',
  },
  noteText: {
    fontSize: '13px',
    color: '#c41e3a',
    background: '#fff5f5',
    padding: '12px 16px',
    borderRadius: '6px',
    borderLeft: '4px solid #c41e3a',
  },
  signatureSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    padding: '20px 30px',
    borderBottom: '1px solid #e0e0e0',
  },
  signaturePadContainer: {
    flex: '1',
    width: '100%',
  },
  signatureHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  signaturePadWrapper: {
    border: '2px solid #2d5016',
    borderRadius: '8px',
    overflow: 'hidden',
    background: '#ffffff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  signaturePad: {
    width: '100%',
    height: '200px',
    cursor: 'crosshair',
  },
  clearButton: {
    background: '#dc3545',
    color: '#ffffff',
    border: 'none',
    padding: '8px 16px',
    fontSize: '14px',
    fontWeight: '600',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  signatureHint: {
    fontSize: '12px',
    color: '#666',
    fontStyle: 'italic',
    marginTop: '8px',
    marginBottom: 0,
  },
  errorText: {
    color: '#dc3545',
    fontSize: '13px',
    marginTop: '5px',
    marginBottom: 0,
    fontWeight: '600',
  },
  signatureField: {
    flex: '1',
  },
  signatureLine: {
    height: '2px',
    background: '#333',
    marginTop: '40px',
  },
  referralSection: {
    padding: '20px 30px',
    background: '#fffef5',
    borderBottom: '1px solid #e0e0e0',
  },
  pageBreak: {
    padding: '40px 30px 20px',
    textAlign: 'center',
    borderTop: '4px solid #2d5016',
    marginTop: '20px',
  },
  page2Title: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '28px',
    color: '#2d5016',
    margin: '0',
  },
  accountSection: {
    padding: '20px 30px',
    textAlign: 'center',
  },
  accountName: {
    fontSize: '14px',
    color: '#666',
    margin: '0 0 8px',
  },
  accountNameValue: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#2d5016',
    margin: '0 0 30px',
  },
  bankCards: {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
    flexWrap: 'wrap',
    marginBottom: '30px',
  },
  bankCard: {
    padding: '20px 30px',
    border: '2px solid #e0e0e0',
    borderRadius: '12px',
    background: '#ffffff',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    minWidth: '200px',
  },
  bankLogo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    marginBottom: '12px',
    fontSize: '14px',
    color: '#666',
  },
  sterlingLogo: {
    fontSize: '20px',
  },
  fcmbLogo: {
    background: '#6a1b9a',
    color: '#fff',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '700',
  },
  bankDetails: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
  },
  accountNum: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#2d5016',
    letterSpacing: '2px',
  },
  dollarSection: {
    marginTop: '20px',
    paddingTop: '20px',
    borderTop: '2px dashed #e0e0e0',
  },
  dollarTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '20px',
  },
  submitSection: {
    padding: '30px',
    textAlign: 'center',
    background: '#f8faf5',
  },
  submitButton: {
    background: 'linear-gradient(135deg, #2d5016 0%, #4a7c23 100%)',
    color: '#ffffff',
    border: 'none',
    padding: '16px 60px',
    fontSize: '18px',
    fontWeight: '600',
    borderRadius: '50px',
    cursor: 'pointer',
    boxShadow: '0 8px 24px rgba(45, 80, 22, 0.3)',
    transition: 'all 0.3s ease',
    fontFamily: "'Source Sans Pro', sans-serif",
  },
  footer: {
    padding: '20px 30px',
    background: '#c41e3a',
    textAlign: 'center',
  },
  footerText: {
    fontSize: '12px',
    color: '#ffffff',
    margin: '4px 0',
  },
};

export default AdabaSubscriptionForm;