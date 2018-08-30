window.onload = initialize;

var refChat;
var formChat;
var refMessageUpdate;
var CREATE = "Guardar";
var MODIFY = "Actualizar";
var mode = CREATE;
var notification;
var refUser;
var message;

var userName;
var userImg;

var btn;

function initialize(){

  formChat = document.getElementById("form-chat");
  formChat.reset();
  formChat.addEventListener("submit", saveMessage, false);
    
    refUser = firebase.database().ref().child("Users").child("xe4GN64B7WbYJ1nWSfUtmTiltkb2");

  refChat = firebase.database().ref().child("chat").limitToFirst(100);
  refMessage = firebase.database().ref().child("chat");

  btn = document.getElementById("btn-chat");
    
  notification = document.getElementById("notification");


  showChat();
}


function showChat(){
    refChat.on("value", function(snap){
        var messages = snap.val();
        var reverseMessages = reverseObject(messages);
        var chatMessages = "";
        for(var key in reverseMessages){
            var t = new Date(reverseMessages[key].hora * 1000);
            var formatted = ('0' + t.getHours()).slice(-2) + ':' + ('0' + t.getMinutes()).slice(-2);
            var type = reverseMessages[key].type_mansaje;
            var profileImg;
            var name;
            
            if(reverseMessages[key].fotoPerfil!=undefined){
                profileImg = reverseMessages[key].fotoPerfil;
            }else{
                profileImg = "img/profile.jpg";  
            }
            
            if(reverseMessages[key].nombre !=undefined){
                name =  reverseMessages[key].nombre;
            }else{
                name = "Sin nombre de usuario";
            }
            
            if(type == "1" || type == "2"){
                chatMessages +=
                    
                     "<div class='chat-container'>"+
                      "<img src='"+profileImg+"' alt='Avatar'>"+
                        "<h3>"+name+" </h3>"+
                        "<p>"+reverseMessages[key].mensaje+"</p>"+
                        "<span class='label label-default'>"+formatted+"</span>"+
                    "</div>";
                    
                    
                
                
            }else{
                chatMessages +=
                
                    "<div class='chat-container label-info'>"+
                      "<img src='"+profileImg+"' alt='Avatar'>"+
                        "<h3>"+name+" <button class='btn btn-success update' data-message='"+key+"'>Editar</button><button class='btn btn-danger delete' data-message='"+key+"'>Eliminar</button></h3>"+
                        "<p>"+reverseMessages[key].mensaje+"</p>"+
                        "<span class='label label-default'>"+formatted+"</span>"+
                    "</div>";
            }
            document.getElementById("chat").innerHTML = chatMessages;
            
            if(chatMessages!=""){
              var elementDelete = document.getElementsByClassName("delete");
              for(var i = 0; i < elementDelete.length; i++){
                elementDelete[i].addEventListener("click", removeMessage, false);
              }

              var elementUpdate = document.getElementsByClassName("update");
              for(var i = 0; i < elementUpdate.length; i++){
                elementUpdate[i].addEventListener("click", updateMessage, false);
              }
            }
        }
    });
}


function reverseObject(object) {
    var newObject = {};
    var keys = [];

    for (var key in object) {
        keys.push(key);
    }

    for (var i = keys.length - 1; i >= 0; i--) {
        var value = object[keys[i]];
        newObject[keys[i]]= value;
    }       

    return newObject;
}


function updateMessage(event){
  var keyMessage = this.getAttribute("data-message");
  refMessageUpdate = refMessage.child(keyMessage);
  refMessageUpdate.once("value", function(snap){
    var message = snap.val();
    document.getElementById("message").value = message.mensaje;

  });
  btn.value = MODIFY;
  mode = MODIFY;
}


function saveMessage(event){
    event.preventDefault();
    message = event.target.message.value;

  switch (mode) {
    case CREATE:
      userName = "David";
      userImg = "https://scontent.fcyw2-1.fna.fbcdn.net/v/t1.0-9/31720783_788256474701917_3396277915099332608_n.jpg?_nc_cat=0&oh=789ba78be7c4e929e337458c99cdb1e2&oe=5C3B9116";
      refUser.once("value", function(snap){
          var user = snap.val();
          if(user!=undefined){
            if(user["name"]!=undefined){
             userName = user["name"];
              }

              if(user["urlImg"]!=undefined){
                 userImg = user["urlImg"];
              }  
          }
          
           refMessage.push({
            mensaje: message,
            fotoPerfil: userImg,
            hora: firebase.database.ServerValue.TIMESTAMP,
            type_mansaje: "3",
            nombre: userName
          });
      });    
      
    showNotification(1);
      break;
    case MODIFY:
      refMessageUpdate.update({
        mensaje: event.target.message.value,
        hora: firebase.database.ServerValue.TIMESTAMP
      });
          showNotification(2);
      mode = CREATE;
      btn.value = CREATE;
      break;

  }
  formChat.reset();
}

function removeMessage(){
    var keyMessage = this.getAttribute("data-message");
    var refMessageDelete = refMessage.child(keyMessage);
    refMessageDelete.remove();
    showNotification(3);
}


function showNotification(num){
    if(num==1){
        notification.innerHTML = "<div class='alert alert-success' role='alert'>Se ha enviado un mensaje</div>";
        setTimeout(function(){ notification.innerHTML = "";}, 3000); 
    }else if(num== 2){
        notification.innerHTML = "<div class='alert alert-info' role='alert'>Se ha actualizado un mensaje</div>";
        setTimeout(function(){ notification.innerHTML = "";}, 3000);         
    }else if(num == 3){
        notification.innerHTML = "<div class='alert alert-danger' role='alert'>Se ha elminiado un mensaje</div>";
        setTimeout(function(){ notification.innerHTML = "";}, 3000);         
    }
}
    
