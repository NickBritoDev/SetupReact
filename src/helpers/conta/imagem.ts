export function getSrcImageURL(img: string) {
  if (img.includes("http")) {
    return img;
  }

  return "https://appbancos.s3.amazonaws.com/" + img;
}
