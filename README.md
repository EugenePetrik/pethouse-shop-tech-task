# Test Automation Framework for Pethouse Application

## Overview

This is a comprehensive test automation framework for testing the Pethouse e-commerce application. The framework is built with TypeScript and Playwright.

## Prerequisites

- Node.js version 20+
- npm version 8+

## Tools & Technologies

1. **Node.js** v22.11.0
2. **TypeScript** - type safety and better development experience
3. **Playwright** - cross-browser automation testing
4. **ESLint** - code linting and quality enforcement
5. **Stylistic** - consistent code formatting
6. **Lint-staged** - running linters on staged files
7. **Husky** - Git hooks automation

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

or for clean installation:

```bash
npm ci
```

### 2. Environment Configuration

```bash
cp ./.env.example ./.env
```

### 3. Configure Environment Variables

Edit the `.env` file with appropriate values:

- `WEB_URL` - Base URL of the frontend application.

## Running Tests

### Execute All Tests

```bash
npm run test
```

or

```bash
npm t
```

### Run Specific Test Suite

```bash
# Run product tests only
npx playwright test src/tests/product/

# Run specific test file
npx playwright test src/tests/product/applingPrices.spec.ts
```

### Run Tests in Different Browsers

```bash
# Run in specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Debug Mode

```bash
# Run tests in debug mode
npx playwright test --debug

# Run tests in headed mode
npx playwright test --headed
```

## Code Quality

### Check Code Quality

```bash
npm run quality:check
```

### Fix Linting Issues

```bash
npm run lint
```

## Test Reports

### Generate and View HTML Report

```bash
npm run report
```

This will generate a detailed HTML report with test results, screenshots, and videos for failed tests.
