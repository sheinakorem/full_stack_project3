
  //////data base
  class DataBase{
    // constructor(){
     //  this.allUsersName = [];
     //}
     signup(jsonUser) {
       var user = JSON.parse(jsonUser);
       var userName = user.userName;
       if(localStorage.getItem(userName)){
         return "400";
       }
       else{
         localStorage.setItem(userName, jsonUser);
        // this.allUsersName.push(userName);
         return "200";
       }
     
     }
 
     findUser(jsonUser){
       var user = JSON.parse(jsonUser);
       var userName = user.userName;
       var password = user.password;
       var userFromData=localStorage.getItem(userName);
       if(userFromData){
       var user1 = JSON.parse(userFromData);
        if(user1.password==password){
          return ("true")
        }
        else{
          return ("The password is not correct")
        }
      }
      return ("You need to sign up")
    }
 
     getAllToDo(userName) {
       let USER = localStorage.getItem(userName);
       if (USER) {
          var userJs=JSON.parse(USER)
          var ToDosJs=JSON.stringify(userJs.ToDos)
         return ToDosJs;
       } else {
         return null;
       }
     }
 
     findToDo(userName,ToDoName){
       let ToDosForUser = JSON.parse(this.getAllToDo(userName));
       const index = ToDosForUser.findIndex(c => JSON.parse(c).name === ToDoName);
       if(index!=-1){
         return (ToDosForUser[index])
       }
       return null;
     }
 
     updateToDo(userN, ToDoN, newToDoJson){
       let ToDosForUser = JSON.parse(this.getAllToDo(userN));
       const index = ToDosForUser.findIndex(ToDos => (JSON.parse(ToDos)).name === ToDoN);
       const newIndex = ToDosForUser.findIndex(ToDos => (JSON.parse(ToDos)).name === (JSON.parse(newToDoJson).name));
       if ((index !== -1 && newIndex === -1) 
             || (index !== -1 && index==newIndex)) {   
          ToDosForUser[index]= newToDoJson;
          var before_the_apdate=JSON.parse(localStorage.getItem(userN))
          var after_the_apdate={
            userName:before_the_apdate.UserName,
            password:before_the_apdate.password,
            email:before_the_apdate.email,
            ToDos:ToDosForUser
          };
          localStorage.setItem(userN,JSON.stringify(after_the_apdate)) 
          return "200" 
       }
       return "400"
     }
 
 
    
     addToDo(userName,ToDos) {
 
       let ToDosForUser = JSON.parse(this.getAllToDo(userName));
      
       if(ToDosForUser.length === 0){
         ToDosForUser.push(ToDos);
         var before_the_apdate=JSON.parse(localStorage.getItem(userName))
         var after_the_apdate={
           userName:before_the_apdate.UserName,
           password:before_the_apdate.password,
           email:before_the_apdate.email,
           ToDos:ToDosForUser
         };
         localStorage.setItem(userName, JSON.stringify(after_the_apdate));
         return "200"
       }
       const index = ToDosForUser.findIndex(c => c.name == JSON.parse(ToDos).name);
       if (index === -1) {
       ToDosForUser.push(ToDos);
       var before_the_apdate=JSON.parse(localStorage.getItem(userName))
       var after_the_apdate={
         userName:before_the_apdate.UserName,
         password:before_the_apdate.password,
         email:before_the_apdate.email,
         ToDos:ToDosForUser
       };
       localStorage.setItem(userName, JSON.stringify(after_the_apdate));
       return "200"
       }
       return "400"  
       }
 
 
     deleteToDo(userName,ToDoName){
       let ToDosForUser = JSON.parse(this.getAllToDo(userName));
       const index = ToDosForUser.findIndex(ToDos => (JSON.parse(ToDos)).name === ToDoName);
       if (index !== -1) {
         ToDosForUser.splice(index, 1);
         var before_the_apdate=JSON.parse(localStorage.getItem(userName))
       var after_the_apdate={
         userName:before_the_apdate.UserName,
         password:before_the_apdate.password,
         email:before_the_apdate.email,
         ToDos:ToDosForUser
       };
       localStorage.setItem(userName, JSON.stringify(after_the_apdate));
       return "200"
       }
       return "400" 
     }   
   }
  
 
   