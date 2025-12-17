const express = require('express');
const nodemailer = require('nodemailer');
const { body, validationResult } = require('express-validator');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Standard static middleware for uploads
// Standard static middleware for uploads
app.use('/uploads', express.static('uploads'));

// Request logging middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    next();
});

// Owner email (Sina Consulting Services)
const OWNER_EMAIL = process.env.OWNER_EMAIL || 'admin@sinaconsultingservices.co.uk';

// Configure multer for CV/file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only PDF and Word documents are allowed.'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Create uploads directory if it doesn't exist
const fs = require('fs');
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_PORT == 465, // true for port 465 (SSL), false for other ports (TLS)
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    },
    tls: {
        rejectUnauthorized: process.env.SMTP_TLS_REJECT_UNAUTHORIZED !== 'false'
    }
});

// ===========================================
// EMAIL TEMPLATES
// ===========================================
const { 
    contactFormEmailTemplate, 
    careerFormEmailTemplate, 
    applicantConfirmationTemplate 
} = require('./templates/emailTemplates');

// ===========================================
// VALIDATION RULES
// ===========================================

const contactFormValidation = [
    body('firstName')
        .trim()
        .notEmpty().withMessage('First name is required')
        .isLength({ min: 2, max: 50 }).withMessage('First name must be between 2 and 50 characters')
        .matches(/^[a-zA-Z\s'-]+$/).withMessage('First name can only contain letters, spaces, hyphens and apostrophes'),
    
    body('lastName')
        .trim()
        .notEmpty().withMessage('Last name is required')
        .isLength({ min: 2, max: 50 }).withMessage('Last name must be between 2 and 50 characters')
        .matches(/^[a-zA-Z\s'-]+$/).withMessage('Last name can only contain letters, spaces, hyphens and apostrophes'),
    
    body('contactNumber')
        .trim()
        .notEmpty().withMessage('Contact number is required')
        .matches(/^[\d\s\-+()]{7,20}$/).withMessage('Please enter a valid phone number'),
    
    body('businessEmail')
        .trim()
        .notEmpty().withMessage('Business email is required')
        .isEmail().withMessage('Please enter a valid email address')
        .normalizeEmail(),
    
    body('organizationName')
        .trim()
        .notEmpty().withMessage('Organization name is required')
        .isLength({ min: 2, max: 100 }).withMessage('Organization name must be between 2 and 100 characters'),
    
    body('role')
        .trim()
        .notEmpty().withMessage('Role is required')
        .isLength({ min: 2, max: 100 }).withMessage('Role must be between 2 and 100 characters')
];

const careerFormValidation = [
    body('fullName')
        .trim()
        .notEmpty().withMessage('Full name is required')
        .isLength({ min: 2, max: 100 }).withMessage('Full name must be between 2 and 100 characters')
        .matches(/^[a-zA-Z\s'-]+$/).withMessage('Full name can only contain letters, spaces, hyphens and apostrophes'),
    
    body('emailAddress')
        .trim()
        .notEmpty().withMessage('Email address is required')
        .isEmail().withMessage('Please enter a valid email address')
        .normalizeEmail(),
    
    body('contactNumber')
        .trim()
        .notEmpty().withMessage('Contact number is required')
        .matches(/^[\d\s\-+()]{7,20}$/).withMessage('Please enter a valid phone number'),
    
    body('location')
        .trim()
        .notEmpty().withMessage('Location is required')
        .isLength({ min: 2, max: 100 }).withMessage('Location must be between 2 and 100 characters')
];

// ===========================================
// API ENDPOINTS
// ===========================================

// Contact Form Endpoint (Form 1)
app.post('/api/contact', contactFormValidation, async (req, res) => {
    console.log('📧 Contact form endpoint hit');
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('❌ Validation errors:', errors.array());
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array()
            });
        }

        const { firstName, lastName, contactNumber, businessEmail, organizationName, role } = req.body;

        // Send email to owner
        const mailOptions = {
            from: `"Sina Consulting Website" <${process.env.SMTP_USER}>`,
            to: OWNER_EMAIL,
            subject: `New Contact Inquiry from ${firstName} ${lastName}`,
            html: contactFormEmailTemplate({
                firstName,
                lastName,
                contactNumber,
                businessEmail,
                organizationName,
                role
            })
        };

        console.log('📤 Sending contact email to:', OWNER_EMAIL);
        await transporter.sendMail(mailOptions);
        console.log('✅ Contact email sent successfully');

        res.status(200).json({
            success: true,
            message: 'Thank you for your inquiry! We will get back to you shortly.'
        });

    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to submit form. Please try again later.'
        });
    }
});

