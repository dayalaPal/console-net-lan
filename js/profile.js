window.onload = initialize;

var refProfile;
var formProfile;
var refMessageUpdate;

var notification;
var file;
var img;
var inputFile;

var urlImg;

var refStorage;
var refMessage;
var name;

function initialize(){

  formProfile = document.getElementById("form-profile");
  formProfile.reset();
  formProfile.addEventListener("submit", saveInformation, false);

  refProfile = firebase.database().ref().child("Users").child("xe4GN64B7WbYJ1nWSfUtmTiltkb2");
    
    notification = document.getElementById("notification");
    
    refMessage = firebase.database().ref().child("chat");
    
    console.log(firebase);
    
    refStorage = firebase.storage().ref().child('foto_perfil');
    
    img = document.getElementById("prof-img");
    
    inputFile = document.getElementById("url-img");
    
    inputFile.addEventListener("change", uploadProfileImg, false);



  showProfile();
}


function showProfile(){
    refProfile.on("value", function(snap){
        var profile = snap.val();
        
        if(profile!=undefined){
           if(profile["name"]!=undefined){
            name = profile["name"];
            document.getElementById("name").value = name;
            }
            if(profile["description"]!=undefined){
                document.getElementById("description").value = profile["description"];
            }

            if(profile["email"]!=undefined){
                document.getElementById("email").value = profile["email"];
            }

            if(profile["urlImg"]!=undefined){
                img.src = profile["urlImg"];
            }
        }
        
        
        
    });
}

function uploadProfileImg(){
    var preview = document.getElementById('prof-img');
    file = document.querySelector('input[type=file]').files[0];
    var reader  = new FileReader();

      reader.onloadend = function () {
        preview.src = reader.result;
      }

      if (file) {
        reader.readAsDataURL(file);
          console.log(file);
      } else {
        preview.src = "";
      }
    
    var uploadTask = refStorage.child(file.name).put(file);
    
    uploadTask.on('state_changed', function(snapshot){
        showNotification(5);
    }, function(error) {
        showNotification(4);
    }, function() {
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
         
        urlImg = downloadURL;
          refProfile.update({
                urlImg: urlImg
            });
          showNotification(3);
        findImg();
      });
    });


}

function saveInformation(event){
    event.preventDefault();
    refProfile.update({
    name: event.target.name.value,        
    email: event.target.email.value,
    description: event.target.description.value
    });
    findUser(event.target.name.value);
    showNotification(1);
    
}

function findUser(nameUser){
    refMessage.orderByChild("uid").equalTo("xe4GN64B7WbYJ1nWSfUtmTiltkb2").limitToLast(100).on("value", function(snap){
        var messages = snap.val();
        var name = nameUser;
        
        if(name!=undefined){
            for(var key in messages){
                refMessage.child(key).update({
                    name: nameUser
                });
            
            }
        }
        
    });
}


function findImg(){
    
    refMessage.push({
        nombre: name,
        fotoPerfil: urlImg,
        type_mansaje: "3",
        hora: firebase.database.ServerValue.TIMESTAMP,
        mensaje: name + " ha cambiado su foto de perfil"
    });
}


function removeProfile(){
    refProfile.remove();
    showNotification(2);
    location.reload(true);
    
}

function showNotification(num){
    switch(num){
        case 1:
            notification.innerHTML = "<div class='alert alert-success' role='alert'>Se ha actualizado tu perfil</div>";
            setTimeout(function(){ notification.innerHTML = "";}, 3000); 
            break;
        case 2:
            notification.innerHTML = "<div class='alert alert-danger' role='alert'>Se ha elminiado tu perfil</div>";
            setTimeout(function(){ notification.innerHTML = "";}, 3000);  
            break;
        case 3:
            notification.innerHTML = "<div class='alert alert-success' role='alert'>Se ha actualizado tu imagen de perfil</div>";
            setTimeout(function(){ notification.innerHTML = "";}, 3000); 
            break;
        case 4:
            notification.innerHTML = "<div class='alert alert-danger' role='alert'>No fue posible actualizar tu imagen de perfil</div>";
            setTimeout(function(){ notification.innerHTML = "";}, 3000);
            break;
        case 5:
            notification.innerHTML = "<div class='alert alert-info' role='alert'>Subiendo imagen... Por favor espere</div>";
            break;
    }
}
 