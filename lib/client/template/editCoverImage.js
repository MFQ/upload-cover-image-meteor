Template.editCoverImage.helpers({
  cover_image: function(){
    if(Meteor.user())
        return Meteor.user().profile.cover_image
    else
        return "";
  },
  cover_image_style:function(){
    if(Meteor.user())
        return Meteor.user().profile.cover_image_position
    else
        return "";
  }
});

Template.editCoverImage.events({

  "click #adjustCoverImageCancel": function(e){
    $(".btn-adjust").hide();
    $("#adjustCoverImage").show();
  },
  "click #adjustCoverImageSave" :function(e){
    $(".btn-adjust").hide();
    $("#adjustCoverImage").show();
    $(".btn-adjust").hide();
    $('.drag img').dragncrop("destroy");
    var style = $('.drag img').attr('style')
    Meteor.call("updateCoverImagePosition", style);
  },
  "click #adjustCoverImage": function(evt, tmp){
    $(".btn-adjust").show();
    $("#adjustCoverImage").hide();
    $('.drag img').dragncrop({overlay: true, overflow: true});
  },
  "click #editCoverImage": function(evt, tmp){
    evt.preventDefault();
    tmp.find('input[name=coverFile]').click();
  },
  "change input[name=coverFile]": function(evt, tmpl){
    evt.preventDefault();
    var input = tmpl.find('input[name=coverFile]');
    if(input.files && input.files[0]){
      FileReaderObj.previewImage(input.files[0], function(err, file){
        if (err){
          error.html(createAlertDanger(err.message));
          Meteor.setTimeout(function(){error.html('');}, 5000);
        }
        else {
            Meteor.call("updateCover", file.result, function(err, res){
              if (err){
                  error.html(createAlertDanger(err.message));
                  Meteor.setTimeout(function(){
                      error.html('');
                  }, 5000);
              }
            });
          }
      });
    }
  }
});
