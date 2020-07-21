function lisp(parsed, noParse){

  console.log(parsed);

  var result = parsed.map((o)=>{
    if(!o) return;
    if(o instanceof Array){
      if(o[0] == "") o.shift();

      var last = o.pop();
      if(last != "") o.push(last);

      var is_func = isFunction(o);

      if(is_func)
        return lisp_func[is_func.name](lisp(is_func.args, true));

      return JSON.stringify(lisp(o));
    }

    return convert2Value(o);
  });

  return result;
}

function run_lisp(parsed){
  return `${lisp(parsed).join("\n")}`
}

function isFunction(list){
  console.log(list);
  if(list.length > 0 && list[0][0] == "$"){
    var name = list.shift();
    return {
      name,
      args:list 
    }
  }
}

function convert2Value(value){
  console.log(JSON.stringify(value))
  return value[0] == "$" ? value : JSON.stringify(value);
}

function tokenize(code){
  return code.replace(/\;/g, '\n;').replace(/^;.*\n?/gm, '').split('"').map((x, i)=>{
    return i % 2 === 0 ? 
      x.replace(/\(/g, ' ( ')
      .replace(/\)/g, ' ) ')      

      :x.replace(/ /g,"!whitespace!")
      .replace(/\(/g,"!str_pstart!")
      .replace(/\)/g,"!str_pend!")
  }).join('"').trim().split(/\s+/)
  .map(function(x) {
    return x.replace(/!whitespace!/g, " ");
  });
}

function parenthesize(tokenized){
  let code = "["+tokenized.map((x,i)=>{
    if(x == "(") return '[""';
    else if(x == ")") return '""]'
    else return x[0] == '"'? x: !isNaN(x)? x: '"$'+x+'"';
  }).join(",").replace(/!str_pstart!/g,"(").replace(/!str_pend!/g,")")+"]";
  console.log(code);
  return JSON.parse(code);
} 