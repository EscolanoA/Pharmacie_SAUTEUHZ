
function popupAttentionOff() {
    document.getElementById("attention").innerHTML = ""
}

//
const onlyInputs = document.querySelectorAll('#form input');
const submit = document.querySelector('button[type="submit"]')

onlyInputs.forEach(input => {
    input.addEventListener('focusout', function() {
        let value = input.value.trim();
        input.value = value
    })
});
