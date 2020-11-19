
import * as ImageLinks from "constants/ImageLinks";
import * as Helpers    from "functions/helpers";


class ImageLinkStepper {
  constructor(){
    this.index = 0;

    this.images = Helpers.shuffleArray([
      ...ImageLinks.Images2014,
      ...ImageLinks.Images2015,
      ...ImageLinks.Images2016,
    ]);
  };

  getImageLink(){
    const imageCount = this.images.length;

    if(this.index >= imageCount){
      this.index = 0;
    };

    return this.images[this.index++];
  };
};

export default new ImageLinkStepper();
