const reGlobalFontFamily = /(@font-face[\s]*?{[\s]*?):global([\s]*?){([\s\S]*?)}([\s]*?})/g;

export default function loader(source) {
  return source.replace(reGlobalFontFamily, '$1$2$3$4');
}
