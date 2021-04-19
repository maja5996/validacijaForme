var studenti = [];
var aktivanStudent = null;
function promeniAktivnog(selekt) {
    //TODO Implement
    var jmbg = Number(selekt.value);
    aktivanStudent = studenti.filter(function (el) { return el.jmbg == jmbg; })[0];
    aktivanStudent.refreshPredmeti();
}
var Predmet = /** @class */ (function () {
    function Predmet(naziv, ocena) {
        this.naziv = naziv;
        this.ocena = ocena;
    }
    return Predmet;
}());
var Student = /** @class */ (function () {
    function Student(ime, prezime, jmbg) {
        this._ime = ime;
        this._jmbg = jmbg;
        this._prezime = prezime;
        this._predmeti = [];
    }
    Object.defineProperty(Student.prototype, "ime", {
        get: function () {
            return this._ime;
        },
        set: function (value) {
            this._ime = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Student.prototype, "prezime", {
        get: function () {
            return this._prezime;
        },
        set: function (value) {
            this._prezime = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Student.prototype, "jmbg", {
        get: function () {
            return this._jmbg;
        },
        set: function (value) {
            this._jmbg = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Student.prototype, "predmeti", {
        get: function () {
            return this._predmeti;
        },
        enumerable: true,
        configurable: true
    });
    Student.prototype.dodajPredmet = function (value) {
        this._predmeti.push(value);
        //TODO Osveziti html
        this.refreshPredmeti();
    };
    Student.prototype.refreshPredmeti = function () {
        var output = "";
        output += "<ul class='list-group'>";
        for (var i = 0; i < this._predmeti.length; i++) {
            output += "<li class='list-group-item'> Predmet: " + this._predmeti[i].naziv + "</li>";
            output += "<li class='list-group-item'> Ocena: " + this._predmeti[i].ocena + "</li>";
        }
        output += "</ul>";
        document.getElementById("predmeti").innerHTML = output;
    };
    Student.prototype.getProsek = function () {
        var prosek = this._predmeti.map(function (el, i, arr) { return el.ocena / arr.length; })
            .reduce(function (p, el) { return p + el; });
        return prosek;
    };
    return Student;
}());
function wireEvents() {
    document.getElementById("dodajPredmet").addEventListener("click", function () {
        var naziv = document.getElementById("naziv").value;
        var ocenaString = document.getElementById("ocena").value;
        var ocena = Number(ocenaString);
        var p = new Predmet(naziv, ocena);
        aktivanStudent.dodajPredmet(p);
    });
    document.getElementById("izracunajProsecnuOcenu").addEventListener("click", function () {
        var output = "";
        output = "<h3>Prosecna ocena za studenta: " + aktivanStudent.ime + " " + aktivanStudent.prezime + " je " + aktivanStudent.getProsek() + "</h3>";
        document.getElementById("prosecnaOcena").innerHTML = output;
    });
}
//OVAJ KOD OSTAVITI NA DNU FAJLA
window.onload = function () {
    initStudenti.forEach(function (elem) {
        var s = new Student(elem.ime, elem.prezime, Number(elem.jmbg));
        elem.predmeti.forEach(function (elem) {
            var p = new Predmet(elem.naziv, elem.ocena);
            s.dodajPredmet(p);
        });
        studenti.push(s);
        if (aktivanStudent == null) {
            aktivanStudent = s;
        }
    });
    if (QueryString["ime"] != null) {
        var student = new Student(QueryString["ime"], QueryString["prezime"], Number(QueryString["jmbg"]));
        studenti.push(student);
    }
    var selekt = document.getElementById("student");
    var output = "";
    for (var i = 0; i < studenti.length; i++) {
        var optionElem = "<option value=" + studenti[i].jmbg + ">" + studenti[i].ime + " " + studenti[i].prezime + "</option>";
        output += optionElem;
    }
    selekt.innerHTML = output;
    aktivanStudent.refreshPredmeti();
    wireEvents();
};
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
];
var QueryString = function () {
    // This function is anonymous, is executed immediately and 
    // the return value is assigned to QueryString!
    var query_string = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        // If first entry with this name
        if (typeof query_string[pair[0]] === "undefined") {
            query_string[pair[0]] = decodeURIComponent(pair[1]);
            // If second entry with this name
        }
        else if (typeof query_string[pair[0]] === "string") {
            var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
            query_string[pair[0]] = arr;
            // If third or later entry with this name
        }
        else {
            query_string[pair[0]].push(decodeURIComponent(pair[1]));
        }
    }
    return query_string;
}();
//# sourceMappingURL=proba.js.map