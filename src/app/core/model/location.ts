import { Country } from "./country";
import { Entity } from "./Entity";
import { Region } from "./region";

export interface Location {
    region: Region;
    countries: Country[];
    entities: Entity[];
    localCiso: string;
}