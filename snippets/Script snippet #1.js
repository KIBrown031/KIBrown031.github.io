setTimeout(async () => {
  const code = await navigator.clipboard.readText();
  console.log("Executing:", code);
  eval(code);
}, 3000);