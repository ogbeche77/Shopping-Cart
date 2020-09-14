//Add euro sign to price in the shopping cart

export default function formatCurrency(num) {
    return "€" + Number(num.toFixed(1)).toLocaleString() + " ";
}