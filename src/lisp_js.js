var lisp_lib = {
  if: (args) => {

  }
};

(() => {
  function onload() {
    fetchLangConfig(()=>{
      fetchLispScript();
    })
  }

  function fetchLangConfig(then){
    var count = 0;
    var result = document.querySelectorAll('script[type="text/pec-lang"]');
    console.log(result)
    for (var index in result) {
      if (result[index].src == undefined){
        count ++;
        if(count == result.length) then()
        continue;
      }

      console.log(result[index].getAttribute("namespace"));

      var url = result[index].src;
      var namespace = result[index].namespace;
      console.log(url);
      fetch(url).then(function (response) {
        response.text().then(function (code) {
          var json = JSON.parse(code);
          add_gfunc(json,namespace);

          count++;

          if(count == result.length)
            then()
        });
      });
    }
  }

  function fetchLispScript(then){
    var result = document.querySelectorAll('script[type="text/pec-lisp"]')
    for (var index in result) {
      if (result[index].src == undefined) continue;
      var url = result[index].src;
      console.log(url);
      fetch(url).then(function (response) {
        response.text().then(function (code) {
          var parsed = parenthesize(tokenize(code));
          eval(run_lisp(parsed))
        });
      });
    }
  }

  window.addEventListener("load", onload);
})();
