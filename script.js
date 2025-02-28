const name = document.getElementById('name');
const password = document.getElementById('password');
const form = document.getElementById('form');
const errorElement = document.getElementById('error');

form.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent the form from submitting the traditional way

  let messages = [];
  if (name.value === '' || name.value == null) {
    messages.push('Name is required');
  }

  if (password.value.length <= 6) {
    messages.push('Password must be longer than 6 characters');
  }

  if (password.value.length >= 20) {
    messages.push('Password must be less than 20 characters');
  }

  if (password.value === 'password') {
    messages.push('Password cannot be password');
  }

  if (messages.length > 0) {
    errorElement.innerText = messages.join(', ');
  } else {
    // If there are no errors, send the data to the server
    const formData = {
      name: name.value,
      password: password.value
    };

    fetch('/submit-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      alert('Form submitted successfully!');
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('An error occurred while submitting the form.');
    });
  }
});