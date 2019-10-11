'use strict';

// FIXME -- version without recursion
module.exports = cb => {
  const enter = cb.enter || (() => {});
  const leave = cb.leave || (() => {});

  const rec = node => {
    const childCount = node.childCount;
    enter(node);
    for (let i = 0; i < childCount; i++) {
      rec(node.child(i));
    }
    leave(node);
  };

  return rec;
};
