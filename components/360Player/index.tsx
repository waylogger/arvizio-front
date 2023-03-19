import { MediaData } from '@/pages/project-detail/[type]/[pid]/[pname]/interface';
import { useEffect, useState } from 'react';

import * as three from './panolens/three';
import * as panolens from './panolens/panolens';
import { FileTypeEnum } from '@/api/file/interface';

function getPanoUrl(file: MediaData) {
    if (!file) return null;
    const pano = file.files.find((f) => f.type === FileTypeEnum.panorama);
    return pano;
}

export default function Player360(props: { file: MediaData }) {
    const [cont, setCont] = useState(null);
    const [viewer, setViewer] = useState(null);
    const [pano, setPano] = useState(null);
    const [needRender, setNeedRender] = useState<boolean>(true);

    const renderPanorama = () => {
        if (pano) pano.children.forEach((child) => (child.visible = false)); // for spots

        const panoFile = getPanoUrl(props.file);
        const newPano = new panolens.ImagePanorama(
            panoFile.path,
            null,
            null
        ) as any;

        newPano.addEventListener('load', () => {
            // context.emitLoaded();
        });
        viewer?.add(newPano);
        viewer?.setPanorama(newPano);
        setPano(newPano);
    };

    useEffect(() => {
        setCont(`pano-image-${props.file.mediaId}`);
        setNeedRender(false);
    }, [props.file]);

    useEffect(() => {
        if (!cont) return;
        const contEl = document.getElementById(cont);
        if (!viewer) {
            const newViewer: any = new panolens.Viewer({
                container: contEl,
            });
            newViewer?.addUpdateCallback(() => {
                renderPanorama();
            });
            setViewer(newViewer);
            setNeedRender(true);
            return;
        }

        viewer?.clearAllCache();
        setNeedRender(true);
    }, [cont]);

    useEffect(() => {
        if (!viewer || !needRender) return;

        renderPanorama();
        setNeedRender(false);
    }, [needRender]);

    return (
        <div
            style={{
                height: '100%',
            }}
            id={`pano-image-${props.file.mediaId}`}
        ></div>
    );
}

// <template>
//   <div
//     :style="{
//       width: '100%',
//       height: '100%',
//     }"
//     id="pano-image"
//     class="pa-0 ma-0"
//   ></div>
// </template>

// <script async lang="ts">
// import Vue from 'vue'
// import { Component, Prop, Emit, Watch } from 'vue-property-decorator'

// import * as PANOLENS from 'panolens'
// import { getSpot } from './panolens/spot'
// import { addControlsDrag } from './panolens/drag'
// import { Spot, Vector3D } from '~/plugins/interfaces'
// import spotState from '~/store/data/spot'
// import { ISpot } from '~/store/data/spot'
// import panoEditor from '~/store/view/editor/pano'

// @Component({
//   components: {},
// })
// export default class PanoramaImg extends Vue {
//   init() {
//     if (!this.cont) this.cont = document.querySelector('#pano-image')

//     if (!this.viewer) {
//       this.viewer = new PANOLENS.Viewer({
//         container: this.cont,
//       })

//       const context = this
//       this.viewer.addUpdateCallback(() => {
//         context.renderPanorama()
//       })
//       this.panoDrawNext = '0'

//       this.renderPanorama()
//     }
//   }

//   constructor() {
//     super()
//   }

//   mounted() {
//     this.init()
//   }
//   get projectId() {
//     return this.$route.params.id
//   }

//   cont: any
//   viewer: any
//   panoDrawInx: string = '0'
//   panoDrawNext: string = ''
//   pano: any

//   @Watch('inxForDraw')
//   onInxForDrawChange(val: number) {
//     this.panoDrawNext = val.toString()
//   }

//   get currentSpots() {
//     return this.$store.getters['view/editor/pano/current'].spots
//   }

//   @Watch('currentSpots')
//   async onCurrentSpotsChange(val: Spot[]) {
//     if (!this.panoDrawNext) this.panoDrawNext = this.panoDrawInx
//     this.renderPanorama()
//     await this.renderSpots()
//   }

//   async renderSpots() {
//     if (!this.pano) return

//     const spots = this.$store.getters['view/editor/pano/current']
//       .spots as ISpot[]

//     const objects = await Promise.all(
//       spots.map(async (spot, inx) => {
//         const title = this.$store.getters['data/file/byMediaId'](
//           spot.target.id
//         )[0]?.name
//         return this.applySpot(
//           {
//             from: '0',
//             to: spot.target.id.toString(),
//             vector: {
//               x: spot.x,
//               y: spot.y,
//               z: spot.z,
//             },
//           },
//           spot.id || -1,
//           title
//         )
//       })
//     )

//     const setCoords = this.setCoords
//     const drawInx = parseInt(this.panoDrawInx)
//     addControlsDrag(
//       objects,
//       this.viewer,
//       async (vector: Vector3D, spotInx: number) => {
//         await setCoords(drawInx, spotInx, Object.assign({}, vector))
//       }
//     )
//   }

//   renderPanorama() {
//     if (this.panoDrawNext === '') return

//     const bufInx = parseInt(this.panoDrawNext)

//     const image = this.$store.getters['view/editor/pano/images'][bufInx]
//     if (!image) return

//     if (this.pano)
//       this.pano.children.forEach((child) => (child.visible = false))
//     this.pano = new PANOLENS.ImagePanorama(image.path)

//     this.viewer.clearAllCache()
//     const context = this
//     this.pano.addEventListener('load', () => {
//       context.emitLoaded()
//     })
//     this.viewer.add(this.pano)
//     this.viewer.setPanorama(this.pano)

//     this.panoDrawInx = this.panoDrawNext

//     this.panoDrawNext = ''

//     this.renderSpots()
//   }

//   @Prop()
//   inxForDraw!: number

//   async setCoords(imageInx: number, spotInx: number, vector: Vector3D) {
//     await spotState.update(this, {
//       id: spotInx,
//       x: vector.x,
//       y: vector.y,
//       z: vector.z,
//     })
//   }

//   @Emit('loaded')
//   emitLoaded() {
//     return true
//   }

//   applySpot(spot: Spot, spotInx: number, title: string = 'spot') {
//     const elem = document.createElement('div')
//     elem.textContent = title

//     const meshSpot = getSpot({
//       vector: spot.vector,
//       inx: spotInx + 1,
//       toImageName: title,
//     })
//     meshSpot.name = `${spot.from} -> ${spot.to}`
//     meshSpot.userData = {
//       spotInx: spotInx,
//       toInx: spot.to,
//     }
//     meshSpot.addEventListener('click', (el: any) => {
//       const toInx = el.target.userData.toInx
//       panoEditor.setByMedia(this, parseInt(toInx))
//     })

//     this.pano.add(meshSpot)
//     return meshSpot
//   }
// }
// </script>
