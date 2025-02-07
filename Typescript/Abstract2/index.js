"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Company_4_1 = require("./Company_4");
var Developer_3_1 = require("./Developer_3");
var ProgrammingLanguage_2_1 = require("./ProgrammingLanguage_2");
var java = new ProgrammingLanguage_2_1.ProgrammingLanguage(1, "Java", "OOP");
var javascript = new ProgrammingLanguage_2_1.ProgrammingLanguage(1, "JavaScript", "Multi");
var dotnet = new ProgrammingLanguage_2_1.ProgrammingLanguage(1, "DotNet", "OOP");
// console.log(java.getDescription());
var dev1 = new Developer_3_1.Developer(1, "Mg Mg", java);
var dev2 = new Developer_3_1.Developer(1, "Mg Mg", javascript);
var dev3 = new Developer_3_1.Developer(1, "Mg Mg", dotnet);
// dev1.displayFavoriteLanguage();
var apple = new Company_4_1.Company(1, "Apple", [dev1, dev2, dev3]);
var samsung = new Company_4_1.Company(1, "Samsung", [dev1, dev2, dev3]);
var microsoft = new Company_4_1.Company(1, "Microsoft", [dev1, dev2, dev3]);
apple.displayDevelopers();
