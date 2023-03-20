import * as Panolens from './panolens';

interface createSpotDto {
    vector: { x: number; y: number; z: number };
    inx: number;
    toImageName: string;
}

export function getSpot(dto: createSpotDto) {
    const { vector } = dto;

    const point: any = new Panolens.Infospot(80, Panolens.DataImage.Arrow);
    point.addHoverText(dto.toImageName, -240);
    point.position.set(vector.x, vector.y, -800);

    return point;
}
