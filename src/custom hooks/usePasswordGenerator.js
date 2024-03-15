import { useState } from "react";

const usePasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const generatePassword = (checkBoxes, size) => {
    const seletecdOptions = checkBoxes.filter((item) => item.state);
    if (seletecdOptions.length === 0) {
      setPassword("");
      setError("Please select at least one option");
      return;
    }
    let charSet = "";
    let generatedPassword = "";
    seletecdOptions.forEach((item) => {
      switch (item.title) {
        case "Include uppercase letters":
          charSet += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
          break;
        case "Include lowercase letters":
          charSet += "abcdefghijklmnopqrstuvwxyz";
          break;
        case "Include numbers":
          charSet += "0123456789";
          break;
        case "Include symbols":
          charSet += "!@#$%^&*";
          break;
        default:
          break;
      }
    });
    for (let i = 0; i < size; i++) {
      const randomIndex = Math.floor(Math.random() * charSet.length);
      generatedPassword += charSet[randomIndex];
    }
    setPassword(generatedPassword);
    const strength = checkPasswordStrength(password);
    setPasswordStrength(strength);
  };
  return { password, error, generatePassword, passwordStrength };
};
export default usePasswordGenerator;

function checkPasswordStrength(password) {
  const minLength = 8;
  const minUppercase = 1;
  const minLowercase = 1;
  const minNumbers = 1;
  const minSpecialChars = 1;
  const specialCharsRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

  let score = 0;
  if (password.length >= minLength) {
    score++;
  }
  if (password.match(/[A-Z]/g)?.length >= minUppercase) {
    score++;
  }
  if (password.match(/[a-z]/g)?.length >= minLowercase) {
    score++;
  }
  if (password.match(/[0-9]/g)?.length >= minNumbers) {
    score++;
  }
  if (password.match(specialCharsRegex)?.length >= minSpecialChars) {
    score++;
  }
  if (score === 5) {
    return "Strong";
  } else if (score >= 3) {
    return "Medium";
  } else {
    return "Weak";
  }
}
