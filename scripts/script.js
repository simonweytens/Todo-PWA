document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
    return instances
  });

var sidenav = document.querySelector('.sidenav')
sidenav.addEventListener('click', function(){
    var elem = document.querySelectorAll('.sidenav');
    var instance = M.Sidenav.getInstance(elem);
    instance.open()
})
  // Initialize collapsible (uncomment the lines below if you use the dropdown variation)
  // var collapsibleElem = document.querySelector('.collapsible');
  // var collapsibleInstance = M.Collapsible.init(collapsibleElem, options);
