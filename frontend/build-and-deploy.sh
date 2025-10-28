#!/bin/bash

# Adaba Farm Resort - Build and Deploy Script
# This script builds both frontend and backend for deployment

echo "🚀 Building Adaba Farm Resort for deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "Please run this script from the project root directory"
    exit 1
fi

# Build frontend
print_status "Building Next.js frontend..."
if [ -d "node_modules" ]; then
    npm run build
    if [ $? -eq 0 ]; then
        print_status "✅ Frontend build completed successfully"
        print_status "📁 Static files are in the 'out' directory"
    else
        print_error "❌ Frontend build failed"
        exit 1
    fi
else
    print_warning "Node modules not found. Installing dependencies..."
    npm install
    npm run build
fi

# Prepare backend
print_status "Preparing Express.js backend..."
if [ -d "backend" ]; then
    cd backend
    if [ ! -d "node_modules" ]; then
        print_status "Installing backend dependencies..."
        npm install
    fi
    
    # Check if .env exists
    if [ ! -f ".env" ]; then
        print_warning "Backend .env file not found. Please copy env.example to .env and configure it."
        print_status "Backend directory is ready for deployment"
    else
        print_status "✅ Backend is ready for deployment"
    fi
    cd ..
else
    print_error "Backend directory not found"
    exit 1
fi

print_status "🎉 Build process completed!"
echo ""
print_status "Next steps:"
echo "1. 📁 Upload the 'out' directory contents to your Namecheap public_html"
echo "2. 🚀 Deploy the 'backend' directory to your server (Heroku, Railway, etc.)"
echo "3. ⚙️  Configure environment variables in both frontend and backend"
echo "4. 🔗 Update NEXT_PUBLIC_BACKEND_URL in frontend to point to your backend URL"
echo ""
print_status "See DEPLOYMENT.md for detailed instructions"
