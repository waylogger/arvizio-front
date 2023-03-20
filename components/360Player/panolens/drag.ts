import * as THREE from './three';
import * as Panolens from './panolens';
import { DragControls } from './DragControls';

let controls: any;

export function addControlsDrag(
    points: THREE.Object3D[],
    viewer: any,
    newPositionCB: any
) {
    controls = new DragControls(
        points,
        viewer.getCamera(),
        viewer.getRenderer().domElement
    );
    controls.addEventListener('drag', (event) => {
        const camera = viewer.getCamera();
        const scene = viewer.getScene();
        viewer.OrbitControls.enabled = false;

        viewer.getRenderer().render(scene, camera);
    });

    controls.addEventListener('dragend', (event) => {
        viewer.OrbitControls.enabled = true;
        const { position } = event.object;

        newPositionCB(position, event.object.userData.spotInx);
    });
}
