import { Component, OnInit } from '@angular/core';
import { ExternalsService } from './../../services/externals.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

	private pokemonListArray : Array<any> = [];
	public pokemonView		 : Array<any> = [];
	private startIndex		 : number = 0;
	private endIndex		 : number = 11;
	public cargando			 : boolean = false;
	public firstSection		 : boolean = false;
	public secondSection	 : boolean = true;
	public thirdSection		 : boolean = true;
	public activePokemon	 : any = {};
	public arrayPages		 : Array <number> = [1,2,3,4,5];

  	constructor(private externalService:ExternalsService) {
		
	}

	ngOnInit(): void {
		this.cargando = true;
		this.pokemonList();
		console.log(this.pokemonListArray);
		console.log(this.pokemonView);
		
	}
	ngOnChanges(): void {
		//Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
		//Add '${implements OnChanges}' to the class.
		console.log("cambios");
	}

	async pokemonList() : Promise <any>{
		try {
			const whishedPokemons : number = 150;
			const resp = await this.externalService.listed(whishedPokemons);
			if(resp.results){
				(resp.results).forEach(async pokemon => {
					let respType = await this.externalService.pokemonInfo(pokemon.url);
					if(respType){
						let types = (respType.types).map(function(type) { return type.type.name});
						let respSpecies = await this.externalService.species(respType.id);
						let divisiones = respSpecies.evolution_chain.url.split("/", 7);
						// console.log(divisiones);
						// console.log(respSpecies.evolution_chain.url);
						let respEvolution = await this.externalService.evolution(divisiones[6]);
						// console.log(respType);
						if(respEvolution){
							let evolves 		: boolean = false;
							let evolution1name 	: string = "";
							let evolution1url 	: string = "";
							let evolution2name 	: string = "";
							let evolution2url 	: string = "";
							let imgUrl			: string = "";
							if((respEvolution.chain.evolves_to).length > 0) {
								evolves = true;
								// console.log(respEvolution.chain.evolves_to[0].evolves_to[0]);
								evolution1name = respEvolution.chain.evolves_to[0].species.name;
								// evolution1url = respEvolution.chain.evolves_to[0].species.url;
								evolution1url = window.location.origin + "/detail";
								if((respEvolution.chain.evolves_to[0].evolves_to[0])){
									evolution2name = respEvolution.chain.evolves_to[0].evolves_to[0].species.name;
									// evolution2url = respEvolution.chain.evolves_to[0].evolves_to[0].species.url;
								}
							}
							if(respType.sprites) imgUrl = respType.sprites.front_default;
							let pokemonObject : any = {};
							if(pokemon.name != evolution1name && pokemon.name != evolution2name){
								pokemonObject = {
									name : pokemon.name,
									type : types,
									has_evolution : evolves,
									evolution1: evolution1name,
									evolution1url: evolution1url,
									evolution2: evolution2name,
									evolution2url: evolution2url,
									imgUrl : imgUrl,
									id: divisiones[6]
								}
							}
							if(pokemon.name == evolution1name){
								pokemonObject = {
									name : pokemon.name,
									type : types,
									has_evolution : evolves,
									evolution1: evolution2name,
									evolution1url: evolution1url,
									evolution2: "",
									evolution2url: evolution2url,
									imgUrl : imgUrl,
									id: divisiones[6]
								};	
							}
							if(pokemon.name == evolution2name){
								pokemonObject = {
									name : pokemon.name,
									type : types,
									has_evolution : false,
									evolution1: "",
									evolution1url: evolution1url,
									evolution2: "",
									evolution2url: evolution2url,
									imgUrl : imgUrl,
									id: divisiones[6]
								};	
							}
							this.pokemonListArray.push(pokemonObject);
							if(this.pokemonView.length <=11) this.pokemonView.push(pokemonObject)
						}
					}
				});
				
			}
		} catch (error) {
			console.log("error list");
			console.log(error);
		}
		await new Promise(r => setTimeout(r, 2000)); // 2 seconds for aesthetics purposes
		this.cargando = false;
	}

	async filtrado(page : number) : Promise <any>{
		// this.cargando = false;
		// let respClear = await this.clearView().then();
		
		try {
			console.log(page);
			switch (page) {
				case 1:
					this.startIndex = 0;
					this.endIndex = 11;
					break;
				case 2:
					this.startIndex = 12;
					this.endIndex = 23;
					break;
				case 3:
					this.startIndex = 24;
					this.endIndex = 35;
					break;
				case 4:
					this.startIndex = 36;
					this.endIndex = 47;
					break;
				case 5:
					this.startIndex = 48;
					this.endIndex = 59;
					break;
				case 6:
					this.startIndex = 60;
					this.endIndex = 71;
					break;
				case 7:
					this.startIndex = 72;
					this.endIndex = 83;
					break;
				case 8:
					this.startIndex = 84;
					this.endIndex = 95;
					break;
				case 9:
					this.startIndex = 96;
					this.endIndex = 107;
					break;
				case 10:
					this.startIndex = 108;
					this.endIndex = 119;
					break;
				case 11:
					this.startIndex = 120;
					this.endIndex = 131;
					break;
				case 12:
					this.startIndex = 132;
					this.endIndex = 143;
					break;
				case 13:
					this.startIndex = 144;
					this.endIndex = 151;
					break;
				// case 14:
				// 	this.startIndex = 48;
				// 	this.endIndex = 59;
				// 	break;
				// case 15:
				// 	this.startIndex = 60;
				// 	this.endIndex = 71;
				// 	break;
			}
			// if(page > 0 && page <= 4){
			// 	this.firstSection = true;
			// 	this.secondSection = false;
			// 	this.thirdSection = false;
			// }
			// if(page == 5 || page == 6){
			// 	this.firstSection = true;
			// 	this.secondSection = true;
			// 	this.thirdSection = false;
			// }
			// if(page >= 7 && page <= 9){
			// 	this.firstSection = false;
			// 	this.secondSection = true;
			// 	this.thirdSection = false;
			// }
			// if(page == 10 || page == 11){
			// 	this.firstSection = false;
			// 	this.secondSection = true;
			// 	this.thirdSection = true;
			// }
			// if(page >= 12){
			// 	this.firstSection = false;
			// 	this.secondSection = false;
			// 	this.thirdSection = true;
			// }
			if(page == 0){
				if(this.arrayPages.includes(1)){
					// alert("cuatro")
					this.arrayPages = [6,7,8,9,10];
					this.firstSection = false;
					this.thirdSection = true;
				}else{
					if(this.arrayPages.includes(6)){
						// alert("cinco")
						this.arrayPages = [1,2,3,4,5];
						this.firstSection = false;
						this.thirdSection = true;
					}else{
						if(this.arrayPages.includes(11)){
							// alert("seis")
							this.arrayPages = [6,7,8,9,10];
							this.firstSection = true;
							this.thirdSection = true;
						}
					}
				}
			}
			if(page == -1){
				if(this.arrayPages.includes(1)){
					// alert("uno")
					this.arrayPages = [6,7,8,9,10]
					this.firstSection = true;
					this.thirdSection = true;
				}else{
					if(this.arrayPages.includes(6)){
						// alert("dos")
						this.arrayPages = [11,12,13];
						this.firstSection = true;
						this.thirdSection = false;
					}else{
						if(this.arrayPages.includes(11)){
							// alert("tres")
							this.arrayPages = [11,12,13];
							this.firstSection = true;
							this.thirdSection = false;
						}
					}
				}
			}
			// console.log(this.startIndex);
			// console.log(this.endIndex);
			let respClear = new Promise((resolve, reject) => {
				this.clearView();
			});
			// await new Promise(r => setTimeout(r, 2000)); // 2 seconds for aesthetics purposes
			// console.log(this.pokemonView);
			this.newFill();
		} catch (error) {
			console.log("error sorting");
			console.log(error);
		}
	}

	async clearView() : Promise<any>{
		let response : boolean = false;
		try {
			// this.pokemonView = [];
			// console.log("si x");
			while(this.pokemonView.length > 0){
				// console.log("si limpio");
				this.pokemonView = [];			
			}
			response = true;
			// console.log(this.pokemonView);
		} catch (error) {
			console.log("error clear");
			console.log(error);
		}
		return response;
	}

	async newFill() : Promise<any>{
		let response : boolean = false;
		// console.log("refill");
		try {
			if(this.pokemonView.length == 0){
				console.log("debo entrar");
				if(this.endIndex >= 151) this.endIndex = 149;
				for (let index = this.startIndex; index <= this.endIndex; index++) {
					// console.log(this.pokemonListArray[index]);
					this.pokemonView.push(this.pokemonListArray[index]);
				}
			}
			response = true;
		} catch (error) {
			console.log("error refill");
			console.log(error);
		}
		return response;
	}

	detailed(name : string) : void {
		try {
			console.log(name);
			this.pokemonListArray.forEach(pokemon => {
				console.log(pokemon.name);
				if(pokemon.evolution1 == name){
					this.activePokemon = pokemon;
					localStorage.setItem('active', pokemon.evolution1);
					// console.log(this.activePokemon);
				}
			});
		} catch (error) {
			console.log("detailed error");
			console.log(error);
		}
	}
}
