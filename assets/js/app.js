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
    $.getJSON('https://sigma-studios.s3-us-west-2.amazonaws.com/test/colombia.json', function(data) {
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
                $.ajax({
                    type: 'POST',
                    url: Path,
                    data: (params),
                    async: true,
                    dataType: "json",
                    success: function (data) {
                        if(data['success']==true){
                            Swal.fire(
                                '!Buen trabajo!',
                                'Tu información ha sido recibida satisfactoriamente',
                                'success'
                            );
                        }else{
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Algo no funcionó como esperabamos',
                                footer: 'Estamos mejorando para tí.'
                            })
                        }
                        var state = $('#contacts_state').val('');
                        remove_options();
                        var name = $('#contacts_name').val('');
                        var email = $('#contacts_email').val('');

                    }
                });
            })
        }
    });
});

function remove_options() {
    $('#contacts_city').find('option').remove().end().append('<option value="">Seleccione una ciudad</option>');
}

function add_options(item) {
    console.log(typeof(item))
    var opt = document.createElement('option');
    opt.appendChild(document.createTextNode(item));
    opt.value = item;
    return opt;
}
