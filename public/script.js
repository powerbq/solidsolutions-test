/**
 *
 * make html for tree of objects
 * uses recursion
 *
 * @param {object} node
 * @param {boolean} first
 * @returns {string}
 */
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

/**
 *
 * draw tree or button for create
 *
 * @param {object} node
 */
function draw(node) {
    let html = '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal-new-node">Create root</button>';

    if (node !== null) {
        html = '<ul class="tree">' + makeHtml(node) + '</ul>';
    }

    root.html(html);
}

/**
 * reload and redraw according to updated data
 */
function reload() {
    $.getJSON('get-root.php', function (data) {
        draw(data);
    })
}

/**
 *
 * create node with name
 * taking id from global variables
 *
 * @param {string} name
 */
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

/**
 * processing new node click event
 */
$('#btn-new-node').click(function () {
    /**
     * check validity of input without form before proceeding
     */
    document.querySelectorAll('#modal-new-node #input-node-name').forEach(function (e) {
        if (e.checkValidity()) {
            let name = $('#modal-new-node #input-node-name').val();

            createNode(name);
        } else {
            e.reportValidity();
        }
    });
});

/**
 *
 * change node's name
 * taking id from global variables
 *
 * @param {string} name
 */
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

/**
 * processing edit node click event
 */
$('#btn-edit-node').click(function () {
    /**
     * check validity of input without form before proceeding
     */
    document.querySelectorAll('#modal-edit-node #input-node-name').forEach(function (e) {
        if (e.checkValidity()) {
            let name = $('#modal-edit-node #input-node-name').val();

            editNode(name);
        } else {
            e.reportValidity();
        }
    });
});

/**
 * delete node
 * taking id from global variables
 */
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

/**
 * processing delete node click event
 */
$('#btn-delete-node').click(function () {
    deleteNode();
});

/**
 * switch expanded/collapsed node's state
 *
 * @param {number} id
 */
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

/**
 * container for tree generate
 */
let root = $('#root');

/**
 * setup events for generated dom
 */
root.on('click', '.btn-expand, .btn-collapse', function () {
    let id = $(this).attr('id');

    expandCollapse(id);
});

/**
 * variable where node's id is stored
 * we take and set it in modal event
 */
let selectedId;

/**
 * modals events start
 */

$('#modal-new-node').on('show.bs.modal', function (event) {
    /**
     * reset input value
     */
    $('#modal-new-node #input-node-name').val('');

    const button = $(event.relatedTarget);

    /**
     * saving id from event button
     */
    selectedId = button.data('id');
})

$('#modal-new-node').on('shown.bs.modal', function (event) {
    /**
     * focus input
     */
    $('#modal-new-node #input-node-name').trigger('focus');
})

$('#modal-edit-node').on('show.bs.modal', function (event) {
    const button = $(event.relatedTarget);

    /**
     * set input value with current node name
     */
    $('#modal-edit-node #input-node-name').val(button.data('name'));

    /**
     * saving id from event button
     */
    selectedId = button.data('id');
})

$('#modal-edit-node').on('shown.bs.modal', function (event) {
    /**
     * focus input
     */
    $('#modal-edit-node #input-node-name').trigger('focus');
})

/**
 * span element for multiple reuse
 */
let countdown = $('span.countdown');

/**
 * get and store default timeout from dom for reuse
 */
let countdownSeconds = countdown.html();

/**
 * setInterval object to manipulate with it with multiple functions
 */
let countdownTimer;

$('#modal-delete-node').on('show.bs.modal', function (event) {
    const button = $(event.relatedTarget);

    /**
     * saving id from event button
     */
    selectedId = button.data('id');

    /**
     * reset countdown
     */
    countdown.html(countdownSeconds);

    countdownTimer = setInterval(function () {
        const count = countdown.html();

        if (count > 1) {
            countdown.html(count - 1);
        } else {
            /**
             * hide modal after timeout
             */
            $('#modal-delete-node').modal('hide');

            clearInterval(countdownTimer);
        }
    }, 1000);
});

/**
 * stop timer after hiding modal
 */
$('#modal-delete-node').on('hide.bs.modal', function (event) {
    clearInterval(countdownTimer);
});

/**
 * modal events end
 */

/**
 * load tree after document ready
 */
$(document).ready(function () {
    reload();
});
