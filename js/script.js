// Utilizzare l’API di esempio http://157.230.17.132:3009/todos

$(document).ready(function() {
    getData();
    $('#crea').click(function() {
        creaVoce();
    });

    $(document).on('click', '.delete', function() {
        var id = $(this).parents().attr('data-id');
        eliminaVoce(id)
    });

    $(document).on('keydown', '.modifica', function(event) {
        if (event.which == 13) {
            var id = $(this).parents().attr('data-id');
            var testoMod = $(this).val();
            console.log(testoMod);
            modificaVoce(id, testoMod)
        }
    });






// FUNZIONI
    function modificaVoce(id, text) {
        $.ajax(
            {
                url: 'http://157.230.17.132:3009/todos/' + id,
                method: 'PATCH',
                data: {
                    text: text
                },
                success: function(data) {

                    svuota();
                    getData();

                },
                error: function() {
                    alert('errore');
                }
            }
        )
    }


    function creaVoce() {
        var elemento = $('#nuova-voce').val()
        $.ajax(
            {
                url: 'http://157.230.17.132:3009/todos',
                method: 'POST',
                data: {
                    text: elemento
                },
                success: function() {
                    svuota();
                    getData();

                },
                error: function() {
                    alert('errore');
                }
            }
        )

    }

    function eliminaVoce(id) {
        $.ajax(
            {
                url: 'http://157.230.17.132:3009/todos/' + id,
                method: 'DELETE',
                success: function(data) {
                    svuota();
                    getData();

                },
                error: function() {
                    alert('errore');
                }
            }
        )
    }

    function getData() {
        $.ajax(
            {
                url: 'http://157.230.17.132:3009/todos',
                method: 'GET',
                success: function(data) {
                    var context = {};
                    var source = $("#entry-template").html();
                    var template = Handlebars.compile(source);
                    for (i = 0; i < data.length; i++) {
                        context = {
                            testo: data[i].text,
                            id: data[i].id,
                        }
                        var html = template(context);
                        $('#inserisci').append(html);
                    }
                },
                error: function() {
                    alert('errore');
                },
            }
        )
    }

    function svuota(){
        $('#inserisci').empty();
    }

});
