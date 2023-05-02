function makeHtml(node, first = true) {
    let html = '';

    if (!first) {
        html += '<li>';
    } else {
        html += '<li class="root">';
    }

    let nodeBlock = '' +
        '<button type="button" class="btn btn-link" data-toggle="modal" data-target="#modal-edit-node" data-id="' + node.id + '" data-name="' + node.name + '">' + node.name + '</button>' +
        '<button type="button" class="btn btn-light btn-sm btn-fs" data-toggle="modal" data-target="#modal-new-node" data-id="' + node.id + '">+</button>' +
        '<button type="button" class="btn btn-light btn-sm btn-fs" data-toggle="modal" data-target="#modal-delete-node" data-id="' + node.id + '">-</button>';

    if (node.children.length > 0) {
        if (node.expanded) {
            html += '<span class="btn-collapse" id="' + node.id + '">◢</span> ' + nodeBlock;

            html += '<ul>';
            for (let i = 0; i < node.children.length; i++) {
                html += makeHtml(node.children[i], false);
            }
            html += '</ul>';
        } else {
            html += '<span class="btn-expand" id="' + node.id + '">►</span> ' + nodeBlock;
        }
    } else {
        html += nodeBlock;
    }

    html += '</li>';

    return html;
}

function draw(node) {
    let html = '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal-new-node">Create root</button>';

    if (node !== null) {
        html = '<ul class="tree">' + makeHtml(node) + '</ul>';
    }

    root.html(html);
}

function reload() {
    $.getJSON('get-root.php', function (data) {
        draw(data);
    })
}

function createNode(name) {
    $.ajax({
        url: 'create-node.php',
        data: {
            id: selectedId !== null ? selectedId : '',
            name: name,
        }
    }).done(function () {
        $('#modal-new-node').modal('hide')

        reload();
    });
}

$('#btn-new-node').click(function () {
    document.querySelectorAll('#modal-new-node #input-node-name').forEach(function (e) {
        if (e.checkValidity()) {
            let name = $('#modal-new-node #input-node-name').val();

            createNode(name);
        } else {
            e.reportValidity();
        }
    });
});

function editNode(name) {
    $.ajax({
        url: 'edit-node.php',
        data: {
            id: selectedId !== null ? selectedId : '',
            name: name,
        }
    }).done(function () {
        $('#modal-edit-node').modal('hide')

        reload();
    });
}

$('#btn-edit-node').click(function () {
    document.querySelectorAll('#modal-edit-node #input-node-name').forEach(function (e) {
        if (e.checkValidity()) {
            let name = $('#modal-edit-node #input-node-name').val();

            editNode(name);
        } else {
            e.reportValidity();
        }
    });
});

function deleteNode() {
    $.ajax({
        url: 'delete-node.php',
        data: {
            id: selectedId !== null ? selectedId : '',
        }
    }).done(function () {
        $('#modal-delete-node').modal('hide')

        reload();
    });
}

$('#btn-delete-node').click(function () {
    deleteNode();
});

function expandCollapse(id) {
    $.ajax({
        url: 'expand-collapse-node.php',
        data: {
            id: id,
        }
    }).done(function () {
        reload();
    });
}

let root = $('#root');

root.on('click', '.btn-expand, .btn-collapse', function () {
    let id = $(this).attr('id');

    expandCollapse(id);
});

let selectedId;

$('#modal-new-node').on('show.bs.modal', function (event) {
    $('#modal-new-node #input-node-name').val('');

    const button = $(event.relatedTarget);

    selectedId = button.data('id');
})

$('#modal-new-node').on('shown.bs.modal', function (event) {
    $('#modal-new-node #input-node-name').trigger('focus');
})

$('#modal-edit-node').on('show.bs.modal', function (event) {
    const button = $(event.relatedTarget);

    $('#modal-edit-node #input-node-name').val(button.data('name'));

    selectedId = button.data('id');
})

$('#modal-edit-node').on('shown.bs.modal', function (event) {
    $('#modal-edit-node #input-node-name').trigger('focus');
})

let countdown = $('span.countdown');
let countdownSeconds = countdown.html();
let countdownTimer;

$('#modal-delete-node').on('show.bs.modal', function (event) {
    const button = $(event.relatedTarget);

    selectedId = button.data('id');

    countdown.html(countdownSeconds);

    countdownTimer = setInterval(function () {
        const count = countdown.html();

        if (count > 1) {
            countdown.html(count - 1);
        } else {
            $('#modal-delete-node').modal('hide');

            clearInterval(countdownTimer);
        }
    }, 1000);
});

$('#modal-delete-node').on('hide.bs.modal', function (event) {
    clearInterval(countdownTimer);
});

$(document).ready(function () {
    reload();
});
