let toastBox = document.getElementById('toast-box');
let successMeg = '<i class="fa-solid fa-circle-check"></i> Successfully Submited';
let errorMeg = '<i class="fa-solid fa-circle-xmark"></i> Please fix the Error!';
let invalidMeg = '<i class="fa-solid fa-circle-exclamation"></i> Invalid Your input please check';


function showToast(msg){
    let toast = document.createElement('div');
    toast.classList.add('toast');
    toast.innerHTML = msg;
    toastBox.appendChild(toast);

    if (msg.includes('Error')){
        toast.classList.add('Error');
    }
    if (msg.includes('Invalid')){
        toast.classList.add('Invalid');
    }

    setTimeout(()=>{
        toast.remove()
    }, 6000);
}