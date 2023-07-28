function PageChanged(e) {
    var input = e.target;
    var page_number = input.value;

    var is_number = /^[0-9]+$/.test(page_number);

    var number = parseInt(page_number);
    var out_of_range = number < input.min || number > input.max;

    if (!is_number || out_of_range ) {
        input.value = input.defaultValue;
        return;
    }

    var base_url = input.getAttribute('base_url');
    if (!base_url.endsWith('/')) {
      base_url += '/';
    }

    if (number == 1) {
        document.location.href = base_url;
    } else {
        document.location.href = base_url + "page/" + number;
    }
}
