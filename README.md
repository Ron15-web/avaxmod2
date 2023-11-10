# Metacrafters ATM

> A decentralized application (DApp) for depositing and withdrawing Ether with age verification.

---

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Smart Contract](#smart-contract)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

---

## Introduction

The Metacrafters ATM is a decentralized application (DApp) that allows users to deposit and withdraw Ether. It includes age verification to ensure users are at least 18 years old.


---

## Features

- Connect your MetaMask wallet.
- Age verification for users (must be 18 or older).
- Deposit and withdraw Ether.
- Smart contract enforces age restrictions.

---

## Getting Started

### Prerequisites

- [MetaMask](https://metamask.io/): Install MetaMask extension in your browser.
- [HardHat] 
- [Next.js]

### Launching

1. Inside the project directory, in the terminal type: npm i
2. Open two additional terminals in your VS code
3. In the second terminal type: npx hardhat node
4. In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js
5. Back in the first terminal, type npm run dev to launch the front-end.
6. After this, the project will be running on your localhost. Typically at http://localhost:3000/
