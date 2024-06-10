
document.getElementById('dropdownButton').addEventListener('click', function() {
     document.getElementById('dropdownContent').classList.toggle('show');
});

        window.onclick = function(event) {
            if (!event.target.matches('#dropdownButton') && !event.target.matches('#dropdownInput')) {
                let dropdowns = document.getElementsByClassName('dropdown-content');
                for (var i = 0; i < dropdowns.length; i++) {
                    var openDropdown = dropdowns[i];
                    if (openDropdown.classList.contains('show')) {
                        openDropdown.classList.remove('show');
                    }
                }
            }
        }

        function selectItem(value) {
            document.getElementById('dropdownInput').value = value;
            document.getElementById('dropdownContent').classList.remove('show');
        }