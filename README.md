# Metamask ATM

## Overview

Metamask ATM is a simple decentralized application (DApp) that allows users to interact with a smart contract called `Assessment`. The smart contract manages user accounts, tracks birth years, and enables users to deposit and withdraw funds. The DApp is designed to be used with the MetaMask wallet.

## Getting Started

### Prerequisites

- [MetaMask Wallet](https://metamask.io/): Ensure you have MetaMask installed in your browser.
- [Node.js](https://nodejs.org/): Make sure Node.js is installed on your machine.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/metamask-atm.git
   ```

2. Change into the project directory:

   ```bash
   cd metamask-atm
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

### Usage

1. Start the React app:

   ```bash
   npm start
   ```

2. Visit `http://localhost:3000` in your browser.

3. Connect MetaMask to the app and follow the instructions to log in.

4. Use the app to deposit or withdraw funds based on your age.

## Smart Contract Details

### Assessment.sol

- **Constructor:** Initializes the smart contract with an owner and an initial balance.

- **Functions:**
  - `getBalance`: Returns the current balance of the contract.
  - `setBirthYear`: Sets the birth year of the caller.
  - `getAge`: Returns the age of the caller based on their birth year.
  - `deposit`: Allows the owner to deposit funds into the contract.
  - `withdraw`: Allows the owner to withdraw funds from the contract.

- **Modifiers:**
  - `onlyAdult`: Ensures that the caller is 18 years or older.

### Web3 Integration

The React app interacts with the smart contract using the Web3 library. It connects to the MetaMask wallet and allows users to deposit or withdraw funds based on their age.
