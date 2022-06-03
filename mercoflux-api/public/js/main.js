atualizarMenu();

function atualizarMenu(){
    if(sessionStorage.ID_USUARIO){
        menuLogin.style.display = "none";
        menuCadastro.style.display = "none";
    }
    else{
        menuDashboard.style.display = "none";
        menuPerfil.style.display = "none";
    }
}