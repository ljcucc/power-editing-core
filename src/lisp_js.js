var lisp_lib = {
  if: (args) => {

  },
  _var_scope: (last_e, callback)=>{
    var cur_scope = {__XD__: "hello, nice to meet you."};
    var funcs = {
      get: (name)=>{
        // console.log(name);
        // console.log(cur_scope);
        // console.log(cur_scope["$"+name])
        if("$"+name in cur_scope)
          return cur_scope["$"+name];
        else if(last_e)
          return last_e.get(name);
        else
          throw `variable "${name}" not found.`;
      },
      set: (name, value)=>{
        if(name in cur_scope) cur_scope[name] = value; else last_e.set(name, value);
      },
      var: (name, value)=>{
        cur_scope[name] = value || "nothings here!";
      }
    };

    callback(funcs);
  },

  provar:(value)=>{
    console.log("provar");
    if(value[0] == "$"){
      console.log("var found.");
      console.log(e_funcs.get(value.substring(1)));
      return typeof e_funcs != 'undefined'? e_funcs.get(value.substring(1)):undefined;
    }

    console.log("var not found.");
    return value;
  }
};

lisp_lib._var_scope(false, (e)=>{
  e_funcs = e;
});
var e_funcs;

var lisp_lib_wapper = {
  var_scope:(list)=>{
    return lisp_lib._var_scope(list[0], list[1]);
  },
  c_var: (funcs, list)=>{
    console.log(list);
    funcs.var(list[0], list[1]);
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
