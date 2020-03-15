# Core of Power Editing 
Because used the core of power editing is too messy, so I rewrite of it.

## Demo 
Goto [Demos](https://ljcucc.github.io/power-editing-core/demo/) to try it.

## How it works
First, the interpreter will turn lisp code string to a arrays structure. then convert it into a Javascript code. then using `window.eval` function to run it.

## Reference
Demo of functions and syntaxs.
* (set [name] as [value]) : set or create a variable with a value.
* (show message as [value]) : show a message with a value
* (+ value...) : add a seris of value together with JavaScript method.