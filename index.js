// Generar una HtmlCollection de todos los <input>:
let inputFields=document.getElementsByTagName('input')  

//Llamada a la función "onInput" cuando se modifica el valor de los campos:
for(input of inputFields){  
    input.addEventListener("input",onInput);
}

// Llamar a la función "onSubmit" al apretar el botón ENVIAR:
document.getElementById("submit").addEventListener("click", onSubmit);

// Constantes para SVG de error y éxito:
const successSVG = "./images/success-icon.svg"
const errorSVG = "./images/error-icon.svg";

//----------------------------------------------------------------------//
// FUNCIÓN "onSubmit"
// - Comprueba si los campos están vacíos y tira error correspondiente
// - Comprueba si todos los inputs son válidos y genera alert
//----------------------------------------------------------------------//
function onSubmit(){
  let valid = 0;
  for (const input of inputFields) {
    if(input.value.length === 0){
      input.classList.add("notValid");
      input.classList.remove("valid");
      errMsg = "Rellene este campo";
      imgSrc= errorSVG;
      addIconAndMsg(imgSrc, errMsg, input);
    }
    else{
      if(input.classList.value.includes("valid")){
        valid++;
      }
    }
  } 
  if (valid === inputFields.length-1){
      if(alert('Alert For your User!')){}
        else window.location.reload();
  }
}

//----------------------------------------------------------------------//
// FUNCIÓN "onInput"
// - Extrae el elemento en el que ocurrió el evento de input y lo pasa
//   a la función "validateInputs"
//----------------------------------------------------------------------//
function onInput(e) {
  var input=e.srcElement;
  validateInputs(e.srcElement);
}

//----------------------------------------------------------------------//
// FUNCIÓN "validateInputs"
// - Contiene un switch con toda la lógica relevante para validar los
//   tipos de input (RegEx, etc.)
// - Llama a las funciones "validateRegEx" y "addIconAndMsg"
// - En el case "passw1" la función se llama a sí misma para validar
//   "passw2" cada vez que "passw1" cambia 
//----------------------------------------------------------------------//
function validateInputs(input) {
  var errMsg = "";
  var tooltip = "";
  switch (input.id) {
    case "nombre":
      const nombreRegEx = /^[A-Za-zÀ-ü]([A-Za-zÀ-ü ]*)[A-Za-zÀ-ü]$/;
      errMsg = "Nombre no válido";
      tooltip = "Debe empezar y terminar con una letra. No se admiten números y caracteres especiales.";
      validateRegEx(nombreRegEx, input, errMsg, tooltip);
      break;
    case "email":
      const emailRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      errMsg = "Email inválido";
      //tooltip
        if(input.value.includes("@")){
          tooltip= "La dirección \"" + input.value + "\" no es válida."
        }
        else{
          tooltip = "Incluye un signo \"@\" en la dirección de correo electrónico. La dirección \"" + input.value + "\" no incluye el signo \"@\".";
        }
      validateRegEx(emailRegEx, input, errMsg, tooltip);
      break;
    case "passw1":
      const passw1RegEx = /^.{8,}$/;
      errMsg = "Debe tener al menos 8 caracteres";
      validateRegEx(passw1RegEx, input, errMsg, tooltip);
      validateInputs(document.getElementById("passw2"));
      break;
    case "passw2":
      if(input.value === document.getElementById("passw1").value && input.value.length > 0){
        input.classList.add("valid");
        input.classList.remove("notValid");
        imgSrc=successSVG;
        addIconAndMsg(imgSrc,"",input);
      }
      else {
        input.classList.add("notValid");
        input.classList.remove("valid");
        errMsg = "Las contraseñas no coinciden";
        imgSrc=errorSVG;
        addIconAndMsg(imgSrc,errMsg,input);
      }
      break;
    default:
      break;
  }
}

//----------------------------------------------------------------------//
// FUNCIÓN "validateRegEx"
// - Recibe un RegEx y comprueba el input (relleno y supera RegEx)
// - Aplica clases CSS adecuadas en caso de error/éxito, incluyendo
//   llamada a la función "addIconAndMsg"
//----------------------------------------------------------------------//
function validateRegEx(regExPattern, input, errMsg, tooltip) {
    let isValid = regExPattern.test(input.value);
    let isFilled = input.value.length!==0;
    if (isFilled && isValid) {
        input.classList.add("valid");
        input.classList.remove("notValid");
        let imgSrc= successSVG;
        errMsg = "";
        addIconAndMsg(imgSrc, errMsg, input);
        input.title ="";
    }
    else {
        input.classList.add("notValid");
        input.classList.remove("valid");
        let imgSrc= errorSVG;
        addIconAndMsg(imgSrc, errMsg, input);
        input.title = tooltip;
    }
}

//----------------------------------------------------------------------//
// FUNCIÓN "addIconAndMsg"
// - Inserta los mensajes de error e iconos error/éxito apropiados 
//----------------------------------------------------------------------//
function addIconAndMsg(imgSrc, errMsg, input) {
  const errMsgEle = document.getElementById(input.id+"ErrMsg")
 if(errMsgEle !== null){ 
  errMsgEle.innerHTML = errMsg;
 }
 else{
  const errMsgEle = document.createElement("p");
  errMsgEle.id = input.id + "ErrMsg";
  errMsgEle.innerHTML = errMsg;
  input.after(errMsgEle);
 }

  const errImg = document.getElementById(input.id+"ErrSVG")
 if(errImg !== null){ 
  errImg.src = imgSrc;
 }
 else{
  const errImg = document.createElement("img");
  errImg.src = imgSrc;
  errImg.className = "validationIcon";
  errImg.id = input.id + "ErrSVG";
  input.after(errImg);
 }
}
