

function popupAttentionOff() {
    const classAttention = document.querySelectorAll('.attention');
    classAttention.forEach(attention => {
        attention.innerHTML = ""
    })

    
}


const onlyInputs = document.querySelectorAll('#form input');

onlyInputs.forEach(input => {
    input.addEventListener('focusout', function () {
        let value = input.value.trim();
        input.value = value
    })
});

//date actuelle limite dans les input date
dateLimiteMax.max = new Date().toISOString().split("T")[0];
dateLimiteMin.min = new Date().toISOString().split("T")[0];


/*
TODO : Query selector sur la valeur des input des num de sécu 
et boucle pour vérifier si ce num de secu n'est pas déja pris,
cette fontion sexecute à nchaque saisie de numero dans num secu,
et rend le bouton submit disabled, et ecrit un message " num de secu déja utilisé "

*/

