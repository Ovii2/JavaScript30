'use strict';

const inputs = document.querySelectorAll('.controls input');

const handleUpdate = (e) => {
  const suffix = e.target.dataset.sizing || '';
  document.documentElement.style.setProperty(`--${e.target.name}`, e.target.value + suffix);
};

inputs.forEach((input) => input.addEventListener('change', handleUpdate));
inputs.forEach((input) => input.addEventListener('mousemove', handleUpdate));
