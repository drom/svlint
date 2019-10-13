'use strict';

module.exports = {
  meta: {},
  checker: messenger => ({
    enter: node => {
      if (node.type === 'ERROR') {
        messenger(node, 'error', 'Parser Error');
      } else {
        if (node.type === 'MISSING') {
          messenger(node, 'error', 'Parser Missing');
        }
      }
    }
  })
};
