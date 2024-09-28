document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('age-form');
    const resultDiv = document.getElementById('result');

    // Utility function to convert month name to number
    function monthNameToNumber(month) {
        const monthNames = {
            'jan': 1, 'feb': 2, 'mar': 3, 'apr': 4, 'may': 5, 'jun': 6,
            'jul': 7, 'aug': 8, 'sep': 9, 'oct': 10, 'nov': 11, 'dec': 12,
            'january': 1, 'february': 2, 'march': 3, 'april': 4, 'may': 5, 'june': 6,
            'july': 7, 'august': 8, 'september': 9, 'october': 10, 'november': 11, 'december': 12
        };
        return monthNames[month.trim().toLowerCase()] || parseInt(month, 10);
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const day = document.getElementById('day').value;
        const month = document.getElementById('month').value;
        const year = document.getElementById('year').value;

        if (!day || !month || !year) {
            resultDiv.textContent = 'Please fill in all fields.';
            return;
        }

        const today = new Date();
        const birthDay = parseInt(day, 10);
        const birthMonth = monthNameToNumber(month);
        const birthYear = parseInt(year, 10);

        if (isNaN(birthDay) || isNaN(birthMonth) || isNaN(birthYear)) {
            resultDiv.textContent = 'Invalid date format. Please enter valid numbers or month names.';
            return;
        }

        const birthDate = new Date(birthYear, birthMonth - 1, birthDay);
        if (birthDate > today) {
            resultDiv.textContent = 'Date of birth cannot be in the future.';
            return;
        }

        const ageInMilliseconds = today - birthDate;
        const ageDate = new Date(ageInMilliseconds);

        const years = ageDate.getUTCFullYear() - 1970;
        const months = ageDate.getUTCMonth();
        const days = ageDate.getUTCDate() - 1;

        resultDiv.textContent = `You are ${years} years, ${months} months, and ${days} days old.`;
    });
});
