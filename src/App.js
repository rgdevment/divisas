import React, { useState, useEffect } from 'react';
import './App.css';
import numeral from 'numeral';

const currencies = [
  { code: 'CLP', name: 'Chile' },
  { code: 'ARS', name: 'Argentina' },
  { code: 'MXN', name: 'Mexico' },
  { code: 'COL', name: 'Colombia' },
  { code: 'BOB', name: 'Bolivia' },
];

function App() {
  const [purchaseValue, setPurchaseValue] = useState('');
  const [saleValue, setSaleValue] = useState('');
  const [amountToConvert, setAmountToConvert] = useState('');
  const [convertedAmount, setConvertedAmount] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [originCurrency, setOriginCurrency] = useState(currencies[0]);
  const [foreignCurrency, setForeignCurrency] = useState(currencies[1]);
  const [isInstallable, setIsInstallable] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    setDeferredPrompt(e);
    setIsInstallable(true);
  });
  
  const installApp = () => {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        setIsInstallable(false);
      }
      setDeferredPrompt(null);
    });
  };

  useEffect(() => {
    if (originCurrency.code === foreignCurrency.code) {
      const nextIndex = currencies.findIndex((currency) => currency.code !== originCurrency.code);
      setForeignCurrency(currencies[nextIndex]);
    }
  }, [originCurrency, foreignCurrency]);

  const handleConvert = (value) => {
    setAmountToConvert(value);
    if (purchaseValue && saleValue && value) {
      const amountInUSD = Number(value) / Number(saleValue);
      const result = Math.round(amountInUSD * Number(purchaseValue));
      const formattedConvertedAmount = numeral(result).format('$0,0');
      setConvertedAmount(formattedConvertedAmount);
      setShowResult(true);
    } else {
      setShowResult(false);
    }
  };

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
    setShowResult(false);
  };

  const handleOriginCurrencyChange = (e) => {
    const selectedCurrency = currencies.find((currency) => currency.code === e.target.value);
    setOriginCurrency(selectedCurrency);
  };

  const handleForeignCurrencyChange = (e) => {
    const selectedCurrency = currencies.find((currency) => currency.code === e.target.value);
    setForeignCurrency(selectedCurrency);
  };

  let formattedAmountToConvert = '';

  if (amountToConvert) {
    formattedAmountToConvert = numeral(amountToConvert).format('$0,0');
  }

  return (
    <div className="App">
      <h1>Conversión</h1>

      <div className="currency-selector">
        <div className="form-field">
          <label htmlFor="originCurrency">Divisa de Origen:</label>
          <select
            id="originCurrency"
            className="select"
            value={originCurrency.code}
            onChange={handleOriginCurrencyChange}
          >
            {currencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="foreignCurrency">Divisa Extranjera:</label>
          <select
            id="foreignCurrency"
            className="select"
            value={foreignCurrency.code}
            onChange={handleForeignCurrencyChange}
          >
            {currencies
              .filter((currency) => currency.code !== originCurrency.code)
              .map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.name}
                </option>
              ))}
          </select>
        </div>
      </div>

      <div className="form">
        <div className="form-field">
          <label htmlFor="purchaseValue">Compra dolar en {originCurrency.name}:</label>
          <input
            id="purchaseValue"
            className="input"
            type="number"
            value={purchaseValue}
            onChange={(e) => handleInputChange(e, setPurchaseValue)}
          />
          <span className="input-description">Valor de 1 dólar en tu divisa</span>
        </div>

        <div className="form-field">
          <label htmlFor="saleValue">Venta Dolar en {foreignCurrency.name}:</label>
          <input
            id="saleValue"
            className="input"
            type="number"
            value={saleValue}
            onChange={(e) => handleInputChange(e, setSaleValue)}
          />
          <span className="input-description">Valor de 1 dólar en divisa extranjera</span>
        </div>

        <div className="form-field">
          <label htmlFor="amountToConvert">Cantidad de {foreignCurrency.code} a convertir:</label>
          <input
            id="amountToConvert"
            className="input"
            type="number"
            value={amountToConvert}
            onChange={(e) => handleConvert(e.target.value)}
          />
        </div>
      </div>

      {showResult && (
        <div className="result">
          <h2>Resultado:</h2>
          <p>
            {`${formattedAmountToConvert} ${foreignCurrency.code} equivale a ${convertedAmount} ${originCurrency.code}`}
          </p>
        </div>
      )}

      {isInstallable && (
        <button onClick={installApp} className="installButton">Instalar Aplicación</button>
      )}
    </div>
  );
}

export default App;
