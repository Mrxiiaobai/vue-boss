
// //获取cookie、
// export function getCookie(name) {
//     var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
//     if (arr = document.cookie.match(reg))
//       return (arr[2]);
//     else
//       return null;
//   }
  
//   //设置cookie,增加到vue实例方便全局调用
//   export function setCookie (c_name, value, expiredays) {
//     var exdate = new Date();
//     exdate.setDate(exdate.getDate() + expiredays);
//     document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
//   };
  
//   //删除cookie
//   export function delCookie (name) {
//     var exp = new Date();
//     exp.setTime(exp.getTime() - 1);
//     var cval = getCookie(name);
//     if (cval != null)
//      document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
//   };


export function setCookie(c_name,value,expire) {
    var date=new Date()
    date.setSeconds(date.getSeconds()+expire)
    document.cookie=c_name+ "="+escape(value)+"; expires="+date.toGMTString()
    //console.log(document.cookie)
}
 
    export function getCookie(c_name){
        if (document.cookie.length>0){
            let c_start=document.cookie.indexOf(c_name + "=")
            if (c_start!=-1){ 
                c_start=c_start + c_name.length+1 
                let c_end=document.cookie.indexOf(";",c_start)
                if (c_end==-1) c_end=document.cookie.length
                    return unescape(document.cookie.substring(c_start,c_end))
                } 
            }
        return ""
    }
     
    export function delCookie(c_name){
        setCookie(c_name, "", -1)
    }