// Career/Join Us Form Endpoint (Form 2)
app.post('/api/career', upload.single('cv'), careerFormValidation, async (req, res) => {
    console.log('💼 Career form endpoint hit');
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('❌ Validation errors:', errors.array());
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array()
            });
        }

        const { fullName, emailAddress, contactNumber, location } = req.body;
        const cvFile = req.file;

        // Prepare email to owner with CV attachment
        const mailOptionsOwner = {
            from: `"Sina Consulting Careers" <${process.env.SMTP_USER}>`,
            to: OWNER_EMAIL,
            subject: `New Career Application: ${fullName}`,
            html: careerFormEmailTemplate({
                fullName,
                emailAddress,
                contactNumber,
                location
            }, cvFile),
            attachments: cvFile ? [{
                filename: cvFile.originalname,
                path: path.resolve(__dirname, cvFile.path),
                contentType: cvFile.mimetype
            }] : []
        };

        // Send confirmation email to applicant
        const mailOptionsApplicant = {
            from: `"Sina Consulting Services" <${process.env.SMTP_USER}>`,
            to: emailAddress,
            subject: 'Application Received - Sina Consulting Services',
            html: applicantConfirmationTemplate(fullName.split(' ')[0])
        };

        // Send both emails
        console.log('📤 Sending career emails...');
        await Promise.all([
            transporter.sendMail(mailOptionsOwner),
            transporter.sendMail(mailOptionsApplicant)
        ]);
        console.log('✅ Career emails sent successfully');

        res.status(200).json({
            success: true,
            message: 'Your application has been submitted successfully! Check your email for confirmation.'
        });

    } catch (error) {
        console.error('Career form error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to submit application. Please try again later.'
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    console.log('✅ Health check endpoint hit');
    res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 handler - must be before error middleware
app.use((req, res) => {
    console.log(`❌ 404 - Route not found: ${req.method} ${req.url}`);
    res.status(404).json({
        success: false,
        message: 'Endpoint not found',
        requestedUrl: req.url,
        method: req.method,
        availableEndpoints: [
            'POST /api/contact',
            'POST /api/career',
            'GET /api/health'
        ]
    });
});


// Error handling middleware
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                success: false,
                message: 'File too large. Maximum size is 5MB.'
            });
        }
    }
    if (err.message === 'Invalid file type. Only PDF and Word documents are allowed.') {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }
    console.error(err);
    res.status(500).json({
        success: false,
        message: 'An unexpected error occurred.'
    });
});

// Start server
app.listen(PORT, () => {
    console.log('\n' + '='.repeat(60));
    console.log('🚀 Sina Consulting API Server Started');
    console.log('='.repeat(60));
    console.log(`📍 Port: ${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`📧 SMTP Host: ${process.env.SMTP_HOST || 'NOT SET'}`);
    console.log(`📧 SMTP User: ${process.env.SMTP_USER || 'NOT SET'}`);
    console.log(`📬 Owner Email: ${OWNER_EMAIL}`);
    console.log('\n📋 Available Endpoints:');
    console.log('  POST http://localhost:' + PORT + '/api/contact');
    console.log('  POST http://localhost:' + PORT + '/api/career');
    console.log('  GET  http://localhost:' + PORT + '/api/health');
    console.log('='.repeat(60) + '\n');
});

module.exports = app;
