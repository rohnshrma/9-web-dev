// dom manipulation

// selectors

// id : single element
console.log(document.getElementById("main"));

// class : htmlcollection (kind of array)
console.log(document.getElementsByClassName("para"));

// tagname : htmlcollection (kind of array)
console.log(document.getElementsByTagName("h1"));

// queryselector : select a single element using a id, class or tagname
// if selection is made by class or tagname , the first element matching is returned
// selects a single element

console.log(document.querySelector(".para"));

// queryselectorall : select all the occurance of the element with given id, class or tagname
// returns a nodelist (kind of array)

console.log(document.querySelectorAll(".para"));

// getters and setters

// innerText

var headingOne = document.querySelector("h1");

// => get inner text
// console.log(headingOne.innerText);
// => set inner text
// headingOne.innerText = "This is the newly set heading";

// => get inner html
// console.log(headingOne.innerHTML);

// => set inner html
// headingOne.innerHTML = "my name is <span style='color:red'>john doe</span>";

// => get css style

// console.log(headingOne.style);
// console.log(headingOne.style.color);

// => set css style

// => assigning values to specific properties
// headingOne.style.color = "red";
// headingOne.style.fontSize = "10rem";
// headingOne.style.fontFamily = "cursive";

// =>  overwriting existing css
// headingOne.style =
//   "color:powderblue;font-size:5rem;text-shadow:-2px 0 0 orange";

// => get all attributes
console.log(headingOne.attributes);

// => get attribute value
console.log(headingOne.getAttribute("id"));
console.log(headingOne.getAttribute("style"));

// => set attribute
headingOne.setAttribute("id", "headddddddddone");
