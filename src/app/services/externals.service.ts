import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class ExternalsService {

	constructor(private http:HttpClient) { }

	async listed(pokeNumber : number) : Promise <any>{
		try {
			const resp = await this.http.get(`https://pokeapi.co/api/v2/pokemon?limit=${pokeNumber}`).toPromise().then(
				resolve => {return resolve},
				error => {return error},
			);
			return resp;
		} catch (error) {
			console.log("error listed service");
			console.log(error);
		}
	}

	async pokemonInfo(url : string) : Promise <any>{
		try {
			const resp = await this.http.get(`${url}`).toPromise().then(
				resolve => {return resolve},
				error => {return error},
			);
			return resp;
		} catch (error) {
			console.log("errror type service");
			console.log(error);
		}
	}

	async type(id : number) : Promise <any>{
		try {
			const resp = await this.http.get(`https://pokeapi.co/api/v2/type/${id}`).toPromise().then(
				resolve => {return resolve},
				error => {return error},
			);
			return resp;
		} catch (error) {
			console.log("errror type service");
			console.log(error);
		}
	}

	async evolution(id : number) : Promise <any>{
		try {
			const resp = await this.http.get(`https://pokeapi.co/api/v2/evolution-chain/${id}`).toPromise().then(
				resolve => {return resolve},
				error => {return error},
			);
			return resp;
		} catch (error) {
			console.log("errror type service");
			console.log(error);
		}
	}

	async species(id : number) : Promise <any>{
		try {
			const resp = await this.http.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`).toPromise().then(
				resolve => {return resolve},
				error => {return error},
			);
			return resp;
		} catch (error) {
			console.log("error type service");
			console.log(error);
		}
	}

	async speciesbyName(name : string) : Promise <any>{
		try {
			const resp = await this.http.get(`https://pokeapi.co/api/v2/pokemon-species/${name}`).toPromise().then(
				resolve => {return resolve},
				error => {return error},
			);
			return resp;
		} catch (error) {
			console.log("error type service");
			console.log(error);
		}
	}

	async specificRequest(name : string) : Promise <any>{
		try {
			const resp = await this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`).toPromise().then(
				resolve => {return resolve},
				error => {return error},
			);
			return resp;
		} catch (error) {
			console.log("error specific service");
			console.log(error);
		}
	}
}
