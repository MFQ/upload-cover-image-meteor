CoverImage = {

  options: {
    adjustButton: false,
  },
  setOptions: function(options) {
    CoverImage.options = _.extend(CoverImage.options, options);
  },
  isAdjustImage: function(){
    return this.options.adjustButton;
  }
}

CoverImage.setOptions({});
