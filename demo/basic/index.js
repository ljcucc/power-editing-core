(()=>{
  var consoleExpand = true;
  function load(){
    $("#toggle_console").click(e=>{
      consoleExpand = !consoleExpand;
      $("#console")[consoleExpand? "slideDown": "slideUp"](300);
    });

    $("#run").click(run)
  }

  function run(){
    const code = $("#code_editor").val();
    var parsed = parenthesize(tokenize(code));
    console.log(parsed);

    var result = run_lisp(parsed);
    console.log(result);
    eval(result);
  }

  $.getJSON("./basic.json", e=>{
    add_gfunc(e);
  });

  window.addEventListener("load",load);
})();