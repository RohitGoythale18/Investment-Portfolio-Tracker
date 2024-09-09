// Initialize investment data and chart
let investments = [];
let portfolioChart;

// Function to calculate total portfolio value
function calculateTotalValue() {
    const totalValue = investments.reduce((sum, investment) => sum + investment.currentValue, 0);
    document.getElementById('totalValue').innerText = totalValue.toFixed(2);
}

// Function to calculate percentage change
function calculatePercentageChange(investment) {
    const { amountInvested, currentValue } = investment;
    return (((currentValue - amountInvested) / amountInvested) * 100).toFixed(2);
}

// Function to update the investment list in the table
function updateInvestmentList() {
    const investmentList = document.getElementById('investmentList');
    investmentList.innerHTML = '';

    investments.forEach((investment, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
      <td>${investment.assetName}</td>
      <td>$${investment.amountInvested.toFixed(2)}</td>
      <td>$${investment.currentValue.toFixed(2)}</td>
      <td>${calculatePercentageChange(investment)}%</td>
      <td>
        <button onclick="updateInvestment(${index})">Update</button>
        <button onclick="removeInvestment(${index})">Remove</button>
      </td>
    `;
        investmentList.appendChild(row);
    });

    calculateTotalValue();
    updateChart();
}

// Function to handle adding a new investment
document.getElementById('addInvestmentForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const assetName = document.getElementById('assetName').value;
    const amountInvested = parseFloat(document.getElementById('amountInvested').value);
    const currentValue = parseFloat(document.getElementById('currentValue').value);

    investments.push({ assetName, amountInvested, currentValue });

    document.getElementById('addInvestmentForm').reset();
    updateInvestmentList();
});

// Function to update an existing investment
function updateInvestment(index) {
    const newCurrentValue = parseFloat(prompt('Enter the new current value:', investments[index].currentValue));
    if (!isNaN(newCurrentValue) && newCurrentValue > 0) {
        investments[index].currentValue = newCurrentValue;
        updateInvestmentList();
    }
}

// Function to remove an investment
function removeInvestment(index) {
    investments.splice(index, 1);
    updateInvestmentList();
}

// Function to update the pie chart visualization
function updateChart() {
    const ctx = document.getElementById('portfolioChart').getContext('2d');
    if (portfolioChart) {
        portfolioChart.destroy(); // Destroy the previous chart instance
    }

    const data = {
        labels: investments.map(inv => inv.assetName),
        datasets: [{
            data: investments.map(inv => inv.currentValue),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        }],
    };

    portfolioChart = new Chart(ctx, {
        type: 'pie',
        data: data,
    });
}

// Initialize chart when the page loads
window.onload = function () {
    const ctx = document.getElementById('portfolioChart').getContext('2d');
    portfolioChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            }],
        },
    });
};
