import { Component, OnInit } from '@angular/core';
import { ExternalsService } from './../../services/externals.service';

@Component({
	selector: 'app-detail',
	templateUrl: './detail.component.html',
	styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

	public id 		: number = 0;
	public name 	: string = "";
	public pokemon  : any = {};
	public cargando	: boolean = false;

	constructor(private externalService:ExternalsService) {
		this.name = localStorage.getItem('active');
	}

	ngOnInit(): void {
		this.cargando = true;
		this.specificPokemon();
	}

	async specificPokemon() : Promise <any>{
		try {
			const info = await this.externalService.specificRequest(this.name);
			if(info){
				let types = (info.types).map(function(type) { return type.type.name});
				let abilities = (info.abilities).map(function(ability) { return ability.ability.name});
				const species = await this.externalService.speciesbyName(this.name);
				this.pokemon = {
					name : info.name,
					img : info.sprites.front_default,
					types : types,
					abilities : abilities,
					color: species.color.name
				};
			}
			this.cargando = false;
		} catch (error) {
			console.log(error);
			console.log("specific error");
		}
	}
}
