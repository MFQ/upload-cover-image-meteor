CoverImage = {

  options: {
    adjustButton: true,
  },
  setOptions: function(options) {
    CoverImage.options = _.extend(CoverImage.options, options);
  },
  isAdjustImage: function(){
    return this.options.adjustButton;
  }
}

CoverImage.setOptions({});
