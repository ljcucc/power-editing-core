var lisp_func = {
  "$print":function (val){
    console.log(val);
    return `console.log("print with:" +${val[0]});`;
  },
  "$set":function (val){
    console.log(val)
    if(syntax(2, "as", val))
      return `var ${val[0]} = ${val[2]};`;
    return `throw "syntax error: set [name] as [value]"`
  },
  "$show":function (val){
    if(syntax(1, "message",val) && syntax(2, "as", val))
      return `alert(${val[2]})`
  },
  "$+":function (val){
    console.log(val);
    return "("+val.join("+")+")"
  }
};

function syntax(index, name,val){
  console.log(`${val[index-1]}==${ "$"+name}`)
  console.log(`${index}>=${val.length}`)
  return index < val.length && val[index-1] == "$"+name;
}