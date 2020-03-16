# Get Started to using Power Editing Core (PEC)

## Installation
To install Power Editing Core source script into your website, import those Javascript in head:
```
./src/lisp.js         Core of lisp
./src/lisp_func.js    Function and syntax manager of lisp
./src/lisp_js.js      Make PEC run in native in browser
```

Then import your lang file. **lang file** is an syntax and function definition of the lisp language, you can add your own function or change syntax by editing lang file. to use the basic lang file, try our `basic.json` lang file to use most basic lisp function for the website.

``` html
<script namespace="[your namespace or not (option)]" src="./path/to/basic.json" type="text/pec-lang"></script>
```

Then import your lisp script:

```html
<script src="./path/to/main.lsp" type="text/pec-lisp"></script>
```

Then your script will run automatic when your webpage loaded.

find more example at [./demo/embed/index.html](../demo/embed/index.html)