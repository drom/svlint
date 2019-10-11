'use strict';

module.exports = {
  meta: {},
  checker: {
    enter: node => {
      if (node.type === 'ERROR') {
        console.error(node);
      } else {
        if (node.type === 'MISSING') {
          console.error(node);
        }
      }
    }
  }
};
