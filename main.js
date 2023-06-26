import * as THREE from 'three'
import './style.css'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import sunTexture from './img/sun.jpg'
import stars from './img/stars.jpg'
import mercuryTexture from './img/mercury.jpg'
import venusTexture from './img/venus.jpg'
import earthTexture from './img/earth.jpg'
import marsTexture from './img/mars.jpg'
import jupiterTexture from './img/jupiter.jpg'
import saturnTexture from './img/saturn.jpg'
import saturnRingTexture from './img/saturn ring.png'
import uranusTexture from './img/uranus.jpg'
import uranusRingTexture from './img/uranus ring.png'
import neptuneTexture from './img/neptune.jpg'
import plutoTexture from './img/pluto.jpg'

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.getElementById('root').appendChild(renderer.domElement)

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  4000
)

camera.position.set(0, 100, 180)
const orbit = new OrbitControls(camera, renderer.domElement)
orbit.update()

const texture = new THREE.TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()

const sphereGeo = new THREE.SphereGeometry(10, 300, 300)
const sphereMaterial = new THREE.MeshBasicMaterial({
  map: texture.load(sunTexture)
})
const sun = new THREE.Mesh(sphereGeo, sphereMaterial)
scene.add(sun)

function createPlanet (radius, distance, planetTexture, ring) {
  const geo = new THREE.SphereGeometry(radius)
  const mat = new THREE.MeshStandardMaterial({
    map: texture.load(planetTexture)
  })
  const mesh = new THREE.Mesh(geo, mat)
  mesh.position.set(distance, 0, 0)
  const obj = new THREE.Object3D()
  if (ring) {
    const innerRadius = ring.innerRadius
    const outerRadius = ring.outerRadius
    const ringTexture = ring.texture
    const ringGeo = new THREE.RingGeometry(innerRadius, outerRadius, 100)
    const ringMat = new THREE.MeshStandardMaterial({
      map: texture.load(ringTexture),
      side: THREE.DoubleSide
    })
    const ringMesh = new THREE.Mesh(ringGeo, ringMat)
    ringMesh.rotateX(Math.PI / 2)
    ringMesh.position.set(distance, 0, 0)
    obj.add(ringMesh)
  }
  scene.add(obj)
  obj.add(mesh)

  return { mesh, obj }
}
const mercury = createPlanet(1.6, 14, mercuryTexture)
const venus = createPlanet(1.6, 20, venusTexture)
const earth = createPlanet(2, 30, earthTexture)
const mars = createPlanet(1.7, 38, marsTexture)
const jupiter = createPlanet(4.5, 45, jupiterTexture)
const saturn = createPlanet(5, 68, saturnTexture, {
  innerRadius: 6,
  outerRadius: 8,
  texture: saturnRingTexture
})
const uranus = createPlanet(5.6, 100, uranusTexture, {
  innerRadius: 6,
  outerRadius: 10,
  texture: uranusRingTexture
})

const neptune = createPlanet(4.8, 130, neptuneTexture)
const pluto = createPlanet(1.1, 160, plutoTexture)

scene.background = cubeTextureLoader.load([
  stars,
  stars,
  stars,
  stars,
  stars,
  stars
])

const pointLight = new THREE.PointLight(0xffffff, 2, 300, 4.5)
scene.add(pointLight)

const ambientLight = new THREE.AmbientLight(0xffffff, 0.1)
scene.add(ambientLight)

function animate () {
  sun.rotateY(0.001)
  mercury.mesh.rotateY(0.08)
  mercury.obj.rotateY(0.045)

  venus.mesh.rotateY(0.07)
  venus.obj.rotateY(0.04)

  earth.mesh.rotateY(0.1)
  earth.obj.rotateY(0.03)

  mars.mesh.rotateY(0.085)
  mars.obj.rotateY(0.025)

  jupiter.mesh.rotateY(0.085)
  jupiter.obj.rotateY(0.023)

  saturn.mesh.rotateY(0.089)
  saturn.obj.rotateY(0.02)

  uranus.mesh.rotateY(0.089)
  uranus.obj.rotateY(0.015)

  neptune.mesh.rotateY(0.089)
  neptune.obj.rotateY(0.011)

  pluto.mesh.rotateY(0.03)
  pluto.obj.rotateY(0.005)

  renderer.render(scene, camera)
}

renderer.setAnimationLoop(animate)
