<img src="./assets/p.png">

- static Typing && dynamic Typing
```
/*Static Typing: C code */ 
static int num, sum; // explicit declaration 
num = 5; // now use the variables 
sum = 10; 
sum = sum + num;

/* Dynamic Typing: Python code */ 
num = 10 // directly using the variable
```

- strong Typing && weak Typing
```
/* strong :Python code */ 
>>> foo = "x" 
>>> foo = foo + 2 
Traceback (most recent call last): 
  File "<pyshell#3>", line 1, in ? 
    foo = foo + 2 
TypeError: cannot concatenate 'str' and 'int' objects 
>>>


/* PHP code */ 
<?php 
$foo = "x"; 
$foo = $foo + 2; // not an error 
echo $foo; 
?>
```