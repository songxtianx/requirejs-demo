requirejs.config({
    baseUrl: 'lib',
    paths: {
        // the left side is the module ID,
        // the right side is the path to
        // the jQuery file, relative to baseUrl.
        // Also, the path should NOT include
        // the '.js' file extension. This example
        // is using jQuery 1.9.0 located at
        // js/lib/jquery-1.9.0.js, relative to
        // the HTML page.
        'jquery': 'jquery-1.11.3.min',
        'jquery.bootstrap': 'bootstrap-3.3.7-dist/js/bootstrap.min',
        'gcd':'../js/gcd'
    },
    shim: {
        'jquery.bootstrap':{
          //jquery的依存设定，如果不指定此项，本地页面大概有十分之一的几率会出现jQuery未加载的报错。
          deps:['jquery']
        }
    }
});

// require(['module/name', ...], function(params){ ... });

//bootstrap
require(['jquery','jquery.bootstrap'],function ($) {
  $('#btnInfo').show();
  $('#exampleModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var recipient = button.data('whatever') // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)
    modal.find('.modal-title').text('New message to ' + recipient)
    modal.find('.modal-body input').val(recipient)
  })
});

//great common divisor
require(['gcd'],function () {
  document.getElementById('allMoney').innerHTML=gcd(20000,10000);
});
