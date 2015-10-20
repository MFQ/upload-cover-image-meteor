createAlert = {
    'error' : function(message) {
        return '<div class="alert alert-danger">' + message + '</div>';
    },
    'success' : function(message) {
        return '<div class="alert alert-success">' + message + '</div>';
    },
    'alert' : function(message) {
        return '<div class="alert alert-warning">' + message + '</div>';
    },
    'info' : function(message) {
        return '<div class="alert alert-info">' + message + '</div>';
    },
    'default' : function(message) {
        return '<div class="alert">' + message + '</div>';
    }
};
createAlertDanger = function(message) {
    return createAlert['error'](message);
};
createAlertSuccess = function(message) {
    return createAlert['success'](message);
};
createAlertInfo = function(message){
    return createAlert['info'](message);
};
