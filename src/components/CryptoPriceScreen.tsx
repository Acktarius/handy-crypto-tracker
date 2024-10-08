import * as React from "react";
import { useState, useEffect } from "react";
import { StyleSheet } from "react-nativescript";
import { ListView, Switch, ActivityIndicator } from "@nativescript/core";
import axios from "axios";

const cryptocurrencies = [
  { id: "conceal", symbol: "CCX" },
  { id: "bitcoin", symbol: "BTC" },
  { id: "tether", symbol: "USDT" },
  { id: "litecoin", symbol: "LTC" }
];
const currencies = ["USD", "EUR", "CAD", "JPY", "AUD"];

export function CryptoPriceScreen() {
    const [prices, setPrices] = useState({});
    const [loading, setLoading] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [selectedCurrency, setSelectedCurrency] = useState("USD");

    useEffect(() => {
        fetchPrices();
    }, [selectedCurrency]);

    const fetchPrices = async () => {
        setLoading(true);
        try {
            const cryptoIds = cryptocurrencies.map(c => c.id).join(',');
            const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${cryptoIds}&vs_currencies=${selectedCurrency.toLowerCase()}`);
            
            const newPrices = {};
            cryptocurrencies.forEach((crypto) => {
                newPrices[crypto.symbol] = response.data[crypto.id][selectedCurrency.toLowerCase()];
            });
            
            setPrices(newPrices);
        } catch (error) {
            console.error("Error fetching prices:", error);
            cryptocurrencies.forEach(crypto => {
                prices[crypto.symbol] = "N/A";
            });
        }
        setLoading(false);
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        const body = document.getElementsByTagName("body")[0];
        body.classList.toggle("ns-dark");
    };

    const renderListItem = (item) => {
        return (
            <flexboxLayout className="flex-row justify-between items-center p-2 border-b border-gray-300">
                <label className="text-lg font-bold">{item[0]}</label>
                <label className="text-lg">{typeof item[1] === 'number' ? item[1].toFixed(2) : item[1]} {selectedCurrency}</label>
            </flexboxLayout>
        );
    };

    return (
        <flexboxLayout className={`flex-1 p-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
            <flexboxLayout className="flex-row justify-between items-center mb-4">
                <label className="text-lg font-bold">Dark Mode</label>
                <switch checked={darkMode} onCheckedChange={toggleDarkMode} />
            </flexboxLayout>
            <flexboxLayout className="flex-row justify-between items-center mb-4">
                <label className="text-lg font-bold">Currency</label>
                <listPicker
                    items={currencies}
                    selectedIndex={currencies.indexOf(selectedCurrency)}
                    onSelectedIndexChange={(event) => setSelectedCurrency(currencies[event.value])}
                />
            </flexboxLayout>
            {loading ? (
                <activityIndicator busy={true} />
            ) : (
                <listView
                    items={Object.entries(prices)}
                    className="flex-1"
                    cellFactory={renderListItem}
                />
            )}
        </flexboxLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        flexDirection: "column",
        justifyContent: "flex-start",
    },
});