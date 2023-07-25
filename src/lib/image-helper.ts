export const modifiedImage = (img: string) => {
  let prefix = "./assets/user-images/";
  let filter_image = "";
  if (img.startsWith(prefix)) {
    filter_image = img.substring(prefix.length);
  }
  return new URL(`../assets/user-images/${filter_image}`, import.meta.url).href;
};
