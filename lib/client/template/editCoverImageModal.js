var x, // x position of crop image
y, // y position of crop image
width, // width of crop image
height, // height of crop image
error, //
saveCoverButton,
modal,
realImage,
displayImage,
isShowCropAndButton = false;

var widthCover = 128,
heightCover = 128;

Template.editCoverImageModalBody.helpers({
    image: function(){
        if(Meteor.user())
            return Meteor.user().profile.cover_image
        else
            return AVATAR;
    }
});

Template.editCoverImageModal.rendered = function(){
    var tmpl = this;
    // cache the dom
    modal = $(tmpl.find('#editCoverImageModal'));
    error = $(tmpl.find('.error'));
    saveCoverButton = $(tmpl.find('#saveCoverButton'));
    propSaveCoverButton(false);
    realImage = tmpl.find('#realImage');
    modal.on('hide.bs.modal', function () {
        clear();
    });
    modal.on('show.bs.modal', function () {
        loadImage(tmpl, Meteor.user().profile.cover_image);
        $(function () {
            displayImage.imgAreaSelect({ aspectRatio: '1:1', handles: true,
            fadeSpeed: 200, onSelectChange: preview, parent: $('.modal-content') });
        });
    });
};
Template.editCoverImageModalBody.rendered = function(){
    displayImage = $(this.find('#coverUserImg'));
    $(function () {
        displayImage.imgAreaSelect({ aspectRatio: '1:1', handles: true,
        fadeSpeed: 200, onSelectChange: preview });
    });
};
/**
 * EVENTS
 */
Template.editCoverImageModalBody.events({
    "change input[name=coverFile]": function(evt, tmpl){
        evt.preventDefault();
        var input = tmpl.find('input[name=coverFile]');
        if(input.files && input.files[0]){
            FileReaderObject.previewImage(input.files[0], function(err, file){
                if (err){
                    error.html(createAlertDanger(err.message));
                    Meteor.setTimeout(function(){
                        error.html('');
                    }, 5000);
                }
                else {
                    loadImage(tmpl, file.result);
                    $(function () {
                        displayImage.imgAreaSelect({ aspectRatio: '1:1', handles: true,
                        fadeSpeed: 200, onSelectChange: preview });
                    });
                }
            });
        }
    },
    'click #changeCoverButton': function(evt, tmp){
        evt.preventDefault();
        tmp.find('input[name=coverFile]').click();
    }
});
Template.editCoverImageModal.events({
    'click #saveCoverButton': function(evt, tmp){
        evt.preventDefault();
        processChangeCover(tmp);
    },
    'keypress': function(evt, tmp){
        if(evt.charCode == 13){
            evt.preventDefault();
            modal.modal('hide');
        }
    }
});
/**
 * FUNCTION CLASS DEFINE
 */
var processChangeCover = function(tmp){
        var canvas = document.createElement("canvas");
        canvas.width = widthCover;
        canvas.height = heightCover;
        var scaleX = realImage.width / displayImage.width();
        var scaleY = realImage.height / displayImage.height();
        var ctx = canvas.getContext("2d");
        ctx.drawImage(realImage, x*scaleX, y*scaleY, width*scaleX, height*scaleY, 0, 0, widthCover, heightCover);
        Meteor.call('updateCover', canvas.toDataURL(), function(err, res){
            if (err){
                error.html(createAlertDanger(err.message));
                Meteor.setTimeout(function(){
                    error.html('');
                }, 5000);
            }
            else {
                modal.modal('hide');
            }
        });
};
function preview(img, selection) {
    if (!selection.width || !selection.height)
        return;
    var scaleX = widthCover / selection.width;
    var scaleY = heightCover / selection.height;
    $('#preview img').css({
        width: Math.round(scaleX * img.width),
        height: Math.round(scaleY * img.height),
        marginLeft: -Math.round(scaleX * selection.x1),
        marginTop: -Math.round(scaleY * selection.y1)
    });
    x = selection.x1;
    y = selection.y1;
    width = selection.width;
    height= selection.height;
    if(!isShowCropAndButton){
        open();
    }
};
function propSaveCoverButton(bool){
    if(saveCoverButton)
        saveCoverButton.prop('disabled', !bool);
};
function loadImage(tmp, src){
    $(tmp.find('#coverUserImg')).attr('src', src);
    $(tmp.find('#preview img')).attr('src', src);
    $(tmp.find('#realImage')).attr('src', src);
};
function open(){
    propSaveCoverButton(true);
    $('#previewFrame').removeClass('hide');
    isShowCropAndButton = true;
};
function clear(){
    // hide crop area
    $('.imgareaselect-border1').parent().hide();
    $('.imgareaselect-outer').hide();
    isShowCropAndButton = false;
    $('#previewFrame').addClass('hide');
    // reset input
    //http://stackoverflow.com/questions/16452699/how-to-reset-a-form-using-jquery-with-reset-method
    var inputCover = $('input[name=coverFile]');
    inputCover.wrap('<form>').closest('form').get(0).reset();
    inputCover.unwrap();
};
