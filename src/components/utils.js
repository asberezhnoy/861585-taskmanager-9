const createElement = (html) => {
  const template = document.createElement(`template`);
  template.innerHTML = html;
  return template.content;
};

export {createElement};
