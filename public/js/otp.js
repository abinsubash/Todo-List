const inputs = document.querySelectorAll('.otp-card-inputs input'); 
const button = document.querySelector('.otp-card button'); 

inputs.forEach(input => {
    let lastInputStatus = 0;
    input.onkeyup = (e) => {
        const currentElement = e.target;
        const nextElement = input.nextElementSibling;
        const prevElement = input.previousElementSibling;

        if (prevElement && e.keyCode === 8) {
            if (lastInputStatus === 1) {
                prevElement.value = '';
                prevElement.focus();
            }
            button.setAttribute('disabled', true);
            lastInputStatus = 1;
        } 
        else {
            const reg = /^[0-9]/;

            if (e.key === 'Enter') {
                if (nextElement) {
                    nextElement.focus();
                } else {
                    button.removeAttribute('disabled');
                }
            }
            else if (reg.test(currentElement.value)) {
                if (nextElement) {
                    nextElement.focus();
                } else {
                    button.removeAttribute('disabled'); 
                    lastInputStatus = 0;
                }
            }
            else {
                currentElement.value = currentElement.value.replace(/\D/g, '');
            }
        }
    };
});
