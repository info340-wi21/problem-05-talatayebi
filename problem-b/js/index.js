'use strict';

//Create a variable `form` that refers to the `<form>` element in the DOM.
var form = document['querySelector']('form');

/* Add an event listener to the `form` element that will listen for `'submit'` 
type events (which occur when the form is submitted). In the callback function 
for this event listener, do the following:
  1. Call the `preventDefault()` function on the event to keep the HTTP request
     from being submitted.
  2. Check if the form is currently valid by calling the `checkValidity()` 
     function on the `form` element. This function returns `true` if all inputs 
     are valid, and `false` otherwise.
  3. If the form IS valid, add the `d-none` class to the form element to hide it.
     Also remove the `d-none` element from the `.alert` paragraph to show that 
     instead.
  4. If the form IS NOT valid, add a class called `was-validated` to the `form`. 
     This Bootstrap class will cause validation styling to be applied.
     Also you should disable the submit `button` by assigning its `disabled` 
     attribute a value of `true` (set the attribute directly with dot notation, 
     don't use `setAttribute()`).
*/

form['addEventListener']('submit',function(event) {
  event['preventDefault']();
  var valid = form.checkValidity();
  var alert = document['querySelector'](".alert");

  if (valid == true){
    form['classList']['add']('d-none');
    alert['classList']['remove']('d-none');
    //form['classList']['remove'](alert);
    //var alertElement = document['querySelector']('.alert');
  }
  else{
    form['classList']['add']('was-validated');
    document['querySelector']("button")['disabled'] = 'true';
  }
});

/* You should now be able to submit the form and see it highlight fields that 
are invalid. This validity is based on HTML attributes; for example, the "email"
input has `type="email"` and the `required` attribute, so that it will be 
invalid if it is not an email or missing. 

However, this form will require some "custom" validations not supported by HTML
attributes, so you'll need to use JavaScript to handle that! */

//This function takes in a Date type value and returns the number of years
//since that date (based on the current time). For example, if run in 2020:
//    getYearsSince("2001-01-01") // returns 19
function getYearsSince(aDate){
  /* global moment */
  moment.suppressDeprecationWarnings = true; //don't worry about these now
  return moment().diff(moment(aDate), 'years');
}

/* First you'll check to make sure that the user is at least 13 years old. Add 
an event lister to the `#dobInput` <input> element that will respond to `"input"` 
events (when the user changes the inputted value). In the callback function for 
this event handler, do the following:
  - Get the `.value` property of the `<input>` element (what the user typed in),
    and use that value and the `getYearsSince()` function to calculate the 
    user's age (use the `getYearsSince()`.
  - If the person's age is less than 13 (or greater than 200), call the 
    `setCustomValidity()` method on the `#dobInput` element, setting its error 
    to be the string:
        "You need to be at least 13 years old."
    Also change the `#dobFeedback` element so its `textContent` is this same
    error message.
  - If the person's age is NOT less than 13, use `setCustomValidity()` to set
    the `#dobInput` element's error to be an empty string `""` (this will
    remove the validation error).

The "Date of Birth" should now show an error when empty or if the year is too
recent; otherwise it should highlight as valid. Note that you'll need to hit
"Sign me up!" first to enable the validation highlighting!
*/

var inputElement = document['querySelector']('#dobInput');

inputElement['addEventListener']('input', function(){
  var input = document['getElementById']('dobInput')['value'];

  if (getYearsSince(input) > 13){
    document['getElementById']('dobInput')['setCustomValidity']("");
  }
  else if (getYearsSince(input) < 13 || getYearsSince(input) > 200) {
    document['getElementById']('dobInput')['setCustomValidity']("You need to be at least 13 years old.");
    document['getElementById']('dobFeedback')['textContent'] = "You need to be at least 13 years old.";
  }
});

/* Next you'll make sure the two "password" fields match. Start by defining a
function `validatePasswordMatch()`. This function should access both password
<input> elements and check if their `.value` properties are the same.
- If the values are NOT the same, call the the `setCustomValidity()` method on
  the `#passwordConfirmInput` element, setting its error to be the string:
      "Passwords do not match"
  Also change the `#passwordConfirmFeedback` element so its `textContent` is 
  this same error message.
- If the values ARE the same, use `setCustomValidity()` to set the
  `#passwordConfirmInput` element's error to be an empty string `""`.
  Also change the `#passwordConfirmFeedback` element so its `textContent` is
  also blank (an empty string).
*/

var password = document['getElementById']('passwordInput');
var confirm = document['getElementById']('passwordConfirmInput');

function validatePasswordMatch(){
  if(password['value'] == confirm['value']){
    confirm['setCustomValidity']("");
    document['getElementById']('passwordConfirmFeedback')['textContent'] = "";
  } 
  else if (password['value'] != confirm['value']){
    confirm['setCustomValidity']('Passwords do not match');
    document['getElementById']('passwordConfirmFeedback')['textContent'] = 'Passwords do not match';
  }
}

/* Assign the `validatePasswordMatch` function as the callback for `input` 
events that happen on BOTH the `#passwordInput` and `#passwordConfirmInput`
elements. You can select the elements individually or using `querySelectorAll()`.
*/
//var passwordInput = document['querySelector']('#passwordInput');
//var passwordConfirm = document['querySelector']('#passwordConfirmInput'); 

password['addEventListener']('input', validatePasswordMatch);
confirm['addEventListener']('input', validatePasswordMatch);

/* Last you'll need to only enable the "submit" button if the form is valid. Use
the `querySelectorAll()` method to select all 4 of the <input> elements. Use the
`forEach` function to loop through these inputs, and for each input add (another)
event listener to respond to `input` events. In the event handler function, check
if the <form> element has the `was-validated` class. If so, set the button's
`disabled` property to be `true` if the form is not valid, and `false` otherwise.
(set the property directly with dot notation, don't use `setAttribute()`)

This should disable the button until all of the fields are valid, but only after
the user tries to submit once (which is a polite user experience)
*/

var inputElements = document['querySelectorAll']('input');

inputElements['forEach'](element => {

    element.addEventListener('input', function() {
    if (form.classList.contains('was-validated') == true) {
      document['querySelector']('button')['disabled'] = true;
    } else {
      document['querySelector']('button')['disabled'] = false;
    }

  })
})


//Make functions and variables available to tester. DO NOT MODIFY THIS.
if(typeof module !== 'undefined' && module.exports){
  /* eslint-disable */
  if(typeof validatePasswordMatch !== 'undefined') 
    module.exports.validatePasswordMatch = validatePasswordMatch;
}
