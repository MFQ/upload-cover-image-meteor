validateImgBase64 = function(src){
    if(!/^data:image\/png;base64,/i.test(src))
        throw new Error("Image is not decode 1");
    return true;
};
