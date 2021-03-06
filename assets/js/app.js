import '../css/app.css';
import $ from 'jquery';
import 'bootstrap';
import Swal from 'sweetalert2'

var DATA= null;

const routes = require('../../public/js/fos_js_routes.json');
import Routing from '../../vendor/friendsofsymfony/jsrouting-bundle/Resources/public/js/router.min';
Routing.setRoutingData(routes);

$(document).ready(function() {
    var select_states = document.getElementById('contacts_state');
    $.getJSON('https://cors-anywhere.herokuapp.com/https://sigma-studios.s3-us-west-2.amazonaws.com/test/colombia.json', function(data) {
        DATA = data;
        for (var state in data) {
            var opt = add_options(state);
            select_states.appendChild(opt);
        }
    });
});

$('#contacts_state').change(function () {
    remove_options();
    var state_selected = $('#contacts_state').val();
    var select_city = document.getElementById('contacts_city');
    for (var city in DATA[state_selected]){
        var city = DATA[state_selected][city];
        var opt = add_options(city);
        select_city.appendChild(opt);
    }
})

$('#contacts_Save').click(function () {
    var Path = Routing.generate('save_contact');
    var contacts_path = Routing.generate('contacts');
    var state = $('#contacts_state').val();
    var city = $('#contacts_city').val();
    var name = $('#contacts_name').val();
    var email = $('#contacts_email').val();
    var params = {state:state, city:city, name:name, email:email};
    Swal.fire({
        title: 'Espere',
        text: 'Estamos guardando su información',
        showConfirmButton: false,
        onBeforeOpen: function () {
            Swal.showLoading()
            return new Promise(function () {
                if(name.length>50 || email.length>30){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'El nombre debe tener máximo 50 caracteres y el Email Máximo 30. Recuerde llenar todos los campos',
                        footer: 'Estamos trabajando para tí'
                    })
                }
                else{
                    if(isEmail(email)){
                        $.ajax({
                            type: 'POST',
                            url: Path,
                            data: (params),
                            async: true,
                            dataType: "json",
                            success: function (data) {
                                if(data['success']==true){
                                    Swal.fire({
                                        icon: 'ersuccessror',
                                        title: '¡Buen trabajo!',
                                        text: 'Tu información ha sido recibida satisfactoriamente',
                                        footer: '<a href="'+contacts_path+'">Ver contactos</a>'
                                    })
                                }else{
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Oops...',
                                        text: 'Algo no funcionó como esperabamos',
                                        footer: 'Estamos mejorando para tí.'
                                    })
                                }
                                $('#contacts_state').val('');
                                remove_options();
                                $('#contacts_name').val('');
                                $('#contacts_email').val('');
                            }
                        });
                    }else{
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Ingrese un Email válido',
                            footer: 'Estamos trabajando para tí'
                        })
                    }

                }

            })
        }
    });
});

function remove_options() {
    $('#contacts_city').find('option').remove().end().append('<option value="">Seleccione una ciudad</option>');
}

function add_options(item) {
    var opt = document.createElement('option');
    opt.appendChild(document.createTextNode(item));
    opt.value = item;
    return opt;
}


function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}