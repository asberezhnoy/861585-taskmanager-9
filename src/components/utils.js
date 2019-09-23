const createElement = (html) => {
  const template = document.createElement(`template`);
  template.innerHTML = html;
  return template.content;
};

const remove = (obj) => {
  obj.getElement().remove();
  obj.removeElement();
};

export {createElement, remove};
