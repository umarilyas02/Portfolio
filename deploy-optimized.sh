#!/bin/bash

# Performance Optimization - Quick Deploy Script
# Run this to test and deploy optimized portfolio

set -e

echo "🚀 Portfolio Performance Optimization Deploy Script"
echo "=================================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Step 1: Clean cache
echo -e "${YELLOW}Step 1: Cleaning cache...${NC}"
rm -rf .next
echo -e "${GREEN}✓ Cache cleared${NC}"
echo ""

# Step 2: Build production
echo -e "${YELLOW}Step 2: Building production bundle...${NC}"
npm run build

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Build successful!${NC}"
else
    echo -e "${RED}✗ Build failed. Please check errors above.${NC}"
    exit 1
fi
echo ""

# Step 3: Show bundle sizes
echo -e "${YELLOW}Step 3: Bundle size analysis...${NC}"
echo "Main chunks:"
ls -lh .next/static/chunks/*.js | awk '{print $9, $5}'
echo ""
echo "Total size:"
du -sh .next/static/chunks
echo -e "${GREEN}✓ Bundle analysis complete${NC}"
echo ""

# Step 4: Start local server
echo -e "${YELLOW}Step 4: Starting production server...${NC}"
echo "Server will start on http://localhost:3000"
echo ""
echo "Manual tests to perform:"
echo "1. Open http://localhost:3000"
echo "2. Open Chrome DevTools (F12)"
echo "3. Run Lighthouse audit"
echo "4. Check Network tab for bundle sizes"
echo "5. Verify all images load"
echo "6. Test navigation and animations"
echo ""
echo -e "${GREEN}Press Ctrl+C to stop server when testing is done${NC}"
echo ""

npm run start
