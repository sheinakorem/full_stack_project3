
class Fajax{
    constructor() {
      this.dataBase = new DataBase();
    }
     request(req){
        var request = req.split(' ');
        var method = request[0];
        var url = request[1];
        var data = request[2];
      
        if(method == 'GET'){
          var item;
          var status;
          var statusCode;
          let r = url.split('/');  
          if(r.length === 3 ){     //
            if(r[2]==="ToDos"){//get all ToDo  
              item= this.dataBase.getAllToDo(r[1]);
             
              if(item.length==0){
                statusCode="400"
                status="No ToDo exist"
              }
              else{
                statusCode="200"
                status="OK"
              }
              return statusCode +  '/'  + status +  '/'  + item 
            }
            else{  
              item=this.dataBase.findToDo(r[1],r[2])
              if(item){
                statusCode="200"
                status="OK"
              }
              else{
                statusCode="400"
                status="There is no ToDo with this name"
              }
              return statusCode +  '/' + status +  '/'  + item
            }
          }
          if(r.length === 2 ){ 
            var ans = this.dataBase.findUser(data);
            if(ans == "true"){
              statusCode="200"
              status="OK"
            }
            else{ 
              statusCode="400"
              if(ans == "The password is not correct"){
                status="The password is not correct"
              }
              else{
                status="You need to sign in"
              }
            }
            return statusCode + '/' + status
          }
        }
        
      if(method=='POST'){
          let r = url.split('/');
          if(r.length === 2){  
            if( r[1] ==='*'){  // add new user 
              var statusCode = this.dataBase.signup(data);
              var status = "";
              if(statusCode === "200"){
                 status = "OK"
              }
              else{
                status = "A user with this name exists, try to find diffrent name or to sign in "
              }
              return statusCode +'/'+ status;
            }
            else{   // add new ToDo to user 
              var statusCode = this.dataBase.addToDo(r[1],data);
              
              var status = "";
              if(statusCode === "200"){
                 status = "OK"
              }
              else{
                status = "There is ToDo with this name, try to find diffrent name"
              }
              return statusCode +  '/' + status;
              
            }
          }
        }
        if(method=='DELETE'){
          let r=url.split('/');
          if(r.length===3){
              var statusCode = this.dataBase.deleteToDo(r[1],r[2]);
              var status = "";
              if(statusCode === "200"){
                 status = "OK"
              }
              else{
                status = "BadRequest"
              }
              return statusCode +  '/' +status;
              
            }
          }
        
        if(method=='PUT'){
          let r = url.split('/');
          if(r.length === 3 ){
            var statusCode =this.dataBase.updateToDo(r[1],r[2],data);
              var status = "";
              if(statusCode === "200"){
                 status = "OK"
              }
              else{
                status = "There is alredy ToDo with this name";
              }
              return statusCode +  '/' + status;
              
          }
          
        }
        
        return null;
     }
  }