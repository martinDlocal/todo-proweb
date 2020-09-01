const greetingServiceUrl = '/.netlify/functions/server';

const greetingText = document.querySelector('#greeting');

const nameInput = document.querySelector('#name');

const okButton = document.querySelector('#ok');
okButton.addEventListener('click', () => {
  const name = nameInput.value;

  const searchParams = new URLSearchParams();
  searchParams.append('name', name);

  fetch(`${greetingServiceUrl}?${searchParams}`)
    .then((res) => res.json())
    .then((data) => {
      const { greeting } = data;
      greetingText.textContent = greeting;
    });
});
