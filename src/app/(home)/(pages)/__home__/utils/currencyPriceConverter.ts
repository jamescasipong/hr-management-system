
// export const calculatePricing = (price: number, loading: boolean, currencyValue: number) => {
//     if (loading || currencyValue === 0) {
//       return "loading...";
//     }

//     let newPrice = currencyValue * price;
//     let [p, decimal] = newPrice.toFixed(2).split(".");
//     let symbol = Currencies[currency.toUpperCase()]?.symbol ?? "₱";

//     return `${symbol}${p}.${decimal}`;
//   };
//   {
//     /* ${process.env.NEXT_PUBLIC_API_URL}*/
//   }