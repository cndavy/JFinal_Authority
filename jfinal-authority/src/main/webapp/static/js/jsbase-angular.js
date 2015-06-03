/**
 * anagulrjs 工具类
 * by 12 
 */


function call(dom,method){

//	var p ="";
//	for(var x=2;x<arguments.length;x++)
//	     p+=arguments[x]+",";
//	
//	if(p.indexOf(",", 0))p.substring(0, p.length-1);
//	
	eval("$(dom).scope()."+method);
}

 