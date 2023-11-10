import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [userAge, setUserAge] = useState(undefined);
  const [inputAmount, setInputAmount] = useState("");


  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

    const getBalance = async () => {
        if (atm) {
            const balanceBigNumber = await atm.getBalance();
            const balanceValue = ethers.utils.formatEther(balanceBigNumber);
            setBalance(parseFloat(balanceValue));
        }
    };

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(account);
    }
  };

  const setBirthYear = async (year) => {
    if (atm) {
        try {
            await atm.setBirthYear(year);
        } catch (error) {
            alert(error.message);
        }
    }
  };

  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account);

      let birthYear = prompt("Please enter your birth year:");

      if (birthYear === null) {
        setAccount(undefined);
        setUserAge(undefined);
        return;
      }

      birthYear = parseInt(birthYear);

      if (isNaN(birthYear) || birthYear < 1900 || birthYear > 2023) {
        alert("Invalid birth year. Please enter a valid year between 1900 and 2023.");
        setAccount(undefined);
        setUserAge(undefined);
      } else {
        setUserAge(2023 - birthYear);
        setBirthYear(birthYear);
      }
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };

  const deposit = async () => {
    if (atm && inputAmount !== "") {
      const amountWei = ethers.utils.parseEther(inputAmount);
      let tx = await atm.deposit(amountWei);
      await tx.wait();
      getBalance();
      setInputAmount("");
    }
  };

  const withdraw = async () => {
    if (atm && inputAmount !== "") {
      const amountWei = ethers.utils.parseEther(inputAmount);
      let tx = await atm.withdraw(amountWei);
      await tx.wait();
      getBalance();
      setInputAmount("");
    }
  };

  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>;
    }
  
    if (!account) {
      return (
        <div>
          <p>You must be at least 18 years old to have an account.</p>
          <button onClick={connectAccount}>Login Using Metamask</button>
        </div>
      );
    }
  
    if (userAge === undefined) {
      return null;
    }
  
    if (userAge < 18) {
      return <p class="block">Sorry, you must be at least 18 years old to use this service.</p>;
    }
  
    if (balance === undefined) {
      getBalance();
    }
  
    return (
      <div class="flex">
        <div class="details">
          <p class="small">ACCOUNT</p>
          <p class="large">{account}</p>
          <p class="small">AGE</p>
          <p class="large">{userAge}</p>
          <p class="small">BALANCE</p>
          <p class="extra-large">{balance}</p>
        </div>
        <div class="atm">
          <input
            class="input"
            type="text"
            placeholder="Enter ETH Amount"
            value={inputAmount}
            onChange={(e) => setInputAmount(e.target.value)}
          />
          <div className="amount">
          </div>
          <button onClick={deposit}>Deposit</button>
          <button onClick={withdraw}>Withdraw</button>
        </div>
      </div>
    );
  };
  
  const handleAmountClick = (amount) => {
    setInputAmount((prevInputAmount) => {
      const currentAmount = parseFloat(prevInputAmount) || 0;
      const newAmount = currentAmount + parseFloat(amount);
      return newAmount.toFixed(2);
    });
  };

  const resetInputAmount = () => {
  setInputAmount("");
};

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <style jsx global>{`
        body {
          background-color: #1F1717;
          font-family: sans-serif;
        }

        .container {
          text-align: center;
          color: #CE5A67;
          background-color: #FCF5ED;
          padding: 20px;
          max-width: 50%;
          margin: 100px auto;
          border-radius: 50px;
        }

        header h1 {
          font-size: 4em;
          font-weight: bold;
          margin-bottom: -10px;
        }

        button {
          background-color: #CE5A67;
          color: #FCF5ED;
          border: none;
          height: 3rem;
          padding: 20px;
          border-radius: 20px;
          margin: 20px 5px;
        }

        button:hover {
          background-color: #F4BF96;
        }

        .amount {
          display: block;
        }

        .flex {
          display: flex;
          margin: 100px 0;
          justify-content: space-between;
        }

        .details {
          text-align: left;
          padding: 0 50px;
        }

        .atm {
          padding: 0 20px;
        }

        .input {
          border: none;
          border-radius: 20px;
          padding: 20px;
        }

        .large {
          font-size: 1rem;
          font-weight: bold;
        }

        .small {
          font-size: 0.8rem;
        }

        .extra-large {
          margin: 0;
          font-size: 2rem;
        }
      `}</style>

      <header>
        <h1>Metamask ATM</h1>
      </header>

      {initUser()}
    </main>
  );
}
