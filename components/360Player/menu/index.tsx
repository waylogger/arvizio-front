import { FileTypeEnum } from '@/api/file/interface';
import { apiSpotCreate } from '@/api/spot/create';
import { apiSpotDelete } from '@/api/spot/delete';
import { formatFileName } from '@/pages/project-detail/[type]/[pid]/[pname]';
import { ProjectContext } from '@/pages/project-detail/[type]/[pid]/[pname]/context';
import { MediaData } from '@/pages/project-detail/[type]/[pid]/[pname]/interface';
import styles from '@/styles/app.module.css';
import { useContext } from 'react';

function targetName(file: MediaData) {
    const pano = file.files.find((f) => f.type === FileTypeEnum.panorama);

    return formatFileName(pano.name, 20);
}

export default function Menu360Player(props: {
    files: MediaData[];
    current: MediaData;
}) {
    const [refresh, setRefresh] = useContext(ProjectContext);

    const spotIsChecked = (file: MediaData) => {
        if (!props || !props.current) return false;

        const { spots } = props.current;

        if (!spots || !spots.length) return false;

        return spots.find((spot) => spot.target.id === file.mediaId)
            ? true
            : false;
    };
    return (
        <div className={styles.newProjectSpots}>
            <div className={styles.newProjectSpotsName}>Споты</div>
            {props?.files
                ?.filter((f) => f.mediaId !== props?.current?.mediaId)
                .map((file: MediaData) => (
                    <div className={styles.ProjectSpotsItem} key={file.mediaId}>
                        <label className={styles.checkboxGoogle}>
                            <input
                                type="checkbox"
                                className={styles.checkSwith}
                                checked={spotIsChecked(file)}
                                onChange={(event) => {
                                    const checked = event.target.checked;

                                    if (checked) {
                                        apiSpotCreate
                                            .create(
                                                props.current.mediaId,
                                                file.mediaId,
                                                0,
                                                0
                                            )
                                            .then((res) => setRefresh(true));
                                        return;
                                    }

                                    const spot = props.current.spots.find(
                                        (spot) =>
                                            spot.target.id === file.mediaId
                                    );
                                    if (!spot) return;

                                    apiSpotDelete
                                        .delete(spot.id.toString())
                                        .then((res) => setRefresh(true));
                                }}
                            />
                            <span
                                className={styles.checkboxGoogleSwitch}
                            ></span>
                            {`${targetName(file)}`}
                        </label>
                    </div>
                ))}
        </div>
    );
}
