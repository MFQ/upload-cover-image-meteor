Meteor.methods({
    updateCover: function(base64) {
        var id = this.userId;
        if (!id) {
            throw new Meteor.Error(403, "You must be logged in");
        }
        try {
            return Meteor.users.update({_id: id},
                {$set: {'profile.cover_image': base64, 'profile.upgraded': new Date()}}
            );
        }
        catch(e){
            throw new Meteor.Error(403, e.message);
        }
        return true;
    },
    updateCoverImagePosition: function(position){
      // check(position, string);
      var id = this.userId;
      if (!id) {
          throw new Meteor.Error(403, "You must be logged in");
      }
      try{
        return Meteor.users.update({_id: id},
            {$set: {'profile.cover_image_position': position, 'profile.upgraded': new Date()}}
        );
      }
      catch(e){
          throw new Meteor.Error(403, e.message);
      }
      return true;
    }
});
