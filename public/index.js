const socket=io()
var namm;
let textarea=document.getElementById('textarea');
let messagearea=document.querySelector('.message_area');
do{
    namm=prompt("Please Enter your first name here...");
    // namm=toUpperCase(namm);

}while(!namm)


textarea.addEventListener('keyup',(e)=>{
    if(e.key==='Enter')
    {
        sendmessage(e.target.value);
    }
})


function sendmessage(message){

    let msg={
        user:namm,
        message:message.trim()
    }

    //Append message in the message area
    appendmessage(msg,'outgoing');
    textarea.value='';
    // Send to server
    socket.emit('msg_event',msg)

}

function appendmessage(msg,type){

    let maindiv=document.createElement('div');
    let className=type;
    maindiv.classList.add(className,'message');

    let markup=
    `
        <h4>
        ${msg.user}
        </h4>
        <p>
        ${msg.message}
        </p>
    `
    maindiv.innerHTML=markup;
    messagearea.appendChild(maindiv);
}


// Recieve messsage
socket.on('msg_event',(msg)=>{
    // console.log(msg);
    appendmessage(msg,'incomming');
})




