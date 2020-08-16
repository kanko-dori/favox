// eslint-disable-next-line import/prefer-default-export
export const copyText = (text: string): void => {
  const preWrapper = document.createElement('div');
  const pre = document.createElement('pre');
  pre.style.webkitUserSelect = 'auto';
  pre.style.userSelect = 'auto';

  preWrapper.appendChild(pre);
  pre.textContent = text;

  preWrapper.style.position = 'fixed';
  preWrapper.style.right = '200vh';
  document.body.appendChild(preWrapper);

  // eslint-disable-next-line no-unused-expressions
  document.getSelection()?.selectAllChildren(preWrapper);

  document.execCommand('copy');
  document.body.removeChild(preWrapper);
};
