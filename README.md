# Core of Power Editing 
(In development... 🦺)
![poster 002](https://user-images.githubusercontent.com/22980191/99205667-2dde9f00-27f4-11eb-9f16-3a95c2a82eaa.jpeg)
A core of lisp that powered by Javascript in your browser. Help you to build your website and application faster.

## Demo 
Goto [Demos](./demo/) to try it.

## How it works
First, the interpreter will turn lisp code string to a arrays structure. then convert it into a Javascript code. then using `window.eval` function to run it.

## Try it on your website
Find more about how to use it on your website. go [here](./docs/GetStarted.md)

## Reference
Demo of functions and syntaxs.
* (set [name] as [value]) : set or create a variable with a value.
* (show message as [value]) : show a message with a value
* (+ value...) : add a seris of value together with JavaScript method.
* (- value...): substruction
* (* value...): multiplication
* (/ value...): division
* (inupt *message): make an input (beta)
