#!/usr/bin/env node

/**
 * Contact API Test Script
 * This script tests the /adabafarmresort/api/sina/contact endpoint
 * Run with: node test-contact-api.js [environment]
 * Example: node test-contact-api.js prod
 */

const https = require('https');
const http = require('http');

// Configuration
const environments = {
  local: {
    protocol: http,
    host: 'localhost',
    port: 3001,
    path: '/adabafarmresort/api/sina/contact'
  },
  prod: {
    protocol: https,
    host: 'kazfieldisl.com',
    port: 443,
    path: '/adabafarmresort/api/sina/contact'
  }
};

// Sample test data
const testData = {
  firstName: 'John',
  lastName: 'Doe',
  contactNumber: '+234 801 234 5678',
  businessEmail: 'john.doe@example.com',
  organizationName: 'Test Organization Ltd',
  role: 'Technical Director'
};

// Get environment from command line (default to local)
const env = process.argv[2] || 'local';
const config = environments[env];

if (!config) {
  console.error(`❌ Unknown environment: ${env}`);
  console.log('Available environments: local, prod');
  process.exit(1);
}

console.log(`\n🧪 Testing Contact API on ${env.toUpperCase()} environment`);
console.log(`📍 URL: ${config.protocol === https ? 'https' : 'http'}://${config.host}:${config.port}${config.path}\n`);

// Prepare the request
const postData = JSON.stringify(testData);

const options = {
  hostname: config.host,
  port: config.port,
  path: config.path,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

console.log('📤 Sending test request...\n');

// Make the request
const req = config.protocol.request(options, (res) => {
  let data = '';

  console.log(`Response Status: ${res.statusCode} ${res.statusMessage}`);
  console.log(`Response Headers:`, JSON.stringify(res.headers, null, 2));
  console.log('\n---Response Body---');

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const jsonResponse = JSON.parse(data);
      console.log(JSON.stringify(jsonResponse, null, 2));
      
      if (res.statusCode === 200 && jsonResponse.success) {
        console.log('\n✅ TEST PASSED - Contact form submitted successfully!');
        process.exit(0);
      } else {
        console.log('\n⚠️ TEST FAILED - Unexpected response');
        process.exit(1);
      }
    } catch (e) {
      console.log(data);
      console.log('\n❌ TEST FAILED - Invalid JSON response');
      console.error('Parse error:', e.message);
      process.exit(1);
    }
  });
});

req.on('error', (error) => {
  console.error('\n❌ REQUEST FAILED');
  console.error('Error:', error.message);
  console.error('\nPossible causes:');
  console.error('  - Server is not running (if testing local)');
  console.error('  - Network connectivity issues');
  console.error('  - DNS resolution problems');
  console.error('  - Firewall blocking the connection');
  process.exit(1);
});

// Send the request
req.write(postData);
req.end();
