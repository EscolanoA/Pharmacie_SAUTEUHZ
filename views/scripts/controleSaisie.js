

function popupAttentionOff() {
    const classAttention = document.querySelectorAll('.attention');
    classAttention.forEach(attention => {
        attention.innerHTML = ""
    })

    
}

//
const onlyInputs = document.querySelectorAll('#form input');

onlyInputs.forEach(input => {
    input.addEventListener('focusout', function () {
        let value = input.value.trim();
        input.value = value
    })
});

