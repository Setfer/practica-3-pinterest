import "./Links.css"

export const link = (texto, bgColor, clase = "") => {
  return `<a href="#" class ="${clase}" style="background-color: ${bgColor}"> ${texto}</a>`;
};


