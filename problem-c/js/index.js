'use strict';

//This variable represents the current state of the program---the data model
//that should be displayed.
//It starts with two sample tasks.
let state = {
  taskList: [
    {id:1, description:'Complete this task', complete:true},
    {id:2, description:'Fill in the `js/index.js` file and complete the exercise', complete:false} 
  ],
  inputtedText: ''
};

/* Your code goes here! */

//Define a function `createTaskItemElement()` that takes as an argument an object 
//representing a task to do (such as one found in the `state.taskList` array) 
//and *returns* a list item (<li>) representing that task.
//The list item should have content that is the `description` of the task, and 
//be given the `font-strike` class to cross it out if the task is completed.
//
//You can test this function by logging out the returned item. You will need to
//pass it an object representing a single task; you can pass it one of the
//examples from the state (e.g., `state.taskList[0]`).



//Define a function `renderTaskList()` that will fill in the provided <ol> with 
//list items (<li>) representing each task in the `state.taskList`. Call your
//`createTaskItemElement()` function to create each <li> element.
//Make sure your function removes any previous list content so that only the 
//current task list is shown after this render call!



//Call your `renderTaskList()` function to render the initial list of tasks!



//Define a function `addNewTask()` that will add a new task to the `taskList`
//stored in the `state`. This new task should
// - have an `id` that is 1 greater than the id of the previous task 
// - have a `description` that is the value of the state's `inputtedText`
// - not be `complete`
//After adding the task, the function should clear out the `inputtedText` (make 
//it an empty string), and then call `renderTaskList()` to show the updated list.
//IMPORTANT: this function should _only_ modify the state and call the render 
//function; it should not interact directly with the DOM!



//To handle user input, add another event listener to the `<input>` element that
//listens for `'input'` events (from when the user types something into the box).
//This listener should use an ANONYMOUS callback function to update the state's 
//`inputtedText` property to have the `value` of the `<input>` element.



//Add an event listener to the "add task"`button` (check the HTML for its id!) 
//so that when the button is clicked, your `addNewTask()` function is called
//(thereby adding a new task is added to the list).
//
//You should now be able to add new items to your task list!
//Note that items will not add when you hit the "enter" key.



//Time to fix some of the user experience. Define a new function `renderInput()`
//that does two things:
// 1. It should set the <input>'s value to be the `state.inputtedText` (so the
//    web page matches the state on render).
// 2. It should "disable" the <button> if the `state.inputtedText` is empty, but
//    enable it there is inputted text. You can disable a button but setting its
//    `disabled` property to `true` (and to `false` to enable).
//Add calls to your `renderInput()` function to BOTH the end of `renderTaskList()`
//AND to the end of your `'input'` event callback (so the input renders on each
//user interaction).



//Finally, modify the `createTaskItemElement()` function so that each list item that 
//is created is registered with a `'click'` event listener. This listener should 
//have an anonymous callback function that "toggles" the task's `completed` 
//property (swaps it from true to false and vice-versa), and then calls 
//`renderTaskList()` again. This should allow you to cross items off your task 
//list!
//
//Fun fact: this anonymous callback will utilize a **closure**, as the function
//will be able to access the task variable when it is called on a click!




//OPTIONAL EXTRA PRACTICE:
//Add a `'click'` event listener to the `#check-done` button so that when the
//button is clicked, the page shows the `.alert` of whether there is work to do:
// - if the task list has any incomplete tasks, the `.alert` element should also
//   be given the `alert-danger` class and content of "You're not done yet!"
// - if the task list has all completed tasks, the `.alert` element should also
//   be given the `alert-success` class and content of "You're all done!"
//EVEN MORE PRACTICE: can you hide the alert again after a few sections?




//Make functions and variables available to tester. DO NOT MODIFY THIS.
if(typeof module !== 'undefined' && module.exports){
  /* eslint-disable */
  if(typeof createTaskItemElement !== 'undefined') 
    module.exports.createTaskItemElement = createTaskItemElement;
}