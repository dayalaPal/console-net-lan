window.onload = initialize;

var refUsers;
var formUsers;
var dropdownUsers;

var tableUsers;
var btnDropdown;

var CREATE = "Guardar";
var UPDATE = "Actualiar";
var mode = CREATE;
var notification;
var updateRef;


function initialize(){
    
    refUsers = firebase.database().ref().child("Users");
    formUsers = document.getElementById("form-users");
    formUsers.reset();
    formUsers.addEventListener("submit", saveUser, false);
    dropdownUsers = document.getElementById("dropdown-users");
    tableUsers = document.getElementById("tbody-users");
    notification = document.getElementById("notification");
    showUsers();
    
    
}

function showUsers(){
    refUsers.on("value", function(snap){
        var rows = "";
        var uids = "";
        var users = snap.val();
        for(var key in users){
            var name;
            var email;
            if(users[key].name!=undefined){
                name= users[key].name;
            }else{
                name = "Sin nombre de usuario";
            }
            
            if(users[key].email!=undefined){
                email= users[key].email;
            }else{
                email = "Sin correo Electrónico";
            }
            
            rows +=
                "<tr>"+
                    "<td>"+key+"</td>"+
                    "<td>"+name+"</td>"+
                    "<td>"+email+"</td>"+
                    "<td><img class='img-rounded img-responsive' style='max-height:80px;' src='"+users[key].urlImg+"' alt='Sin imagen'></td>"+
                    "<td><button class='btn btn-danger delete' data-user='"+key+"'><span class='glyphicon glyphicon-fire'></span></button></td>"
                "</tr>"
                ;
            uids +=
                
            "<li><a class='update' data-user='"+key+"'>"+key+"</a></li>"+
            "<li role='separator' class='divider'></li>"
                ;
            
        }
        
        tableUsers.innerHTML = rows;
        dropdownUsers.innerHTML = uids;
        
        if(uids!=""){
              var elementUpdate = document.getElementsByClassName("update");
              for(var i = 0; i < elementUpdate.length; i++){
                elementUpdate[i].addEventListener("click", updateUser, false);
              }
            }
        if(rows!=""){
            var elementDelete = document.getElementsByClassName("delete");
              for(var i = 0; i < elementDelete.length; i++){
                elementDelete[i].addEventListener("click", removeUser, false);
              }
            }
        
    });
}


function updateUser(event){
    var keyUpdate = this.getAttribute("data-user");
    updateRef = refUsers.child(keyUpdate);
    updateRef.once("value", function(snap){
        var user = snap.val();
        
        document.getElementById("name").value = user.name,
        document.getElementById("email").value = user.email,
        document.getElementById("url").value = user.urlImg
    });
    
    mode = UPDATE;
}

function saveUser(event){
    event.preventDefault();
    
    switch(mode){
        case CREATE:
            refUsers.push({
                name: event.target.name.value,
                email: event.target.email.value,
                urlImg: event.target.url.value
            });
            showNotification(1);
            break;
            
        case UPDATE:
            updateRef.update({
                 name: event.target.name.value,
                email: event.target.email.value,
                urlImg: event.target.url.value
            });
            mode = CREATE;
            showNotification(2);
            break;
    }
    
    formUsers.reset();
    
}

function removeUser(event){
    var keyDelete = this.getAttribute("data-user");
    refUsers.child(keyDelete).remove();
    showNotification(3);
    formProfile.reset();
}

function showNotification(num){
    if(num==1){
        notification.innerHTML = "<div class='alert alert-success' role='alert'>Se ha agregado un usuario</div>";
        setTimeout(function(){ notification.innerHTML = "";}, 3000); 
    }else if(num== 2){
        notification.innerHTML = "<div class='alert alert-info' role='alert'>Se ha actualizado un usuario</div>";
        setTimeout(function(){ notification.innerHTML = "";}, 3000);         
    }else if(num == 3){
        notification.innerHTML = "<div class='alert alert-danger' role='alert'>Se ha elminiado un usuario</div>";
        setTimeout(function(){ notification.innerHTML = "";}, 3000);         
    }
}