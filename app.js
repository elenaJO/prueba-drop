//Function handleDragStart(), Its purpose is to store the id of the draggable element.
function handleDragStart(e) {
    e.dataTransfer.setData("text", this.id); //note: using "this" is the same as using: e.target.
}//end function
// para transferir un eleento le tenemos que indicar que elemento es y el setData captura eso por id en este caso

// dragStart -> Este evento es accionado cuando empezamos el arrastre de un elemento



//The dragenter event fires when dragging an object over the target. 
//The css class "drag-enter" is append to the targets object.
function handleDragEnterLeave(e) {
    if(e.type == "dragenter") {
        this.className = "drag-enter" 
    } else {
        this.className = "" //Note: "this" referces to the target element where the "dragenter" event is firing from.
    }
}//end function

// Dragenter -> Ocurre cuando empezamos a mover un elemento de tipo arrastrable dentro de su contenedor, pero todavía no ha sido soltado
// cuando lo cuadros esten moviendose por el contenedor se le pondra una clase gard-enter.


//Function handles dragover event eg.. moving your source div over the target div element.
//If drop event occurs, the function retrieves the draggable element’s id from the DataTransfer object.

//Drop ->  Ocurre cuando un elemento arrastrable es soltado dentro de un contenedor; en este evento debemos recolectar la información del elemento arrastrable mediante el método getData.
function handleOverDrop(e) {
    e.preventDefault(); 
//Depending on the browser in use, not using the preventDefault() could cause any number of strange default behaviours to occur.
    if (e.type != "drop") {
        return; //Means function will exit if no "drop" event is fired. (se cierra si no hace el evento drop)
    }
    //Stores dragged elements ID in var draggedId (almacena el id de los arrastrables)
    var draggedId = e.dataTransfer.getData("text");
    //Stores referrence to element being dragged in var draggedEl
    var draggedEl = document.getElementById(draggedId);

    //if the event "drop" is fired on the dragged elements original drop target e.i..  it's current parentNode, 
    //then set it's css class to ="" which will remove dotted lines around the drop target and exit the function.
    if (draggedEl.parentNode == this) {
        this.className = "";
        return; //note: when a return is reached a function exits.
    }
    // si el objeto esta dentro del contenedor se remueve las lineas


    //Otherwise if the event "drop" is fired from a different target element, detach the dragged element node from it's
    //current drop target (i.e current perantNode) and append it to the new target element. Also remove dotted css class. 
    draggedEl.parentNode.removeChild(draggedEl);
    this.appendChild(draggedEl); //Note: "this" references to the current target div that is firing the "drop" event.
    this.className = "";
    // si el elemento no esta dentro del contenedor lo remueve de su contenedor actual
    // y lo almacena en el nuevo contenedor

}//end Function



//Retrieve two groups of elements, those that are draggable and those that are drop targets:
var draggable = document.querySelectorAll('[draggable]')
var targets = document.querySelectorAll('[data-drop-target]');
//Note: using the document.querySelectorAll() will aquire every element that is using the attribute defind in the (..)


//Register event listeners for the"dragstart" event on the draggable elements:
for(var i = 0; i < draggable.length; i++) {
    draggable[i].addEventListener("dragstart", handleDragStart);
}

//Register event listeners for "dragover", "drop", "dragenter" & "dragleave" events on the drop target elements.
for(var i = 0; i < targets.length; i++) {
    targets[i].addEventListener("dragover", handleOverDrop);
    targets[i].addEventListener("drop", handleOverDrop);
    targets[i].addEventListener("dragenter", handleDragEnterLeave);
    targets[i].addEventListener("dragleave", handleDragEnterLeave);
}


//dragstart ->Este evento es accionado cuando empezamos el arrastre de un elemento
// drap -> Este evento es accionado inmediatamente después del método dragstar y ocurre cuando estamos arrastrando el elemento 
//dragenter ->Ocurre cuando empezamos a mover un elemento de tipo arrastrable dentro de su contenedor, pero todavía no ha sido soltado
//dragleave ->Ocurre cuando un elemento arrastrable ha sido soltado/movido fuera del contenedor.
//drop ->  Ocurre cuando un elemento arrastrable es soltado dentro de un contenedor; en este evento debemos recolectar la información del elemento arrastrable mediante el método getData.
