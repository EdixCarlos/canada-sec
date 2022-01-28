import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { COUNTRIES, REGIONS } from 'src/app/shared/constants';
import { environment } from 'src/environments/environment';
import { Country } from '../model/country';
import {
  DataMaintainer, DataPvt,
  GeneralPvt
} from '../model/maintainers';

import { Region } from '../model/region';

interface Data {
  id: number;
  idservice: number;
  service: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class MaintainersService {
  API_URL: string = `${environment.API_URL}`;

  public PARAMETERS;

  constructor(private _http: HttpClient) {
    this.getParameters();
  }

  getParameters() {
    this._http.get<any>(`${environment.API_URL}/Parameter`).pipe(take(1)).subscribe(
      (parameters) => {
        this.mapParameters(parameters);
      }
    );
  }

  mapParameters(parameters: any[]) {
    let map: any[] = [];
    parameters.forEach(
      (param) => {
        map[param.fieldDescription] = param.idField;
      }
    );
    console.log('map')
    console.log(map)
    this.PARAMETERS = map;
  }

  getGeneralMaintainers(
    filter = '',
    sortOrder = 'asc',
    pageNumber = 0,
    pageSize = 3): Observable<any[]> {//J
    // return this._http.get<any[]>(`${this.API_URL}`);
    return this._http.get<any[]>(`${this.API_URL}/GeneralMaintainerSvc`);
  }

  getMaintainerById(type: string): Observable<any> {
    return this._http.get<any>(`${this.API_URL}/Maintainer/${type}`);
  }

  updateDataGeneral(value: GeneralPvt) {
    return this._http.patch<any>(`${this.API_URL}/Maintainer/${value.id}`, value);
  }

  deleteDataGeneral(id: number) {
    return this._http.delete<any>(`${this.API_URL}/Maintainer/${id}`);
  }

  createDataGeneral(maintainer: DataMaintainer) {
    return this._http.post<any>(`${this.API_URL}/Maintainer`, maintainer);
  }

  getCountries(): Observable<Country[]> {
    return this._http.get<any>(`${environment.API_URL}/Maintainer/${this.PARAMETERS['PAIS']}`);
  }

  getCountriesByRegionId(regionId): Observable<Country[]> {
    return this._http.get<any>(`${environment.API_URL}/Maintainer/${this.PARAMETERS['REGION']}/${regionId}`);
  }

  getEntityByCountryId(countryId): Observable<any[]> {
    return this._http.get<any>(`${environment.API_URL}/Maintainer/${this.PARAMETERS['PAIS']}/${countryId}`);
  }

  getCisoByCountryId(countryId): Observable<any[]> {
    return this._http.get<any>(`${environment.API_URL}/Maintainer/${this.PARAMETERS['CISO']}/${countryId}`);
  }

  getRegions(): Observable<Region[]> {
    return this._http.get<any>(`${environment.API_URL}/Maintainer/${this.PARAMETERS['REGION']}`);
  }

  getMaintainerByTypeParentAndId(id: number): Observable<any[]> {
    return this._http.get<any>(`${environment.API_URL}/Maintainer/4/${id}`);
  }

  getApplicationTypesList(): Observable<any[]> {
    return this._http.get<any>(`${environment.API_URL}/Maintainer/8`);
  }

  getBusinessChannel(): Observable<any> {
    return this._http.get<any>(`${environment.API_URL}/Maintainer/${this.PARAMETERS['CANAL DE NEGOCIO']}`);
  }

  getRiskLevels(): Observable<any[]> {
    let idService = 1, type = 2, idParent = 71;
    return this._http.get<any>(`${environment.API_URL}/MaintainerService/${idService}/${type}/${idParent}`);
  }

  getRequesterResults(): Observable<any[]> {
    let idService = 1, type = 2, idParent = 81;
    return this._http.get<any>(`${environment.API_URL}/MaintainerService/${idService}/${type}/${idParent}`);
  }

  getRequestTypeResults(): Observable<any[]> {
    let idService = 1, type = 2, idParent = 174;
    return this._http.get<any>(`${environment.API_URL}/MaintainerService/${idService}/${type}/${idParent}`);
  }

  getResolutionList(): Observable<any[]> {
    let idService = 1, type = 2, idParent = 163;
    return this._http.get<any>(`${environment.API_URL}/MaintainerService/${idService}/${type}/${idParent}`);
  }

  getResolutionReasonList(): Observable<any[]> {
    let idService = 1, type = 2, idParent = 166;
    return this._http.get<any>(`${environment.API_URL}/MaintainerService/${idService}/${type}/${idParent}`);
  }

  getSponsorList(): Observable<any[]> {
    let idService = 3, type = 1, idParent = 227;
    return this._http.get<any>(`${environment.API_URL}/MaintainerService/${idService}/${type}/${idParent}`);
  }

  getNISTCategoryList(): Observable<any[]> {
    let idService = 3, type = 1, idParent = 225;
    return this._http.get<any>(`${environment.API_URL}/MaintainerService/${idService}/${type}/${idParent}`);
  }

  getCategoryByServiceList(): Observable<any[]> {
    let idService = 3, type = 1, idParent = 226;
    return this._http.get<any>(`${environment.API_URL}/MaintainerService/${idService}/${type}/${idParent}`);
  }
  
  getSafetyCategoryList(): Observable<any[]> {
    let idService = 4, type = 1, idParent = 197;
    return this._http.get<any>(`${environment.API_URL}/MaintainerService/${idService}/${type}/${idParent}`);
  }

  getHealthStatusList(): Observable<any[]> {
    let idService = 4, type = 1, idParent = 215;
    return this._http.get<any>(`${environment.API_URL}/MaintainerService/${idService}/${type}/${idParent}`);
  }

  getRiskLevelList(): Observable<any[]> {
    let idService = 4, type = 1, idParent = 206;
    return this._http.get<any>(`${environment.API_URL}/MaintainerService/${idService}/${type}/${idParent}`);
  }

  getResponsableList(): Observable<any[]> {
    let idService = 4, type = 1, idParent = 183;
    return this._http.get<any>(`${environment.API_URL}/MaintainerService/${idService}/${type}/${idParent}`);
  }

  getManagerList(): Observable<any[]> {
    let idService = 4, type = 1, idParent = 190;
    return this._http.get<any>(`${environment.API_URL}/MaintainerService/${idService}/${type}/${idParent}`);
  }

  getApplicationPromoteList(): Observable<any[]> {
    let idService = 1, type = 2, idParent = 86;
    return this._http.get<any>(`${environment.API_URL}/MaintainerService/${idService}/${type}/${idParent}`);
  }

  getSeverityList(): Observable<any[]> {
    let idService = 1, type = 2, idParent = 146;
    return this._http.get<any>(`${environment.API_URL}/MaintainerService/${idService}/${type}/${idParent}`);
  }

  getToolNameList(): Observable<any[]> {
    let idService = 1, type = 2, idParent = 141;
    return this._http.get<any>(`${environment.API_URL}/MaintainerService/${idService}/${type}/${idParent}`);
  }

  getErrorTypeList(): Observable<any[]> {
    let idService = 1, type = 2, idParent = 62;
    return this._http.get<any>(`${environment.API_URL}/MaintainerService/${idService}/${type}/${idParent}`);
  }

  getDigitalFactoryList(): Observable<any[]> {
    let idService = 1, type = 2, idParent = 19;
    return this._http.get<any>(`${environment.API_URL}/MaintainerService/${idService}/${type}/${idParent}`);
  }

  getExposureList(): Observable<any[]> {
    let idService = 1, type = 2, idParent = 22;
    return this._http.get<any>(`${environment.API_URL}/MaintainerService/${idService}/${type}/${idParent}`);
  }

  getProtocolList(): Observable<any[]> {
    let idService = 1, type = 2, idParent = 25;
    return this._http.get<any>(`${environment.API_URL}/MaintainerService/${idService}/${type}/${idParent}`);
  }

  getCodeLevelList(): Observable<any[]> {
    let idService = 1, type = 2, idParent = 29;
    return this._http.get<any>(`${environment.API_URL}/MaintainerService/${idService}/${type}/${idParent}`);
  }

  getThirdPartyHostedList(): Observable<any[]> {
    let idService = 1, type = 2, idParent = 34;
    return this._http.get<any>(`${environment.API_URL}/MaintainerService/${idService}/${type}/${idParent}`);
  }

  getMultiThreadSupportList(): Observable<any[]> {
    let idService = 1, type = 2, idParent = 37;
    return this._http.get<any>(`${environment.API_URL}/MaintainerService/${idService}/${type}/${idParent}`);
  }

  getAuditCheckStatusList(): Observable<any[]> {
    let idService = 4, type = 1, idParent = 212;
    return this._http.get<any>(`${environment.API_URL}/MaintainerService/${idService}/${type}/${idParent}`);
  }

  getImplementationList(): Observable<any[]> {
    let idService = 4, type = 1, idParent = 218;
    return this._http.get<any>(`${environment.API_URL}/MaintainerService/${idService}/${type}/${idParent}`);
  }
}
