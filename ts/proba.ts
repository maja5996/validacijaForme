let studenti: Student[] = [];
let aktivanStudent: Student = null;


function promeniAktivnog(selekt: HTMLSelectElement){
   //TODO Implement
   let jmbg = Number(selekt.value);
   aktivanStudent = studenti.filter(el => el.jmbg == jmbg)[0]; 
   aktivanStudent.refreshPredmeti();

}
 
class Predmet {
    naziv: string;
    ocena: number;
    constructor(naziv: string, ocena: number){
        this.naziv = naziv;
        this.ocena = ocena;
    }
}

class Student {
    private _ime: string;
    private _prezime: string;
    private _jmbg: number;
    private _predmeti: Predmet[];

    constructor(ime: string, prezime: string, jmbg: number){
        this._ime = ime;
        this._jmbg = jmbg;
        this._prezime = prezime;
        this._predmeti = [];
    }

	public get ime(): string {
		return this._ime;
	}

	public set ime(value: string) {
		this._ime = value;
	}

	public get prezime(): string {
		return this._prezime;
	}

	public set prezime(value: string) {
		this._prezime = value;
	}

	public get jmbg(): number {
		return this._jmbg;
	}

	public set jmbg(value: number) {
		this._jmbg = value;
	}

	public get predmeti(): Predmet[] {
		return this._predmeti;
    }
    
    public dodajPredmet(value: Predmet): void {
        this._predmeti.push(value);
        //TODO Osveziti html
        this.refreshPredmeti();
    }

    public refreshPredmeti(): void {
        let output = "";
        output += "<ul class='list-group'>";
        for(let i = 0; i < this._predmeti.length; i++){
            output += "<li class='list-group-item'> Predmet: " + this._predmeti[i].naziv + "</li>"; 
            output += "<li class='list-group-item'> Ocena: " + this._predmeti[i].ocena + "</li>";
        }
        output += "</ul>";
        document.getElementById("predmeti").innerHTML = output;
    }


    public getProsek(): number {
        let prosek = this._predmeti.map((el,i,arr) => el.ocena/arr.length)
                                   .reduce((p,el) => p + el);
        return prosek;
    }




}




function wireEvents(): void {
    document.getElementById("dodajPredmet").addEventListener("click", ()=>{
        let naziv = (document.getElementById("naziv") as HTMLInputElement).value;
        let ocenaString = (document.getElementById("ocena") as HTMLInputElement).value;
        let ocena = Number(ocenaString);

        let p = new Predmet(naziv, ocena);
        aktivanStudent.dodajPredmet(p);

    });

    document.getElementById("izracunajProsecnuOcenu").addEventListener("click", ()=>{
        let output = "";
        output = `<h3>Prosecna ocena za studenta: ${aktivanStudent.ime} ${aktivanStudent.prezime} je ${aktivanStudent.getProsek()}</h3>`;
        document.getElementById("prosecnaOcena").innerHTML = output;
    });
}








//OVAJ KOD OSTAVITI NA DNU FAJLA
window.onload = function() {

    initStudenti.forEach((elem) => {
        let s: Student = new Student(elem.ime, elem.prezime, Number(elem.jmbg));
        elem.predmeti.forEach((elem)=>{
            let p: Predmet = new Predmet(elem.naziv, elem.ocena);
            s.dodajPredmet(p);
        });
        studenti.push(s);
        if(aktivanStudent == null){
            aktivanStudent = s;
        }
    });
    if(QueryString["ime"] != null){
        var student = new Student(QueryString["ime"], QueryString["prezime"], Number(QueryString["jmbg"]));
        studenti.push(student);    
    }
    let selekt: HTMLElement = document.getElementById("student");
    let output: string = "";
    for(let i = 0; i < studenti.length; i++){
        let optionElem = `<option value=${studenti[i].jmbg}>${studenti[i].ime} ${studenti[i].prezime}</option>`;
        output += optionElem;         
    }
    selekt.innerHTML = output;
    aktivanStudent.refreshPredmeti();
    wireEvents();
}

var initStudenti = [
    {
        ime: "Pera",
        prezime: "Peric",
        jmbg: "1123456789000",
        predmeti: [
            {
                naziv: "Predmet1",
                ocena: 10
            },
            {
                naziv: "Predmet2",
                ocena: 8
            },
            {
                naziv: "Predmet3",
                ocena: 9
            },
            {
                naziv: "Predmet4",
                ocena: 9
            }
        ]
    },
    {
        ime: "Mika",
        prezime: "Mikic",
        jmbg: "1123456789001",
        predmeti: [
            {
                naziv: "Predmet1",
                ocena: 7
            },
            {
                naziv: "Predmet2",
                ocena: 10
            },
            {
                naziv: "Predmet3",
                ocena: 8
            }
        ]
    }
]

var QueryString = function () {
  // This function is anonymous, is executed immediately and 
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
        // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
        // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
      query_string[pair[0]] = arr;
        // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  } 
    return query_string;
}();

