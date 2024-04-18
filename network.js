class Network{
    
    constructor(){
        this.fajax = new Fajax();
    }
    send(req){
        return  this.fajax.request(req);
    }
}