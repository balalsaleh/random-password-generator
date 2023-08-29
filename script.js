// Array of special characters to be included in password
let specialCharacters = [
  '@',
  '%',
  '+',
  '\\',
  '/',
  "'",
  '!',
  '#',
  '$',
  '^',
  '?',
  ':',
  ',',
  ')',
  '(',
  '}',
  '{',
  ']',
  '[',
  '~',
  '-',
  '_',
  '.'
];

// Array of numeric characters to be included in password
let numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
let lowerCasedCharacters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

// Array of uppercase characters to be included in password
let upperCasedCharacters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];

/*
Above we have a set of arrays of characters used to create a password, we use the arrays
to draw in characters to generate a random password.
*/

// Function to prompt user for password options
function getPasswordOptions() {
  // stored the max and minimum length as variables to reuse
  let minLength = 10;
  let maxlength = 64;
  // password prompt for user to give the length they want
  let lengthPassword = parseInt(prompt("How many characters would you like your password to contain?"))

  // need to do some checks prior to generating the password
  // this checks if the value inserted for the variable of password length is a numerical value
  if (isNaN(lengthPassword) === true) { 
    alert(`Password MUST be of numeric length! 
    Please insert a number between 10 and 65!`); 
    return;
  }

  // less than 10 and more than 64 or less than 2 
  if (lengthPassword < minLength || lengthPassword > maxlength || lengthPassword < 2) {
    //check if its equal to 1, we use ?: character or we use characters because it will be equal to more than
    const  characterTitle = lengthPassword === 1
        ? `character`
        : `characters`;
    
    alert(`ERROR: The password you have asked for is ${lengthPassword} ${characterTitle}!
    Please insert a number which is equal to or more than ${minLength} and less than ${maxlength}.`);
    return;
}

  // prompts for the user to confirm character type preferences
  let hasSpecialChars = confirm(`Click ok to confirm that the password includes special characters`);
  let hasNumbers = confirm(`Click ok to confirm that the password includes numerical characters`);
  let hasLowerCaseChars = confirm(`Click ok to confirm that the password includes lower case characters`);
  let hasUpperCaseChars = confirm(`click ok to confirm that the password includes upper case characters`);

  // check if at least one of the special character types is selected
  if (!hasSpecialChars &&
    !hasNumbers &&
    !hasLowerCaseChars &&
    !hasUpperCaseChars) {
    alert("You must select at least one character type.");
    return null;
  }

  // here i return an object which contains the users options
  let passwordOptions = {
    length: lengthPassword,
    hasSpecialChars: hasSpecialChars,
    hasLowerCaseChars: hasLowerCaseChars,
    hasUpperCaseChars: hasUpperCaseChars,
    hasNumbers: hasNumbers
  }

  return passwordOptions;


}

// Function for getting a random element from an array
function getRandom(arr) {
  let randomIndex = Math.floor(Math.random() * arr.length);
  let randomElement = arr[randomIndex];

  return randomElement;
}

// Function to generate password with user input
function generatePassword() {
  let options = getPasswordOptions();

  let result = []
  let possibleCharacters = []
  let guaranteedCharacters = []

/*
  The concat() method concatenates (joins) two or more arrays.
*/
if (options.hasSpecialChars) { 
  possibleCharacters = possibleCharacters.concat(specialCharacters);
  guaranteedCharacters.push(getRandom(specialCharacters));
}

if (options.hasLowerCaseChars) {
  possibleCharacters = possibleCharacters.concat(lowerCasedCharacters);
  guaranteedCharacters.push(getRandom(lowerCasedCharacters));
}

if (options.hasNumbers) {
  possibleCharacters = possibleCharacters.concat(numericCharacters);
  guaranteedCharacters.push(getRandom(numericCharacters));
}

if (options.hasUpperCaseChars) {
  possibleCharacters = possibleCharacters.concat(upperCasedCharacters);
  guaranteedCharacters.push(getRandom(upperCasedCharacters));
}
  
for (let index = guaranteedCharacters.length; index < options.length; index++) { 
  let generated = getRandom(possibleCharacters);
  result.push(generated);
}

result = result.concat(guaranteedCharacters);

return result.join("");
}

// Get references to the #generate element
let generateBtn = document.querySelector('#generate');

// Write password to the #password input
function writePassword() {
  /*
  below is where the password is actually drawn from, 
  we link the variable to the generatePassword function 
  */
  let password = generatePassword();
  let passwordText = document.querySelector('#password');

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);