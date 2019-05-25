// Link prototype and construct the new object in one
module.exports = function connectAndInit( Ctor ) {
  const newObj = Object.create( Ctor );
  newObj.init();
  return newObj;
};
