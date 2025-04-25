const scriptURL = 'https://script.google.com/macros/s/AKfycbwi3YAsoH-SsDTBU7yyfVvXTpgvA304J-6VAPWeP6IfzpKnX06qIJAB3fGgX-3MHaxqSA/exec';

document.getElementById('submitBtn').addEventListener('click', async () => {
  const email = document.getElementById('emailInput').value.trim();
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!isValidEmail) {
    return Swal.fire({
      icon: 'warning',
      title: 'Oops!',
      text: 'Please enter a valid email address.'
    });
  }

  try {
    await fetch(scriptURL, {
      method: 'POST',
      mode: 'no-cors',
      body: JSON.stringify({ email }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Email submitted successfully!",
      showConfirmButton: false,
      timer: 1500
    });

    document.getElementById('emailInput').value = '';
  } catch (err) {
    console.error('Error!', err.message);
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'There was a problem submitting the email.'
    });
  }
});
