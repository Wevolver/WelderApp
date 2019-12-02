import React, { Component } from 'react'
import ThreeLoader from '../../loaders/three';

// import * as THREE from 'three'
class Scene extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loaded: false,
      height: 0,
    }
  }

  componentWillMount = () => {
    ThreeLoader().then(({ threejs, threejsStlLoader, OrbitControls }) => {
      this.THREE = threejs
      this.threejsStlLoader = threejsStlLoader
      this.OrbitControls = OrbitControls
      if(this.mount) this.init()
    });
  }

  init() {
    const width = this.mount.clientWidth
    const height = Math.max(width*0.5625, this.mount.clientHeight)

    const scene = new this.THREE.Scene()
    const camera = new this.THREE.PerspectiveCamera(
      35,
      width / height,
      0.109,
      293.014
    )
    camera.position.z = 4
    camera.up = new this.THREE.Vector3(0, 0, 1);

    const renderer = new this.THREE.WebGLRenderer({ alpha: true, antialias: true })

    const material = new this.THREE.MeshPhysicalMaterial( { 
        // color: 0xf00bbe3,
        color: 0xffffff,
        // emissive: 0xf00bbe3,
        shading: this.THREE.SmoothShading,
        metalness: 0,
        roughness: 0.9,
        clearCoat:  0.9,
        clearCoatRoughness: 0.9,
        reflectivity: 0.9,
    } );


    const controls = new this.OrbitControls( camera, renderer.domElement )
    controls.enableDamping = true
    controls.dampingFactor = 0.1
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.6
    controls.rotateSpeed = 0.2
    controls.minDistance = 1
    controls.maxDistance = 200


    renderer.setClearColor( 0xf7f9fa, 1)
    renderer.setSize(width, height)

    this.scene = scene
    this.camera = camera
    this.renderer = renderer
    this.material = material
    this.controls = controls
    this.scaleFactor = 0.1
    this.setState({
      height
    })
     // four lights in a tetrahedron
    this.addLight({x:0, y:-20, z:10}, 3)
    this.addLight({x:20, y:20, z:10}, 3)
    this.addLight({x:-20, y:20, z:10}, 3)
    this.addLight({x:0, y:0, z:-10}, 2)

    this.mount.appendChild(this.renderer.domElement)

    window.addEventListener("resize", this.onWindowResize);
    this.controls.addEventListener('start', () => {
      this.controls.autoRotate = false;
    })
    this.start()
    this.loadMesh(this.props)
  }

  componentWillUnmount() {
    this.stop()
    if(this.renderer) this.mount.removeChild(this.renderer.domElement)
    window.removeEventListener("resize", this.onWindowResize);
  }

  addLight = (position, intensity) => {
    const light = new this.THREE.PointLight(0x404040, intensity, 0, 2);
    light.position.set(position.x, position.y, position.z);
    this.scene.add(light);
  }

  start = () => {
    if (!this.frameId) {
      this.frameId = window.requestAnimationFrame(this.animate)
    }
  }

  stop = () => {
    window.cancelAnimationFrame(this.frameId)
  }

  animate = () => {
    // this.cube.rotation.x += 0.01
    // this.cube.rotation.y += 0.01

    this.renderScene()
    this.controls.update()
    this.frameId = window.requestAnimationFrame(this.animate)
  }

  renderScene = () => {
    this.renderer.render(this.scene, this.camera)
  }

  onWindowResize = () => {
      const newwidth = this.mount ? this.mount.clientWidth : 400
      const newheight = newwidth * 0.5625;
      const aspect = newwidth / newheight;
      this.setState({
        height: newheight
      })
      this.camera.aspect = aspect;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(newwidth, newheight);
  }

  centerMeshAndScaleCamera() {
    // center the object
    this.mesh.geometry.center();
    var fov = this.camera.fov * ( Math.PI / 180 );

    // get the size of the object
    this.mesh.geometry.computeBoundingSphere();
    // the scaleFactor multiplier is to adjust the distance of the camera to be slighlty closer or farther than strict size.
    const objectSize = this.mesh.geometry.boundingSphere.radius * (this.scaleFactor);

    // reset controls, specifically zoom should be reset here
    this.controls.reset();

    // position camera
    const distance = Math.abs( objectSize / Math.sin( fov / 2 ) );
    this.camera.position.y = -distance;

    // make sure we're looking at center on next frame
    this.camera.lookAt(new this.THREE.Vector3(0.000, 0.000, 0.000));

    // force render a frame
    this.renderScene();
    }

  changeMesh(mesh) {
    const selectedObject = this.scene.getObjectByName(this.mesh.name);
    this.scene.remove(selectedObject);
    this.scene.remove(this.line);

    this.centerMeshAndScaleCamera(mesh);
    this.scene.add(this.mesh);
    this.edges = new this.THREE.EdgesGeometry( this.mesh.geometry );
    this.line = new this.THREE.LineSegments( this.edges, new this.THREE.LineBasicMaterial( { color: 0x424242 } ) );
    this.line.scale.set( this.scaleFactor, this.scaleFactor, this.scaleFactor );
    this.scene.add(this.line);
    this.controls.autoRotate = true;
    this.renderScene();
  }

  loadMesh = (props) => {
    let loader;
    switch(props.type) {
      case 'stl':
        loader = new this.threejsStlLoader()
        break;
      case 'stp':
        loader =  new this.THREE.BufferGeometryLoader()
        break
      default:
        break
    }
    if(!loader) return
    loader.load(props.src, (geometry) => {
      geometry.computeVertexNormals()
      geometry.computeFaceNormals()
      
      const mesh = new this.THREE.Mesh( geometry, this.material )
      mesh.scale.set( this.scaleFactor, this.scaleFactor, this.scaleFactor )
      mesh.castShadow = true
      mesh.receiveShadow = true
      mesh.name = 'partPreview'
      this.mesh = mesh
      geometry.attributes.position.needsUpdate = true
      this.setState({loaded: true})
      this.changeMesh()
    }, (evt) => {
      const loaded = evt.loaded / evt.total;
    }, (err) => {
      console.log(err)
    })
  }

  componentWillReceiveProps = (nextProps) => {
    if(this.props.src !== nextProps.src) {
      this.loadMesh(nextProps)
    }
  }

  render() {
    let containerStyle = {
      width: '100%',
      height: this.state.height,
      position: 'relative',
      // border: this.state.loaded ? '1px solid #bdbdbd' : 'none',
      overflow: 'hidden'
    }
    let loaderStyle = {
      position: 'absolute',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      top: '50%',
    }
    let loaderBarStyle = {
      background: '#757575',
      height: 20,
      transition: 'width 0.2s',
      width: 100 * this.state.loaded
    }
    return (
      <div>
        <div
          style={containerStyle}
          ref={(mount) => { this.mount = mount }}
        />
      </div>
    )
  }
}

export default Scene