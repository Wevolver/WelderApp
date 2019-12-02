const { Promise } = global;

export default () => {
  return new Promise(resolve => {
    require.ensure([], () => {
      resolve({
        threejs: require('three'),
        threejsStlLoader: require('three-stl-loader')(require('three')),
        OrbitControls: require('three-orbit-controls')(require('three'))
      });
    });
  });
};