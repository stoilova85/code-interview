# Guess what is the output for the code below and explain it

## 1. 
```js
(function () {
  var userName = "John";
  function displayUserName() {
    if (userName === "John") {
      var userName = "Jane";
      console.log(userName);
    }
    console.log(userName);
  }
  displayUserName();

})()
```

#### a) Jane, John    
#### b) Jane, Jane
#### c) undefined     
#### d) Jane, undefined
<br>
<br>

> # 🤓 ``C) undefined``
> Answer is ``C) undefined`` because var variables are functional scope, When displayPlayer fn starts executing, Execution context of displayPlayer will be created in callstack and at the memory creation phase var variable player is initialized as undefined. Hence  condition will become false and It will print only undefined.

<hr>

## 2.

```js
(function () {
  const user = {
    userName: "John",
    displayUserName: function () {
      console.log(this.userName);
    },
  };

  setTimeout(user.displayUserName, 1000);

  setTimeout(function () {
    user.displayUserName();
  }, 1000);
})();

```

#### a) John   
#### b) undefined
#### c) ""      
#### d) TypeError
<br>
<br>

> # 🤓 ``B) undefined``
>  Answer is ``B) undefined`` because setTimeout is using ``user.displayUserName`` as a callback function rather than object method. Callback function's ``this`` will refer to the window object and It will console ``undefined`` as there is no property such as ``userName`` in the window object.  
> #### 💡 We can get "John" as an output by wrapping the user.displayUserName() inside a function.


<hr>

## 3. 

```js
(function MCQ16() {
  let person1 = {
    name: { firstName: "John" },
    age: 24,
  };
  let person2 = { ...person1 };

  person2.name.firstName = "Jane";
  person2.age = 33;

  console.log(person1.name.firstName);
  console.log(person1.age);
})();
```


#### a) Jayesh, 33   
#### b) Jayesh, 24
#### c) Virat, 33      
#### d) Virat, 24
<br>
<br>

> # 🤓 ``D) Virat, 24``
>  Answer is ``D) Virat, 24`` because The spread operator makes deep copies of data if the data is not nested. When we have nested data in an array or object the spread operator will create a deep copy of the top most data and a shallow copy of the nested data. 
``person1`` and ``person2`` is pointing to different memory address but ``person1.name`` and ``person2.name`` is pointing to the same memory address.


<hr>

## 4. 

```js 
for (var i = 0; i < 3; i++) {
  setTimeout(function log() {
    console.log(i); // What is logged?
  }, 1000);
}
```

> # 🤓 3, 3, 3
>  Answer is `3, 3, 3 because in the for loop, the variable ``i`` is declared using ``var``. This means that there is only one instance of the variable ``i`` shared across all iterations of the loop. Each iteration of the loop modifies the value of i, and the final value after the loop finishes is 3.
> #### 💡 We can get "John" as an output by wrapping the user.displayUserName() inside a function.

<hr/>

## 5.