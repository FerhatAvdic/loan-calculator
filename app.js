// Listen for submit

document.querySelector('#loan-form').addEventListener('submit', calculateResults);


//Calculate results
function calculateResults(e) {
    hideResults();
    setTimeout(function () {
        const amount = document.querySelector('#amount');
        const interest = document.querySelector('#interest');
        const years = document.querySelector('#years');
        const monthlyPayment = document.querySelector('#monthly-payment');
        const totalPayment = document.querySelector('#total-payment');
        const totalInterest = document.querySelector('#total-interest');

        const principal = parseFloat(amount.value);
        const calculatedInterest = parseFloat(interest.value) / 100 / 12;
        const calculatedPayments = parseFloat(years.value) * 12;

        //Compute monthly payment
        const x = Math.pow(1 + calculatedInterest, calculatedPayments);
        const monthly = (principal * x * calculatedInterest) / (x - 1);

        if (isFinite(monthly)) {
            monthlyPayment.value = monthly.toFixed(2);
            totalPayment.value = (monthly * calculatedPayments).toFixed(2);
            totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
            showResults();
        } else {
            showError('Please check your inputs');
            document.getElementById('results').style.display = 'none';
            document.getElementById('loading').style.display = 'none';
        }
    }, 500);
    e.preventDefault();
}

//Show Results
function showResults(){
    document.getElementById('results').style.display = 'block';
    document.getElementById('loading').style.display = 'none';
}

//Hide Results
function hideResults() {
    document.getElementById('results').style.display = 'none';
    document.getElementById('loading').style.display = 'block';
}


//Show error
function showError(e){
    //Create div
    const err = document.createElement('div');
    //Give error class
    err.className = 'alert alert-danger'
    //create text node and append to div
    err.appendChild(document.createTextNode(e));
    //Get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    //Instert error above heading
    card.insertBefore(err, heading);
    //Clear error after 3 seconds
    setTimeout(clearError, 3000);
}

function clearError(){
    document.querySelector('.alert').remove();
}