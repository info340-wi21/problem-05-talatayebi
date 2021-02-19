const fs = require('fs');
const md5 = require('md5');

//include custom matchers
const styleMatchers = require('jest-style-matchers');
expect.extend(styleMatchers);

const htmlPath = __dirname + '/index.html';
const html = fs.readFileSync(htmlPath, 'utf-8'); //load the HTML file once
const jsPath = __dirname + '/js/index.js';

describe('Source code is valid', () => {
  test('JavaScript lints without errors', async () => {
    expect([jsPath]).toHaveNoEsLintErrors();
  })

  test('HTML has not been modified', () => {
    let nospace = html.replace(/\s/g, ''); //strip all whitespace to account for platform modifications
    expect(md5(nospace)).toBe('ca06d58e1b7789d3b4913a5d0b9278ea');
    //console.log(md5(nospace));
  })
});

//load the HTML into the tester
document.documentElement.innerHTML = html;

//load JavaScript libraries separately
const $ = require('jquery'); //jQuery for convenience
const solution = require(jsPath); //load the solution

describe('Supports User Events', () => {  
  test('Renders an individual task item', () => {
    let taskA = {id:1, description:'Test (completed)', complete:true};
    let taskB = {id:1, description:'Test (incompleted)', complete:false};

    let listItemA = $(solution.createTaskItemElement(taskA));
    expect(listItemA.prop('tagName').toLowerCase()).toEqual('li'); //is li
    expect(listItemA.text()).toEqual(taskA.description); //has description
    expect(listItemA.hasClass('font-strike')).toBe(true); //crossed out

    let listItemB = $(solution.createTaskItemElement(taskB));
    expect(listItemB.hasClass('font-strike')).toBe(false); //not crossed out
  })

  test('Renders all items in the task list', () => {
    expect($('ol li').length).toBe(2); //has 2 list items initially
    expect($('ol li:first').text()).toEqual('Complete this task'); //correct content
  })

  test('Can add new user-specified items to the list', () => {
    $('input').val('Test adding task'); //enter value
    $('input')[0].dispatchEvent(new Event('input')); //pretend I typed that!
    $('#add-task').click(); //click the button
    expect($('ol li').length).toBe(3); //now has 3 list items
    expect($('ol li:last-child').text()).toEqual('Test adding task'); //correct content
  })

  test('Input clears when tasks added', () => {
    $('input').val('Test clearing input'); //enter value
    $('input')[0].dispatchEvent(new Event('input')); //pretend I typed that!
    $('#add-task').click(); //click the button
    expect($('input').val()).toEqual(''); //has no input value
  })

  test('Add button is disabled only for blank input', () => {    
    $('input').val('Testing typing content'); //enter value
    $('input')[0].dispatchEvent(new Event('input')); //pretend I typed that!
    expect($('#add-task').attr('disabled')).toEqual(undefined); //should not have value

    $('input').val(''); //enter value
    $('input')[0].dispatchEvent(new Event('input')); //pretend I typed that!
    expect($('#add-task').attr('disabled')).not.toEqual(undefined); //should have value    
  })

  test('Can cross off (and restore) completed tasks', () => {
    expect($('ol li:first').hasClass('font-strike')).toBe(true); //started crossed off
    $('ol li:first').click(); //click on first item (which was)
    expect($('ol li:first').hasClass('font-strike')).toBe(false); //now incomplete 

    expect($('ol li:last').hasClass('font-strike')).toBe(false); //started not crossed off
    $('ol li:last').click(); //click on first item (which was)
    expect($('ol li:last').hasClass('font-strike')).toBe(true); //now complete 
  })
})
