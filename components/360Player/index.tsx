import { MediaData } from '@/pages/project-detail/[type]/[pid]/[pname]/interface';
import { useEffect, useState } from 'react';

import { FileTypeEnum } from '@/api/file/interface';
import { ISpot } from '@/api/spot/interface';
import { addControlsDrag } from './panolens/drag';
import * as panolens from './panolens/panolens';
import { getSpot } from './panolens/spot';
import { formatFileName } from '@/pages/project-detail/[type]/[pid]/[pname]';
import { apiSpotPatch } from '@/api/spot/patch';

function getPanoUrl(file: MediaData) {
    if (!file) return null;
    const pano = file.files.find((f) => f.type === FileTypeEnum.panorama);
    return pano;
}

function getPanoName(file: MediaData) {
    if (!file) return null;
    const pano = file.files.find((f) => f.type === FileTypeEnum.panorama);
    return formatFileName(pano.name,20);
}

export default function Player360(props: { file: MediaData,
        setCurrentMedia: (mediaId: number) => void
}) {
    const [cont, setCont] = useState(null);
    const [viewer, setViewer] = useState(null);
    const [pano, setPano] = useState(null);
    const [needRender, setNeedRender] = useState<boolean>(true);



    const applySpot = (
        spot: ISpot,
        spotInx: number,
        title: string = 'spot',
    ) => {
        const meshSpot = getSpot({
            vector: { x: spot.x, y: spot.y, z: spot.z },
            inx: spotInx + 1,
            toImageName: title,
        });
        meshSpot.name = `${spot.source.id} -> ${spot.target.id}`;

        meshSpot.userData = {
            spotInx: spotInx,
            toInx: spot.target.id,
        };
        meshSpot.addEventListener('click', (el: any) => {
            const toInx = el.target.userData.toInx;
            props.setCurrentMedia(toInx) 
            //   panoEditor.setByMedia(this, parseInt(toInx))
        });

        if (!pano) return;
        pano.add(meshSpot);
        return meshSpot;
    };
    const renderSpots = () => {
        if (!pano) return;

        const spots = props.file.spots;

        const spotsEl = [];
        for (const spot of spots) {
            spotsEl.push(applySpot(spot, spot.id,getPanoName(props.file)));
        }

        addControlsDrag(
            spotsEl,
            viewer,
            async (vector, spotInx: number) => {
                
                await apiSpotPatch.create(
                    spotInx,vector.x,vector.y,vector.z
                )
            }
        );
    };
    const renderPanorama = () => {
       

        if (!needRender ) return
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
        renderSpots();
        
    }, [pano]);

    useEffect(() => {
        setCont(`pano-image-${props.file.mediaId}`);
        setNeedRender(pano ? true : false);
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
