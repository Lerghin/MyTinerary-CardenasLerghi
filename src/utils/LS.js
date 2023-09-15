export const LS = {

   getText: (key) => localStorage.getItem(key),
   getObject: (key) => JSON.parse(localStorage.getItem(key)),
rm: (key)=> (
   localStorage.removeItem(key)
   
   
   ),
 set: (key, value)=>(
 JSON.stringify(localStorage.setItem(key,value))
 ),
 clear: ()=>(
  localStorage.clear()
 )

}