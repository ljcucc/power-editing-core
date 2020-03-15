var lisp_func = {};

function syntax(index, name,val){
  if(name == undefined) return false;
  if(index < val.length && (name[0] == "$" || name[0] == "*")) return true;
  return index < val.length && val[index] == "$"+name;
}

function get_func_template(code, s){
  return (val)=>{
    var syntaxs = s instanceof Array? syntax : s.split(" ");
    return val.reduce((acc, cur, index)=>{
      if(index < syntaxs.length && syntax(index, syntaxs[index], val))
        return acc.replace(`{{${index}}}`, cur);
      throw "erorr with syntax."
    },code);
  }
}

function get_func_reduce(reducer){
  return (val)=>{
    return `[${val}].reduce(${reducer})`;
  }
}

function get_func_callback(callback){
  return (val)=>{
    return callback.replace("{{0}}",`[${val}]`);
  }
}

function add_gfunc(json_obj, namespace){
  for(var key in json_obj){
    var item = json_obj[key];
    var name =  namespace? `$${
      namespace
    }.${ 
      key
    }`: `$${key}`;

    console.log({
      name,
      item
    })

    if(item.type == "template")
      lisp_func[name] = get_func_template(item.code, item.syntax)
    else if(item.type == "reduce")
      lisp_func[name] = get_func_reduce(item.code);
    else if(item.type == "list")
    lisp_func[name] = get_func_callback(item.code);
  }

  console.log(lisp_func);
}